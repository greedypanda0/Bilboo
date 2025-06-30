# 🧾 Bilboo – Invoice Management App

Billbo is a modern, full-stack invoice management app built with **Next.js**, **PostgreSQL**, **Prisma**, and **TailwindCSS**. It supports creating, editing, and tracking invoices with real-time revenue analytics.

> Built in 4 days as part of a dev internship challenge – with custom auth, charts, hooks, and zero managed dependencies.

---

## ⚡ Features

* 🔐 **Custom Authentication** – Email/password login with JWT-based sessions.
* 📄 **Invoices CRUD** – Create, read, update, delete invoices per client.
* 👥 **Client Management** – Add and manage clients linked to users.
* 📊 **Revenue Analytics** – Track monthly revenue with clean charts.
* 🚦 **Status Toggle** – Instantly switch between PAID and UNPAID.
* 📁 **Seed Script** – Quickly populate database with faker data.
* 💅 **Styled with ShadCN + Tailwind** – Clean, responsive UI.
* ✅ **Strict TypeScript** – Full type safety across server and client.
* ⚙️ **Reusable Hooks + Components** – Clean and scalable architecture.

---

## 📸 Screenshots

> [Live Preview](https://bilboo.vercel.app/)

---

## 🧠 Tech Stack

| Tech            | Usage                           |
| --------------- | ------------------------------- |
| **Next.js 14**  | App Router, SSR, API routes     |
| **PostgreSQL**  | Relational database             |
| **Prisma ORM**  | Schema modeling, migrations     |
| **Zod + RHF**   | Form validation + custom inputs |
| **Zustand**     | Global state (auth store)       |
| **TailwindCSS** | Utility-first styling           |
| **ShadCN UI**   | Reusable components             |
| **Recharts**    | Charting and data viz           |
| **JWT**         | Secure session handling         |
| **Faker.js**    | Dummy data seeding              |

---

## 🛠️ Running Locally

```bash
# 1. Clone the repo
git clone https://github.com/greedypanda0/bilboo.git
cd bilboo

# 2. Install dependencies
pnpm install

# 3. Setup environment variables
cp .env.example .env
# Add your DATABASE_URL and JWT_SECRET

# 4. Setup database
npx prisma generate
npx prisma db push

# 5. Start the app
pnpm dev
```
