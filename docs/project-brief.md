# We Learn — Project Brief

## 1. Product Overview
We Learn — a community learning platform for the UX women's community WE (Women Experience Israel).
The core learning unit is called a Bubble — a learning group of 4–8 women around a shared professional topic.

## 2. Tech Stack
- React 18 + TypeScript
- Vite 6
- Tailwind CSS 4
- shadcn/ui + Radix UI
- React Router 7
- Fonts: Plus Jakarta Sans (display) + DM Sans (body)

## 3. Design System
- Primary: #2BBFAA
- Background: #FFFFFF
- Fonts: Plus Jakarta Sans (display), DM Sans (body)
- Radius: 6 / 10 / 16 / 24px

## 4. Routes
/ → LandingPage
/group/:id → GroupPage
/create → CreateBubbleFlow

## 5. Landing Page
- Header: logo + tabs (All | My Bubbles) + avatar with settings dropdown
- Hero: "Find your study Bubble" + smart search bar + send button
- Bubble cards grid: Create card + Bubble cards with View/Learn more button

## 6. Group Page — 3 tabs only
1. Syllabus — Founder edits only
2. Members — all can view
3. Resources — all members can contribute

## 7. Syllabus Tab
- Top banner (teal): course name, sessions count, level, schedule, XP, progress
- Sessions with statuses: Done / In Progress / Locked
- Per-section contextual menu (see PRD: per-section-contextual-actions.md)

## 8. Members Tab
- Roles: Founder / Member (per bubble)
- Founder can remove members and appoint replacement
- + Add Member button (teal, in Members tab header)

## 9. Resources Tab
- Content types: Video / Article / Book / Tool / Podcast / Other
- Upload: link or file + type + description + watched? + personal rating (👍/👎)
- Community rating visible to all

## 10. Create Bubble Flow
Wizard: Topic → Level → Schedule → Seats → Sessions
- AI guide suggests topics
- Seats: configurable by Founder (min 4, max 8)
- Syllabus: toggle between Build with AI / Build manually

## 11. Join Bubble Flow
(see PRD: join-bubble-flow.md)
1. Free browsing without login
2. Click View → Google Sign-In if not logged in
3. AI checks: day/time fit, hours/week, commitment confirmation, experience level
4. Outcome: join / suggest alternative / waitlist
5. Notification consent required
6. Enter GroupPage as Member

## 12. NOT in MVP
- Featured Bubbles tab
- Shared with me tab
- Projects tab
- Meetings / events
- Moderator role
- AI model selector
- Role-based permission enforcement (coming later)
