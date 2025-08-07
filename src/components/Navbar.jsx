import { Sparkles } from "lucide-react";
import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="bg-white/95 backdrop-blur-sm shadow-sm sticky top-0 z-50">
      <div className="max-w-100% mx-auto px-10 py-3 flex justify-between items-center">
        {/* Logo di Kiri */}
        <Link href="/" className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
            <Sparkles className="w-4 h-4 text-white" />
          </div>
          <span className="font-bold text-xl text-blue-600">CleanKicks</span>
        </Link>


        {/* Menu di Kanan */}
        <div className="flex items-center space-x-6">
          <a href="/order" className="text-gray-600 hover:text-blue-600 transition">
            Order
          </a>
          <a href="/about" className="text-gray-600 hover:text-blue-600 transition">
            Tentang
          </a>
          <a href="/track" className="text-gray-600 hover:text-blue-600 transition">
            Cek Status
          </a>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700 transition">
            Order Sekarang
          </button>
        </div>
      </div>
    </nav>
  );
}