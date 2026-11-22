# Sabão CRM — Product Requirements Document (TPM)

> **Version:** 1.0 | **Date:** 2026-11-22 | **Author:** AI-assisted (prd-tpm skill)
> **Stack:** Next.js 16.4.6 + Tailwind v4.3.3 + shadcn/ui (@base-ui) + Recharts + Lucide React
> **Design:** Dark-first glassmorphism (NEXORA / Quantix / Selimor references)
> **Constraint:** Mock-data driven front-end only; backend deferred to Phase 5

---

## 1. Vision Decomposition — Feature Traceability Matrix

| ID | Feature Name | Description | Priority | Dependencies |
|----|-------------|-------------|----------|--------------|
| F-001 | Design System Tokens | oklch color tokens, glass utilities, custom scrollbar, dark-only scheme | P0 | — |
| F-002 | Sidebar Navigation | Grouped sections (Principal/Operação/Analytics/Sistema), collapsible, agent status dots | P0 | F-001 |
| F-003 | TopBar | Breadcrumb, ⌘K search trigger, notification bell with badge, avatar dropdown | P0 | F-001 |
| F-004 | Search Command Dialog | Global search overlay (⌘K), searches pages + leads + agents, keyboard nav | P1 | F-003 |
| F-005 | Root Layout Shell | Sidebar + TopBar + main content area, responsive, glass-elevated header | P0 | F-002, F-003 |
| F-006 | KpiCard Component | Icon container (rounded-xl border), value, label, MetricTrend sub-component | P0 | F-001 |
| F-007 | MetricTrend Component | % change vs previous period, green/red arrow, "vs período anterior" label | P0 | F-001 |
| F-008 | EmptyState Component | Dashed border container, icon, title, description, optional CTA button | P1 | F-001 |
| F-009 | StatusIndicator Component | Pulsing dot for active, static for others, 6 states (active/inactive/warning/error/rate_limited/paused) | P0 | F-001 |
| F-010 | Dashboard Page | 4 KPI cards, AreaChart (leads/month), PieChart (funnel), activity feed, agent status panel | P0 | F-005, F-006, F-007 |
| F-011 | Pipeline Page (Kanban) | Drag-drop columns (Novo/Contatado/Qualificado/Proposta/Fechado), card count per column, lead cards with avatar+tag | P0 | F-005 |
| F-012 | Leads Page | Data table with filters, Sheet drawer for lead detail, status badges, bulk actions | P0 | F-005, F-009 |
| F-013 | Instagram Profiles Page | Profile cards grid, status indicator per profile, follower/reach metrics, link to campaigns | P1 | F-005, F-009 |
| F-014 | Agents Page | Agent list with status dots, performance sparklines, config panel, log viewer | P0 | F-005, F-009 |
| F-015 | Campaigns Page | Campaign cards, A/B copy variations display, send volume metrics, status timeline | P1 | F-005 |
| F-016 | Financial Page | Revenue KPIs, monthly chart, transaction table, profit margin indicator | P1 | F-005, F-006 |
| F-017 | Metrics Page | Multi-chart dashboard (conversion funnel, response time heatmap, agent ROI) | P2 | F-005, F-006 |
| F-018 | System Health Page | Service status grid (API/DB/WebSocket/Agents), uptime history sparkline, latency metrics | P1 | F-005, F-009 |
| F-019 | Notifications Page | Notification list with read/unread state, filter by type, mark-all-read action | P2 | F-005 |
| F-020 | Settings Page | Tabbed interface (Profile/Integrations/Agents/Billing), form inputs, save/cancel actions | P2 | F-005 |
| F-021 | Login Page | Email/password form, social login placeholder, "forgot password" link, brand elements | P1 | F-001 |
| F-022 | Mock Data Layer | Centralized mock-data.ts with typed interfaces for all entities, sparkline arrays, funnel stages | P0 | — |
| F-023 | WebSocket Simulation | Mock WS hook that simulates agent auto-fill events for visual validation | P2 | F-022 |
| F-024 | Vercel Deploy Config | Production deploy, environment variables, preview deployments on PR | P0 | F-005 |

---

## 2. Phase Slicing

### Phase 1: Foundation (Fase Fundação)
**Goal:** Design system + layout shell + base components fully rendered and visually validated
**Features:** F-001, F-002, F-003, F-005, F-006, F-007, F-008, F-009, F-022
**Success Metrics:**
- Build passes with zero TypeScript errors
- All 4 base components render correctly in Storybook/dev preview
- Glassmorphism effect visible on TopBar and Sidebar at 1080p+ resolution
- Design tokens match NEXORA/Quantix reference palette within ΔE < 3

