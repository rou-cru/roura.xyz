> **ORCHESTRATOR HARD GATE:** Read `docs/agent-rules/orchestration.md` BEFORE delegating. No read = no authority to operate. Violating this amplifies garbage across all agents.

---

# Code Review Rules

> **AGENT DIRECTIVE:** Every rule below is mandatory. Not a suggestion, not a guideline, not a starting point. Violate any = rejection. No improvisation. No silent deviation. If blocked, report to orchestrator; do not choose an alternative path alone.
> **UNCERTAINTY RULE:** If compliance cannot be proven from the reviewed diff and project rules, return `STATUS: FAILED`. Do not pass code by assuming intent, future cleanup, or unstated exceptions.

## Agent Workflow References

Read only the workflow file that applies to your assigned role. Do not read unrelated workflow files.

| Role                                 | Required file                        |
| ------------------------------------ | ------------------------------------ |
| All agents                           | `docs/agent-rules/common.md`         |
| Orchestrator / architecture planning | `docs/agent-rules/orchestration.md`  |
| Implementer / code editor            | `docs/agent-rules/implementation.md` |
| Validator / reviewer                 | `docs/agent-rules/validation.md`     |
| Explorer / research                  | `docs/agent-rules/exploration.md`    |

Agents MUST NOT read workflow files for other roles unless the orchestrator explicitly instructs them to.

---

## General Rules (ALL files)

REJECT if:
- Hardcoded secrets or credentials
- `console.log` in production code
- Empty catch blocks or silent error swallowing
- Code duplication (DRY violation)
- Unused variables, dead code, or speculative abstractions (YAGNI)
- Non-semantic or cryptic naming
- Orchestrator delegates without reading `orchestration.md`
- Orchestrator accepts subagent output without checking for project rule violations

REQUIRE:

- Single-responsibility functions (KISS)
- Descriptive, semantic variable and function names
- Mobile-first approach
- Proportionality: smooth scaling; breakpoints only for UX changes, never minor layout tweaks
- Functional-first deliverables (MVP)

PREFER:

- Named exports over default exports
- Composition over inheritance

---

## TypeScript / Svelte

REJECT if:

- **`any` type used anywhere — including implicit `any` from untyped variables, function parameters, or return values**
- Missing return types on exported functions
- **Type assertions (`as X`) in ANY form — ZERO tolerance. This includes `as`, `as const`, `as unknown as T`, and ANY variation. Use proper typing or `satisfies`, never `as`.**
- **Evasion tactics: creating intermediate variables to hide casts by assignment, using `Object.assign`, spread tricks, or ANY technique that bypasses the type checker**
- **Methods or patterns that appear typed but circumvent the type system at runtime (e.g., indexed access without proper narrowing, `JSON.parse` without Zod/runtime validation, dynamic property access without type guards)**
- `// @ts-ignore`, `// @ts-nocheck`, disabled strictness, weakened compiler options, or suppressions used to bypass type errors
- `// @ts-expect-error` without a specific compiler-error explanation and a linked follow-up/removal condition
- Non-idiomatic Svelte 5 syntax (legacy store patterns where runes suffice)
- Props drilling more than 2 levels deep
- Default exports in `src/lib` modules

REQUIRE:

- **Strict TypeScript mode compliance — no exceptions, no workarounds, no evasions**
- **Data contracts respected: data is generated with correct typing, passed with correct typing, and consumed with correct typing. No weakening types at any boundary.**
- Proper typing for all entities (no implicit `any`)
- Modern Svelte 5 runes (`$state`, `$derived`, `$props`, `$effect`) where applicable

PREFER:

- Discriminated unions over type guards
- `satisfies` over type assertions
- Runtime validation (Zod) for external/untrusted data at system boundaries

---

## Design System / Tailwind

REJECT if:

