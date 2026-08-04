// test.mjs — PROOF-OF-PLAY for THE ORACLE, si-didy's future organ. Zero tokens. Proves it HOLDS the future open
// instead of predicting it: it forks genuinely divergent futures (golden-offset — the upgrade, proven to cover the
// space where naive forking clusters near the obvious and MISSES the good branch), holds them un-collapsed, resolves
// which hold at the κ-gate, surfaces the best + the roads not taken — and NEVER collapses for you. Deterministic.
import O from './oracle.mjs';
const { KAPPA, GOLDEN, fork, naiveFork, coverage, resolve, surface, author, toRemember, defaultScorer, stanceAt, profile, h16 } = O;

let pass = 0, fail = 0;
const ok = (c, m) => { c ? pass++ : fail++; console.log((c ? '  ✓ ' : '  ✗ FAIL ') + m); };
const f = (x, d = 2) => Number(x).toFixed(d);
const minGap = deg => { const s = [...deg].sort((a, b) => a - b); let m = 360; for (let i = 1; i < s.length; i++) m = Math.min(m, s[i] - s[i - 1]); return Math.min(m, 360 - s[s.length - 1] + s[0]); };

console.log('\n=== §1 · IT HOLDS THE FUTURE OPEN — forks N branches, none collapsed (the dream) ===');
{
  const b = fork('ship the pricing page', 5);
  ok(b.length === 5, 'a decision forks into 5 futures');
  ok(b.every(x => x.score === null && x.holds === null), 'all five are held un-collapsed — no branch chosen, no prediction asserted');
  ok(b.every(x => x.approach && x.stance && x.profile), 'each future carries a distinct approach + stance + shape');
}

console.log('\n=== §2 · THE UPGRADE — golden-offset futures are DIVERGENT; naive forking CLUSTERS near the obvious ===');
{
  const g = fork('grow the user base', 5);
  const angs = g.map(x => Math.round(x.angle * 10) / 10);
  ok(minGap(g.map(x => x.angle)) > 40, `the golden futures spread across the space — smallest gap ${f(minGap(g.map(x => x.angle)), 1)}° (angles ${angs.join(', ')})`);
  const nv = naiveFork('grow the user base', 5, 7);
  ok(minGap(nv.map(x => x.angle)) < 15, `naive forking clusters near the obvious — smallest gap ${f(minGap(nv.map(x => x.angle)), 1)}° (all bunched)`);
  ok(coverage(g) > coverage(nv) * 2, `golden futures are FAR more divergent in approach-shape than naive ones (coverage ${f(coverage(g))} vs ${f(coverage(nv))}) — the non-obvious branch actually gets explored`);
  // the golden set touches many different stances; the naive set repeats the same one or two
  ok(new Set(g.map(x => x.stance)).size >= 4 && new Set(nv.map(x => x.stance)).size <= 2, `golden walks ${new Set(g.map(x => x.stance)).size} stances; naive orbits ${new Set(nv.map(x => x.stance)).size} — spiral, not orbit`);
}

console.log('\n=== §3 · WALK + RESOLVE — the κ-gate: ≥ κ HOLDS, < κ CLASHES (score is walked, not asserted) ===');
{
  const b = fork('the build', 6);
  // inject a known scorer to test the gate exactly — bracketing κ = 0.61803…
  const scores = { 0: 0.90, 1: 0.75, 2: 0.62, 3: 0.617, 4: 0.30, 5: 0.10 };
  const r = resolve(b, x => scores[x.i]);
  ok(r[0].score >= r[1].score && r[1].score >= r[2].score, 'branches surface ranked by how well they resolve');
  ok(r.filter(x => x.holds).length === 3, `exactly the branches at/above κ (0.618…) hold — three of them (0.90, 0.75, 0.62)`);
  ok(r.find(x => x.i === 2).holds === true && r.find(x => x.i === 3).holds === false, 'the κ-line is exact: 0.62 holds, 0.617 clashes (κ = 1/φ, not a rounded 0.618)');
  ok(resolve(b).every(x => x.score >= 0 && x.score <= 1), 'the built-in scorer keeps every score in [0,1] (a real stand-in when no model is injected)');
}

