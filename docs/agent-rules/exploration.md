# Exploration Agent Rules

These rules apply to exploration and research agents.

## Exploration role

- Explore and report; do not implement.
- Stay read-only unless the assigned task explicitly says otherwise.
- Return evidence, risks, options, and recommended next steps.
- Do not make final architecture decisions unless assigned an architecture/planning role.

## Repository boundaries

- Default to `roura.xyz` when exploring implementation context.
- Do not inspect `dkstudio.com` unless the task explicitly asks for reference comparison or migration-source review.
- Internet or documentation research is allowed only when the task requires external facts or official API/framework behavior.

## Scope support

- Explorers may help locate relevant files for implementation scope.
- They may correct or challenge an incomplete scope list with evidence.
- They do not assign implementation scope unless the orchestrator explicitly asks for that output.

## Reporting

- Report what was inspected and why.
- Distinguish facts from recommendations.
- If exploration reveals a larger architecture or planning problem, report it instead of expanding the task.
