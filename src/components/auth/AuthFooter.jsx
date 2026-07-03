import React from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function AuthFooter() {
  return (
    <footer className="p-6 text-center space-y-4">
      <Link href="/" className="inline-flex items-center gap-2 text-stone-600 hover:text-stone-900 transition-colors">
        <ArrowLeft/>
        <span className="text-sm font-medium">Back to The Story</span>
      </Link>
      
      <div className="space-y-2 border-t border-stone-200 pt-4 mt-4">
        <p className="text-sm text-stone-500">© 2024 Zestaro Culinary Group. All rights reserved.</p>
        <div className="flex justify-center gap-6 text-sm">
          <Link href="/privacy" className="text-stone-600 hover:text-stone-900 font-medium">Privacy Policy</Link>
          <Link href="/sustainability" className="text-stone-600 hover:text-stone-900 font-medium">Sustainability</Link>
        </div>
      </div>
    </footer>
  );
}