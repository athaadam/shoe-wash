export default function Footer() {
  return (
    <footer className="bg-blue-600 text-white py-10">
      <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-3 gap-8">
        <div>
          <h3 className="text-2xl font-bold mb-4">ShoeWash</h3>
          <p className="text-sm text-blue-100">
            Layanan cuci sepatu profesional dengan pickup & delivery. 
            Bersih, cepat, dan terpercaya.
          </p>
        </div>
        
        <div>
          <h4 className="font-bold mb-4 text-white">Navigasi</h4>
          <ul className="space-y-2 text-sm">
            <li><a href="/" className="hover:text-yellow-300 transition">Beranda</a></li>
            <li><a href="/order" className="hover:text-yellow-300 transition">Order</a></li>
            <li><a href="/track" className="hover:text-yellow-300 transition">Track</a></li>
            <li><a href="/about" className="hover:text-yellow-300 transition">Tentang</a></li>
          </ul>
        </div>

        <div>
          <h4 className="font-bold mb-4 text-white">Kontak</h4>
          <ul className="space-y-2 text-sm">
            <li>📍 Jakarta, Indonesia</li>
            <li>📞 0812-3456-7890</li>
            <li>✉️ support@shoewash.id</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/20 mt-10 pt-6 text-center text-sm text-blue-100">
        © {new Date().getFullYear()} ShoeWash. All rights reserved.
      </div>
    </footer>
  );
}
