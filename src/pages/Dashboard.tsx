import React, { useState } from 'react';
import eventsData from '../data/events.json';
import contentsData from '../data/contents.json';
import creatorsData from '../data/creators.json';
import { AreaChart, Area, ResponsiveContainer } from 'recharts';
import { Calendar, CheckCircle2, Upload, ChevronRight, BarChart3, ArrowUpRight, MapPin, FileText, UploadCloud, BrainCircuit, Loader2, Sparkles, Users, TrendingUp } from 'lucide-react';
import { GlowLightning, GlowEye, GlowArrow, BeastlyEye, BeastlySmiley, BeastlyDocument } from '../components/BeastlyIcons';
import AnimatedCounter from '../components/AnimatedCounter';
import { Brief } from '../types';

interface DashboardProps {
  onNavigate: (tab: string) => void;
  activeBrief: Brief | null;
  setActiveBrief: (brief: Brief | null) => void;
}

const engagementData = [
  { v: 1200 }, { v: 1800 }, { v: 1400 }, { v: 2200 }, { v: 2800 }, { v: 2400 }, { v: 3100 },
];

export default function Dashboard({ onNavigate, activeBrief, setActiveBrief }: DashboardProps) {
  const [agentState, setAgentState] = useState<'idle' | 'uploading' | 'extracting' | 'complete'>('idle');

  const handleUpload = () => {
    setAgentState('uploading');
    setTimeout(() => {
      setAgentState('extracting');
      setTimeout(() => {
        setAgentState('complete');
        setActiveBrief({
          brand: 'Jacquemus',
          campaignName: 'Soirée Lancement AW25',
          targetReach: 350000,
          targetEMV: 5000,
          budget: 15000,
          niche: 'Mode / Luxe',
          dates: '15 Mars - 20 Mars 2025',
          deliverables: ['1× Reel Instagram (30-60s)', '3× Stories Instagram', 'Hashtags: #Jacquemus #AW25 #Beastly']
        });
        setTimeout(() => setAgentState('idle'), 2000); // Reset for visual after completion
      }, 3000);
    }, 1500);
  };
  const events = eventsData;
  const contents = contentsData;

  const activeEvents = events.filter(e => e.status === 'Active');
  const totalConfirmed = events.reduce((a, e) => a + e.confirmedCount, 0);
  const pendingContents = contents.filter(c => c.status === 'Pending').length;
  const nextEvent = events.find(e => e.status === 'Active' || e.status === 'Upcoming');

  return (
    <div className="grid grid-cols-1 md:grid-cols-12 gap-5 auto-rows-min">

      {/* KPI Cards */}
      <div className="md:col-span-4 p-7 bg-beastly-beige rounded-2xl flex flex-col justify-between min-h-[180px] relative overflow-hidden group cursor-pointer" onClick={() => onNavigate('events')}>
        <div className="flex items-center justify-between">
          <BeastlyEye size={40} bg="green" />
          <span className="text-[11px] font-extrabold text-beastly-dark/40 uppercase tracking-[0.15em]">En cours</span>
        </div>
        <div className="mt-auto relative z-10">
          <p className="text-[11px] font-extrabold uppercase tracking-[0.15em] text-beastly-dark/40 mb-1">Événements actifs</p>
          <p className="text-5xl font-black text-beastly-dark"><AnimatedCounter value={activeEvents.length} duration={1000} /></p>
        </div>
        <GlowLightning className="absolute -right-4 -bottom-4 opacity-15 group-hover:opacity-25 transition-opacity duration-700 pointer-events-none" size={100} color="#b4ff00" />
      </div>

      <div className="md:col-span-4 p-7 bg-beastly-beige rounded-2xl flex flex-col justify-between min-h-[180px] relative overflow-hidden group cursor-pointer" onClick={() => onNavigate('creators')}>
        <div className="flex items-center justify-between">
          <BeastlySmiley size={40} bg="orange" />
          <span className="text-[11px] font-extrabold text-beastly-dark/40 uppercase tracking-[0.15em]">{creatorsData.length} dans la BDD</span>
        </div>
        <div className="mt-auto relative z-10">
          <p className="text-[11px] font-extrabold uppercase tracking-[0.15em] text-beastly-dark/40 mb-1">Créateurs confirmés</p>
          <p className="text-5xl font-black text-beastly-orange"><AnimatedCounter value={totalConfirmed} duration={1500} /></p>
        </div>
        <GlowEye className="absolute -right-4 -bottom-6 opacity-15 group-hover:opacity-25 transition-opacity duration-700 pointer-events-none" size={100} color="#fc846d" />
      </div>

      <div className="md:col-span-4 p-7 bg-beastly-beige rounded-2xl flex flex-col justify-between min-h-[180px] relative overflow-hidden group cursor-pointer" onClick={() => onNavigate('contents')}>
        <div className="flex items-center justify-between relative z-10">
          <BeastlyDocument size={40} bg="green" />
          <button className="w-9 h-9 bg-beastly-dark/10 rounded-full flex items-center justify-center hover:bg-beastly-dark/20 transition-colors">
            <ArrowUpRight size={16} className="text-beastly-dark" />
          </button>
        </div>
        <div className="mt-auto relative z-10">
          <p className="text-[11px] font-extrabold uppercase tracking-[0.15em] text-beastly-dark/40 mb-1">Contenus en attente</p>
          <p className="text-5xl font-black text-beastly-green"><AnimatedCounter value={pendingContents} duration={1800} /></p>
        </div>
        <GlowLightning className="absolute -right-4 -bottom-4 opacity-15 group-hover:opacity-25 transition-opacity duration-700 pointer-events-none" size={100} color="#b4ff00" />
      </div>

      {/* Agent 0: Master Brief Upload */}
      {!activeBrief && (
        <div className="md:col-span-12 p-8 bg-beastly-dark/80 backdrop-blur-xl border border-beastly-green/20 rounded-3xl relative overflow-hidden group">
          <GlowLightning className="absolute -left-10 -top-10 opacity-20 pointer-events-none" size={200} color="#b4ff00" />

          {agentState === 'idle' && (
            <div
              className="flex flex-col items-center justify-center border-2 border-dashed border-beastly-beige/10 hover:border-beastly-green/30 rounded-2xl p-10 cursor-pointer transition-colors relative z-10 bg-beastly-dark/50"
              onClick={handleUpload}
            >
              <div className="w-16 h-16 bg-beastly-green/10 rounded-full flex items-center justify-center mb-4">
                <UploadCloud size={32} className="text-beastly-green" />
              </div>
              <h3 className="text-xl font-black text-beastly-beige">Glissez-déposez le Brief Marque (PDF)</h3>
              <p className="text-sm font-bold text-beastly-beige/40 mt-2 text-center max-w-lg leading-relaxed">L'Agent 0 (Gemini 1.5 Pro) analysera le document pour créer la campagne, fixer les objectifs de performance et préparer le sourcing IA.</p>
            </div>
          )}

          {agentState === 'uploading' && (
            <div className="flex flex-col items-center justify-center py-12 space-y-4 relative z-10">
              <UploadCloud size={48} className="text-beastly-beige/30 animate-bounce" />
              <p className="text-sm font-extrabold uppercase tracking-widest text-beastly-beige/60">Upload du document en cours...</p>
            </div>
          )}

          {agentState === 'extracting' && (
            <div className="flex flex-col items-center justify-center py-10 space-y-6 max-w-lg mx-auto relative z-10">
              <div className="flex items-center gap-4 text-beastly-green">
                <BrainCircuit size={36} className="animate-pulse" />
                <h3 className="text-xl font-black uppercase tracking-wider">Agent 0 : Extraction Gemini 1.5 Pro</h3>
              </div>
              <div className="w-full space-y-3">
                <div className="flex justify-between text-[10px] font-extrabold uppercase tracking-wider text-beastly-beige/40">
                  <span>Analyse sémantique du PDF...</span>
                  <span className="text-beastly-green animate-pulse">Extraction des KPIs...</span>
                </div>
                <div className="w-full h-2 bg-beastly-dark/80 rounded-full overflow-hidden border border-white/5">
                  <div className="h-full bg-gradient-to-r from-beastly-green/50 to-beastly-green w-2/3 rounded-full animate-pulse relative">
                    <div className="absolute inset-0 bg-white/20 animate-pulse" />
                  </div>
                </div>
              </div>
            </div>
          )}

          {agentState === 'complete' && (
            <div className="flex flex-col items-center justify-center py-10 space-y-4 relative z-10">
              <div className="w-20 h-20 bg-beastly-green/20 rounded-full flex items-center justify-center shadow-[0_0_30px_rgba(202,240,65,0.2)]">
                <CheckCircle2 size={40} className="text-beastly-green" />
              </div>
              <h3 className="text-2xl font-black text-beastly-green">Brief extrait !</h3>
              <p className="text-sm font-bold text-beastly-beige/60">Le master brief a été digitalisé avec succès.</p>
            </div>
          )}
        </div>
      )}

      {/* Active Brief Summary (When Uploaded) */}
      {activeBrief && (
        <div className="md:col-span-12 p-6 md:p-8 bg-gradient-to-r from-beastly-dark to-beastly-green/5 border border-beastly-green/30 rounded-3xl relative overflow-hidden flex flex-col md:flex-row gap-8 items-center justify-between shadow-[0_0_40px_rgba(202,240,65,0.05)]">
          <div className="absolute top-0 right-0 w-64 h-64 bg-beastly-green/10 blur-3xl rounded-full translate-x-1/2 -translate-y-1/2" />

          <div className="flex items-center gap-5 z-10 w-full md:w-auto">
            <div className="p-4 bg-gradient-to-br from-beastly-green to-[#90cc00] rounded-2xl shadow-lg">
              <FileText size={32} className="text-beastly-dark" />
            </div>
            <div>
              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-beastly-green mb-1 flex items-center gap-1.5"><Sparkles size={10} /> Active Brief Master</p>
              <h2 className="text-2xl font-black text-beastly-beige leading-none mb-2">{activeBrief.campaignName}</h2>
              <p className="text-sm font-bold text-beastly-beige/50 bg-beastly-dark/50 inline-block px-3 py-1 rounded-full border border-white/5">{activeBrief.brand} • {activeBrief.niche}</p>
            </div>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 w-full lg:w-auto flex-1 z-10">
            <div className="bg-beastly-dark/80 p-4 rounded-2xl border border-white/5 backdrop-blur-xl">
              <p className="text-[9px] uppercase font-black tracking-widest text-beastly-beige/40 mb-1 flex items-center gap-1.5"><Users size={12} /> Target Reach</p>
              <p className="text-xl font-black text-beastly-green">{activeBrief.targetReach.toLocaleString('fr-FR')} <span className="text-sm text-beastly-green/50">vues</span></p>
            </div>
            <div className="bg-beastly-dark/80 p-4 rounded-2xl border border-white/5 backdrop-blur-xl">
              <p className="text-[9px] uppercase font-black tracking-widest text-beastly-beige/40 mb-1 flex items-center gap-1.5"><TrendingUp size={12} /> Target EMV</p>
              <p className="text-xl font-black text-beastly-blue">{activeBrief.targetEMV.toLocaleString('fr-FR')}€</p>
            </div>
            <div className="bg-beastly-dark/80 p-4 rounded-2xl border border-white/5 backdrop-blur-xl">
              <p className="text-[9px] uppercase font-black tracking-widest text-beastly-beige/40 mb-1 flex items-center gap-1.5"><Calendar size={12} /> Budget OPS</p>
              <p className="text-xl font-black text-beastly-beige">{activeBrief.budget.toLocaleString('fr-FR')}€</p>
            </div>
            <div className="flex flex-col justify-center h-full">
              <button onClick={() => onNavigate('creators')} className="w-full h-full py-3 bg-beastly-green text-beastly-dark hover:brightness-110 rounded-2xl text-xs font-extrabold uppercase tracking-wider transition-all flex justify-center items-center gap-2 group shadow-[0_0_20px_rgba(202,240,65,0.2)]">
                Sourcer l'IA <ArrowUpRight size={16} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Events list */}
      <div className="md:col-span-8 p-7 bg-beastly-beige rounded-2xl relative overflow-hidden">
        <div className="flex items-center justify-between mb-7">
          <h2 className="text-2xl font-black text-beastly-dark">Événements actifs</h2>
          <button onClick={() => onNavigate('events')} className="text-[11px] font-extrabold text-beastly-dark/40 uppercase tracking-[0.15em] hover:text-beastly-dark transition-colors flex items-center gap-1.5">
            Voir tout <ChevronRight size={14} />
          </button>
        </div>
        <div className="space-y-3 relative z-10">
          {activeEvents.map(ev => (
            <div
              key={ev.id}
              onClick={() => onNavigate('events')}
              className="group/item flex items-center gap-5 p-5 bg-beastly-dark/40 backdrop-blur-xl border border-white/5 rounded-2xl hover:bg-beastly-dark/60 transition-all cursor-pointer"
            >
              <div className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0" style={{ backgroundColor: (ev.color || '#b4ff00') + '20' }}>
                <Calendar size={20} style={{ color: ev.color || '#b4ff00' }} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-extrabold text-base text-beastly-beige">{ev.brand}</h3>
                  <span className="w-1 h-1 rounded-full bg-beastly-beige/20" />
                  <p className="text-sm font-bold text-beastly-beige/50 truncate">{ev.name}</p>
                </div>
                <div className="flex items-center gap-4">
                  <span className="flex items-center gap-1 text-[10px] font-extrabold text-beastly-beige/40 uppercase tracking-[0.1em]">
                    <Calendar size={10} /> {ev.date}
                  </span>
                  <span className="flex items-center gap-1 text-[10px] font-extrabold text-beastly-beige/40 uppercase tracking-[0.1em]">
                    <MapPin size={10} /> {ev.location}
                  </span>
                </div>
              </div>
              <div className="text-right shrink-0">
                <p className="font-black text-lg text-beastly-green">{ev.confirmedCount}<span className="text-sm font-bold text-beastly-beige/30">/{ev.invitedCount}</span></p>
                <p className="text-[10px] font-extrabold text-beastly-beige/30 uppercase tracking-[0.1em]">Confirmés</p>
              </div>
            </div>
          ))}
        </div>
        <GlowArrow className="absolute -right-6 -bottom-8 opacity-[0.07] pointer-events-none" size={160} color="#f1d8c4" />
      </div>

      {/* Right column */}
      <div className="md:col-span-4 space-y-5">
        {/* Engagement chart */}
        <div className="p-7 bg-beastly-beige rounded-2xl">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-xl font-black text-beastly-dark">Engagement</h2>
            <div className="w-9 h-9 rounded-full bg-beastly-dark/10 flex items-center justify-center">
              <BarChart3 size={16} className="text-beastly-dark/50" />
            </div>
          </div>
          <div className="h-28 w-full bg-beastly-dark rounded-xl p-2">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={engagementData}>
                <defs>
                  <linearGradient id="greenFade" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#b4ff00" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#b4ff00" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <Area type="monotone" dataKey="v" stroke="#b4ff00" strokeWidth={2} fill="url(#greenFade)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4 flex items-center justify-between">
            <div>
              <p className="text-[11px] font-extrabold uppercase tracking-[0.15em] text-beastly-dark/40">Reach cumulé</p>
              <p className="text-xl font-black text-beastly-dark">+<AnimatedCounter value={547} />k vues</p>
            </div>
            <div className="px-3 py-1.5 bg-beastly-green rounded-full">
              <span className="text-[11px] font-extrabold text-beastly-dark">+18.3%</span>
            </div>
          </div>
        </div>

        {/* Prochain event */}
        {nextEvent && (
          <div className="p-7 bg-beastly-dark/80 backdrop-blur-xl rounded-2xl group relative overflow-hidden border border-beastly-beige/10">
            <div className="relative z-10">
              <div className="w-12 h-12 bg-beastly-green rounded-full flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                <Calendar size={20} className="text-beastly-dark fill-beastly-dark" />
              </div>
              <p className="text-[10px] font-extrabold uppercase tracking-widest text-beastly-beige/40 mb-1">Prochain événement</p>
              <h3 className="text-xl font-black text-beastly-beige mb-1">{nextEvent.name}</h3>
              <p className="text-sm text-beastly-beige/40 font-bold mb-1">{nextEvent.brand}</p>
              <p className="text-xs text-beastly-beige/30 font-bold mb-5">{nextEvent.date} · {nextEvent.time}</p>
              <button onClick={() => onNavigate('events')} className="w-full py-3.5 bg-beastly-green rounded-full text-sm font-extrabold text-beastly-dark uppercase tracking-wider hover:brightness-110 transition-all">
                Voir le brief
              </button>
            </div>
            <GlowLightning className="absolute -right-6 -top-4 opacity-20 group-hover:opacity-40 transition-opacity duration-700 pointer-events-none rotate-12" size={150} color="#b4ff00" />
          </div>
        )}
      </div>
    </div>
  );
}
