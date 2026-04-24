import Link from 'next/link';
import { Car, Package, Search, Settings, Shield, Zap, Users } from 'lucide-react';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-950 to-blue-900">
      {/* Header */}
      <header className="px-6 py-5 flex items-center justify-between border-b border-white/10">
        <div className="flex items-center gap-3">
          <div className="bg-blue-500 rounded-xl p-2.5 shadow-lg shadow-blue-500/30">
            <Car className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-white tracking-tight">AutoParts Pro</h1>
            <p className="text-blue-300 text-xs font-medium">Spare Parts Management</p>
          </div>
        </div>
        <nav className="flex items-center gap-3">
          <Link
            href="/catalog"
            className="text-white/80 hover:text-white text-sm font-medium px-4 py-2 rounded-lg hover:bg-white/10 transition-all duration-200"
          >
            Browse Catalog
          </Link>
          <Link
            href="/dashboard"
            className="bg-blue-500 hover:bg-blue-400 text-white text-sm font-semibold px-4 py-2 rounded-lg transition-all duration-200 shadow-lg shadow-blue-500/30"
          >
            Staff Dashboard
          </Link>
        </nav>
      </header>

      {/* Hero */}
      <main className="px-6 pt-24 pb-16 text-center">
        <div className="max-w-5xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-blue-500/20 border border-blue-400/30 text-blue-200 text-xs font-semibold px-4 py-2 rounded-full mb-8 uppercase tracking-widest">
            <Package className="w-3.5 h-3.5" />
            <span>Complete Spare Parts Solution</span>
          </div>

          <h2 className="text-6xl font-extrabold text-white mb-6 leading-tight tracking-tight">
            The Smarter Way to
            <br />
            <span className="bg-gradient-to-r from-blue-300 to-cyan-300 bg-clip-text text-transparent">
              Manage Car Parts
            </span>
          </h2>

          <p className="text-lg text-blue-100/80 mb-12 max-w-2xl mx-auto leading-relaxed">
            A powerful inventory &amp; catalog system built for spare parts shops. Add, search, and track your entire parts inventory — all in one place.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-20">
            <Link
              href="/catalog"
              className="group bg-white text-blue-900 font-bold px-8 py-4 rounded-xl hover:bg-blue-50 transition-all duration-200 text-base shadow-xl shadow-black/20 flex items-center justify-center gap-2"
            >
              <Search className="w-4 h-4" />
              Browse Parts Catalog
            </Link>
            <Link
              href="/dashboard"
              className="group bg-blue-500/20 border border-blue-400/40 backdrop-blur-sm text-white font-bold px-8 py-4 rounded-xl hover:bg-blue-500/40 transition-all duration-200 text-base flex items-center justify-center gap-2"
            >
              <Settings className="w-4 h-4" />
              Staff Dashboard
            </Link>
          </div>

          {/* Stats bar */}
          <div className="grid grid-cols-3 gap-6 max-w-lg mx-auto mb-20">
            {[
              { value: '10K+', label: 'Parts Listed' },
              { value: '500+', label: 'Car Models' },
              { value: '99.9%', label: 'Uptime' },
            ].map(({ value, label }) => (
              <div key={label} className="text-center">
                <p className="text-3xl font-extrabold text-white">{value}</p>
                <p className="text-blue-300 text-xs font-medium mt-1">{label}</p>
              </div>
            ))}
          </div>

          {/* Feature cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 max-w-5xl mx-auto">
            {[
              {
                icon: <Search className="w-5 h-5 text-blue-300" />,
                title: 'Smart Search & Filters',
                desc: 'Find any part instantly by name, part number, category, car make, model, or year.',
                color: 'from-blue-500/20 to-blue-600/10',
              },
              {
                icon: <Package className="w-5 h-5 text-cyan-300" />,
                title: 'Live Inventory Tracking',
                desc: 'Monitor stock levels, prices, and part details in real-time. Never miss a low-stock item.',
                color: 'from-cyan-500/20 to-cyan-600/10',
              },
              {
                icon: <Shield className="w-5 h-5 text-emerald-300" />,
                title: 'Full CRUD Management',
                desc: 'Add, edit, and remove parts with a clean, intuitive staff dashboard. No coding required.',
                color: 'from-emerald-500/20 to-emerald-600/10',
              },
              {
                icon: <Users className="w-5 h-5 text-purple-300" />,
                title: 'Customer Catalog',
                desc: 'Separate read-only catalog view for customers to browse and find parts without staff access.',
                color: 'from-purple-500/20 to-purple-600/10',
              },
              {
                icon: <Zap className="w-5 h-5 text-yellow-300" />,
                title: 'Instant Updates',
                desc: 'Changes made in the dashboard are instantly reflected in the customer catalog.',
                color: 'from-yellow-500/20 to-yellow-600/10',
              },
              {
                icon: <Car className="w-5 h-5 text-orange-300" />,
                title: 'Compatibility Info',
                desc: 'Tag every part with car make, model, and year so customers find exactly what fits their vehicle.',
                color: 'from-orange-500/20 to-orange-600/10',
              },
            ].map(({ icon, title, desc, color }) => (
              <div
                key={title}
                className={`bg-gradient-to-br ${color} border border-white/10 rounded-2xl p-6 text-left hover:border-white/20 transition-all duration-200`}
              >
                <div className="bg-white/10 rounded-xl w-10 h-10 flex items-center justify-center mb-4">
                  {icon}
                </div>
                <h3 className="text-white font-bold text-base mb-2">{title}</h3>
                <p className="text-blue-200/70 text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* CTA Footer */}
      <section className="border-t border-white/10 px-6 py-16 text-center">
        <div className="max-w-2xl mx-auto">
          <h3 className="text-3xl font-extrabold text-white mb-4">Ready to get started?</h3>
          <p className="text-blue-200/70 mb-8">Jump straight into the staff dashboard or explore the customer catalog.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/dashboard"
              className="bg-blue-500 hover:bg-blue-400 text-white font-bold px-8 py-3.5 rounded-xl transition-all duration-200 shadow-lg shadow-blue-500/30"
            >
              Go to Dashboard
            </Link>
            <Link
              href="/catalog"
              className="bg-white/10 border border-white/20 text-white font-bold px-8 py-3.5 rounded-xl hover:bg-white/20 transition-all duration-200"
            >
              View Catalog
            </Link>
          </div>
        </div>
      </section>

      {/* Footer bar */}
      <footer className="border-t border-white/10 px-6 py-5">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <div className="bg-blue-500 rounded-lg p-1.5">
              <Car className="w-3.5 h-3.5 text-white" />
            </div>
            <span className="text-white/60 text-sm font-medium">AutoParts Pro</span>
          </div>
          <p className="text-white/30 text-xs">© {new Date().getFullYear()} AutoParts Pro. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
