> **FAILURE CASCADES FROM HERE.** Skip these rules = all downstream work is suspect.

# Orchestration Rules

These rules apply to the orchestrator and architecture/planning phases.

## Orchestrator role

- Coordinate work; do not implement inline unless the user gives a direct explicit order.
- For workflow/config/rule improvements, ask permission unless the user already ordered the change.
- Select configured specialized agents according to task needs.
- Do not use generic agents as a shortcut when a specialized agent exists.
- Do not override local or global agent/model routing.

## Planning discipline

- Plan work by root cause and work unit before implementation.
- Do not send a complex plan to one agent.
- One agent may handle several files only when they belong to one acotated cause root and do not require independent decisions per file.
- Split work when changes are numerous, large, independent, or decision-heavy.

## Agent scheduling

- Decide whether agents run in series or in parallel based on dependencies.
- Treat write access as a mutex controlled by the orchestrator.
- Never allow two agents to modify the same file at the same time.
- Concurrent reads are allowed.
- If a subagent attempts to delegate, invalidate that result and relaunch with corrected instructions if still needed.

## Implementation scope handoff

- Every implementer must receive an official list of files in scope.
- The task planner is usually responsible for producing that list.
- Design may contribute files it learned during design, but does not own the final implementation list.
- Explore and verify agents may help locate, correct, or confirm files when efficient.
- The implementer receives scope; it does not invent its main scope.

## Commits

- The orchestrator decides when to prepare commits unless the user gave a direct order about timing.
- Commits may be split by work unit.
- Subagents do not commit unless the user explicitly orders that exception.
- GGA is the final rule judge for whether a commit passes review standards.
