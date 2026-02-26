import React, { useState, useMemo } from 'react';
import creatorsData from '../data/creators.json';
import { Search, SlidersHorizontal, UserCheck, UserX, Send, Sparkles, DatabaseZap, BrainCircuit, CheckCircle2, Users, Activity, TrendingUp } from 'lucide-react';
import { GlowLightning } from '../components/BeastlyIcons';
import { Brief } from '../types';

interface Creator {
    id: string;
    name: string;
    handle: string;
    niche: string;
    platform: string;
    followers: number;
    engagement: number;
    avatar: string;
    location: string;
    status: string;
    aiScore?: number;
    aiReason?: string;
}

interface CreatorsProps {
    activeBrief?: Brief | null;
}

type Presence = 'none' | 'invited' | 'confirmed' | 'declined';

const platformColors: Record<string, string> = {
    Instagram: 'bg-beastly-orange/20 text-beastly-orange',
    TikTok: 'bg-beastly-dark text-beastly-beige',
    YouTube: 'bg-red-100 text-red-600',
};

const niches = ['Tous', 'Mode', 'Lifestyle', 'Beauté', 'Sport', 'Food', 'Tech', 'Voyage'];
const platforms = ['Tous', 'Instagram', 'TikTok', 'YouTube'];
const followerRanges = [
    { label: 'Tous', min: 0, max: Infinity },
    { label: '< 10k', min: 0, max: 10000 },
    { label: '10k – 30k', min: 10000, max: 30000 },
    { label: '30k – 70k', min: 30000, max: 70000 },
    { label: '> 70k', min: 70000, max: Infinity },
];

const engagementRanges = [
    { label: 'Tous', min: 0, max: Infinity },
    { label: '> 2%', min: 2, max: Infinity },
    { label: '> 5%', min: 5, max: Infinity },
    { label: '> 10%', min: 10, max: Infinity },
];

const emvRanges = [
    { label: 'Tous', min: 0, max: Infinity },
    { label: '< 50€', min: 0, max: 50 },
    { label: '50€ – 150€', min: 50, max: 150 },
    { label: '> 150€', min: 150, max: Infinity },
];

function formatFollowers(n: number) {
    if (n >= 1000) return `${(n / 1000).toFixed(n % 1000 === 0 ? 0 : 1)} k`;
    return `${n} `;
}