**In Scope:** globals.css tokens, Sidebar, TopBar, layout.tsx, KpiCard, MetricTrend, EmptyState, StatusIndicator, mock-data.ts types
**Out of Scope:** Page implementations, charts, search dialog functionality, WebSocket simulation

---

### Phase 2: Core Pages (Fase Páginas Principais)
**Goal:** Dashboard + Pipeline + Leads + Agents pages fully interactive with mock data
**Features:** F-010, F-011, F-012, F-014, F-004
**Success Metrics:**
- Dashboard renders 4 KPIs + 2 charts with correct data binding
- Pipeline supports visual drag-drop between 5 columns
- Leads table filters work (status, date range, search)
- Sheet drawer opens/closes with lead detail in < 200ms
- Search dialog returns results from mock dataset

**In Scope:** Dashboard, Pipeline Kanban, Leads table+drawer, Agents list, SearchCommand
**Out of Scope:** Instagram Profiles, Campaigns, Financial, Metrics, System Health, Notifications, Settings, Login

---

### Phase 3: Secondary Pages (Fase Páginas Secundárias)
**Goal:** Remaining 7 pages implemented with consistent design language
**Features:** F-013, F-015, F-016, F-017, F-018, F-019, F-020, F-021
**Success Metrics:**
- All 12 pages accessible via sidebar navigation without console errors
- Each page has ≥1 meaningful data visualization or interaction pattern
- Responsive behavior verified at 375px, 768px, 1440px breakpoints
- Empty states render correctly when mock data arrays are empty

**In Scope:** Instagram Profiles, Campaigns, Financial, Metrics, System Health, Notifications, Settings, Login
**Out of Scope:** Real API integration, authentication flow, persistent state

---

### Phase 4: Polish & Deploy (Fase Refinamento e Deploy)
**Goal:** Visual QA pass, accessibility audit, production deploy to Vercel
**Features:** F-024, F-023
**Success Metrics:**
- Lighthouse Performance ≥ 90, Accessibility ≥ 95
- Zero CLS on any page transition
- Vercel production URL live and shareable
- Agent auto-fill animation visible on Dashboard and Leads (mock WS)

**In Scope:** Performance optimization, a11y fixes, Vercel config, WebSocket mock, final visual QA
**Out of Scope:** Backend implementation, real Instagram API, user authentication

---

### Phase 5: Backend (Fase Backend) — DEFERRED
**Goal:** Real API, database, Instagram integration, agent orchestration
**Trigger:** Only after user explicitly approves front-end visual validation
**Features:** TBD (separate PRD)

---

## 3. QA & Acceptance Criteria (Phase 1 Focus)

### F-001: Design System Tokens
#### Acceptance Criteria
- [ ] Given the app loads, when inspecting `html`, then `color-scheme: dark` is applied
- [ ] Given any surface element, when rendered, then background uses `var(--surface)` or `var(--surface-elevated)` token
- [ ] Given `.glass` class applied, when backdrop-filter is supported, then `blur(12px) saturate(1.8)` is active
- [ ] Given primary-colored element, when hovered, then glow effect uses `var(--primary-glow)` token

#### QA Requirements
- Test: Verify tokens resolve correctly in both dev and production build
- Edge case: Browser without backdrop-filter support falls back gracefully
- Error state: Missing token reference shows visible fallback (not transparent)

#### Risks & Mitigations
| Risk | Probability | Impact | Mitigation |
|------|-------------|--------|------------|
| oklch not supported in older Safari | Low | Medium | Provide hex fallbacks in CSS custom properties |
| Glass effect causes performance drop on low-end GPU | Medium | High | Add `prefers-reduced-transparency` media query to disable blur |

---

### F-002: Sidebar Navigation
#### Acceptance Criteria
- [ ] Given sidebar rendered, when viewing at ≥1024px, then width is 256px (w-64) with section labels visible
- [ ] Given sidebar collapsed, when hovering nav item, then tooltip shows label text
- [ ] Given agent status dots footer, when clicking, then navigates to /agents
- [ ] Given active route, when rendered, then left accent bar (3px primary) is visible on nav item

#### QA Requirements
- Test: Collapse/expand transition is smooth (300ms) without layout shift
- Edge case: Long section labels truncate with ellipsis, not overflow
- Error state: Missing icon import shows placeholder square, not crash

#### Risks & Mitigations
| Risk | Probability | Impact | Mitigation |
|------|-------------|--------|------------|
| Agent dots hard to click at 10px size | Medium | Medium | Increase hit target to 24px with padding, keep visual dot at 10px |
| Section grouping unclear to users | Low | Low | Add subtle divider lines between sections |

