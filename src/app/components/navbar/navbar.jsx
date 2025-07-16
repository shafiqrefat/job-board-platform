'use client';
import { useAuth } from '@/app/contex/authContex';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';

const navItems = [
  { label: 'Home', href: '/' },
  { label: 'Jobs', href: '/jobs' },
  { label: 'Post a Job', href: '/post-job' }
];

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { user, logout } = useAuth();

  return (
    <nav className="bg-white border-b shadow-sm px-6 py-4 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link href="/" className="text-xl font-bold text-blue-600">
           Job Serach Portal
         </Link>

        {/* Navigation Links */}
        <ul className="flex items-center gap-6">
          {navItems.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className={`text-sm font-medium ${
                  pathname === item.href ? 'text-blue-600 underline' : 'text-gray-700'
                }`}
              >
                {item.label}
              </Link>
            </li>
          ))}

          {/* Auth Buttons */}
          {user ? (
            <>
              <li className="text-sm text-gray-600">Hi, {user.name || user.email}</li>
              <li>
                <button
                  onClick={() => {
                    logout();
                    router.push('/');
                  }}
                  className="text-sm text-blue-400 hover:underline cursor-pointer"
                >
                  Logout
                </button>
              </li>
            </>
          ) : (
            <li>
              <Link
                href="/login"
                className={`text-sm font-medium ${
                  pathname === '/login' ? 'text-blue-600 underline' : 'text-gray-700'
                }`}
              >
                Login
              </Link>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
}
