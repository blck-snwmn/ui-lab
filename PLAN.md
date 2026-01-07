# UI Lab - Implementation Plan

## Linter/Formatter Rules

**CRITICAL**: Only oxlint/oxfmt are permitted in this project.

| Tool     | Status    |
| -------- | --------- |
| oxlint   | Required  |
| oxfmt    | Required  |
| eslint   | FORBIDDEN |
| prettier | FORBIDDEN |

### Rationale

- oxlint/oxfmt provide faster, Rust-based linting and formatting
- Consistent with chex-garage project standards
- Type-aware linting via `oxlint --type-aware --type-check --deny-warnings`

## Verification Checklist (per phase)

Each development phase MUST complete all items before proceeding:

1. **Build**: `bun run build` passes
2. **Lint**: `bun run lint` passes (all warnings are errors)
3. **Format**: `bun run fmt:check` passes
4. **Browser**: Actually start dev server and verify in browser
5. **Commit**: Stage and commit changes

## Project Structure

```
ui-lab/
├── apps/
│   ├── shadcn/           # shadcn/ui Visual Styles (Base UI)
│   │   ├── vega/
│   │   ├── nova/
│   │   ├── maia/
│   │   ├── lyra/
│   │   └── mira/
│   ├── react-bits/       # React Bits demos (TODO)
│   └── ripple/           # ripple.js demos (TODO)
├── packages/             # Shared packages (if needed)
├── .oxlintrc.json        # Root oxlint config
├── turbo.json            # Turborepo config
└── package.json          # Root package with scripts
```

## Phases

### Phase 1: Foundation Setup

- [x] Root package.json with Bun/Turborepo
- [x] turbo.json task definitions
- [x] tsconfig.base.json
- [x] .oxlintrc.json
- [x] .gitignore

### Phase 2-3: shadcn/ui Visual Styles

- [x] Vega style app
- [x] Nova style app
- [x] Maia style app
- [x] Lyra style app
- [x] Mira style app

### Phase 4: React Bits Demo

- [ ] Create React Bits demo app

### Phase 5: ripple.js Demo

- [ ] Create ripple.js demo app

### Phase 6: Final Verification

- [ ] All apps build successfully
- [ ] All apps pass lint
- [ ] All apps pass format check
- [ ] All apps verified in browser
- [ ] Final commit

### Phase 7: Vitest Browser Mode

- [ ] Explore Vitest Browser Mode for testing