---

### F-003: TopBar
#### Acceptance Criteria
- [ ] Given any page, when rendered, then breadcrumb shows Home > [Section] > [Page] hierarchy
- [ ] Given search trigger clicked or ⌘K pressed, when dialog opens, then input is auto-focused
- [ ] Given notification count > 0, when bell rendered, then red ping animation is visible
- [ ] Given avatar clicked, when dropdown opens, then Perfil/Configurações/Sair items are present

#### QA Requirements
- Test: Breadcrumb updates correctly on client-side navigation (no full reload)
- Edge case: Deeply nested routes (>3 levels) truncate middle segments
- Error state: Dropdown menu renders outside viewport on small screens → repositions automatically

#### Risks & Mitigations
| Risk | Probability | Impact | Mitigation |
|------|-------------|--------|------------|
| ⌘K conflicts with browser shortcuts on some OS | Low | Medium | Also support Ctrl+K as fallback |
| Avatar dropdown z-index below modal overlays | Medium | High | Set z-50 on dropdown portal, test with Sheet/Dialog open |

---

### F-006: KpiCard Component
#### Acceptance Criteria
- [ ] Given KpiCard with numeric value, when rendered, then value uses `tabular-nums` for alignment
- [ ] Given color="green", when rendered, then icon container bg is `bg-accent-green/15` with matching border
- [ ] Given previousValue prop, when rendered, then MetricTrend shows +/- percentage with correct arrow direction
- [ ] Given long label text, when rendered, then label truncates at single line with uppercase tracking

#### QA Requirements
- Test: All 5 color variants render distinct, accessible contrast ratios (≥4.5:1)
- Edge case: Value = 0 displays "0" not empty string
- Error state: Negative previousValue handled gracefully (absolute value in denominator)

#### Risks & Mitigations
| Risk | Probability | Impact | Mitigation |
|------|-------------|--------|------------|
| Icon container too small for complex icons | Low | Low | Fixed 40x40 container with overflow-hidden |
| Trend arrow color indistinguishable for colorblind users | Medium | Medium | Add +/- prefix text alongside color coding |

---

### F-022: Mock Data Layer
#### Acceptance Criteria
- [ ] Given mock-data.ts imported, when accessing `MOCK_LEADS`, then array has ≥20 entries with all required fields
- [ ] Given `sparklineData` field, when accessed, then array has exactly 12 numeric values (monthly)
- [ ] Given `funnelStages` field, when accessed, then array has 5 stages with name+count+percentage
- [ ] Given TypeScript compilation, when building, then zero type errors in mock-data consumers

#### QA Requirements
- Test: All mock arrays are non-empty and structurally valid
- Edge case: Unicode characters in names render correctly (pt-BR accents)
- Error state: Missing optional field defaults to sensible value (0, "", [])

#### Risks & Mitigations
| Risk | Probability | Impact | Mitigation |
|------|-------------|--------|------------|
| Mock data diverges from real API shape later | High | Medium | Define interfaces first, mock implements interfaces strictly |
| Large mock file slows dev server | Low | Low | Lazy-load mock data per page, not globally |

---

## 4. Quality Gate Checklist (Pre-Implementation)

- [x] Every feature has unique F-NNN ID (F-001 through F-024)
- [x] Every Phase 1 feature has ≥2 acceptance criteria
- [x] Dependencies explicitly listed (no implicit deps)
- [x] Success metrics are measurable (build errors, ms timing, ΔE color distance)
- [x] Phase scope bounded with explicit In/Out lists
- [x] Risks identified with mitigations for all P0 features
- [ ] Anti-pattern check: No vague criteria like "works correctly" ✅
- [ ] Anti-pattern check: No features without trace IDs ✅
- [ ] Anti-pattern check: No phases without success metrics ✅

---

## Appendix A: Reference Images Analysis
- **NEXORA:** Sidebar grouped by functional area, TopBar with centered search pill, KPI cards with icon-in-rounded-square
- **Quantix:** Dark gradient backgrounds, chart-heavy dashboard, status indicators with glow effects
- **Selimor:** Minimalist spacing, muted accent colors, clean typography hierarchy, glass panels on elevated surfaces

## Appendix B: Stack Constraints
- **shadcn/ui version:** Uses @base-ui/react primitives, NOT Radix. No `asChild` prop — use `render` prop instead.
- **Tailwind v4:** No tailwind.config.ts. All theme customization via `@theme` directive in globals.css.
- **Next.js 16:** App Router only. Server Components by default. "use client" required for interactivity.