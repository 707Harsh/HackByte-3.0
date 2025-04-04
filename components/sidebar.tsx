import Link from "next/link";

export const Sidebar = () => {
  return (
    <div className="w-64 bg-gray-100 h-screen p-4">
      <h2 className="text-2xl font-semibold mb-4">Menu</h2>
      <ul>
        <li className="mb-2">
          <Link href="/dashboard" className="block hover:bg-gray-200 p-2 rounded">
            Dashboard
          </Link>
        </li>
        <li className="mb-2">
          <Link href="/contracts" className="block hover:bg-gray-200 p-2 rounded">
            Contract
          </Link>
        </li>
        <li className="mb-2">
          <Link href="/profile" className="block hover:bg-gray-200 p-2 rounded">
            Profile
          </Link>
        </li>
        <li className="mb-2">
          <Link href="/settings" className="block hover:bg-gray-200 p-2 rounded">
            Settings
          </Link>
        </li>
      </ul>
    </div>
  );
};