'use client';
import { LoginComponent } from '@/components/login';
import AuthProvider from './AuthProvider';

export default function Home() {
  return (
    <AuthProvider>
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div>
       <h1>Notes</h1>
       <p>Welcome to the AI assisted notes tool</p>
       <LoginComponent />
      </div>
    </main>
    </AuthProvider>
  )
}