console.log('\n=== §4 · SURFACE — the best-resolving branch + ALL the roads not taken (kept, never deleted) ===');
{
  const b = fork('go to market', 6);
  const s = surface(resolve(b, x => ({ 0: 0.8, 1: 0.7, 2: 0.5, 3: 0.66, 4: 0.3, 5: 0.2 })[x.i]));
  ok(s.best && s.best.score === 0.8, 'it surfaces the branch that opens the most future');
  ok(s.holds.length === 3 && s.roadsNotTaken.length === 3, 'the holding branches AND the roads not taken are both returned');
  ok(s.roadsNotTaken.every(x => !x.holds), 'the roads not taken are the ones that clashed — kept, not discarded');
  const none = surface(resolve(fork('x', 3), () => 0.2));
  ok(none.best === null && none.anyHold === false, 'if nothing resolves, it does NOT force a branch — it flags that none hold');
}

console.log('\n=== §5 · THE GUARDRAIL — it NEVER collapses for you; the collapse must be AUTHORED ===');
{
  const b = fork('the decision', 5);
  const s = surface(resolve(b, defaultScorer));
  ok(s.authored === false, 'surfacing is not a decision — authored:false, the future stays open');
  const anyId = [...s.holds, ...s.roadsNotTaken][0].id;
  ok(!author(s, anyId, '').ok, 'you cannot collapse anonymously — an author is required (the Oracle never decides)');
  const a = author(s, anyId, 'VERIFY');
  ok(a.ok && a.authored === true && a.authoredBy === 'VERIFY', 'a deliberate, authored collapse works (by VERIFY, or by a person)');
  ok(a.notTaken.length === 4, 'and the four roads not taken are kept, to be remembered');
  // a human may author a branch the gate CLASHED — it is their authority, not the gate's
  const clash = s.roadsNotTaken[0]; if (clash) ok(author(s, clash.id, 'Simon').ok, 'a person can even author a road the κ-gate did not pick — the collapse is their authority');
  else ok(true, '(all branches held — nothing to override this run)');
}

console.log('\n=== §6 · THREE TENSES — a collapse becomes a REMEMBER write (taken + roads-not-taken as typed edges) ===');
{
  const b = fork('which architecture', 5);
  const s = surface(resolve(b, defaultScorer));
  const a = author(s, [...s.holds, ...s.roadsNotTaken][0].id, 'VERIFY');
  const edges = toRemember('which architecture', a);
  ok(edges[0].type === 'taken' && edges.filter(e => e.type === 'not-taken').length === 4, 'the chosen branch is a `taken` edge; every road not taken is a `not-taken` edge (revisitable later)');
  ok(edges.every(e => e.from === 'which architecture' && e.to && typeof e.score === 'number'), 'each edge carries the decision, the approach and its resolve-score — fall-remember can hold the whole fork');
}

console.log('\n=== §7 · DETERMINISM + FUZZ ===');
{
  ok(JSON.stringify(fork('same', 5)) === JSON.stringify(fork('same', 5)), 'the same decision forks the same futures every time (deterministic)');
  let threw = false;
  try { fork(); fork(null, 0); fork('x', 1); resolve([]); surface(resolve([])); author(surface(resolve(fork('x', 2))), 'nope', 'me'); coverage([]); toRemember('', { chosen: { approach: 'a', id: '1', score: 1 }, notTaken: [] }); }
  catch { threw = true; }
  ok(!threw, 'empty / zero / unknown / malformed input never throws');
  ok(typeof O.GUARDRAIL === 'string' && /does NOT decide|never/i.test(O.GUARDRAIL), 'the guardrail is present and honest — it holds, it does not decide');
}

