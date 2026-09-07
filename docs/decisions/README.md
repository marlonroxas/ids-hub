# Architecture Decision Records (ADRs)

Architecture Decision Records (ADRs) document significant architectural decisions made during the development of iDS Hub.

## ADR Template

```
# ADR-XXX: [Short Title]

## Status
[Proposed | Accepted | Deprecated | Superseded by ADR-XXX]

## Context
Describe the issue or problem that motivated this decision.

## Decision
Describe the chosen solution and why it was selected.

## Consequences
Describe the positive and negative consequences of this decision.

## Alternatives Considered
- Alternative 1: Why rejected
- Alternative 2: Why rejected
```

## Existing ADRs

### ADR-001: Use React for UI Components
**Status**: Accepted

**Context**: Need to build a modern, component-based SharePoint Framework application.

**Decision**: Use React 18 with TypeScript for building UI components.

**Consequences**:
- ✅ Component reusability
- ✅ Strong ecosystem and community support
- ✅ Better testing capabilities
- ❌ Additional bundle size
- ❌ Learning curve for SPFx-specific patterns

**Alternatives Considered**:
- Vue.js: Less SPFx integration examples
- Web Components: Smaller bundle but less ecosystem support

---

### ADR-002: State Management with React Context
**Status**: Accepted

**Context**: Need lightweight state management for feature modules.

**Decision**: Use React Context API with custom hooks instead of Redux or MobX.

**Consequences**:
- ✅ No additional dependencies
- ✅ Simpler mental model
- ✅ Good for medium-sized apps
- ❌ Potential performance issues at scale
- ❌ Boilerplate for complex states

**Alternatives Considered**:
- Redux: Overkill for current needs, adds complexity
- MobX: Good but less familiar to team
- Zustand: Lighter alternative, considered

---

### ADR-003: Fluent UI v9 for Component Library
**Status**: Accepted

**Context**: Need consistent, accessible UI components that work with SharePoint.

**Decision**: Use Fluent UI v9 (React) as primary component library.

**Consequences**:
- ✅ Consistency with SharePoint design
- ✅ WCAG 2.1 Level AA built-in
- ✅ Regular updates and support
- ❌ Requires theming for customization
- ❌ Large component library (some unused)

**Alternatives Considered**:
- Material-UI: Not integrated with SharePoint
- Chakra UI: Good but less SharePoint-focused

---

### ADR-004: Mock Data in Development
**Status**: Accepted

**Context**: Need to develop features without depending on SharePoint Lists being provisioned.

**Decision**: Provide mock repositories that can be swapped for real services.

**Consequences**:
- ✅ Faster development
- ✅ Better offline development
- ✅ Easier testing
- ❌ Maintenance of two data paths
- ❌ Discrepancies between mock and real

**Alternatives Considered**:
- Require List provisioning in dev: Slower setup
- Stub services at runtime: Less realistic

---

## Recording New ADRs

When making significant architectural decisions:

1. Create new file: `docs/decisions/adr-XXX-title.md`
2. Use template above
3. Discuss with team
4. Update this index
5. Reference in relevant code/documentation

---

For more information on ADRs, see [Documenting Architecture Decisions](https://adr.github.io/).
