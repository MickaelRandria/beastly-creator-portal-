import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { Calendar, MapPin, Clock, Shirt, ChevronRight, Zap } from 'lucide-react';
import { getInfluencerByToken, mockEvent } from '../../lib/mockData';
import { BeastlyDocument, BeastlyCursor, BeastlyEye, BeastlyMegaphone, GlowLightning } from '../../components/BeastlyIcons';

const navCards = [
  {
    id: 'brief',
    emoji: '📋',
    label: 'Brief',
    sub: 'Objectifs & checklist',
    Icon: () => <BeastlyDocument size={36} bg="green" />,
    badge: 'À lire',
    badgeCls: 'bg-beastly-orange text-beastly-dark',
  },
  {
    id: 'assets',
    emoji: '📦',
    label: 'Assets',
    sub: 'Ressources créatives',
    Icon: () => <BeastlyCursor size={36} bg="blue" />,
    badge: `${mockEvent.assets.length} assets`,
    badgeCls: 'bg-beastly-dark/10 text-beastly-dark/60',
  },
  {
    id: 'qrcode',
    emoji: '🎫',
    label: 'QR Code',
    sub: 'Mon pass d\'accès',
    Icon: () => <BeastlyEye size={36} bg="orange" />,
    badge: null,
    badgeCls: '',
  },
  {
    id: 'upload',
    emoji: '📤',
    label: 'Dépôt',
    sub: 'Envoyer mes contenus',
    Icon: () => <BeastlyMegaphone size={36} bg="green" />,
    badge: null,
    badgeCls: '',
  },
];

export default function EventDashboard() {
  const { token } = useParams<{ token: string }>();
  const navigate = useNavigate();
  const influencer = token ? getInfluencerByToken(token) : null;

  if (!influencer) {
    return (
      <div className="min-h-screen bg-beastly-dark flex items-center justify-center">
        <p className="text-beastly-beige/40 font-bold">Token invalide</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-beastly-dark">
      {/* Header */}
      <div className="px-5 pt-8 pb-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-beastly-beige rounded-full flex items-center justify-center">
            <Zap className="text-beastly-dark fill-beastly-dark" size={16} />
          </div>
          <span className="text-lg font-black text-beastly-beige">Beastly</span>
        </div>
        <div className="flex items-center gap-2.5">
          <span className="text-sm font-bold text-beastly-beige/60">{influencer.firstName}</span>
          <img
            src={influencer.profilePicture}
            alt={influencer.firstName}
            className="w-9 h-9 rounded-full ring-2 ring-beastly-green object-cover bg-beastly-beige"
          />
        </div>
      </div>

      <div className="px-5 pb-10 space-y-5 max-w-lg mx-auto">
        {/* Welcome */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <h1 className="text-3xl font-black text-beastly-beige mt-2">Ton espace 👋</h1>
          <p className="text-sm font-bold text-beastly-beige/40 mt-1">{influencer.instagramHandle}</p>
        </motion.div>

        {/* Event recap card */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.08 }}
          className="p-6 bg-beastly-beige rounded-2xl relative overflow-hidden"
        >
          <div className="relative z-10 space-y-4">
            <div className="flex items-start justify-between">
              <div>
                <span className="text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-1 rounded-full bg-beastly-green text-beastly-dark">
                  Invitation confirmée ✓
                </span>
                <h2 className="text-xl font-black text-beastly-dark mt-2 leading-tight">{mockEvent.name}</h2>
                <p className="text-sm font-bold text-beastly-dark/50">{mockEvent.brand}</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div className="flex items-center gap-2 text-xs font-extrabold text-beastly-dark/60">
                <Calendar size={12} /> {mockEvent.date}
              </div>
              <div className="flex items-center gap-2 text-xs font-extrabold text-beastly-dark/60">
                <Clock size={12} /> {mockEvent.time}
              </div>
              <div className="flex items-center gap-2 text-xs font-extrabold text-beastly-dark/60 col-span-2">
                <MapPin size={12} /> {mockEvent.location}
              </div>
              <div className="flex items-center gap-2 text-xs font-extrabold text-beastly-dark/60 col-span-2">
                <Shirt size={12} /> {mockEvent.dressCode}
              </div>
            </div>
          </div>
          <GlowLightning className="absolute -right-6 -bottom-6 opacity-10 pointer-events-none" size={140} color="#b4ff00" />
        </motion.div>

        {/* Nav grid 2x2 */}
        <div className="grid grid-cols-2 gap-3">
          {navCards.map((card, i) => (
            <motion.button
              key={card.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.12 + i * 0.06 }}
              onClick={() => navigate(`/event/${token}/${card.id}`)}
              className="p-5 bg-beastly-beige rounded-2xl flex flex-col gap-3 text-left hover:brightness-95 transition-all active:scale-[0.98] group relative overflow-hidden"
            >
              <div className="flex items-start justify-between">
                <card.Icon />
                {card.badge && (
                  <span className={`text-[9px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded-full ${card.badgeCls}`}>
                    {card.badge}
                  </span>
                )}
              </div>
              <div>
                <p className="font-black text-beastly-dark text-base">{card.label}</p>
                <p className="text-[11px] font-bold text-beastly-dark/50 mt-0.5 leading-tight">{card.sub}</p>
              </div>
              <ChevronRight size={14} className="text-beastly-dark/30 absolute bottom-4 right-4 group-hover:translate-x-0.5 transition-transform" />
            </motion.button>
          ))}
        </div>
      </div>
    </div>
  );
}
