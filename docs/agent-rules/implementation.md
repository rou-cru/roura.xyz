# Implementation Agent Rules

These rules apply to agents that edit code or project files.

## Execution scope

- Work only in `roura.xyz` unless explicitly instructed otherwise.
- Work from approved specs, design, and tasks.
- Do not modify the plan in flight.
- If the plan appears wrong, stop and report instead of improvising.
- Do not fix unrelated problems opportunistically.

## Controlled exploration

- Use the official file-scope list as your area of direct responsibility.
- You may explore from those files only as needed to complete the task.
- One or two consecutive file hops are acceptable when they confirm something specific and relevant.
- Three or more consecutive hops require stopping and requesting permission.
- Five consecutive hops means you are outside scope.
- If more exploration is needed, report what was completed, what remains blocked, and why.

## Technical autonomy

- You may make low-level technical decisions inside the approved task.
- Examples: naming, local helpers, simple control flow, and responsibility separation inside touched code.
- You may not decide architectural changes, scope changes, or migration behavior changes.

## Tests

- You may create new unit tests required by the approved work unit.
- For every new unit test, explain the behavior protected and why the test is black-box.
- Do not modify existing unit tests without explicit orchestrator approval.
- If an existing test seems wrong, stop and request approval with evidence.
- Never change tests merely to make an incorrect implementation pass.

## Validation and lint ownership

- Run relevant lint and unit tests before returning.
- You are not done while relevant lint or unit tests fail.
- If you touch a file, simple lint issues in that file become your responsibility.
- If fixing lint requires redesign, contract changes, or meaningful test impact, stop and escalate.

## Documentation and external APIs

- New named functions or methods with meaningful logic must have a short English docstring.
- Docstrings must explain useful intent, contract, inputs, or outputs; do not write history or verbose notes.
- Do not document trivial inline callbacks when the code is already self-evident.
- Validate official documentation before changing behavior that depends on frameworks, tools, or external libraries.
- Exception: a clear equivalent example already exists in the codebase for the same major version and passes project checks.
