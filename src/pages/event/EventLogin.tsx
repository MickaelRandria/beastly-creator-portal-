import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Zap, X, ChevronRight } from 'lucide-react';

// Comptes mockés associés aux influenceurs
const MOCK_ACCOUNTS = [
  {
    token: 'lea-abc123',
    name: 'Léa Martin',
    email: 'lea.martin@gmail.com',
    avatar: 'https://i.pravatar.cc/150?img=47',
  },
  {
    token: 'hugo-def456',
    name: 'Hugo Durand',
    email: 'hugo.durand@gmail.com',
    avatar: 'https://i.pravatar.cc/150?img=12',
  },
  {
    token: 'sarah-ghi789',
    name: 'Sarah Benali',
    email: 'sarah.benali@gmail.com',
    avatar: 'https://i.pravatar.cc/150?img=32',
  },
];

// SVG logo Google officiel
function GoogleLogo({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
        fill="#4285F4"
      />
      <path
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
        fill="#34A853"
      />
      <path
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
        fill="#FBBC05"
      />
      <path
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
        fill="#EA4335"
      />
    </svg>
  );
}

// Modal account picker style Google
function AccountPickerModal({
  onSelect,
  onClose,
}: {
  onSelect: (token: string) => void;
  onClose: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.92, y: 16 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.92, y: 16 }}
        transition={{ duration: 0.22, ease: [0.23, 1, 0.32, 1] }}
        className="w-full max-w-sm bg-white rounded-2xl shadow-[0_24px_80px_rgba(0,0,0,0.4)] overflow-hidden"
        onClick={e => e.stopPropagation()}
      >
        {/* Header Google */}
        <div className="px-6 pt-8 pb-4 text-center border-b border-gray-100">
          <div className="flex justify-center mb-5">
            <GoogleLogo size={24} />
          </div>
          <h2 className="text-[22px] font-normal text-gray-800 mb-1">Choisir un compte</h2>
          <p className="text-sm text-gray-500">pour continuer sur <span className="font-medium text-gray-700">creator.beastly.app</span></p>
        </div>

        {/* Accounts list */}
        <div className="py-2">
          {MOCK_ACCOUNTS.map(account => (
            <button
              key={account.token}
              onClick={() => onSelect(account.token)}
              className="w-full flex items-center gap-4 px-6 py-3.5 hover:bg-gray-50 transition-colors text-left"
            >
              <img
                src={account.avatar}
                alt={account.name}
                className="w-10 h-10 rounded-full object-cover shrink-0"
              />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-800 truncate">{account.name}</p>
                <p className="text-sm text-gray-500 truncate">{account.email}</p>
              </div>
              <ChevronRight size={16} className="text-gray-400 shrink-0" />
            </button>
          ))}

          {/* Divider */}
          <div className="border-t border-gray-100 my-2" />

          {/* Add account (non-functional, just déco) */}
          <button className="w-full flex items-center gap-4 px-6 py-3.5 hover:bg-gray-50 transition-colors opacity-60 cursor-not-allowed">
            <div className="w-10 h-10 rounded-full border-2 border-dashed border-gray-300 flex items-center justify-center shrink-0">
              <span className="text-lg text-gray-400 leading-none">+</span>
            </div>
            <p className="text-sm text-gray-700">Utiliser un autre compte</p>
          </button>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-gray-100 bg-gray-50 flex items-center justify-between">
          <a href="#" className="text-xs text-blue-600 hover:underline" onClick={e => e.preventDefault()}>Conditions d'utilisation</a>
          <a href="#" className="text-xs text-blue-600 hover:underline" onClick={e => e.preventDefault()}>Confidentialité</a>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function EventLogin() {
  const navigate = useNavigate();
  const [showPicker, setShowPicker] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSelect = (token: string) => {
    setShowPicker(false);
    setLoading(true);
    // Simule le temps de chargement OAuth
    setTimeout(() => {
      localStorage.setItem('beastly_token', token);
      navigate(`/event/${token}`);
    }, 800);
  };

  return (
    <div className="min-h-screen bg-beastly-dark flex flex-col items-center justify-center p-6 relative overflow-hidden">
      {/* Glows décoratifs */}
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-beastly-green/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-beastly-orange/10 rounded-full blur-3xl pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
        className="w-full max-w-sm flex flex-col items-center gap-8 relative z-10"
      >
        {/* Logo Beastly */}
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-beastly-beige rounded-full flex items-center justify-center">
            <Zap className="text-beastly-dark fill-beastly-dark" size={22} />
          </div>
          <div>
            <span className="text-2xl font-black tracking-tight text-beastly-beige">Beastly</span>
            <p className="text-[9px] font-extrabold uppercase tracking-widest text-beastly-beige/40 -mt-0.5">Creator Portal</p>
          </div>
        </div>

        {/* Card login */}
        <div className="w-full bg-beastly-beige/5 border border-beastly-beige/10 rounded-3xl p-8 space-y-6">
          <div className="text-center space-y-2">
            <h1 className="text-2xl font-black text-beastly-beige leading-tight">
              Accède à ton<br />espace créateur
            </h1>
            <p className="text-sm font-bold text-beastly-beige/50">
              Connecte-toi pour consulter tes invitations et contenus de campagne.
            </p>
          </div>

          {/* Bouton Google SSO */}
          <button
            onClick={() => setShowPicker(true)}
            disabled={loading}
            className="w-full flex items-center justify-center gap-3 px-5 py-3.5 bg-white rounded-xl font-medium text-gray-700 text-sm hover:bg-gray-50 active:bg-gray-100 transition-all shadow-sm border border-gray-200 disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {loading ? (
              <div className="w-5 h-5 border-2 border-gray-300 border-t-blue-500 rounded-full animate-spin" />
            ) : (
              <GoogleLogo size={20} />
            )}
            {loading ? 'Connexion en cours…' : 'Continuer avec Google'}
          </button>

          {/* Ou séparateur */}
          <div className="flex items-center gap-3">
            <div className="flex-1 h-px bg-beastly-beige/10" />
            <span className="text-[11px] font-bold text-beastly-beige/25 uppercase tracking-widest">ou</span>
            <div className="flex-1 h-px bg-beastly-beige/10" />
          </div>

          {/* Lien token direct (pour les tests) */}
          <div className="space-y-2">
            <p className="text-[10px] font-extrabold uppercase tracking-widest text-beastly-beige/30 text-center">
              Accès par lien d'invitation
            </p>
            <div className="grid grid-cols-3 gap-2">
              {MOCK_ACCOUNTS.map(account => (
                <button
                  key={account.token}
                  onClick={() => handleSelect(account.token)}
                  className="flex flex-col items-center gap-1.5 p-2.5 bg-beastly-beige/5 border border-beastly-beige/10 rounded-xl hover:border-beastly-green/30 hover:bg-beastly-green/5 transition-all"
                >
                  <img
                    src={account.avatar}
                    alt={account.name}
                    className="w-8 h-8 rounded-full object-cover"
                  />
                  <span className="text-[9px] font-extrabold text-beastly-beige/60 leading-tight text-center truncate w-full">
                    {account.name.split(' ')[0]}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>

        <p className="text-[11px] font-bold text-beastly-beige/25 text-center">
          En te connectant, tu acceptes les CGU Beastly
        </p>
      </motion.div>

      {/* Modal account picker */}
      <AnimatePresence>
        {showPicker && (
          <AccountPickerModal
            onSelect={handleSelect}
            onClose={() => setShowPicker(false)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
