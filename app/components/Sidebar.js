'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="w-64 h-screen bg-gray-800 text-white flex flex-col">
      <h1 className="text-2xl font-bold p-4 border-b border-gray-700">Stock Admin</h1>
      <ul className="flex-1">
        <li>
          <Link href="/items" className={`block px-4 py-2 hover:bg-gray-700 ${pathname === '/items' && 'bg-gray-700'}`}>
            Items
          </Link>
        </li>
        <li>
          <Link href="/stock-entry" className={`block px-4 py-2 hover:bg-gray-700 ${pathname === '/stock-entry' && 'bg-gray-700'}`}>
            Stock Entry
          </Link>
        </li>
        <li>
          <Link href="/stock-ledger" className={`block px-4 py-2 hover:bg-gray-700 ${pathname === '/stock-ledger' && 'bg-gray-700'}`}>
            Stock Ledger
          </Link>
        </li>
      </ul>
    </div>
  );
}
