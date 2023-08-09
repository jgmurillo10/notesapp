'use client';
import { LoginComponent } from '@/components/login';
import AuthProvider from './AuthProvider';

export default function Home() {
  return (
    <AuthProvider>
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div>
       <h1>Home page</h1>
       <p>Some content</p>
       <LoginComponent />
      </div>
    </main>
    </AuthProvider>
  )
}
