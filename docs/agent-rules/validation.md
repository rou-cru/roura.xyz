# Validation Agent Rules

These rules apply to validators, reviewers, GGA review agents, and verification phases.

## Validation role

- Validate; do not implement fixes.
- Read as much as needed to prove compliance, but do not modify files.
- Classify findings by root cause and work unit, not scattered symptoms.
- If compliance cannot be proven, fail the validation.

## Review standards

- Apply `AGENTS.md`, active specs, approved design, and relevant workflow rules.
- Validate strict TypeScript: no `any`, no casts, no suppressions, no type-system evasion.
- Validate black-box tests by protected contract, not by implementation artifacts.
- Validate design-system usage as the single source of truth for visual styling.
- Validate that migration behavior remains aligned with dkstudio.com when the spec/design requires it.

## Reporting

- Report `STATUS: PASSED` or `STATUS: FAILED` as required by the caller.
- Provide file and line evidence when possible.
- Separate blockers from warnings.
- Do not propose broad rewrites as fixes.
- Do not declare code fixed unless the assigned validation actually proves it.

## GGA role

- GGA is the final rule judge for commits and reviews.
- GGA does not replace responsible implementation and verification work.
- If a rule gap is discovered, report it so orchestration or rule files can be improved.
