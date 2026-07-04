# Acadex

A open-source educational resource archive built by CSE students, for CSE students at **United International University (UIU)**.

Acadex helps students find playlists, notes, question banks, GitHub repos, books, PDFs, and more — organized by trimester and course. No more scrolling through shared spreadsheets or digging through scattered Google Drive folders.

## Features

- **Trimester-Based Sorting** — Resources organized by trimester so you can find exactly what you need for your current courses
- **Quick Course Search** — Search by course code, course name, or faculty
- **Individual Course Pages** — Every course gets its own dedicated page with all linked resources neatly categorized
- **All Resource Types** — YouTube playlists, Google Drive folders, GitHub repos, blogs, notes, question banks, PDFs, and more
- **Contribute Resources** — Know a great resource? Submit it through the contribution form and help your fellow students
- **Dark Mode** — Full dark/light theme support
- **Mobile Friendly** — Responsive design that works on all devices
- **Open Source** — MIT Licensed, built by the community

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 19 + TypeScript |
| Build Tool | Vite 8 |
| Styling | Tailwind CSS v4 |
| Routing | React Router DOM v7 |
| Data Fetching | TanStack React Query v5 |
| Backend/DB | Supabase (PostgreSQL) |
| Icons | Lucide React |
| Analytics | Vercel Analytics |
| Deployment | Vercel |

## Getting Started

### Prerequisites

- Node.js 18+
- A [Supabase](https://supabase.com) project (or use the built-in mock data)

### Installation

```bash
git clone https://github.com/your-username/acadex.git
cd acadex
npm install
```

### Environment Setup

Copy the example env file and fill in your Supabase credentials:

```bash
cp .env.example .env
```

```env
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
```

> If Supabase is not configured, the app falls back to mock data automatically.

### Development

```bash
npm run dev
```

### Build

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## Database Setup

Run the SQL files in your Supabase SQL Editor in this order:

1. `supabase-setup.sql` — Creates all tables and RLS policies
2. `supabase-seed.sql` — Seeds the CSE curriculum (courses)


## Contributing

### For Students (Resource Contributions)

1. Go to the [Contribute](/contribute) page
2. Select the course and resource type
3. Paste the resource URL and add any notes
4. Submit — the team will review and approve

### For Developers

1. Fork the repository
2. Create a feature branch:
   ```bash
   git checkout -b feature/your-feature-name
   ```
3. Make your changes
4. Run the linter and typecheck before committing:
   ```bash
   npm run build
   ```
5. Commit with a clear message describing your change
6. Push to your fork and open a Pull Request

### Code Guidelines

- Use TypeScript for all new files
- Follow the existing code style and naming conventions
- Keep components small and focused
- Use Tailwind CSS for styling (no inline styles)
- Add new resource types to `src/utils/resourceHelpers.ts` if needed
- Test your changes by running `npm run build` before submitting


## Project Structure

```
src/
├── components/
│   ├── layout/       # Layout, Navbar, Footer, AdminLayout
│   └── ui/           # Reusable UI components (Button, Badge, Cards, etc.)
├── context/          # React contexts (Theme, Admin Auth)
├── hooks/            # Custom hooks (useTrimesters, useCourses, etc.)
├── lib/              # Supabase client, mock data, utilities
├── pages/            # Page components (Home, Trimesters, Course, etc.)
│   └── admin/        # Admin panel pages
├── services/         # API service functions
├── types/            # TypeScript interfaces
└── utils/            # Helper functions
```

## Honorable Mentions

- **Md. Tashin Parvez** (011 221 437) — Former UIU CSE student whose resource database, created in Summer 2023, formed the foundation of Acadex
- **Team UIUSS** (UIU Scholar's Squad) — Contributed significantly to building and organizing CSE course resources

## License

MIT License — feel free to use, modify, and distribute.
