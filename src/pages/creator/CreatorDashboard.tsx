import React from 'react';
import eventsData from '../../data/events.json';
import contentsData from '../../data/contents.json';
import { Calendar, MapPin, Clock, CheckCircle2, Upload, FileText, ChevronRight } from 'lucide-react';
import { AreaChart, Area, ResponsiveContainer } from 'recharts';
import AnimatedCounter from '../../components/AnimatedCounter';
import { GlowLightning, GlowEye, BeastlyEye, BeastlySmiley, BeastlyDocument } from '../../components/BeastlyIcons';

interface Props {
    onNavigate: (tab: string) => void;
}

const reachData = [
    { v: 4200 }, { v: 5800 }, { v: 4900 }, { v: 7200 }, { v: 8400 }, { v: 6100 }, { v: 9300 },
];

// Simulate the creator being invited to event ev01
const MY_EVENT = eventsData.find(e => e.id === 'ev01')!;
const MY_CONTENTS = (contentsData as any[]).filter(c => c.creatorId === 'c01');

export default function CreatorDashboard({ onNavigate }: Props) {
    const validatedCount = MY_CONTENTS.filter(c => c.status === 'Validated').length;
    const pendingCount = MY_CONTENTS.filter(c => c.status === 'Pending').length;

    return (
        <div className="grid grid-cols-1 md:grid-cols-12 gap-5 auto-rows-min">

            {/* Welcome */}
            <div className="md:col-span-12">
                <h1 className="text-3xl font-black text-beastly-beige">Bonjour, Léa 👋</h1>
                <p className="text-sm font-bold text-beastly-beige/40 mt-1">Voici l'état de tes collaborations Beastly</p>
            </div>

            {/* KPIs */}
            <div className="md:col-span-4 p-7 bg-beastly-beige rounded-2xl flex flex-col justify-between min-h-[160px] relative overflow-hidden group cursor-pointer" onClick={() => onNavigate('creator-brief')}>
                <div className="flex items-center justify-between">
                    <BeastlyEye size={40} bg="green" />
                    <span className="text-[11px] font-extrabold text-beastly-dark/40 uppercase tracking-[0.15em]">En cours</span>
                </div>
                <div className="mt-auto">
                    <p className="text-[11px] font-extrabold uppercase tracking-[0.15em] text-beastly-dark/40 mb-1">Événement actif</p>
                    <p className="text-2xl font-black text-beastly-dark leading-tight">{MY_EVENT.name}</p>
                    <p className="text-xs font-bold text-beastly-dark/50 mt-1">{MY_EVENT.brand}</p>
                </div>
                <GlowLightning className="absolute -right-4 -bottom-4 opacity-10 pointer-events-none" size={90} color="#b4ff00" />
            </div>

            <div className="md:col-span-4 p-7 bg-beastly-beige rounded-2xl flex flex-col justify-between min-h-[160px] relative overflow-hidden group cursor-pointer" onClick={() => onNavigate('creator-upload')}>
                <div className="flex items-center justify-between">
                    <BeastlyDocument size={40} bg="orange" />
                    <span className="text-[11px] font-extrabold text-beastly-dark/40 uppercase tracking-[0.15em]">Action requise</span>
                </div>
                <div className="mt-auto relative z-10">
                    <p className="text-[11px] font-extrabold uppercase tracking-[0.15em] text-beastly-dark/40 mb-1">Contenus déposés</p>
                    <p className="text-5xl font-black text-beastly-dark"><AnimatedCounter value={MY_CONTENTS.length} duration={1200} /></p>
                </div>
                <GlowEye className="absolute -right-4 -bottom-4 opacity-15 pointer-events-none group-hover:opacity-25 transition-opacity duration-700" size={90} color="#fc846d" />
            </div>

            <div className="md:col-span-4 p-7 bg-beastly-beige rounded-2xl flex flex-col justify-between min-h-[160px] relative overflow-hidden group">
                <div className="flex items-center justify-between">
                    <BeastlySmiley size={40} bg="green" />
                </div>
                <div className="mt-auto relative z-10">
                    <p className="text-[11px] font-extrabold uppercase tracking-[0.15em] text-beastly-dark/40 mb-1">Contenus validés</p>
                    <p className="text-5xl font-black text-beastly-green"><AnimatedCounter value={validatedCount} duration={1500} /></p>
                </div>
                <GlowLightning className="absolute -right-4 -bottom-4 opacity-15 pointer-events-none group-hover:opacity-25 transition-opacity duration-700" size={90} color="#b4ff00" />
            </div>

            {/* Next event card */}
            <div className="md:col-span-7 p-7 bg-beastly-beige rounded-2xl space-y-4">
                <div className="flex items-center justify-between">
                    <h2 className="text-xl font-black text-beastly-dark">Mon prochain événement</h2>
                    <button
                        onClick={() => onNavigate('creator-brief')}
                        className="text-[11px] font-extrabold text-beastly-dark/40 uppercase tracking-[0.15em] hover:text-beastly-dark flex items-center gap-1"
                    >
                        Voir le brief <ChevronRight size={14} />
                    </button>
                </div>
                <div className="p-5 bg-beastly-dark/40 backdrop-blur-xl border border-white/5 rounded-2xl space-y-3">
                    <div className="flex items-start justify-between">
                        <div>
                            <span className="text-[10px] font-extrabold uppercase tracking-wider text-beastly-green">Active</span>
                            <h3 className="font-black text-lg text-beastly-beige mt-0.5">{MY_EVENT.name}</h3>
                            <p className="text-sm font-bold text-beastly-beige/50">{MY_EVENT.brand}</p>
                        </div>
                        <div className="px-3 py-1.5 bg-beastly-green rounded-full">
                            <span className="text-[10px] font-extrabold text-beastly-dark uppercase tracking-wider">Confirmée ✓</span>
                        </div>
                    </div>
                    <div className="flex flex-wrap gap-4">
                        <span className="flex items-center gap-1.5 text-xs font-extrabold text-beastly-beige/50">
                            <Calendar size={12} /> {MY_EVENT.date}
                        </span>
                        <span className="flex items-center gap-1.5 text-xs font-extrabold text-beastly-beige/50">
                            <Clock size={12} /> {MY_EVENT.time}
                        </span>
                        <span className="flex items-center gap-1.5 text-xs font-extrabold text-beastly-beige/50">
                            <MapPin size={12} /> {MY_EVENT.location}
                        </span>
                    </div>
                    <p className="text-xs font-bold text-beastly-beige/40 leading-relaxed line-clamp-2">{MY_EVENT.brief}</p>
                    <button
                        onClick={() => onNavigate('creator-brief')}
                        className="w-full py-3 bg-beastly-green rounded-xl text-beastly-dark text-xs font-extrabold uppercase tracking-wider hover:brightness-110 transition-all"
                    >
                        Voir le brief complet
                    </button>
                </div>
            </div>

            {/* Right col */}
            <div className="md:col-span-5 space-y-5">
                {/* Mini reach chart */}
                <div className="p-7 bg-beastly-beige rounded-2xl">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-lg font-black text-beastly-dark">Mon reach</h2>
                    </div>
                    <div className="h-24 w-full bg-beastly-dark rounded-xl p-2">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={reachData}>
                                <defs>
                                    <linearGradient id="creatorGreenFade" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#b4ff00" stopOpacity={0.3} />
                                        <stop offset="95%" stopColor="#b4ff00" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <Area type="monotone" dataKey="v" stroke="#b4ff00" strokeWidth={2} fill="url(#creatorGreenFade)" />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                    <div className="mt-3 flex items-center justify-between">
                        <div>
                            <p className="text-[11px] font-extrabold uppercase tracking-[0.15em] text-beastly-dark/40">Reach 7 jours</p>
                            <p className="text-xl font-black text-beastly-dark">+<AnimatedCounter value={45.7} format={v => v.toFixed(1)} />k vues</p>
                        </div>
                        <div className="px-3 py-1.5 bg-beastly-green rounded-full">
                            <span className="text-[11px] font-extrabold text-beastly-dark">+6.1%</span>
                        </div>
                    </div>
                </div>

                {/* CTA Upload */}
                <div
                    onClick={() => onNavigate('creator-upload')}
                    className="p-6 bg-beastly-dark/80 backdrop-blur-xl rounded-2xl group relative overflow-hidden border border-beastly-beige/10 cursor-pointer hover:border-beastly-green/30 transition-all"
                >
                    <div className="relative z-10 flex items-center gap-4">
                        <div className="w-12 h-12 bg-beastly-green rounded-full flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                            <Upload size={20} className="text-beastly-dark" />
                        </div>
                        <div>
                            <h3 className="font-black text-beastly-beige">Déposer mes contenus</h3>
                            <p className="text-xs font-bold text-beastly-beige/40 mt-0.5">
                                {pendingCount > 0 ? `${pendingCount} contenu${pendingCount > 1 ? 's' : ''} en attente de validation` : 'Ajouter un nouveau contenu'}
                            </p>
                        </div>
                        <ChevronRight size={16} className="text-beastly-beige/30 ml-auto" />
                    </div>
                    <GlowLightning className="absolute -right-4 -top-4 opacity-15 group-hover:opacity-30 transition-opacity duration-500 pointer-events-none rotate-12" size={100} color="#b4ff00" />
                </div>
            </div>
        </div>
    );
}
