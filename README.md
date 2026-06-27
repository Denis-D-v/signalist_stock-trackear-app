# Signalist Stock Tracker

                           ![StockMarketAppI](https://github.com/user-attachments/assets/e58fc5c4-509d-440e-96fa-1116796dffa4)


A robust web application designed for real-time stock price tracking, personalized market alerts, and AI-driven company insights. The project leverages an event-driven architecture to decouple heavy analytical computations from the main application thread.

## Features

<p>👉 <strong>Real-Time Stock Watchlists</strong> – Monitor active stock tickers, organize financial data, and group preferred assets into highly personalized watchlists.</p>

<p>👉 <strong>Onboarding Insights</strong> – Collect customized user metadata including specific investment goals, personal risk tolerance, and targeted industries during signup.</p>

<p>👉 <strong>Event-Driven Workflows</strong> – Automatically trigger async pipelines powered by Inngest right after user registration (app/user.created) to avoid blocking request cycles.</p>

<p>👉 <strong>AI-Generated Summaries</strong> – Process individual profile settings via the Google Gemini API to build intelligent, context-aware market summaries tailored to the user.</p>

<p>👉 <strong>Automated Alerts Engine</strong> – Continuously run standalone scripts that link directly into a Nodemailer mailing pipeline to push notification emails based on live data triggers.</p>

<p>👉 <strong>Lazy-Initialized DB Layers</strong> – Smart connection-pooling mechanisms that prevent database socket exhaustion across serverless or edge runtime environments.</p>

---

## ⚙️ Tech Stack

<p><strong>Next.js</strong> – A powerful React framework enabling Server Components, Server Actions, and optimized API routing for full-stack applications.</p>

<p><strong>TypeScript</strong> – Provides static typing to catch bugs early, improve editor tooling, and ensure long-term code maintainability.</p>

<p><strong>Better Auth</strong> – A lightweight, developer-friendly authentication library configured with a native MongoDB adapter and Next.js cookies isolation.</p>

<p><strong>Inngest</strong> – An event-driven workflow engine used to queue, schedule, and execute complex background processing asynchronously.</p>

<p><strong>Google Gemini API</strong> – Deeply integrated into background pipelines to evaluate user preferences and generate personalized financial data analysis.</p>

<p><strong>MongoDB & Mongoose</strong> – A scalable NoSQL database utilized alongside Mongoose models for data schema validation and persistent user storage.</p>

<p><strong>TailwindCSS & Shadcn UI</strong> – A utility-first CSS framework combined with highly accessible, customizable UI primitives for modern application styling.</p>

<p><strong>Nodemailer</strong> – A robust Node.js library for handling SMTP configurations and dispatching automated, transaction-based email alerts.</p>

---

## 🤸 Quick Start

Follow these simple steps to set up and run the project locally on your machine.

### Prerequisites

Ensure you have the following tools installed:
* Git
* Node.js (v18+ recommended)
* npm, yarn, or pnpm

### 1. Clone the Repository

```bash
git clone 
cd signalist_stock-trackear-app
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Setup Environment Variables

Create a new `.env.local` file in the root directory of your project and paste the following configuration:

```env
NODE_ENV=development
NEXT_PUBLIC_BASE_URL=http://localhost:3000

# Database Configuration
MONGODB_URI=your_mongodb_connection_string

# Better Auth Keys
BETTER_AUTH_SECRET=your_secure_random_hash_string
BETTER_AUTH_URL=http://localhost:3000

# Background Workers & AI Integration
GEMINI_API_KEY=your_google_gemini_api_key
INNGEST_DEV=http://localhost:8288

# SMTP Email Configuration
NODEMAILER_EMAIL=your_email@example.com
NODEMAILER_PASSWORD=your_app_specific_password
```

*(Make sure to replace placeholder values with your real credentials from MongoDB Atlas, Google AI Studio, and your email provider).*

### 4. Run the Application

To test the entire architecture including event-driven jobs, you need to spin up both the Next.js local server and the Inngest Dev Server.

In your primary terminal window, run the Next.js app:
```bash
npm run dev
```

In a separate terminal window, start the local Inngest environment:
```bash
npx inngest-cli@latest dev -u http://localhost:3000/api/inngest

