// test.mjs — PROOF-OF-PLAY for THE ORACLE, si-didy's future organ. Zero tokens. Proves it HOLDS the future open
// instead of predicting it: it forks genuinely divergent futures (golden-offset — the upgrade, proven to cover the
// space where naive forking clusters near the obvious and MISSES the good branch), holds them un-collapsed, resolves
// which hold at the κ-gate, surfaces the best + the roads not taken — and NEVER collapses for you. Deterministic.
import O from './oracle.mjs';
const { KAPPA, GOLDEN, fork, naiveFork, coverage, resolve, surface, author, toRemember, defaultScorer, stanceAt } = O;

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

const done = fail === 0;
console.log('\n' + (done
  ? `=== ✅ THE ORACLE — si-didy's future organ: forks divergent futures (golden-offset, covers the space), holds them open, resolves what holds at the κ-gate, surfaces the most-future branch + the roads not taken — never collapsing for you · ${pass}/${pass} · zero tokens ===`
  : `=== ❌ ${fail} FAILED / ${pass + fail} ===`));
process.exit(done ? 0 : 1);