export default function Creators({ activeBrief }: CreatorsProps) {
    const [creators] = useState<Creator[]>(creatorsData as Creator[]);
    const [presence, setPresence] = useState<Record<string, Presence>>({});
    const [search, setSearch] = useState('');
    const [niche, setNiche] = useState('Tous');
    const [platform, setPlatform] = useState('Tous');
    const [followerRange, setFollowerRange] = useState(followerRanges[0]);
    const [engagementRange, setEngagementRange] = useState(engagementRanges[0]);
    const [emvRange, setEmvRange] = useState(emvRanges[0]);
    const [showFilters, setShowFilters] = useState(false);

    // AI Agent States
    const [agentState, setAgentState] = useState<'idle' | 'scanning_apify' | 'scoring_gemini' | 'complete'>('idle');
    const [selectedEvent, setSelectedEvent] = useState('Jacquemus AW25');
    const [aiEnrichedCreators, setAiEnrichedCreators] = useState<Creator[]>([]);

    const startAgent = () => {
        setAgentState('scanning_apify');

        // Step 1: Apify Extraction (Fake 3s)
        setTimeout(() => {
            setAgentState('scoring_gemini');

            // Step 2: Gemini Scoring (Fake 3s)
            setTimeout(() => {
                // Enrich creators with fake scores
                const enriched = [...creators].slice(0, 15).map(c => ({
                    ...c,
                    aiScore: Math.floor(Math.random() * 15) + 85, // 85-99
                    aiReason: c.platform === 'TikTok' ? 'Audience très engagée sur la vidéo courte, fit parfait avec la DA.' : 'Esthétique mode pointue, followers très qualifiés sur Paris.'
                })).sort((a, b) => b.aiScore! - a.aiScore!); // Sort by score desc

                setAiEnrichedCreators(enriched);
                setAgentState('complete');
            }, 3000);

        }, 3000);
    };

    // AI Sorting
    const [aiSortBy, setAiSortBy] = useState<'score' | 'reach' | 'engagement' | 'emv'>('score');

    const filtered = useMemo(() => {
        return creators.filter(c => {
            const matchSearch = c.name.toLowerCase().includes(search.toLowerCase()) || c.handle.toLowerCase().includes(search.toLowerCase());
            const matchNiche = niche === 'Tous' || c.niche === niche;
            const matchPlatform = platform === 'Tous' || c.platform === platform;
            const matchFollowers = c.followers >= followerRange.min && c.followers < followerRange.max;
            const matchEngagement = c.engagement >= engagementRange.min && c.engagement < engagementRange.max;
            const emv = Math.round((c.followers * (c.engagement / 100)) * 0.15);
            const matchEmv = emv >= emvRange.min && emv < emvRange.max;
            return matchSearch && matchNiche && matchPlatform && matchFollowers && matchEngagement && matchEmv;
        });
    }, [creators, search, niche, platform, followerRange, engagementRange, emvRange]);

    const displayCreators = useMemo(() => {
        if (agentState === 'complete') {
            const sorted = [...aiEnrichedCreators];
            if (aiSortBy === 'score') return sorted.sort((a, b) => (b.aiScore || 0) - (a.aiScore || 0));
            if (aiSortBy === 'reach') return sorted.sort((a, b) => b.followers - a.followers);
            if (aiSortBy === 'engagement') return sorted.sort((a, b) => b.engagement - a.engagement);
            if (aiSortBy === 'emv') return sorted.sort((a, b) => {
                const emvB = Math.round((b.followers * (b.engagement / 100)) * 0.15);
                const emvA = Math.round((a.followers * (a.engagement / 100)) * 0.15);
                return emvB - emvA;
            });
            return sorted;
        }
        return filtered;
    }, [agentState, aiEnrichedCreators, filtered, aiSortBy]);

    const totalReach = displayCreators.reduce((acc, c) => acc + c.followers, 0);
    const avgEngagement = displayCreators.length ? (displayCreators.reduce((acc, c) => acc + c.engagement, 0) / displayCreators.length) : 0;
    const totalEMV = displayCreators.reduce((acc, c) => acc + Math.round((c.followers * (c.engagement / 100)) * 0.15), 0);

    const confirmed = Object.values(presence).filter(v => v === 'confirmed').length;
    const invited = Object.values(presence).filter(v => v === 'invited').length;

    const selectedCreators = creators.filter(c => presence[c.id] === 'invited' || presence[c.id] === 'confirmed');
    const selectedReach = selectedCreators.reduce((acc, c) => acc + c.followers, 0);
    const selectedAvgReach = selectedCreators.length ? Math.round(selectedReach / selectedCreators.length) : 0;
    const selectedAvgEngagement = selectedCreators.length ? (selectedCreators.reduce((acc, c) => acc + c.engagement, 0) / selectedCreators.length) : 0;
    const selectedEMV = selectedCreators.reduce((acc, c) => acc + Math.round((c.followers * (c.engagement / 100)) * 0.15), 0);
    const selectedAvgEMV = selectedCreators.length ? Math.round(selectedEMV / selectedCreators.length) : 0;

    const cyclePresence = (id: string) => {
        setPresence(prev => {
            const current = prev[id] || 'none';
            const next: Presence = current === 'none' ? 'invited' : current === 'invited' ? 'confirmed' : current === 'confirmed' ? 'declined' : 'none';
            return { ...prev, [id]: next };
        });
    };

    const presenceDisplay: Record<Presence, { label: string; cls: string }> = {
        none: { label: 'Inviter', cls: 'bg-beastly-dark/10 text-beastly-dark/60' },
        invited: { label: '📨 Invité', cls: 'bg-beastly-blue text-beastly-dark' },
        confirmed: { label: '✅ Présent', cls: 'bg-beastly-green text-beastly-dark' },
        declined: { label: '❌ Absent', cls: 'bg-beastly-orange/20 text-beastly-orange' },
    };

    return (
        <div className="space-y-5">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-black text-beastly-beige">Trouver des Créateurs</h1>
                    <p className="text-sm font-bold text-beastly-beige/40 mt-1">Base Beastly — {creators.length} micro/nano influenceurs</p>
                </div>
                <div className="flex items-center gap-3">
                    {confirmed > 0 && (
                        <div className="px-4 py-2 bg-beastly-green rounded-full">
                            <span className="text-xs font-extrabold text-beastly-dark uppercase tracking-wider">{confirmed} confirmé{confirmed > 1 ? 's' : ''}</span>
                        </div>
                    )}
                    {invited > 0 && (
                        <div className="px-4 py-2 bg-beastly-blue rounded-full">
                            <span className="text-xs font-extrabold text-beastly-dark uppercase tracking-wider">{invited} invité{invited > 1 ? 's' : ''}</span>
                        </div>
                    )}
                </div>
            </div>

            {/* Recapitulatif Manuel Sélection */}
            {selectedCreators.length > 0 && agentState === 'idle' && (
                <div className="flex flex-col sm:flex-row items-center gap-6 p-5 bg-gradient-to-r from-beastly-beige/5 to-transparent border border-beastly-beige/20 rounded-2xl relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-beastly-beige/5 blur-2xl rounded-full translate-x-1/2 -translate-y-1/2" />

                    <div className="flex items-center gap-3 w-full sm:w-auto z-10">
                        <div className="p-3 bg-white text-black rounded-xl">
                            <Users size={20} />
                        </div>
                        <div>
                            <p className="text-[10px] font-black uppercase text-beastly-beige/50 tracking-wider">Sélection Manuelle</p>
                            <p className="text-xl font-black text-white">{selectedCreators.length} Profils</p>
                        </div>
                    </div>

                    <div className="h-10 w-px bg-beastly-beige/10 hidden sm:block z-10"></div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 flex-1 w-full z-10">
                        <div className="bg-beastly-dark/30 p-3 rounded-xl border border-beastly-beige/5 text-center sm:text-left">
                            <p className="text-[9px] font-black uppercase text-beastly-beige/40 mb-1 flex items-center justify-center sm:justify-start gap-1"><Users size={12} /> Reach Total</p>
                            <p className="text-lg font-black text-beastly-green">{formatFollowers(selectedReach)}</p>
                            <p className="text-[10px] font-bold text-beastly-beige/30 mt-1">{formatFollowers(selectedAvgReach)} en moy / profil</p>
                        </div>
                        <div className="bg-beastly-dark/30 p-3 rounded-xl border border-beastly-beige/5 text-center sm:text-left">
                            <p className="text-[9px] font-black uppercase text-beastly-beige/40 mb-1 flex items-center justify-center sm:justify-start gap-1"><Activity size={12} /> Taux d'Eng.</p>
                            <p className="text-lg font-black text-beastly-orange">{selectedAvgEngagement.toFixed(1)}%</p>
                            <p className="text-[10px] font-bold text-beastly-beige/30 mt-1">Moyen du pack</p>
                        </div>
                        <div className="bg-beastly-dark/30 p-3 rounded-xl border border-beastly-beige/5 text-center sm:text-left">
                            <p className="text-[9px] font-black uppercase text-beastly-beige/40 mb-1 flex items-center justify-center sm:justify-start gap-1"><TrendingUp size={12} /> EMV par Post</p>
                            <p className="text-lg font-black text-beastly-blue">{selectedAvgEMV}€</p>
                            <p className="text-[10px] font-bold text-beastly-beige/30 mt-1">Moyen / profil</p>
                        </div>
                        <div className="bg-beastly-dark/30 p-3 rounded-xl border border-beastly-beige/5 text-center sm:text-left">
                            <p className="text-[9px] font-black uppercase text-beastly-beige/40 mb-1 flex items-center justify-center sm:justify-start gap-1"><TrendingUp size={12} /> EMV Total</p>
                            <p className="text-lg font-black text-beastly-blue">{selectedEMV}€</p>
                            <p className="text-[10px] font-bold text-beastly-beige/30 mt-1">Valeur de l'opération</p>
                        </div>
                    </div>
                </div>
            )}

            {/* AI Agent Banner */}
            {agentState !== 'complete' && (
                <div className="p-1 relative overflow-hidden rounded-3xl bg-gradient-to-br from-beastly-green/20 via-beastly-beige/5 to-transparent border border-beastly-green/30">
                    <div className="absolute top-0 right-0 p-10 opacity-10">
                        <GlowLightning />
                    </div>
                    <div className="relative bg-beastly-dark/50 backdrop-blur-xl rounded-[22px] p-6 sm:p-8 flex flex-col md:flex-row items-center gap-8 justify-between z-10">
                        <div className="flex-1 space-y-4">
                            <div className="flex items-center gap-3">
                                <div className="p-2.5 bg-beastly-green/20 text-beastly-green rounded-xl">
                                    <Sparkles size={24} />
                                </div>
                                <h2 className="text-2xl font-black text-beastly-beige">Agent de Sourcing IA</h2>
                            </div>
                            <p className="text-sm font-bold text-beastly-beige/60 max-w-md leading-relaxed">
                                Automatise la recherche d'influenceurs qualifiés via l'orchestration GCP. L'Agent 1 extrait la donnée d'engagement via <span className="text-beastly-green underline decoration-beastly-green/30 decoration-2 underline-offset-4">Apify</span>, l'Agent 2 valide le casting via <span className="text-beastly-blue underline decoration-beastly-blue/30 decoration-2 underline-offset-4">Gemini API</span>.
                            </p>

                            {agentState === 'idle' && (
                                <div className="flex items-center gap-4 mt-4">
                                    {activeBrief ? (
                                        <div className="bg-beastly-dark border border-beastly-beige/10 rounded-xl px-4 py-3.5 text-sm font-bold text-beastly-beige flex-1">
                                            {activeBrief.campaignName} — {activeBrief.brand}
                                        </div>
                                    ) : (
                                        <select
                                            value={selectedEvent}
                                            onChange={(e) => setSelectedEvent(e.target.value)}
                                            className="bg-beastly-dark border border-beastly-beige/10 rounded-xl px-4 py-3.5 text-sm font-bold text-beastly-beige flex-1 focus:outline-none focus:border-beastly-green/50"
                                        >
                                            <option>Soirée Lancement AW25 — Jacquemus</option>
                                            <option>Pop-up Store Experience — Nike</option>
                                        </select>
                                    )}
                                    <button
                                        onClick={startAgent}
                                        className="px-6 py-3.5 bg-beastly-green text-beastly-dark text-sm font-extrabold rounded-xl uppercase tracking-wider hover:brightness-110 transition-all flex items-center gap-2"
                                    >
                                        <Sparkles size={16} /> Lancer l'Agent
                                    </button>
                                </div>
                            )}

                            {agentState === 'scanning_apify' && (
                                <div className="space-y-3 mt-4">
                                    <div className="flex items-center gap-3 text-beastly-orange">
                                        <DatabaseZap size={20} className="animate-pulse" />
                                        <p className="font-extrabold text-sm uppercase tracking-wider">Agent 1 : Extraction GCP / Apify</p>
                                    </div>
                                    <div className="w-full h-1.5 bg-beastly-dark rounded-full overflow-hidden">
                                        <div className="h-full bg-beastly-orange w-1/2 rounded-full animate-pulse" />
                                    </div>
                                    <p className="text-xs font-bold text-beastly-beige/40">Scraping des 500 derniers commentateurs de @jacquemus... Filtrage Node.js des nano-influenceurs (1k-25k) en cours...</p>
                                </div>
                            )}

                            {agentState === 'scoring_gemini' && (
                                <div className="space-y-3 mt-4">
                                    <div className="flex items-center gap-3 text-beastly-blue">
                                        <BrainCircuit size={20} className="animate-pulse" />
                                        <p className="font-extrabold text-sm uppercase tracking-wider">Agent 2 : Validation Gemini Vision</p>
                                    </div>
                                    <div className="w-full h-1.5 bg-beastly-dark rounded-full overflow-hidden">
                                        <div className="h-full bg-beastly-blue w-full rounded-full animate-pulse" />
                                    </div>
                                    <p className="text-xs font-bold text-beastly-beige/40">Analyse sémantique des 50 profils restants. Calcul du score de matching par rapport au brief "{activeBrief ? activeBrief.campaignName : 'Jacquemus AW25'}"...</p>
                                </div>
                            )}
                        </div>

                        {/* Pipeline Visual */}
                        <div className="hidden md:flex flex-col gap-3 min-w-[200px]">
                            <div className={`p - 4 rounded - xl border ${agentState === 'scanning_apify' ? 'border-beastly-orange bg-beastly-orange/10' : 'border-beastly-beige/10 bg-beastly-dark/50'} flex items - center gap - 3 transition - colors`}>
                                <DatabaseZap size={20} className={agentState === 'scanning_apify' ? 'text-beastly-orange' : 'text-beastly-beige/20'} />
                                <div>
                                    <p className={`text - xs font - extrabold uppercase tracking - wider ${agentState === 'scanning_apify' ? 'text-beastly-orange' : 'text-beastly-beige/30'} `}>Sourcing Data</p>
                                    <p className="text-[10px] font-bold text-beastly-beige/40">Apify Actor</p>
                                </div>
                            </div>
                            <div className={`p - 4 rounded - xl border ${agentState === 'scoring_gemini' ? 'border-beastly-blue bg-beastly-blue/10' : 'border-beastly-beige/10 bg-beastly-dark/50'} flex items - center gap - 3 transition - colors`}>
                                <BrainCircuit size={20} className={agentState === 'scoring_gemini' ? 'text-beastly-blue' : 'text-beastly-beige/20'} />
                                <div>
                                    <p className={`text - xs font - extrabold uppercase tracking - wider ${agentState === 'scoring_gemini' ? 'text-beastly-blue' : 'text-beastly-beige/30'} `}>Scoring IA</p>
                                    <p className="text-[10px] font-bold text-beastly-beige/40">Gemini 1.5 API</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {agentState === 'complete' && (
                <div className="flex flex-col gap-6 p-6 md:p-8 bg-beastly-green/5 border border-beastly-green/30 rounded-3xl relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-beastly-green/10 blur-3xl rounded-full translate-x-1/2 -translate-y-1/2" />

                    <button onClick={() => setAgentState('idle')} className="text-[10px] font-black uppercase text-beastly-beige/30 hover:text-white absolute top-6 right-6 z-10 transition-colors">
                        Fermer ×
                    </button>

                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
                        <div className="flex items-center gap-4">
                            <div className="p-3 bg-beastly-green text-beastly-dark rounded-full">
                                <CheckCircle2 size={28} />
                            </div>
                            <div>
                                <h3 className="text-xl font-black text-beastly-green">Pipeline IA terminé</h3>
                                <p className="text-sm font-bold text-beastly-beige/60 mt-1 max-w-sm">15 profils certifiés hautement pertinents par Gemini à partir de 500 prospects initiaux.</p>
                            </div>
                        </div>

                        <div className="flex-1 max-w-md p-5 bg-beastly-dark/50 rounded-2xl border border-beastly-beige/5 w-full">
                            <div className="space-y-3">
                                <div className="flex items-end justify-between">
                                    <div>
                                        <p className="text-xs font-black text-beastly-beige/40 uppercase tracking-wider mb-1">Impact Estimé</p>
                                        <p className="text-2xl font-black text-beastly-beige">{formatFollowers(totalReach)} <span className="text-sm text-beastly-beige/40 font-bold">Vues Target</span></p>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-xs font-black text-beastly-beige/40 uppercase tracking-wider mb-1">Objectif Brief</p>
                                        <p className="text-lg font-black text-beastly-beige/80">{formatFollowers(activeBrief ? activeBrief.targetReach : 350000)}</p>
                                    </div>
                                </div>
                                <div className="w-full h-3 bg-beastly-dark inset-shadow-sm rounded-full overflow-hidden p-0.5 border border-beastly-beige/10">
                                    <div className="h-full bg-gradient-to-r from-beastly-green/50 to-beastly-green rounded-full relative" style={{ width: `${Math.min(100, (totalReach / (activeBrief ? activeBrief.targetReach : 350000)) * 100)}%` }}>
                                        <div className="absolute inset-0 bg-white/20 animate-pulse" />
                                    </div>
                                </div>
                                <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-wider">
                                    <span className="text-beastly-green">Volume optimal atteint ({Math.round((totalReach / (activeBrief ? activeBrief.targetReach : 350000)) * 100)}%)</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 pt-6 mt-4 border-t border-beastly-green/20 relative z-10">
                        <div className="bg-beastly-dark/30 p-3 rounded-xl border border-beastly-green/10 text-center sm:text-left">
                            <p className="text-[9px] font-black uppercase text-beastly-green/60 mb-1 flex items-center justify-center sm:justify-start gap-1"><Users size={12} /> Reach Moyen</p>
                            <p className="text-lg font-black text-beastly-green">{formatFollowers(Math.round(totalReach / displayCreators.length))}</p>
                            <p className="text-[10px] font-bold text-beastly-beige/30 mt-1">Estim. de vues par profil</p>
                        </div>
                        <div className="bg-beastly-dark/30 p-3 rounded-xl border border-beastly-green/10 text-center sm:text-left">
                            <p className="text-[9px] font-black uppercase text-beastly-green/60 mb-1 flex items-center justify-center sm:justify-start gap-1"><Activity size={12} /> Taux d'Eng.</p>
                            <p className="text-lg font-black text-beastly-orange">{avgEngagement.toFixed(1)}%</p>
                            <p className="text-[10px] font-bold text-beastly-beige/30 mt-1">Moyen du pack IA</p>
                        </div>
                        <div className="bg-beastly-dark/30 p-3 rounded-xl border border-beastly-green/10 text-center sm:text-left">
                            <p className="text-[9px] font-black uppercase text-beastly-green/60 mb-1 flex items-center justify-center sm:justify-start gap-1"><TrendingUp size={12} /> EMV par Post</p>
                            <p className="text-lg font-black text-beastly-blue">{Math.round(totalEMV / displayCreators.length)}€</p>
                            <p className="text-[10px] font-bold text-beastly-beige/30 mt-1">Moyen / créateur généré</p>
                        </div>
                        <div className="bg-beastly-dark/30 p-3 rounded-xl border border-beastly-green/10 text-center sm:text-left">
                            <p className="text-[9px] font-black uppercase text-beastly-green/60 mb-1 flex items-center justify-center sm:justify-start gap-1"><TrendingUp size={12} /> EMV Global</p>
                            <p className="text-lg font-black text-beastly-blue">{totalEMV}€</p>
                            <p className="text-[10px] font-bold text-beastly-beige/30 mt-1">Valeur totale du pack</p>
                        </div>
                    </div>

                    <div className="flex justify-end mt-2 relative z-10">
                        <button className="px-8 py-4 bg-beastly-green text-beastly-dark text-sm font-extrabold rounded-xl uppercase tracking-wider hover:brightness-110 transition-all shadow-[0_0_20px_rgba(202,240,65,0.2)] hover:shadow-[0_0_30px_rgba(202,240,65,0.4)]">
                            Inviter la sélection (15)
                        </button>
                    </div>
                </div>
            )}

            {/* Search + Filters (Only if idle) */}
            {agentState === 'idle' && (
                <div className="flex items-center gap-3">
                    <div className="flex-1 relative">
                        <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-beastly-beige/30" />
                        <input
                            type="text"
                            placeholder="Recherche manuelle de créateurs (fallback)..."
                            value={search}
                            onChange={e => setSearch(e.target.value)}
                            className="w-full bg-beastly-beige/10 border border-beastly-beige/10 rounded-xl pl-10 pr-4 py-3 text-sm font-bold text-beastly-beige placeholder:text-beastly-beige/30 focus:outline-none focus:border-beastly-beige/30"
                        />
                    </div>
                    <button
                        onClick={() => setShowFilters(!showFilters)}
                        className={[
                            'flex items-center gap-2 px-4 py-3 rounded-xl text-sm font-extrabold transition-all',
                            showFilters ? 'bg-beastly-green text-beastly-dark' : 'bg-beastly-beige/10 text-beastly-beige border border-beastly-beige/10'
                        ].join(' ')}
                    >
                        <SlidersHorizontal size={15} /> Filtres
                    </button>
                </div>
            )}

            {showFilters && (
                <div className="p-5 bg-beastly-beige/10 border border-beastly-beige/10 rounded-2xl space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                            <p className="text-[10px] font-extrabold uppercase tracking-[0.15em] text-beastly-beige/40 mb-2">Niche</p>
                            <div className="flex flex-wrap gap-2">
                                {niches.map(n => (
                                    <button
                                        key={n}
                                        onClick={() => setNiche(n)}
                                        className={`px - 3 py - 1.5 rounded - full text - xs font - extrabold transition - all ${niche === n ? 'bg-beastly-green text-beastly-dark' : 'bg-beastly-beige/10 text-beastly-beige/60 hover:text-beastly-beige'} `}
                                    >{n}</button>
                                ))}
                            </div>
                        </div>
                        <div>
                            <p className="text-[10px] font-extrabold uppercase tracking-[0.15em] text-beastly-beige/40 mb-2">Plateforme</p>
                            <div className="flex flex-wrap gap-2">
                                {platforms.map(p => (
                                    <button
                                        key={p}
                                        onClick={() => setPlatform(p)}
                                        className={`px - 3 py - 1.5 rounded - full text - xs font - extrabold transition - all ${platform === p ? 'bg-beastly-green text-beastly-dark' : 'bg-beastly-beige/10 text-beastly-beige/60 hover:text-beastly-beige'} `}
                                    >{p}</button>
                                ))}
                            </div>
                        </div>
                        <div>
                            <p className="text-[10px] font-extrabold uppercase tracking-[0.15em] text-beastly-beige/40 mb-2">Abonnés</p>
                            <div className="flex flex-wrap gap-2">
                                {followerRanges.map(r => (
                                    <button
                                        key={r.label}
                                        onClick={() => setFollowerRange(r)}
                                        className={`px - 3 py - 1.5 rounded - full text - xs font - extrabold transition - all border border - beastly - beige / 5 ${followerRange.label === r.label ? 'bg-beastly-green text-beastly-dark' : 'bg-beastly-dark/50 text-beastly-beige/60 hover:text-beastly-beige'} `}
                                    >{r.label}</button>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-beastly-beige/10">
                        <div>
                            <p className="text-[10px] font-extrabold uppercase tracking-[0.15em] text-beastly-beige/40 mb-2">Taux d'Engagement</p>
                            <div className="flex flex-wrap gap-2">
                                {engagementRanges.map(r => (
                                    <button
                                        key={r.label}
                                        onClick={() => setEngagementRange(r)}
                                        className={`px - 3 py - 1.5 rounded - full text - xs font - extrabold transition - all border border - beastly - orange / 20 ${engagementRange.label === r.label ? 'bg-beastly-orange text-beastly-dark' : 'bg-beastly-dark/50 text-beastly-orange hover:bg-beastly-orange/20'} `}
                                    >{r.label}</button>
                                ))}
                            </div>
                        </div>
                        <div>
                            <p className="text-[10px] font-extrabold uppercase tracking-[0.15em] text-beastly-beige/40 mb-2">EMV par Post</p>
                            <div className="flex flex-wrap gap-2">
                                {emvRanges.map(r => (
                                    <button
                                        key={r.label}
                                        onClick={() => setEmvRange(r)}
                                        className={`px - 3 py - 1.5 rounded - full text - xs font - extrabold transition - all border border - beastly - blue / 20 ${emvRange.label === r.label ? 'bg-beastly-blue text-beastly-dark' : 'bg-beastly-dark/50 text-beastly-blue hover:bg-beastly-blue/20'} `}
                                    >{r.label}</button>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {agentState === 'idle' && (
                <p className="text-xs font-extrabold text-beastly-beige/30 uppercase tracking-wider">{filtered.length} créateur{filtered.length > 1 ? 's' : ''} trouvé{filtered.length > 1 ? 's' : ''} (Base Manuelle)</p>
            )}

            {/* Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {displayCreators.map(creator => {
                    const pres = presence[creator.id] || 'none';
                    const pd = presenceDisplay[pres];
                    return (
                        <div key={creator.id} className="p-5 bg-beastly-beige rounded-2xl space-y-4 group">
                            <div className="flex items-start gap-3">
                                <img
                                    src={creator.avatar}
                                    alt={creator.name}
                                    className="w-12 h-12 rounded-full bg-beastly-dark"
                                />
                                <div className="flex-1 min-w-0">
                                    <p className="font-black text-beastly-dark text-sm">{creator.name}</p>
                                    <p className="text-xs font-bold text-beastly-dark/50">{creator.handle}</p>
                                    <span className={`inline - block mt - 1 text - [9px] font - extrabold uppercase tracking - wider px - 2 py - 0.5 rounded - full ${platformColors[creator.platform] || 'bg-beastly-dark/10 text-beastly-dark/50'} `}>
                                        {creator.platform}
                                    </span>
                                </div>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="px-2.5 py-1 bg-beastly-dark/10 rounded-full text-[10px] font-extrabold text-beastly-dark uppercase tracking-wider">{creator.niche}</span>
                                <span className="text-[10px] font-extrabold text-beastly-dark/40">{creator.location}</span>
                            </div>
                            <div className="grid grid-cols-3 gap-2">
                                <div className="p-2 bg-beastly-dark rounded-xl text-center">
                                    <p className="text-sm font-black text-beastly-green">{formatFollowers(creator.followers)}</p>
                                    <p className="text-[8px] font-extrabold text-beastly-beige/40 uppercase tracking-wider">Abonnés</p>
                                </div>
                                <div className="p-2 bg-beastly-dark rounded-xl text-center">
                                    <p className="text-sm font-black text-beastly-orange">{creator.engagement}%</p>
                                    <p className="text-[8px] font-extrabold text-beastly-beige/40 uppercase tracking-wider">Taux d'Eng.</p>
                                </div>
                                <div className="p-2 bg-beastly-dark rounded-xl text-center">
                                    <p className="text-sm font-black text-beastly-blue">{Math.round((creator.followers * (creator.engagement / 100)) * 0.15)}€</p>
                                    <p className="text-[8px] font-extrabold text-beastly-beige/40 uppercase tracking-wider">EMV Estimé</p>
                                </div>
                            </div>

                            {/* AI Scoring Display */}
                            {agentState === 'complete' && creator.aiScore && (
                                <div className="p-3 bg-beastly-dark border border-beastly-blue/30 rounded-xl relative overflow-hidden">
                                    <div className="absolute top-0 right-0 w-16 h-16 bg-beastly-blue/10 blur-xl rounded-full translate-x-1/2 -translate-y-1/2" />
                                    <div className="flex items-center gap-2 mb-2">
                                        <Sparkles size={12} className="text-beastly-blue" />
                                        <span className="text-[10px] font-black uppercase tracking-wider text-beastly-beige/80">Score IA</span>
                                        <span className="ml-auto text-sm font-black text-beastly-blue">{creator.aiScore}/100</span>
                                    </div>
                                    <p className="text-[10px] font-bold text-beastly-beige/60 italic leading-relaxed">
                                        "{creator.aiReason}"
                                    </p>
                                </div>
                            )}
                            <button
                                onClick={() => cyclePresence(creator.id)}
                                className={`w - full py - 2.5 rounded - xl text - xs font - extrabold uppercase tracking - wider transition - all ${pd.cls} `}
                            >
                                {pd.label}
                            </button>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