- **Hardcoded hex, rgb, px, rem, or arbitrary visual values outside token primitive files — EVERY visual value MUST originate from the design system tokens**
- Tailwind arbitrary values for visual styling. If a needed style is missing, extend the design system first; never bypass it in component code.
- Breakpoints used for minor layout adjustments instead of UX-level changes
- Ignored or bypassed design tokens
- **Inline styles (`style=`) for visual styling in components. Styling belongs in the design system, token-based utilities, or component CSS that consumes design tokens.**
- **CSS-in-JS or style objects for visual styling. Styling belongs in the design system, not in local runtime objects.**

REQUIRE:

- All colors, spacing, radii, typography, motion values via CSS custom properties (`--color-*`, `--space-*`, `--radius-*`, `--font-*`, `--text-*`, `--duration-*`, `--ease-*`)
- Tokens defined in `design-system/tokens/` (primitives → semantics → components)
- Styles generated through `scripts/build-tokens.ts` → Style Dictionary → `src/styles/tokens.css`
- Primitives (`#fff`, `16px`, etc.) ONLY inside `design-system/tokens/primitives/`
- **Component styling MUST use token-based Tailwind classes or `var(--token)` references. Zero exceptions.**
- **The design system is the single source of truth for website styling. New visual needs require extending tokens/utilities, not inventing local styles.**

PREFER:

- Semantic token names (`--color-surface`, `--color-text-high`) over primitive names in component code

---

## Testing

> **BLACK-BOX STANDARD:** A test is black-box ONLY when it proves the public contract of the unit under test without knowing its internal mechanism, DOM shape, private state, helper functions, CSS implementation, or chosen HTML tags. "Observable in the browser" is NOT enough. If the assertion would fail after a valid refactor that preserves user behavior, the test is white-box and MUST be rejected.

REJECT if:

- **Tests assert implementation details (DOM structure, internal state) instead of behavior — THIS IS GARBAGE. White-box tests give false confidence, break on refactors, and prove nothing about correctness.**
- **Tests query specific DOM elements by tag name, class, or internal structure — if a test needs to know HOW the component is built, it's white-box trash.**
- **Tests assert artifacts of the chosen implementation instead of the public contract. If the assertion depends on a mechanism the user did not ask for and would not rely on directly, reject it.**
- **Tests require knowledge of how behavior is produced instead of proving the behavior itself. If a valid implementation could satisfy the feature while making the assertion fail, reject it.**
- E2E tests assert exact copy/content unless the copy itself is the contract under test
- Missing tests for new business logic or exported functions
- Flaky tests without documented reason

REQUIRE:

- **Unit tests as black-box contracts: given input X, expect output/behavior Y. Test WHAT the user sees/does, NEVER HOW it's implemented internally.**
- **For components: test via user interactions (click, type, focus) and assert visible outcomes (text content, visibility, navigation), not DOM queries.**
- **Before approving any test, reviewers MUST ask: "Could this assertion still pass if the implementation were rewritten with different DOM tags, CSS, helper functions, or scroll-lock strategy while preserving the same user contract?" If the answer is no, FAIL the review.**
- **For every test assertion, identify the contract being protected before approving it. If the protected contract cannot be stated without naming implementation details, the assertion is invalid.**
- E2E tests verify user flows and behavior; exact copy is valid only when the requirement explicitly makes that copy contractual
- Test files colocated with source or in `src/lib/**` matching project standard

PREFER:

- Vitest for unit/browser tests, Playwright for e2e

---

## Migration Workflow

REJECT if:

- Commits made directly to `main`
- Missing functional commit documentation when commit is not self-contained
- Backlog not updated after iteration completion
- Plan deviation without incident documentation

REQUIRE:

- Feature branches: `feature/nombre-del-modulo`
- PR per commit opened before merge
- Code Rabbit review approval or addressed nitpicks before merge
- Clean, incremental migration chunks: tokens → tests → component code
- Backlog (`backlog-migracion`) updated after each iteration

PREFER:

- Delete feature branch after merge

---

## Response Format

FIRST LINE must be exactly:
STATUS: PASSED
or
STATUS: FAILED

If FAILED, list: `file:line - rule violated - issue`
