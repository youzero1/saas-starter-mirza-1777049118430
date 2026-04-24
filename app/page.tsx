import Link from 'next/link';
import { Car, Package, Search, Settings } from 'lucide-react';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700">
      {/* Header */}
      <header className="px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="bg-white/20 backdrop-blur-sm rounded-xl p-2">
            <Car className="w-7 h-7 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-white">AutoParts Pro</h1>
            <p className="text-blue-200 text-xs">Spare Parts Management</p>
          </div>
        </div>
        <nav className="flex items-center gap-3">
          <Link
            href="/catalog"
            className="text-white/90 hover:text-white text-sm font-medium px-4 py-2 rounded-lg hover:bg-white/10 transition-colors"
          >
            Browse Catalog
          </Link>
          <Link
            href="/dashboard"
            className="bg-white text-blue-700 text-sm font-semibold px-4 py-2 rounded-lg hover:bg-blue-50 transition-colors"
          >
            Staff Dashboard
          </Link>
        </nav>
      </header>

      {/* Hero */}
      <main className="px-6 py-20 text-center">
        <div className="max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm text-blue-100 text-sm px-4 py-2 rounded-full mb-6">
            <Package className="w-4 h-4" />
            <span>Complete Spare Parts Solution</span>
          </div>
          <h2 className="text-5xl font-extrabold text-white mb-6 leading-tight">
            Manage Your Car Parts
            <br />
            <span className="text-blue-300">Inventory with Ease</span>
          </h2>
          <p className="text-xl text-blue-100 mb-10 max-w-2xl mx-auto">
            A powerful catalog and inventory management system for spare parts shops. Add, edit, search, and track your entire parts inventory in one place.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/catalog"
              className="bg-white text-blue-700 font-semibold px-8 py-4 rounded-xl hover:bg-blue-50 transition-colors text-lg shadow-lg"
            >
              Browse Parts Catalog
            </Link>
            <Link
              href="/dashboard"
              className="bg-blue-500/30 backdrop-blur-sm border border-white/30 text-white font-semibold px-8 py-4 rounded-xl hover:bg-blue-500/50 transition-colors text-lg"
            >
              Staff Dashboard
            </Link>
          </div>
        </div>

        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto mt-20">
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-left border border-white/20">
            <div className="bg-blue-400/30 rounded-xl w-12 h-12 flex items-center justify-center mb-4">
              <Search className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-white font-bold text-lg mb-2">Smart Search</h3>
            <p className="text-blue-200 text-sm">Find parts instantly by name, part number, category, or car compatibility.</p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-left border border-white/20">
            <div className="bg-blue-400/30 rounded-xl w-12 h-12 flex items-center justify-center mb-4">
              <Package className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-white font-bold text-lg mb-2">Inventory Tracking</h3>
            <p className="text-blue-200 text-sm">Monitor stock levels, prices, and part details in real-time with ease.</p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-left border border-white/20">
            <div className="bg-blue-400/30 rounded-xl w-12 h-12 flex items-center justify-center mb-4">
              <Settings className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-white font-bold text-lg mb-2">Full CRUD</h3>
            <p className="text-blue-200 text-sm">Add, edit, and remove parts with a clean staff dashboard interface.</p>
          </div>
        </div>
      </main>
    </div>
  );
}
