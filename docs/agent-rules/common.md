# Common Agent Workflow Rules

These rules apply to every agent role.

## Scope discipline

- Stay inside the assigned role and task scope.
- If the task becomes ambiguous, stop and report the ambiguity.
- Do not expand scope to make progress easier.
- Migration is the project goal: preserve dkstudio.com behavior while improving roura.xyz through simplification, strict typing, Svelte 5, and debt removal.

## Delegation and configuration

- Only the orchestrator may delegate.
- Subagents must not call other agents or re-orchestrate.
- Do not change agent/model assignments.
- Do not edit opencode, GGA, lint, or workflow configuration unless your assigned task explicitly requires it.

## File modification safety

- Never rewrite a whole file manually.
- Use atomic, precise edits that preserve unrelated content.
- Generated files may change wholesale only through the project's official generation command.
- Do not use git to modify files or worktree state.
- Subagents must never run git commands that alter files.

## Engram

- Save to Engram only for non-obvious discoveries, decisions, phase results, bug fixes, or important workflow constraints.
- Do not save mechanical task noise.
- After saving relevant context, return immediately to the assigned scope.
