# Recruiter MVP Platform

A minimal recruitment matching platform built with **Next.js 15**, **Supabase**, and **Prisma**.  
Recruiters can post jobs and view matched candidates in real time.  
Candidates upload resumes as PDFs — AI extracts key data for storage and future matching.

---

## Current Features

### 👩‍💼 Recruiter Side

- Create and submit new job listings.
- View AI-matched candidates for each job.
- Real-time job status and match updates via **Supabase Broadcast**.
- Refresh button to manually check for newly available candidates.

### 🧾 Candidate Side

- Upload a PDF resume (no form inputs yet).
- AI parses resume details (education, experience, skills) and stores structured data in the database.

### ⚙️ Backend Logic

- **Supabase Auth** for secure access control.
- **Supabase PostgreSQL** as the main database, managed via **Prisma ORM**.
- **Supabase Broadcast Channels** for real-time updates.
- **AI-based resume parsing** using OpenAI, with structured JSON extraction.

---

## 🧩 Future Improvements

### Candidate Enhancements

- Trigger job matching automatically after successful resume upload.
- Allow candidates to review and edit AI-extracted data before saving.

### Recruiter Enhancements

- Recruiters can view and edit their own job listings.
- Restrict “Refresh Matches” to owned listings only.
- View-only access for jobs created by other recruiters.

### Technical Improvements

- Migrate to **TypeScript** for type safety.
- Introduce **Edge Functions** for better performance.
- Integrate **UI libraries** (e.g., shadcn/ui or Chakra).
- Improve responsive design.
- Optimize AI resume parsing and error handling.
- Add rate-limiting and retry logic for AI parsing.
- Review **caching and revalidation** strategies for job pages.

---

## 🧰 Tech Stack

| Layer             | Technology                         |
| ----------------- | ---------------------------------- |
| Frontend          | Next.js 15 (App Router)            |
| Backend           | Next.js Server Actions, Prisma ORM |
| Auth              | Supabase Auth                      |
| Database          | Supabase PostgreSQL                |
| Realtime          | Supabase Broadcast Channels        |
| AI Resume Parsing | OpenAI API                         |
| Styling           | CSS Modules                        |

---

## ⚙️ Local Setup

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/yourusername/recruiter-mvp.git
cd recruiter-mvp
```

### 2️⃣ Install Dependencies

```bash
yarn install
```

### 3️⃣ Configure Environment Variables

Create a `.env.local` file based on `.env.example`:

### 4️⃣ Setup Prisma and Database

Run initial migrations and generate the Prisma client:

```bash
npx prisma migrate dev
npx prisma generate
```

To inspect your database:

```bash
npx prisma studio
```

### 5️⃣ Run the Development Server

```bash
yarn dev
```

Your app will be live at [http://localhost:3000](http://localhost:3000).

### 6️⃣ Build for Production

```bash
yarn build
yarn start
```

---
