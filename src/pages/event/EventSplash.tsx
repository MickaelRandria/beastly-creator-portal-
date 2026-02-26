import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { Zap, Calendar, MapPin, ArrowRight } from 'lucide-react';
import { getInfluencerByToken, mockEvent } from '../../lib/mockData';
import { GlowLightning } from '../../components/BeastlyIcons';

export default function EventSplash() {
  const { token } = useParams<{ token: string }>();
  const navigate = useNavigate();
  const influencer = token ? getInfluencerByToken(token) : null;

  useEffect(() => {
    if (token) {
      localStorage.setItem('beastly_token', token);
    }
  }, [token]);

  if (!influencer) {
    return (
      <div className="min-h-screen bg-beastly-dark flex items-center justify-center p-6">
        <div className="text-center space-y-4">
          <div className="w-16 h-16 bg-beastly-beige/10 rounded-full flex items-center justify-center mx-auto">
            <Zap size={28} className="text-beastly-beige/40" />
          </div>
          <h1 className="text-2xl font-black text-beastly-beige">Lien invalide</h1>
          <p className="text-sm font-bold text-beastly-beige/40">Ce lien d'invitation n'existe pas ou a expiré.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-beastly-dark flex flex-col items-center justify-center p-6 relative overflow-hidden">
      {/* Decorative glows */}
      <GlowLightning className="absolute -top-10 -left-10 opacity-20 pointer-events-none" size={300} color="#b4ff00" />
      <GlowLightning className="absolute -bottom-20 -right-10 opacity-10 pointer-events-none rotate-180" size={300} color="#fc846d" />

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
        className="w-full max-w-sm flex flex-col items-center gap-8 relative z-10"
      >
        {/* Logo */}
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-beastly-beige rounded-full flex items-center justify-center">
            <Zap className="text-beastly-dark fill-beastly-dark" size={22} />
          </div>
          <div>
            <span className="text-2xl font-black tracking-tight text-beastly-beige">Beastly</span>
            <p className="text-[9px] font-extrabold uppercase tracking-widest text-beastly-beige/40 -mt-0.5">Creator Portal</p>
          </div>
        </div>

        {/* Welcome card */}
        <div className="w-full p-8 bg-beastly-beige rounded-3xl space-y-6 text-center">
          {/* Avatar */}
          <div className="flex justify-center">
            <div className="w-20 h-20 rounded-full overflow-hidden ring-4 ring-beastly-green">
              <img
                src={influencer.profilePicture}
                alt={influencer.firstName}
                className="w-full h-full object-cover bg-beastly-dark"
              />
            </div>
          </div>

          <div className="space-y-2">
            <h1 className="text-3xl font-black text-beastly-dark">
              Bienvenue {influencer.firstName} 👋
            </h1>
            <p className="text-base font-bold text-beastly-dark/60">
              Tu es invité(e) à
            </p>
            <p className="text-xl font-black text-beastly-dark leading-tight">
              ✨ {mockEvent.name} ✨
            </p>
          </div>

          {/* Event details */}
          <div className="space-y-2.5">
            <div className="flex items-center justify-center gap-2 text-sm font-bold text-beastly-dark/70">
              <Calendar size={14} className="text-beastly-dark/50 shrink-0" />
              <span>{mockEvent.date} · {mockEvent.time}</span>
            </div>
            <div className="flex items-center justify-center gap-2 text-sm font-bold text-beastly-dark/70">
              <MapPin size={14} className="text-beastly-dark/50 shrink-0" />
              <span>{mockEvent.location}</span>
            </div>
          </div>

          {/* CTA */}
          <button
            onClick={() => navigate(`/event/${token}/rsvp`)}
            className="w-full py-4 bg-beastly-dark text-beastly-green rounded-full font-extrabold text-sm uppercase tracking-wider flex items-center justify-center gap-2 hover:bg-beastly-dark/80 transition-all group"
          >
            Accéder à mon espace
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        <p className="text-[11px] font-bold text-beastly-beige/30 text-center">
          {influencer.instagramHandle} · {mockEvent.brand} × Beastly
        </p>
      </motion.div>
    </div>
  );
}
