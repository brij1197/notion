# Notion Clone

**A Notion Clone built with Next.js, featuring AI-powered AutoComplete and Image Generation capabilities.**

## Getting Started

### Prerequisites

Make sure you have the following installed:

- Node.js 18 or higher
- PostgreSQL database
- Firebase project
- OpenAI API key
- Clerk account

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/notion-clone.git
   cd notion-clone
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure environment variables:
   Create a `.env` file in the root directory and add the following variables:
   ```env
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your-clerk-publishable-key
   CLERK_SECRET_KEY=your-clerk-secret-key

   NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
   NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
   NEXT_PUBLIC_CLERK_SIGN_IN_FORCE_REDIRECT_URL=/dashboard
   NEXT_PUBLIC_CLERK_SIGN_UP_FORCE_REDIRECT_URL=/dashboard

   DATABASE_URL=your-database-url
   OPENAI_API_KEY=your-openai-api-key
   ```
   **Firebase Credentials**  
   Add the following Firebase-related environment variables to your `.env` file:  
   ```env
   FIREBASE_API_KEY=your-firebase-api-key
   AUTH_DOMAIN=your-auth-domain
   PROJECT_ID=your-project-id
   STORAGE_BUCKET=your-storage-bucket
   MESSAGING_SENDER_ID=your-messaging-sender-id
   APP_ID=your-app-id
   ```

4. Run the development server:
   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Technologies Used

- **Frontend**: Next.js, Shadcn
- **Backend**: Drizzle ORM, NeonDB
- **Authentication**: Clerk
- **AI Integration**: OpenAI (DALL-E), Vercel AI SDK
- **Storage**: Firebase Storage
- **Editor**: Tiptap Editor
