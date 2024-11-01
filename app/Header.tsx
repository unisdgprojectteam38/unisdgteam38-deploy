'use client';
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Search, User} from 'lucide-react';
import { usePathname } from 'next/navigation';
import UNiSDGLogo from "@/public/UNiSDG_logo.svg";
import AuthButton from '@/components/AuthButton';

export default function Header() {
  const pathname = usePathname();
  const isLoginPage = pathname === '/login';

  return (
    <header className="sticky top-0 z-[901] h-full bg-surface">
      <div className="h-full px-16 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center">
          <Image
            src={UNiSDGLogo}
            alt="UNiSDG Logo"
            width={40}
            height={40}
            className="mr-2"
          />
          <span className="text-lg font-semibold">UNi SDG</span>
        </Link>
        <div className="flex flex-row gap-4 items-center">
          {/* Double check links */}
          <Link href="/#Dashboard" className={`btn-ghost ${pathname === '/Dashboard' ? 'active' : ''}`}>
              Dashboard
          </Link>
          <Link href="/#SDG" className={`btn-ghost ${pathname === '/SDG' ? 'active' : ''}`}>
              SDG
          </Link>
          <Link href="/search" className={`btn-ghost ${pathname === '/search' ? 'active' : ''}`}>
              <Search className="w-6 h-6"/>
          </Link>
          {!isLoginPage && (
          <div className="flex items-center space-x-4">
            <div className= "flex flex-row items-center gap-4">
            <Link href="/profile" >
              <User className="h-8 w-8 rounded-full p-1 bg-neutral-300" />
            </Link>
              <AuthButton />
            </div>
          </div>
        )}
        </div>
      </div>
    </header>
  );
}