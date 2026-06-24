import React, { useState } from "react";
import { Link, Outlet, NavLink } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { cn } from "../lib/utils";
import { CookieBanner } from "./CookieBanner";

export const Layout: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: "Dashboard", path: "/" },
    { name: "Soil Test", path: "/test" },
    { name: "Recommendation", path: "/recommend" },
    { name: "Removal", path: "/removal" },
    { name: "Compare", path: "/compare" },
    { name: "Lime", path: "/lime" },
    { name: "Favorites", path: "/favorites" },
  ];

  return (
    <div className="min-h-screen bg-[#F4F5F2] font-sans text-slate-800 flex flex-col">
      <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:p-4 focus:bg-[#1B2A1E] focus:text-white top-0 left-0">
        Skip to main content
      </a>
      <CookieBanner />
      {/* Header */}
      <header className="sticky top-0 z-40 w-full bg-[#1B2A1E] text-white border-b-4 border-[#8B7355]">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-6">
            <Link to="/" className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-sm bg-[#4C7C44] text-white font-bold text-xl border border-white/20">
                S
              </div>
              <div className="flex flex-col">
                <h1 className="text-lg font-bold leading-none tracking-tight uppercase">
                  Soil <span className="text-[#A9C4A4] font-normal">Fertility Hub</span>
                </h1>
                <span className="text-[10px] text-slate-400 uppercase tracking-widest mt-1">
                  A Rural Utility Cost Application
                </span>
              </div>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden md:flex flex-wrap items-center gap-4 ml-6 h-full mt-2" aria-label="Main navigation">
              {navLinks.map((link) => (
                <NavLink
                  key={link.name}
                  to={link.path}
                  className={({ isActive }) =>
                    cn(
                      "text-xs font-semibold uppercase tracking-wider pb-1 border-b-2 transition-colors min-h-[32px] flex items-center",
                      isActive
                        ? "text-[#A9C4A4] border-[#A9C4A4]"
                        : "text-slate-400 hover:text-white border-transparent"
                    )
                  }
                >
                  {link.name}
                </NavLink>
              ))}
            </nav>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center md:hidden">
            <button
              type="button"
              className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-slate-400 hover:text-white min-h-[48px] min-w-[48px]"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-menu"
              aria-label="Toggle main menu"
            >
              {mobileMenuOpen ? (
                <X className="h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <nav id="mobile-menu" className="md:hidden border-b-4 border-[#8B7355] bg-[#1B2A1E] px-4 pt-2 pb-4 shadow-sm" aria-label="Mobile navigation">
          <div className="space-y-2">
            {navLinks.map((link) => (
              <NavLink
                key={link.name}
                to={link.path}
                onClick={() => setMobileMenuOpen(false)}
                className={({ isActive }) =>
                  cn(
                    "block px-3 py-3 text-xs font-semibold uppercase tracking-wider min-h-[48px]",
                    isActive
                      ? "text-[#A9C4A4] bg-white/5"
                      : "text-slate-400 hover:text-white hover:bg-white/5"
                  )
                }
              >
                {link.name}
              </NavLink>
            ))}
          </div>
        </nav>
      )}

      {/* Main Content */}
      <main className="flex-1" id="main-content">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <Outlet />
        </div>
      </main>

      {/* Shared Footer */}
      <footer className="mt-auto border-t border-slate-200 pt-6 pb-12 bg-[#F4F5F2]" role="contentinfo">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <h2 className="text-[10px] font-bold uppercase text-slate-400 mb-2">Disclaimer & Reliability</h2>
            <p className="text-[10px] leading-relaxed text-slate-500 md:pr-12">
              All calculations are estimates. Results should be verified with local agronomic guidance, soil labs, and current product labels. This tool does not replace professional agronomic consultation or state-specific regulatory requirements for nutrient management.
            </p>
          </div>
          <div className="flex flex-col gap-2">
            <h2 className="text-[10px] font-bold uppercase text-slate-400 mb-1">Ecosystem Links</h2>
            <Link to="/about" className="text-[10px] text-[#4C7C44] font-semibold hover:underline min-h-[32px] flex items-center">About Rural Utility Cost</Link>
            <Link to="/contact" className="text-[10px] text-[#4C7C44] font-semibold hover:underline min-h-[32px] flex items-center">Contact Network</Link>
            <a href="https://ruralutilitycost.com" target="_blank" rel="noreferrer" className="text-[10px] text-[#4C7C44] font-semibold hover:underline min-h-[32px] flex items-center">Rural Utility Cost Home</a>
          </div>
          <div className="flex flex-col gap-2">
            <h2 className="text-[10px] font-bold uppercase text-slate-400 mb-1">Compliance</h2>
            <div className="flex flex-col gap-2">
              <Link to="/legal" className="text-[10px] text-slate-500 hover:text-slate-900 min-h-[32px] flex items-center">Terms / Legal</Link>
              <Link to="/license" className="text-[10px] text-slate-500 hover:text-slate-900 min-h-[32px] flex items-center">License</Link>
              <a href="https://github.com/ruralutilitycost" target="_blank" rel="noreferrer" className="text-[10px] text-slate-500 hover:text-slate-900 min-h-[32px] flex items-center">GitHub</a>
            </div>
            <p className="text-[9px] text-slate-400 mt-2 italic font-mono" aria-label="Version">v2.4.0-SOIL (RUC-NETWORK)</p>
          </div>
        </div>
      </footer>
    </div>
  );
};