console.log('\n=== §8 · BOUNDARY KILLS — every operator on the product surface is pinned exactly (witness) ===');
{
  // 8a · the κ-gate is ≥, not > — a branch scoring EXACTLY κ HOLDS (score >= KAPPA, never > KAPPA)
  const gate = resolve(fork('gate', 1), () => KAPPA);
  ok(gate[0].score === KAPPA && gate[0].holds === true, 'a branch scoring EXACTLY κ HOLDS — the resolve-gate is ≥ κ (score === κ ⇒ holds true), not > κ');

  // 8b · h16 is checked against a fixed hash vector — the mixing loop bound is exact (i < len)
  ok(h16('the oracle holds') === '96c6109f92e93878', 'h16 matches a fixed hash vector — the mixing loop consumes exactly len chars (i < len)');
  ok(h16('') === '9e3779b9811c9dc5', 'h16 of the empty string is the pristine seed — the loop does NOT run once past the end (i < len, no phantom NaN char)');

  // 8c · coverage guard is length < 2, not <= 2 — two branches return their real distance, not 0
  const two = fork('two branches', 2);
  ok(coverage(two) > 0 && Math.abs(coverage(two) - 1.4686972256877873) < 1e-9, 'coverage of exactly two branches is their real profile-distance (>0), not 0 — the empty-guard is length < 2, not <= 2');

  // 8d · naiveFork returns exactly N branches — the loop bound is i < N, not i <= N
  ok(naiveFork('n', 5, 7).length === 5 && naiveFork('n', 3, 1).length === 3, 'naiveFork returns exactly N branches — the loop bound is i < N (not i <= N, which would over-produce)');

  // 8e · naiveFork produces its exact deterministic angle sequence — the LCG increment is +1013904223
  const expectedNaive = [-10.44876640662551, 16.53973058797419, 4.499666653573513, 17.079258365556598, -18.026352990418673];
  const gotNaive = naiveFork('grow the user base', 5, 7).map(x => x.angle);
  ok(gotNaive.length === 5 && gotNaive.every((a, i) => Math.abs(a - expectedNaive[i]) < 1e-9), 'naiveFork produces its exact deterministic angle vector — the LCG advance is s*1664525 + 1013904223 (a flipped sign gives a different sequence)');

  // 8f · profile horizon phase is +1.2 — profile(0).horizon = 0.5 + 0.5·sin(1.2), not sin(−1.2)
  ok(Math.abs(profile(0).horizon - (0.5 + 0.5 * Math.sin(1.2))) < 1e-9, 'profile horizon carries phase +1.2 — profile(0).horizon = 0.5+0.5·sin(1.2) ≈ 0.966, not the flipped sin(−1.2) ≈ 0.034');

  // 8g · fork PRESERVES a real decision — the null-guard is (dec == null), not (dec != null)
  ok(fork('ship the pricing page', 1)[0].decision === 'ship the pricing page', 'a real decision is kept on the branch — the null-guard is dec == null (a non-null decision is NOT blanked to \'\')');
  ok(fork('ship the pricing page', 1)[0].approach.includes('ship the pricing page'), 'the branch approach carries the real decision — it is `dec || \'this\'`, not `dec && \'this\'` (which would drop it to \'this\')');

  // 8h · naiveFork approaches carry the real decision — dec = decision || '', not decision && ''
  ok(naiveFork('grow the user base', 3, 7).every(x => x.approach.includes('grow the user base')), 'naiveFork approaches carry the real decision — dec = decision || \'\' (a flipped && would blank every approach)');

  // 8i · author matches the branch by id with === — an unknown id fails, a real id collapses THAT branch
  const sAuth = surface(resolve(fork('the choice', 4), defaultScorer));
  const realId = [...sAuth.holds, ...sAuth.roadsNotTaken][0].id;
  ok(author(sAuth, 'no-such-branch-id', 'me').ok === false, 'authoring an unknown branch id fails (no such branch) — the match is b.id === branchId, not !==');
  ok(author(sAuth, realId, 'me').chosen.id === realId, 'authoring a real id collapses THAT exact branch — the find matches b.id === branchId, not the first non-match');
}

const done = fail === 0;
console.log('\n' + (done
  ? `=== ✅ THE ORACLE — si-didy's future organ: forks divergent futures (golden-offset, covers the space), holds them open, resolves what holds at the κ-gate, surfaces the most-future branch + the roads not taken — never collapsing for you · ${pass}/${pass} · zero tokens ===`
  : `=== ❌ ${fail} FAILED / ${pass + fail} ===`));
process.exit(done ? 0 : 1);
