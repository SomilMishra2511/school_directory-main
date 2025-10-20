// components/Header.jsx
import Link from 'next/link';

export default function Header() {
  return (
    <header className="bg-white shadow-sm">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="text-xl font-semibold">
          SchoolFinder
        </Link>
        <nav className="space-x-4">
          <Link
            href="/addSchool"
            className="px-3 py-2 rounded-md bg-blue-600 text-white"
          >
            Add School
          </Link>
          <Link
            href="/showSchools"
            className="px-3 py-2 rounded-md border"
          >
            View Schools
          </Link>
        </nav>
      </div>
    </header>
  );
}
