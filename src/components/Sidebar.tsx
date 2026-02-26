import React, { useState } from 'react';
import { Menu, X, Zap } from 'lucide-react';
import { BeastlyEye, BeastlyDocument, BeastlyMegaphone, BeastlyDollar, BeastlyCursor, BeastlySmiley } from './BeastlyIcons';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const navItems = [
  { id: 'dashboard', label: 'Dashboard', Icon: () => <BeastlyEye size={28} bg="green" /> },
  { id: 'events', label: 'Briefs & Invitations', Icon: () => <BeastlyMegaphone size={28} bg="orange" /> },
  { id: 'creators', label: 'Sourcing Créateurs', Icon: () => <BeastlySmiley size={28} bg="blue" /> },
  { id: 'contents', label: 'Contenus déposés', Icon: () => <BeastlyDocument size={28} bg="green" /> },
  { id: 'admin', label: 'Administratif', Icon: () => <BeastlyDollar size={28} bg="orange" /> },
  { id: 'assetbox', label: 'Asset Box', Icon: () => <BeastlyCursor size={28} bg="blue" /> },
  { id: 'trends', label: 'Tendances & Veilles', Icon: () => <BeastlyEye size={28} bg="green" /> },
];

export default function Sidebar({ activeTab, setActiveTab }: SidebarProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Mobile toggle */}
      <div className="lg:hidden fixed top-4 left-4 z-[60]">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-11 h-11 bg-beastly-beige text-beastly-dark rounded-full flex items-center justify-center"
        >
          {isOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {isOpen && (
        <div className="lg:hidden fixed inset-0 bg-black/60 z-40" onClick={() => setIsOpen(false)} />
      )}

      <aside
        className={[
          "fixed inset-y-0 left-0 z-40 w-72 bg-beastly-beige flex flex-col transition-transform duration-300 ease-in-out lg:translate-x-0",
          isOpen ? "translate-x-0" : "-translate-x-full"
        ].join(' ')}
      >
        {/* Logo */}
        <div className="p-8 pb-6">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 bg-beastly-dark rounded-full flex items-center justify-center">
              <Zap className="text-beastly-green fill-beastly-green" size={20} />
            </div>
            <div>
              <span className="text-2xl font-black tracking-tight text-beastly-dark">Beastly Event</span>
              <p className="text-[9px] font-extrabold uppercase tracking-widest text-beastly-dark/40 -mt-0.5">
                OPS Portal — Interne
              </p>
            </div>
          </div>
        </div>

        {/* Nav Label */}
        <div className="px-8 pb-3">
          <p className="text-[11px] font-extrabold uppercase tracking-[0.2em] text-beastly-dark/40">Navigation</p>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-5 space-y-1 overflow-y-auto">
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id);
                  setIsOpen(false);
                }}
                className={[
                  "w-full flex items-center gap-3.5 px-3 py-2.5 rounded-2xl transition-all duration-200",
                  isActive
                    ? "bg-beastly-dark text-beastly-beige"
                    : "text-beastly-dark/70 hover:text-beastly-dark hover:bg-beastly-dark/5"
                ].join(' ')}
              >
                <div className="shrink-0">
                  <item.Icon />
                </div>
                <span className="font-bold text-sm text-left">{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Profile */}
        <div className="p-5">
          <div className="p-4 bg-beastly-dark rounded-2xl flex items-center gap-3">
            <img src="https://api.dicebear.com/7.x/adventurer/svg?seed=OPS" alt="OPS" className="w-10 h-10 rounded-full bg-beastly-beige" />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-extrabold text-beastly-beige">Beastly OPS</p>
              <p className="text-[10px] font-bold text-beastly-beige/40 uppercase tracking-widest">Responsable Events</p>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
