# JMD Container Services

A web application for JMD Container Services, built with React, TypeScript, and Tailwind CSS.

## Features

- Container showcase and management
- Project gallery
- Enquiry and contact forms
- Admin dashboard for business management
- Supabase integration for backend services

## Prerequisites

- Node.js (v18 or higher recommended)
- npm or yarn

## Getting Started

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd jmd-container-services
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure Environment Variables:**
   - Create a `.env` file in the root directory based on the `.env.example` file.
   - Fill in the required Supabase credentials and other environment variables.

4. **Run the development server:**
   ```bash
   npm run dev
   ```

## Available Scripts

- `npm run dev`: Starts the development server.
- `npm run build`: Builds the application for production.
- `npm run preview`: Previews the production build locally.

## Project Structure

- `src/components/`: Reusable React components (auth, common, layout, etc.)
- `src/pages/`: Application pages/routes.
- `src/data/`: Static data structures.
- `src/services/`: API and Supabase service modules.
- `src/context/`: React context providers.
- `supabase/`: Database schema and migration files.

## Built With

- [React](https://react.dev/)
- [Vite](https://vitejs.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Supabase](https://supabase.com/)
- [TypeScript](https://www.typescriptlang.org/)
