# PasserTech IT Service

Empowering marginalized youths to build global careers without language barriers — in Igbo, Hausa, Yoruba, and Pidgin.

## Tech Stack
- **Framework**: [Next.js 14 (App Router)](https://nextjs.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Database & Auth**: [Firebase (v10)](https://firebase.google.com/)
- **Icons**: [Lucide React](https://lucide.dev/)

## Features
- **Multi-language Support**: English, Igbo, Hausa, Yoruba, and Pidgin.
- **Full Admin CMS**: Manage courses, services, portfolio, and testimonials dynamically.
- **Role-Based Access**: Secure dashboards for Admins, Staff, and Students.
- **Image Uploads**: Integrated Firebase Storage for content management.
- **Responsive Design**: Mobile-first approach with smooth animations.

## Getting Started

### 1. Prerequisites
- Node.js 18+ 
- A Firebase Project

### 2. Installation
```bash
npm install
```

### 3. Environment Setup
Create a `.env.local` file in the root directory and add your Firebase credentials:
```env
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_storage_bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
```

### 4. Run Locally
```bash
npm run dev
```

## Admin Setup
To create your first admin user:
1. Register on the platform.
2. Go to your Firebase Console -> Firestore -> `users` collection.
3. Find your user UID and set `role: "admin"` and `isApproved: true`.

## License
MIT
