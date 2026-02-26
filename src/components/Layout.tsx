import React from 'react';
import Sidebar from './Sidebar';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft } from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export default function Layout({ children, activeTab, setActiveTab }: LayoutProps) {
  const isHome = activeTab === 'dashboard';

  return (
    <div className="min-h-screen bg-beastly-dark flex">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

      <main className="flex-1 lg:ml-72 p-5 lg:p-10">
        <div className="w-full max-w-[1400px] mx-auto">
          {/* Top Bar */}
          <div className="flex items-center justify-between mb-10">
            {!isHome ? (
              <button
                onClick={() => setActiveTab('dashboard')}
                className="flex items-center gap-2 px-5 py-2.5 bg-beastly-beige rounded-full text-sm font-bold text-beastly-dark hover:bg-beastly-beige/80 transition-colors group"
              >
                <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
                Retour
              </button>
            ) : (
              <div>
                <p className="text-sm font-bold text-beastly-beige/40">Beastly OPS</p>
                <h1 className="text-3xl font-black text-beastly-beige">Dashboard</h1>
              </div>
            )}

            <div className="flex items-center gap-3">
              <div className="px-4 py-2 rounded-full bg-beastly-beige/10 border border-beastly-beige/10">
                <span className="text-xs font-bold text-beastly-beige/60">
                  {new Date().toLocaleDateString('fr-FR', { weekday: 'long', month: 'short', day: 'numeric' })}
                </span>
              </div>
            </div>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.35, ease: [0.23, 1, 0.32, 1] }}
            >
              {children}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}
