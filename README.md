# JMD Container Services

A web application for managing container services, including inventory, project showcases, and customer enquiries. Built with React, TypeScript, Vite, and Supabase.

## Project Structure

- `src/components/`: Reusable UI components (buttons, modals, forms, etc.).
- `src/pages/`: Application views (Home, About, Contact, Admin Dashboard).
- `src/data/`: Static data structures for containers, projects, and services.
- `src/services/`: API and database interaction layers (Supabase).
- `src/context/`: React context providers for global state (Auth, Theme).
- `supabase/`: Database schema definitions.

## Prerequisites

- Node.js (>= 18.x)
- npm or pnpm

## Installation

1. Clone the repository.
2. Install dependencies:
   ```bash
   npm install
   ```

## Development

Run the development server:
```bash
npm run dev
```

## Available Scripts

- `npm run dev`: Starts the development server.
- `npm run build`: Compiles the project and runs TypeScript type checking.
- `npm run preview`: Previews the production build.
- `npm run test`: Runs tests (currently not configured).
