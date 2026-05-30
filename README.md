# 15 · OrgSpace (Full-Stack Capstone)

**Roadmap stage:** Phase 8 – Full-Stack · March–June 2026 *(roadmap capstone)*

A full-stack events platform for campus orgs, inspired by my work with GDG PUP, AWS Cloud Club PUP and DEVCON. Students browse and RSVP to events; officers create them. It's the grown-up version of project 13: the same idea, now with a real database and server.

### Features
- Server-rendered event list with search and category filters (URL search params)
- Event pages with a live capacity bar and recent attendees
- RSVP through a **server action**, validated with **Zod**
- Capacity check and insert in one **database transaction**, so the last seat can't be double-booked
- Unique `(event, email)` constraint, so nobody can RSVP twice
- Officer-only event creation behind a passcode (env variable)
- Prisma + SQLite locally; switch to Postgres for deployment

### Tech
Next.js 15 (App Router, Server Components, Server Actions) · React 19 · TypeScript · Prisma · Zod · Tailwind CSS v4

### Run
```bash
npm install
cp .env.example .env
npm run db:push
npm run db:seed
npm run dev
```

### What I practiced
- Server vs client components
- Server actions with `useActionState`
- Data modeling and relations in Prisma
- Transactions and unique constraints
- Schema validation shared between form and server
