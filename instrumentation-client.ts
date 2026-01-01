import posthog from "posthog-js"

posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY!, {
  api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST || "/ingest",
  ui_host: "https://us.posthog.com",
  defaults: '2025-05-24',
  capture_exceptions: true,
  debug: process.env.NODE_ENV === "development",
})


// Mongodb connection helper for Next.js (TypeScript)
// You are a backend developer working on a Next.js application with Mongoose and TypeScript.
// Your task is to,
// - Create a new file `lib/mongodb.ts` in the lib folder of a Next.js application.
// - Set up a Mongoose database connection to MongoDB using TypeScript with proper types (avoid using any).
// - Cache the connection to prevent multiple connections during development.
// - Write clear and concise comments explaining key parts of the code.
// - Make sure the code is clean, readable, and production-ready. 


// You are a backend developer working on a Next.js app with TypeScript and Mongoose. Create a GET API route at `app/api/events/[slug]/route.ts` that returns event details by `slug`.

// 🛠️ Requirements
// * Accept `slug` as a dynamic route parameter.
// * Query the `Event` model and return the matching event as JSON.
// * Use proper TypeScript types (no `any`).
// * Handle validation errors properly (missing or invalid `slug`, event not found, unexpected errors) and return appropriate status codes with clear messages.
// * Ensure code is production-ready, well-structured, type-safe, and includes concise comments.

// ✅ Final Deliverable:
// A clean, production-level API route that fetches event data by `slug` with robust validation and error handling.


// {
//   "title": "Cloud Next 2026",
//   "description": "Google’s premier cloud computing event, showcasing innovations in AI, infrastructure, and enterprise solutions.",
//   "overview": "Cloud Next 2025 highlights the latest in cloud-native development, Kubernetes, AI, and enterprise scalability. Developers, architects, and executives gather to learn about new Google Cloud services, best practices, and success stories.",
//   "image": "https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=2340",
//   "venue": "Moscone Center",
//   "location": "San Francisco, CA",
//   "date": "2025-04-10",
//   "time": "08:30",
//   "mode": "Hybrid (In-Person & Online)",
//   "audience": "Cloud engineers, DevOps, enterprise leaders, AI researchers",
//   "agenda": 
  // [
  //   "08:30 AM - 09:30 AM | Keynote: AI-Driven Cloud Infrastructure",
  //   "09:45 AM - 11:00 AM | Deep Dives: Kubernetes, Data Analytics, Security",
  //   "11:15 AM - 12:30 PM | Product Demos & Networking",
  //   "12:30 PM - 01:30 PM | Lunch",
  //   "01:30 PM - 03:00 PM | Workshops: Scaling with GCP",
  //   "03:15 PM - 04:30 PM | Fireside Chat: The Future of Enterprise Cloud"
  // ],
//   "organizer": "Google Cloud organizes Cloud Next to connect global businesses, developers, and innovators with the latest technologies and best practices in cloud computing.",
//   "tags": ["Cloud", "DevOps", "Kubernetes", "AI"]
// }