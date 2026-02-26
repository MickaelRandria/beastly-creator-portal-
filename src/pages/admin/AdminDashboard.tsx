import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { Zap, ScanLine, Users } from 'lucide-react';
import { mockInfluencers, mockEvent } from '../../lib/mockData';
import { GlowLightning } from '../../components/BeastlyIcons';

function getStatusKey(influencerId: string) {
  return `beastly_scan_${influencerId}`;
}

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [statuses, setStatuses] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const result: Record<string, boolean> = {};
    mockInfluencers.forEach(inf => {
      result[inf.id] = localStorage.getItem(getStatusKey(inf.id)) === 'scanned';
    });
    setStatuses(result);
  }, []);

  const presentCount = Object.values(statuses).filter(Boolean).length;

  return (
    <div className="min-h-screen bg-beastly-dark relative overflow-x-hidden">
      <GlowLightning className="absolute -top-10 -right-10 opacity-10 pointer-events-none" size={250} color="#b4ff00" />

      {/* Header */}
      <div className="px-5 pt-8 pb-4 flex items-center justify-between relative z-10">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-beastly-beige rounded-full flex items-center justify-center">
            <Zap className="text-beastly-dark fill-beastly-dark" size={16} />
          </div>
          <div>
            <span className="text-lg font-black text-beastly-beige">Beastly Admin</span>
            <p className="text-[9px] font-extrabold uppercase tracking-widest text-beastly-beige/30 -mt-0.5">OPS Dashboard</p>
          </div>
        </div>
        <button
          onClick={() => navigate('/admin/scan')}
          className="flex items-center gap-2 px-4 py-2.5 bg-beastly-green text-beastly-dark rounded-full text-sm font-extrabold uppercase tracking-wider hover:brightness-110 transition-all"
        >
          <ScanLine size={15} />
          Scanner QR
        </button>
      </div>

      <div className="px-5 pb-10 space-y-5 max-w-lg mx-auto relative z-10">
        {/* Event info */}
        <div className="p-6 bg-beastly-beige rounded-2xl space-y-2">
          <p className="text-[10px] font-extrabold uppercase tracking-wider text-beastly-dark/40">Événement en cours</p>
          <h1 className="text-2xl font-black text-beastly-dark">{mockEvent.name}</h1>
          <p className="text-sm font-bold text-beastly-dark/50">{mockEvent.brand} · {mockEvent.date}</p>
        </div>

        {/* KPI counter */}
        <div className="p-6 bg-beastly-beige/10 border border-beastly-beige/10 rounded-2xl flex items-center gap-4">
          <div className="w-12 h-12 bg-beastly-green/20 rounded-full flex items-center justify-center">
            <Users size={20} className="text-beastly-green" />
          </div>
          <div>
            <p className="text-3xl font-black text-beastly-beige">
              {presentCount}
              <span className="text-xl text-beastly-beige/30">/{mockInfluencers.length}</span>
            </p>
            <p className="text-xs font-extrabold uppercase tracking-wider text-beastly-beige/40">présents</p>
          </div>
        </div>

        {/* Influencer list */}
        <div className="space-y-3">
          <p className="text-[10px] font-extrabold uppercase tracking-wider text-beastly-beige/40 px-1">Influenceurs invités</p>
          {mockInfluencers.map((inf, i) => {
            const isPresent = statuses[inf.id];
            return (
              <motion.div
                key={inf.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.07 }}
                className="p-4 bg-beastly-beige rounded-2xl flex items-center gap-4"
              >
                <img
                  src={inf.profilePicture}
                  alt={inf.firstName}
                  className="w-12 h-12 rounded-full object-cover bg-beastly-dark shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <p className="font-black text-beastly-dark text-sm">
                    {inf.firstName} {inf.lastName}
                  </p>
                  <p className="text-[11px] font-bold text-beastly-dark/50">{inf.instagramHandle}</p>
                </div>
                <span className={`flex items-center gap-1.5 text-[11px] font-extrabold px-3 py-1.5 rounded-full ${
                  isPresent
                    ? 'bg-beastly-green/20 text-beastly-dark'
                    : 'bg-beastly-dark/10 text-beastly-dark/50'
                }`}>
                  {isPresent ? '🟢 Présent' : '🟡 Invité'}
                </span>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
