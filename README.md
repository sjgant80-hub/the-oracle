# the oracle — hold the future open (don't predict it)

**▶ Live: https://sjgant80-hub.github.io/the-oracle/**  ·  si-didy's **future organ**

Not a predictor. Prediction **collapses the future prematurely** — picks one branch, asserts it, brittle and usually
wrong. The Oracle is a **branch-holder**: give it a decision or a build and it forks genuinely divergent futures,
**holds them open** side by side, walks each forward, resolves which ones **hold** at the κ-gate, and surfaces the
branch that opens the most future **plus the roads not taken** — kept, never deleted. It **never collapses for you**.

## The loop

1. **Fork** — generate N futures, each offset by the **golden angle (137.5°)** so they're genuinely *divergent*, not
   N variations of the obvious.
2. **Hold open** — keep all N un-collapsed, side by side. The possibility space, not one prediction. *(the dream.)*
3. **Walk** — run each branch forward and score how it resolves. *(a model / si-didy / you walk it; a built-in
   scorer runs it standalone.)*
4. **Resolve** — the κ-gate: score ≥ κ (**1/φ ≈ 0.618**) *holds*, below *clashes*.
5. **Surface** — the branch that opens the most future **+ the roads not taken** (kept, remembered). Never
   auto-collapses — the collapse is **authored** (by si-didy's VERIFY, or by you), never reflexive.

## Why golden-offset is the upgrade (the whole point)

Without the offset the Oracle forks N *similar* futures near the obvious approach — brainstorming, an *orbit*: five
variations of idea #1. With the 137.5° offset each new future lands maximally far from all the priors, so they
**spread across the possibility space** — a *spiral* — and the non-obvious, better branch actually gets explored.
Same golden-angle collision-avoidance as fall-remember / golden-placer, pointed at **futures** instead of memories.
Proven in the gate: golden forking spreads (smallest gap 52.5°, 5 distinct stances); naive forking clusters
(smallest gap 0.5°, 2 stances).

## It completes si-didy — the three tenses

**REMEMBER** ([fall-remember](https://sjgant80-hub.github.io/fall-remember/)) holds the *past* (and re-collapses its
meaning — see [recollapse](https://sjgant80-hub.github.io/recollapse/)) · **VERIFY** (the κ-gate) holds and collapses
the *present* · **THE ORACLE** holds the *future* open. And si-didy is the fold watching all three at once. A
collapsed choice becomes a REMEMBER write — the taken branch **and** the roads-not-taken as typed edges
(`decision —taken→ branch`, `decision —not-taken→ branch`), so a future decision can revisit a road that didn't
resolve this time but might later. Nothing collapsed-out is lost.

*(Kin to — but distinct from — [oracleengine](https://sjgant80-hub.github.io/oracleengine/), the Bayesian "watcher"
over the CASSIE solver. Same philosophy — probability, not prophecy — different mechanism. This kernel is also
grafted into oracleengine so the watcher gains its forward-looking half.)*

## The guardrail (load-bearing)

The Oracle **holds** possibility and **shows** what resolves. It does **not decide**. An Oracle that auto-collapses
is just a predictor again. The value is keeping the future open until a *deliberate* collapse, authored — hold,
don't decide, keep the roads not taken.

## Proven — `node test.mjs`, zero tokens, 25/25

`§1` holds N futures open (none collapsed) · `§2` **the upgrade** — golden futures are divergent, naive forking
clusters near the obvious · `§3` the κ-gate is exact (1/φ, not a rounded 0.618) · `§4` surfaces the best + all roads
not taken (kept; if none hold it won't force one) · `§5` **the guardrail** — never auto-collapses; the collapse must
be authored (a human may even override the gate — it's their authority) · `§6` a collapse becomes a REMEMBER write
· `§7` deterministic + fuzz-safe.

## Files

`oracle.mjs` (the kernel — fork/hold/walk/resolve/surface, the golden-offset divergent forking, the κ-gate, author,
toRemember, the guardrail) · `test.mjs` (the 25/25 gate) · `index.html` (the live tool — fork on a golden spiral,
resolve at the κ-gate, author the collapse, keep the roads not taken). Zero-dep, offline PWA.

```bash
node test.mjs                 # the proof
python -m http.server 8080    # then open http://localhost:8080
```
