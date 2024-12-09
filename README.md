# QuickSlot

QuickSlot is a modern, user-friendly platform that allows members to create organizations and manage their memberships effectively. Each member can showcase the services they offer and enable clients to book these services by checking their availability through a built-in calendar system.

---

## Features

- **Organization Management:** 
  - Members can create organizations and add other members to their organizations.
  
- **Service Offerings:** 
  - Members can define the services they offer to clients.
  
- **Booking System:** 
  - Clients can browse available times in a member's calendar and book services directly.

---

## Tech Stack

QuickSlot is built using a powerful and modern tech stack:

- **[Next.js](https://nextjs.org/):**
- **[TypeScript](https://www.typescriptlang.org/):**
- **[Supabase](https://supabase.com/):**
- **[Tailwind CSS](https://tailwindcss.com/):** 
- **[React](https://reactjs.org/):** 

---

## Installation and Setup

Follow these steps to get started with QuickSlot:

1. Clone the repository:
   ```bash
   git clone https://github.com/Avir4m/QuickSlot.git
   cd quickslot

2. Install dependencies:
    ```bash
    npm install

3. Set up environment variables:
    - Create a .env file in the root directory.
    - Add the necessary keys for Supabase, such as:

    ```bash
    NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
    NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

4. Run the development server:
    ```bash
    npm run dev

5. Open http://localhost:3000 in your browser to view the app.