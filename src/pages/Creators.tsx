import React, { useState, useMemo } from 'react';
import creatorsData from '../data/creators.json';
import { Search, SlidersHorizontal, Send, Sparkles, DatabaseZap, BrainCircuit, CheckCircle2, Users, Activity, TrendingUp, FileSpreadsheet, CheckSquare, Square, Target } from 'lucide-react';
import { GlowLightning } from '../components/BeastlyIcons';
import { Brief, SelectedInfluencer } from '../types';

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
    onSelectionChange: (selected: SelectedInfluencer[]) => void;
}

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

function formatFollowers(n: number) {
    if (n >= 1000) return `${(n / 1000).toFixed(n % 1000 === 0 ? 0 : 1)} k`;
    return `${n}`;
}

const POPULATION_SEGMENTS = [
    { id: 'festivaliers', label: 'Festivaliers', count: 284, color: '#b4ff00', icon: '🎪', desc: 'Fans de musique live & événements estivaux' },
    { id: 'lifestyle',    label: 'Lifestyle',    count: 197, color: '#fc846d', icon: '✨', desc: 'Tendances, aesthetics, quotidien stylé' },
    { id: 'food_drinks',  label: 'Drinks & Vibes', count: 156, color: '#b1def3', icon: '🍹', desc: 'Boissons, terrasses, summer vibes' },
    { id: 'musique',      label: 'Musique & Culture', count: 142, color: '#f1d8c4', icon: '🎵', desc: 'Artistes émergents, concerts, sorties' },
    { id: 'sport',        label: 'Sport & Outdoor', count: 89,  color: '#b4ff00', icon: '🌿', desc: 'Running, nature, bien-être actif' },
];

const NANO_BY_SEGMENT: Record<string, Creator[]> = {
    festivaliers: [
        { id: 'n1', name: 'Camille Roy',     handle: '@camille.festival',  niche: 'Festival',  platform: 'Instagram', followers: 8200,  engagement: 9.4,  avatar: 'https://picsum.photos/seed/nf1/100', location: 'Paris',     status: 'active', aiScore: 94, aiReason: 'Présente à Solidays chaque année, couvertures lifestyle festivalier très engageantes.' },
        { id: 'n2', name: 'Théo Massé',      handle: '@theo.vibes',        niche: 'Festival',  platform: 'TikTok',    followers: 12400, engagement: 11.2, avatar: 'https://picsum.photos/seed/nf2/100', location: 'Lyon',      status: 'active', aiScore: 91, aiReason: 'Contenus festival spontanés, audience 18-24 très réactive, fort reach organique.' },
        { id: 'n3', name: 'Inès Fontaine',   handle: '@ines.sunsets',      niche: 'Lifestyle', platform: 'Instagram', followers: 6800,  engagement: 10.8, avatar: 'https://picsum.photos/seed/nf3/100', location: 'Bordeaux', status: 'active', aiScore: 88, aiReason: 'Esthétique été ensoleillée, posts festival très partagés, tone naturel.' },
        { id: 'n4', name: 'Raphaël Guez',    handle: '@raph.outdoor',      niche: 'Festival',  platform: 'TikTok',    followers: 18900, engagement: 7.6,  avatar: 'https://picsum.photos/seed/nf4/100', location: 'Marseille',status: 'active', aiScore: 86, aiReason: 'Mix musique & lifestyle, tone naturel très aligné avec l\'ADN FuzeTea.' },
        { id: 'n5', name: 'Lucie Barre',     handle: '@lucie.goodtimes',   niche: 'Festival',  platform: 'Instagram', followers: 9700,  engagement: 8.9,  avatar: 'https://picsum.photos/seed/nf5/100', location: 'Nantes',   status: 'active', aiScore: 83, aiReason: 'Couverture d\'événements estivaux, forte communauté locale très engagée.' },
    ],
    lifestyle: [
        { id: 'n6',  name: 'Sofia Nakamura', handle: '@sofia.daily',       niche: 'Lifestyle', platform: 'Instagram', followers: 14200, engagement: 8.1,  avatar: 'https://picsum.photos/seed/nl1/100', location: 'Paris',       status: 'active', aiScore: 93, aiReason: 'Quotidien stylé, audience CSP+, très bon taux de sauvegarde et de partage.' },
        { id: 'n7',  name: 'Jules Manet',    handle: '@jules.m',           niche: 'Lifestyle', platform: 'TikTok',    followers: 22100, engagement: 6.9,  avatar: 'https://picsum.photos/seed/nl2/100', location: 'Toulouse',    status: 'active', aiScore: 89, aiReason: 'Trendsetter lifestyle urbain, fort taux de partage, très bonne visibilité organique.' },
        { id: 'n8',  name: 'Amandine Cha',   handle: '@amandine.cha',      niche: 'Lifestyle', platform: 'Instagram', followers: 7500,  engagement: 12.3, avatar: 'https://picsum.photos/seed/nl3/100', location: 'Montpellier',status: 'active', aiScore: 92, aiReason: 'Micro-communauté très fidèle, engagement exceptionnel au regard de sa taille.' },
        { id: 'n9',  name: 'Noé Lambert',    handle: '@noe.lmbt',          niche: 'Lifestyle', platform: 'TikTok',    followers: 11600, engagement: 9.7,  avatar: 'https://picsum.photos/seed/nl4/100', location: 'Paris',       status: 'active', aiScore: 85, aiReason: 'Contenus summer lifestyle, tone relax et authentique, fit FuzeTea parfait.' },
        { id: 'n10', name: 'Eva Richter',    handle: '@eva.richter',       niche: 'Lifestyle', platform: 'Instagram', followers: 19800, engagement: 7.2,  avatar: 'https://picsum.photos/seed/nl5/100', location: 'Strasbourg', status: 'active', aiScore: 81, aiReason: 'Aesthetic cohérent, partenariats boissons déjà réalisés avec succès.' },
    ],
    food_drinks: [
        { id: 'n11', name: 'Marco Bellini',  handle: '@marco.sips',        niche: 'Food', platform: 'TikTok',    followers: 16400, engagement: 10.5, avatar: 'https://picsum.photos/seed/nd1/100', location: 'Paris',    status: 'active', aiScore: 96, aiReason: 'Spécialiste boissons & terrasses, FuzeTea dans sa niche exacte. Fit parfait.' },
        { id: 'n12', name: 'Chloé Vidal',    handle: '@chloe.drinks',      niche: 'Food', platform: 'Instagram', followers: 8900,  engagement: 11.8, avatar: 'https://picsum.photos/seed/nd2/100', location: 'Bordeaux', status: 'active', aiScore: 94, aiReason: 'Reviews boissons avec fort engagement, communauté très qualifiée et fidèle.' },
        { id: 'n13', name: 'Tom Delattre',   handle: '@tom.vibes.food',    niche: 'Food', platform: 'TikTok',    followers: 23500, engagement: 8.3,  avatar: 'https://picsum.photos/seed/nd3/100', location: 'Lille',    status: 'active', aiScore: 87, aiReason: 'Summer drinks & food culture, tone décontracté très aligné FuzeTea.' },
        { id: 'n14', name: 'Margot Sellam',  handle: '@margot.tastes',     niche: 'Food', platform: 'Instagram', followers: 6200,  engagement: 13.1, avatar: 'https://picsum.photos/seed/nd4/100', location: 'Nice',     status: 'active', aiScore: 90, aiReason: 'Nano hyper-engagée sur l\'univers tropical & drinks, compatibilité 96% avec le brief.' },
        { id: 'n15', name: 'Alex Veron',     handle: '@alex.sip',          niche: 'Food', platform: 'TikTok',    followers: 14700, engagement: 9.1,  avatar: 'https://picsum.photos/seed/nd5/100', location: 'Lyon',     status: 'active', aiScore: 83, aiReason: 'Lifestyle drinks en extérieur, contenus ensoleillés alignés avec l\'ADN FuzeTea.' },
    ],
    musique: [
        { id: 'n16', name: 'Rayan Oued',     handle: '@rayan.music',       niche: 'Musique', platform: 'TikTok',    followers: 19200, engagement: 9.8,  avatar: 'https://picsum.photos/seed/nm1/100', location: 'Paris',     status: 'active', aiScore: 88, aiReason: 'Couvre les festivals musicaux, audience jeune 16-26 très engagée.' },
        { id: 'n17', name: 'Jade Morin',     handle: '@jade.sounds',       niche: 'Musique', platform: 'Instagram', followers: 11300, engagement: 8.7,  avatar: 'https://picsum.photos/seed/nm2/100', location: 'Rennes',    status: 'active', aiScore: 84, aiReason: 'Lifestyle musical + découvertes artistes, très active en été, contenus Solidays parfaits.' },
        { id: 'n18', name: 'Baptiste Lefort',handle: '@bap.culture',       niche: 'Musique', platform: 'TikTok',    followers: 7400,  engagement: 12.6, avatar: 'https://picsum.photos/seed/nm3/100', location: 'Paris',     status: 'active', aiScore: 91, aiReason: 'Micro-audience culture très fidèle, contenus concerts très partagés.' },
        { id: 'n19', name: 'Zoé Ferrier',    handle: '@zoe.playlist',      niche: 'Musique', platform: 'Instagram', followers: 15600, engagement: 7.4,  avatar: 'https://picsum.photos/seed/nm4/100', location: 'Marseille', status: 'active', aiScore: 79, aiReason: 'Curation musicale + lifestyle, bonne cohérence esthétique et ton positif.' },
    ],
    sport: [
        { id: 'n20', name: 'Léon Chartier',  handle: '@leon.run',          niche: 'Sport', platform: 'Instagram', followers: 9100,  engagement: 10.2, avatar: 'https://picsum.photos/seed/ns1/100', location: 'Nantes',   status: 'active', aiScore: 82, aiReason: 'Running & outdoor, hydratation au cœur de son contenu. Fit naturel FuzeTea.' },
        { id: 'n21', name: 'Mélodie Brunet', handle: '@melodie.outdoor',   niche: 'Sport', platform: 'TikTok',    followers: 13400, engagement: 8.8,  avatar: 'https://picsum.photos/seed/ns2/100', location: 'Grenoble', status: 'active', aiScore: 85, aiReason: 'Outdoor lifestyle, audience bien-être engagée, alignée avec FuzeTea nature.' },
        { id: 'n22', name: 'Quentin Faure',  handle: '@quentin.active',    niche: 'Sport', platform: 'Instagram', followers: 7800,  engagement: 11.4, avatar: 'https://picsum.photos/seed/ns3/100', location: 'Toulouse', status: 'active', aiScore: 80, aiReason: 'Sport en extérieur + été, contenus très engageants sur les stories.' },
    ],
};


export default function Creators({ activeBrief, onSelectionChange }: CreatorsProps) {
    const [creators] = useState<Creator[]>(creatorsData as Creator[]);
    const [search, setSearch] = useState('');
    const [niche, setNiche] = useState('Tous');
    const [platform, setPlatform] = useState('Tous');
    const [followerRange, setFollowerRange] = useState(followerRanges[0]);
    const [showFilters, setShowFilters] = useState(false);

    // AI Agent States
    const [agentState, setAgentState] = useState<'idle' | 'scanning_apify' | 'scoring_gemini' | 'complete'>('idle');
    const [selectedEvent, setSelectedEvent] = useState('Solidays x FuzeTea Passion');
    const [aiEnrichedCreators, setAiEnrichedCreators] = useState<Creator[]>([]);

    // Checkbox selection
    const [checkedIds, setCheckedIds] = useState<Set<string>>(new Set());
    const [inviteSent, setInviteSent] = useState(false);

    // Population chart
    const [selectedPopulation, setSelectedPopulation] = useState<string | null>(null);

    const startAgent = () => {
        setAgentState('scanning_apify');
        setTimeout(() => {
            setAgentState('scoring_gemini');
            setTimeout(() => {
                const enriched = [...creators].slice(0, 26).map(c => ({
                    ...c,
                    aiScore: Math.floor(Math.random() * 15) + 85,
                    aiReason: c.platform === 'TikTok'
                        ? 'Audience 18-30 très engagée, contenus festival spontanés, fit parfait avec le brief FuzeTea.'
                        : 'Esthétique lifestyle ensoleillée, audience éco-friendly, tonalité naturelle alignée avec la campagne.',
                })).sort((a, b) => b.aiScore! - a.aiScore!);

                setAiEnrichedCreators(enriched);
                setCheckedIds(new Set(enriched.map(c => c.id)));
                setAgentState('complete');
            }, 3000);
        }, 3000);
    };

    const toggleCheck = (id: string) => {
        setCheckedIds(prev => {
            const next = new Set(prev);
            if (next.has(id)) next.delete(id);
            else next.add(id);
            return next;
        });
    };

    const toggleAll = () => {
        if (checkedIds.size === aiEnrichedCreators.length) {
            setCheckedIds(new Set());
        } else {
            setCheckedIds(new Set(aiEnrichedCreators.map(c => c.id)));
        }
    };

    // AI Sorting
    const [aiSortBy, setAiSortBy] = useState<'score' | 'reach' | 'engagement' | 'emv'>('score');

    const filtered = useMemo(() => {
        return creators.filter(c => {
            const matchSearch = c.name.toLowerCase().includes(search.toLowerCase()) || c.handle.toLowerCase().includes(search.toLowerCase());
            const matchNiche = niche === 'Tous' || c.niche === niche;
            const matchPlatform = platform === 'Tous' || c.platform === platform;
            const matchFollowers = c.followers >= followerRange.min && c.followers < followerRange.max;
            return matchSearch && matchNiche && matchPlatform && matchFollowers;
        });
    }, [creators, search, niche, platform, followerRange]);

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

    // KPIs based on checked creators
    const checkedCreators = displayCreators.filter(c => checkedIds.has(c.id));
    const checkedReach = checkedCreators.reduce((acc, c) => acc + c.followers, 0);
    const checkedAvgEngagement = checkedCreators.length
        ? checkedCreators.reduce((acc, c) => acc + c.engagement, 0) / checkedCreators.length
        : 0;
    const checkedEMV = checkedCreators.reduce((acc, c) => acc + Math.round((c.followers * (c.engagement / 100)) * 0.15), 0);

    const allReach = displayCreators.reduce((acc, c) => acc + c.followers, 0);
    const avgEngagement = displayCreators.length
        ? displayCreators.reduce((acc, c) => acc + c.engagement, 0) / displayCreators.length
        : 0;
    const totalEMV = displayCreators.reduce((acc, c) => acc + Math.round((c.followers * (c.engagement / 100)) * 0.15), 0);

    // Population derived
    const selectedSeg = POPULATION_SEGMENTS.find(s => s.id === selectedPopulation) ?? null;
    const selectedNanos = selectedPopulation ? (NANO_BY_SEGMENT[selectedPopulation] ?? []) : [];


    const handleInviteSelection = () => {
        const selected: SelectedInfluencer[] = checkedCreators.map(c => ({
            id: c.id,
            name: c.name,
            handle: c.handle,
            followers: c.followers,
            engagement: c.engagement,
            platform: c.platform,
            niche: c.niche,
            avatar: c.avatar,
        }));
        onSelectionChange(selected);
        setInviteSent(true);
    };

    return (
        <div className="space-y-5">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-black text-beastly-beige">Trouver des Créateurs</h1>
                    <p className="text-sm font-bold text-beastly-beige/40 mt-1">Base Beastly — {creators.length} micro/nano influenceurs</p>
                </div>
                <button
                    onClick={() => {}}
                    className="flex items-center gap-2 px-5 py-3 bg-beastly-beige/10 border border-beastly-beige/10 text-beastly-beige text-sm font-extrabold rounded-full uppercase tracking-wider hover:bg-beastly-beige/20 transition-all"
                >
                    <FileSpreadsheet size={15} /> Importer Google Sheet
                </button>
            </div>

            {/* AI Agent Banner — always visible when not complete */}
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
                                <h2 className="text-2xl font-black text-beastly-beige">Agent IA · Sourcing</h2>
                            </div>
                            <p className="text-sm font-bold text-beastly-beige/60 max-w-md leading-relaxed">
                                Notre moteur intelligent parcourt des milliers de profils pour identifier les créateurs les plus en phase avec ta campagne — et te propose un casting clé en main.
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
                                            <option>Solidays x FuzeTea Passion — FuzeTea</option>
                                            <option>Pop-up Store Experience — Nike</option>
                                        </select>
                                    )}
                                    <button
                                        onClick={startAgent}
                                        className="px-6 py-3.5 bg-beastly-green text-beastly-dark text-sm font-extrabold rounded-xl uppercase tracking-wider hover:brightness-110 transition-all flex items-center gap-2"
                                    >
                                        <Sparkles size={16} /> Lancer la Recherche IA
                                    </button>
                                </div>
                            )}

                            {agentState === 'scanning_apify' && (
                                <div className="space-y-3 mt-4">
                                    <div className="flex items-center gap-3 text-beastly-orange">
                                        <DatabaseZap size={20} className="animate-pulse" />
                                        <p className="font-extrabold text-sm uppercase tracking-wider">Étape 1 — Recherche de profils</p>
                                    </div>
                                    <div className="w-full h-1.5 bg-beastly-dark rounded-full overflow-hidden">
                                        <div className="h-full bg-beastly-orange w-1/2 rounded-full animate-pulse" />
                                    </div>
                                    <p className="text-xs font-bold text-beastly-beige/40">Exploration des communautés liées à ta campagne. Repérage des créateurs au profil micro & nano festival / lifestyle...</p>
                                </div>
                            )}

                            {agentState === 'scoring_gemini' && (
                                <div className="space-y-3 mt-4">
                                    <div className="flex items-center gap-3 text-beastly-blue">
                                        <BrainCircuit size={20} className="animate-pulse" />
                                        <p className="font-extrabold text-sm uppercase tracking-wider">Étape 2 — Sélection & Scoring</p>
                                    </div>
                                    <div className="w-full h-1.5 bg-beastly-dark rounded-full overflow-hidden">
                                        <div className="h-full bg-beastly-blue w-full rounded-full animate-pulse" />
                                    </div>
                                    <p className="text-xs font-bold text-beastly-beige/40">Évaluation approfondie des profils retenus. Attribution d'un score de compatibilité avec le brief "{activeBrief ? activeBrief.campaignName : 'Solidays x FuzeTea Passion'}"...</p>
                                </div>
                            )}
                        </div>

                        {/* Pipeline Visual */}
                        <div className="hidden md:flex flex-col gap-3 min-w-[200px]">
                            <div className={`p-4 rounded-xl border ${agentState === 'scanning_apify' ? 'border-beastly-orange bg-beastly-orange/10' : 'border-beastly-beige/10 bg-beastly-dark/50'} flex items-center gap-3 transition-colors`}>
                                <DatabaseZap size={20} className={agentState === 'scanning_apify' ? 'text-beastly-orange' : 'text-beastly-beige/20'} />
                                <div>
                                    <p className={`text-xs font-extrabold uppercase tracking-wider ${agentState === 'scanning_apify' ? 'text-beastly-orange' : 'text-beastly-beige/30'}`}>Recherche</p>
                                    <p className="text-[10px] font-bold text-beastly-beige/40">Exploration communautés</p>
                                </div>
                            </div>
                            <div className={`p-4 rounded-xl border ${agentState === 'scoring_gemini' ? 'border-beastly-blue bg-beastly-blue/10' : 'border-beastly-beige/10 bg-beastly-dark/50'} flex items-center gap-3 transition-colors`}>
                                <BrainCircuit size={20} className={agentState === 'scoring_gemini' ? 'text-beastly-blue' : 'text-beastly-beige/20'} />
                                <div>
                                    <p className={`text-xs font-extrabold uppercase tracking-wider ${agentState === 'scoring_gemini' ? 'text-beastly-blue' : 'text-beastly-beige/30'}`}>Sélection</p>
                                    <p className="text-[10px] font-bold text-beastly-beige/40">Analyse & Scoring</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Complete state banner + KPIs + actions */}
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
                                <h3 className="text-xl font-black text-beastly-green">Casting IA — Résultats</h3>
                                <p className="text-sm font-bold text-beastly-beige/60 mt-1 max-w-sm">15 créateurs sélectionnés par notre IA parmi des centaines de profils analysés.</p>
                            </div>
                        </div>

                        <div className="flex-1 max-w-md p-5 bg-beastly-dark/50 rounded-2xl border border-beastly-beige/5 w-full">
                            <div className="space-y-3">
                                <div className="flex items-end justify-between">
                                    <div>
                                        <p className="text-xs font-black text-beastly-beige/40 uppercase tracking-wider mb-1">Impact Estimé</p>
                                        <p className="text-2xl font-black text-beastly-beige">{formatFollowers(allReach)} <span className="text-sm text-beastly-beige/40 font-bold">Vues Target</span></p>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-xs font-black text-beastly-beige/40 uppercase tracking-wider mb-1">Objectif Brief</p>
                                        <p className="text-lg font-black text-beastly-beige/80">{formatFollowers(activeBrief ? activeBrief.targetReach : 420000)}</p>
                                    </div>
                                </div>
                                <div className="w-full h-3 bg-beastly-dark rounded-full overflow-hidden p-0.5 border border-beastly-beige/10">
                                    <div className="h-full bg-gradient-to-r from-beastly-green/50 to-beastly-green rounded-full relative" style={{ width: `${Math.min(100, (allReach / (activeBrief ? activeBrief.targetReach : 420000)) * 100)}%` }}>
                                        <div className="absolute inset-0 bg-white/20 animate-pulse" />
                                    </div>
                                </div>
                                <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-wider">
                                    <span className="text-beastly-green">Volume optimal atteint ({Math.round((allReach / (activeBrief ? activeBrief.targetReach : 420000)) * 100)}%)</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Sort + Select All */}
                    <div className="flex items-center justify-between gap-4 relative z-10">
                        <div className="flex items-center gap-2">
                            {(['score', 'reach', 'engagement', 'emv'] as const).map(s => (
                                <button
                                    key={s}
                                    onClick={() => setAiSortBy(s)}
                                    className={`px-3 py-1.5 rounded-full text-xs font-extrabold uppercase tracking-wider transition-all ${aiSortBy === s ? 'bg-beastly-green text-beastly-dark' : 'bg-beastly-beige/10 text-beastly-beige/50 hover:text-beastly-beige'}`}
                                >
                                    {s === 'score' ? 'Score IA' : s === 'reach' ? 'Reach' : s === 'engagement' ? 'Engagement' : 'EMV'}
                                </button>
                            ))}
                        </div>
                        <button onClick={toggleAll} className="flex items-center gap-2 text-xs font-extrabold text-beastly-beige/60 hover:text-beastly-beige transition-colors">
                            {checkedIds.size === aiEnrichedCreators.length
                                ? <><CheckSquare size={14} /> Tout désélectionner</>
                                : <><Square size={14} /> Tout sélectionner</>
                            }
                        </button>
                    </div>

                    {/* Dynamic KPIs for checked selection */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4 border-t border-beastly-green/20 relative z-10">
                        <div className="bg-beastly-dark/30 p-3 rounded-xl border border-beastly-green/10 text-center sm:text-left">
                            <p className="text-[9px] font-black uppercase text-beastly-green/60 mb-1 flex items-center justify-center sm:justify-start gap-1"><Users size={12} /> Followers</p>
                            <p className="text-lg font-black text-beastly-green">{formatFollowers(checkedReach)}</p>
                            <p className="text-[10px] font-bold text-beastly-beige/30 mt-1">{checkedCreators.length} profil{checkedCreators.length !== 1 ? 's' : ''} sélectionné{checkedCreators.length !== 1 ? 's' : ''}</p>
                        </div>
                        <div className="bg-beastly-dark/30 p-3 rounded-xl border border-beastly-green/10 text-center sm:text-left">
                            <p className="text-[9px] font-black uppercase text-beastly-green/60 mb-1 flex items-center justify-center sm:justify-start gap-1"><Activity size={12} /> Taux d'Eng.</p>
                            <p className="text-lg font-black text-beastly-orange">{checkedAvgEngagement.toFixed(1)}%</p>
                            <p className="text-[10px] font-bold text-beastly-beige/30 mt-1">Moyen de la sélection</p>
                        </div>
                        <div className="bg-beastly-dark/30 p-3 rounded-xl border border-beastly-green/10 text-center sm:text-left">
                            <p className="text-[9px] font-black uppercase text-beastly-green/60 mb-1 flex items-center justify-center sm:justify-start gap-1"><TrendingUp size={12} /> Reach Estimé</p>
                            <p className="text-lg font-black text-beastly-blue">{formatFollowers(Math.round(checkedReach * (checkedAvgEngagement / 100) * 3))}</p>
                            <p className="text-[10px] font-bold text-beastly-beige/30 mt-1">Vues estimées par post</p>
                        </div>
                        <div className="bg-beastly-dark/30 p-3 rounded-xl border border-beastly-green/10 text-center sm:text-left">
                            <p className="text-[9px] font-black uppercase text-beastly-green/60 mb-1 flex items-center justify-center sm:justify-start gap-1"><TrendingUp size={12} /> EMV Global</p>
                            <p className="text-lg font-black text-beastly-blue">{checkedEMV}€</p>
                            <p className="text-[10px] font-bold text-beastly-beige/30 mt-1">Valeur totale de la sélection</p>
                        </div>
                    </div>

                    <div className="flex justify-end mt-2 relative z-10">
                        {inviteSent ? (
                            <div className="flex items-center gap-3 px-8 py-4 bg-beastly-green/15 border border-beastly-green/40 rounded-xl">
                                <CheckCircle2 size={18} className="text-beastly-green" />
                                <div>
                                    <p className="text-sm font-extrabold text-beastly-green uppercase tracking-wider">Invitations envoyées ✓</p>
                                    <p className="text-[10px] font-bold text-beastly-green/60">{checkedCreators.length} créateur{checkedCreators.length !== 1 ? 's' : ''} — les invitations vont partir !</p>
                                </div>
                            </div>
                        ) : (
                            <button
                                onClick={handleInviteSelection}
                                disabled={checkedCreators.length === 0}
                                className="px-8 py-4 bg-beastly-green text-beastly-dark text-sm font-extrabold rounded-xl uppercase tracking-wider hover:brightness-110 transition-all shadow-[0_0_20px_rgba(180,255,0,0.2)] hover:shadow-[0_0_30px_rgba(180,255,0,0.4)] disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-2"
                            >
                                <Send size={16} /> Inviter la sélection ({checkedCreators.length})
                            </button>
                        )}
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
                            placeholder="Rechercher un créateur par nom ou handle..."
                            value={search}
                            onChange={e => setSearch(e.target.value)}
                            className="w-full bg-beastly-beige/10 border border-beastly-beige/10 rounded-xl pl-10 pr-4 py-3 text-sm font-bold text-beastly-beige placeholder:text-beastly-beige/30 focus:outline-none focus:border-beastly-beige/30"
                        />
                    </div>
                    <button
                        onClick={() => setShowFilters(!showFilters)}
                        className={[
                            'flex items-center gap-2 px-4 py-3 rounded-xl text-sm font-extrabold transition-all',
                            showFilters ? 'bg-beastly-green text-beastly-dark' : 'bg-beastly-beige/10 text-beastly-beige border border-beastly-beige/10',
                        ].join(' ')}
                    >
                        <SlidersHorizontal size={15} /> Filtres
                    </button>
                </div>
            )}

            {showFilters && agentState === 'idle' && (
                <div className="p-5 bg-beastly-beige/10 border border-beastly-beige/10 rounded-2xl space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                            <p className="text-[10px] font-extrabold uppercase tracking-[0.15em] text-beastly-beige/40 mb-2">Niche</p>
                            <div className="flex flex-wrap gap-2">
                                {niches.map(n => (
                                    <button key={n} onClick={() => setNiche(n)}
                                        className={`px-3 py-1.5 rounded-full text-xs font-extrabold transition-all ${niche === n ? 'bg-beastly-green text-beastly-dark' : 'bg-beastly-beige/10 text-beastly-beige/60 hover:text-beastly-beige'}`}
                                    >{n}</button>
                                ))}
                            </div>
                        </div>
                        <div>
                            <p className="text-[10px] font-extrabold uppercase tracking-[0.15em] text-beastly-beige/40 mb-2">Plateforme</p>
                            <div className="flex flex-wrap gap-2">
                                {platforms.map(p => (
                                    <button key={p} onClick={() => setPlatform(p)}
                                        className={`px-3 py-1.5 rounded-full text-xs font-extrabold transition-all ${platform === p ? 'bg-beastly-green text-beastly-dark' : 'bg-beastly-beige/10 text-beastly-beige/60 hover:text-beastly-beige'}`}
                                    >{p}</button>
                                ))}
                            </div>
                        </div>
                        <div>
                            <p className="text-[10px] font-extrabold uppercase tracking-[0.15em] text-beastly-beige/40 mb-2">Abonnés</p>
                            <div className="flex flex-wrap gap-2">
                                {followerRanges.map(r => (
                                    <button key={r.label} onClick={() => setFollowerRange(r)}
                                        className={`px-3 py-1.5 rounded-full text-xs font-extrabold transition-all border border-beastly-beige/5 ${followerRange.label === r.label ? 'bg-beastly-green text-beastly-dark' : 'bg-beastly-dark/50 text-beastly-beige/60 hover:text-beastly-beige'}`}
                                    >{r.label}</button>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {agentState === 'idle' && (
                <p className="text-xs font-extrabold text-beastly-beige/30 uppercase tracking-wider">{filtered.length} créateur{filtered.length > 1 ? 's' : ''} trouvé{filtered.length > 1 ? 's' : ''}</p>
            )}

            {/* Creator Grid — hidden at idle if no manual search */}
            {(agentState === 'complete' || (agentState === 'idle' && (search || niche !== 'Tous' || platform !== 'Tous'))) && (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {displayCreators.map(creator => {
                        const isChecked = checkedIds.has(creator.id);
                        return (
                            <div key={creator.id} className={`p-5 bg-beastly-beige rounded-2xl space-y-4 group relative transition-all ${agentState === 'complete' && isChecked ? 'ring-2 ring-beastly-green' : ''}`}>

                                {/* Checkbox (complete state only) */}
                                {agentState === 'complete' && (
                                    <button
                                        onClick={() => toggleCheck(creator.id)}
                                        className="absolute top-3 right-3 z-10"
                                    >
                                        {isChecked
                                            ? <CheckSquare size={18} className="text-beastly-green fill-beastly-green" />
                                            : <Square size={18} className="text-beastly-dark/30" />
                                        }
                                    </button>
                                )}

                                <div className="flex items-start gap-3">
                                    <img src={creator.avatar} alt={creator.name} className="w-12 h-12 rounded-full bg-beastly-dark" />
                                    <div className="flex-1 min-w-0">
                                        <p className="font-black text-beastly-dark text-sm">{creator.name}</p>
                                        <p className="text-xs font-bold text-beastly-dark/50">{creator.handle}</p>
                                        <div className="flex items-center gap-1.5 mt-1">
                                            <span className={`inline-block text-[9px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded-full ${platformColors[creator.platform] || 'bg-beastly-dark/10 text-beastly-dark/50'}`}>
                                                {creator.platform}
                                            </span>
                                            {agentState === 'complete' && (
                                                <span className="inline-block text-[9px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded-full bg-beastly-orange/20 text-beastly-orange">
                                                    Sélectionné IA
                                                </span>
                                            )}
                                        </div>
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

                                {/* AI context phrase — shown after sourcing scan */}
                                {agentState === 'complete' && creator.aiReason && (
                                    <div className="px-3 py-2.5 bg-beastly-dark border border-beastly-blue/20 rounded-xl flex items-start gap-2">
                                        <Sparkles size={11} className="text-beastly-blue shrink-0 mt-0.5" />
                                        <p className="text-[10px] font-bold text-beastly-beige/60 italic leading-relaxed">
                                            "{creator.aiReason}"
                                        </p>
                                    </div>
                                )}

                                {/* Manual invite button (idle state only) */}
                                {agentState === 'idle' && (
                                    <button
                                        onClick={() => toggleCheck(creator.id)}
                                        className={`w-full py-2.5 rounded-xl text-xs font-extrabold uppercase tracking-wider transition-all ${isChecked ? 'bg-beastly-green text-beastly-dark' : 'bg-beastly-dark/10 text-beastly-dark/60 hover:bg-beastly-dark/20'}`}
                                    >
                                        {isChecked ? '✓ Sélectionné' : 'Sélectionner'}
                                    </button>
                                )}
                            </div>
                        );
                    })}
                </div>
            )}

            {/* ── Population Chart ── appears after AI scan ── */}
            {agentState === 'complete' && (
                <div className="space-y-5">

                    {/* Network graph card */}
                    <div className="bg-beastly-dark/80 border border-beastly-beige/10 rounded-3xl overflow-hidden">
                        <div className="px-6 pt-6 pb-2 flex items-center gap-3">
                            <div className="p-2.5 bg-beastly-orange/20 rounded-xl">
                                <Target size={20} className="text-beastly-orange" />
                            </div>
                            <div>
                                <h3 className="text-xl font-black text-beastly-beige">Répartition des communautés</h3>
                                <p className="text-[11px] font-bold text-beastly-beige/40 mt-0.5">
                                    Clique sur un segment pour générer son pack de nano-créateurs
                                </p>
                            </div>
                        </div>
                        <p className="text-[10px] font-extrabold uppercase tracking-[0.15em] text-beastly-beige/50 px-6 pb-3 ml-13">
                            {POPULATION_SEGMENTS.reduce((a, s) => a + s.count, 0)} profils · {POPULATION_SEGMENTS.length} segments identifiés
                        </p>

                        {/* Flourish gephi network graph */}
                        <iframe
                            src="https://flo.uri.sh/visualisation/27810435/embed"
                            title="Répartition des communautés"
                            className="w-full border-0"
                            style={{ height: 500 }}
                            sandbox="allow-same-origin allow-forms allow-scripts allow-downloads allow-popups allow-popups-to-escape-sandbox allow-top-navigation-by-user-activation"
                        />

                        {/* Legend */}
                        <div className="flex flex-wrap gap-3 px-6 pb-5">
                            {POPULATION_SEGMENTS.map(seg => (
                                <button
                                    key={seg.id}
                                    onClick={() => setSelectedPopulation(prev => prev === seg.id ? null : seg.id)}
                                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider transition-all ${selectedPopulation === seg.id ? 'ring-1 ring-white/20' : 'opacity-60 hover:opacity-90'}`}
                                    style={{ backgroundColor: seg.color + (selectedPopulation === seg.id ? 'ff' : '33'), color: '#000' }}
                                >
                                    <span>{seg.icon}</span>
                                    <span style={{ color: selectedPopulation === seg.id ? '#000' : seg.color }}>{seg.label}</span>
                                    <span className="ml-1 opacity-60">{seg.count}</span>
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Nano influencer pack for selected segment */}
                    {selectedSeg && selectedNanos.length > 0 && (
                        <div className="p-6 md:p-8 bg-beastly-beige/5 border border-beastly-green/20 rounded-3xl space-y-5 relative overflow-hidden">
                            <div
                                className="absolute top-0 right-0 w-64 h-64 blur-3xl rounded-full translate-x-1/2 -translate-y-1/2 pointer-events-none"
                                style={{ backgroundColor: selectedSeg.color + '18' }}
                            />
                            <div className="flex items-center justify-between relative z-10 flex-wrap gap-4">
                                <div className="flex items-center gap-3">
                                    <span className="text-2xl">{selectedSeg.icon}</span>
                                    <div>
                                        <h3 className="text-xl font-black text-beastly-beige">Pack Nano — {selectedSeg.label}</h3>
                                        <p className="text-xs font-bold text-beastly-beige/40">{selectedSeg.desc} · {selectedNanos.length} profils générés</p>
                                    </div>
                                </div>
                                <span className="text-[10px] font-black uppercase tracking-wider px-3 py-1.5 rounded-full bg-beastly-green/10 text-beastly-green border border-beastly-green/20 shrink-0">
                                    Nano · 5k–25k abonnés
                                </span>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 relative z-10">
                                {selectedNanos.map(creator => (
                                    <div key={creator.id} className={`p-5 bg-beastly-beige rounded-2xl space-y-4 transition-all ${checkedIds.has(creator.id) ? 'ring-2 ring-beastly-green' : ''}`}>
                                        <div className="flex items-start gap-3">
                                            <img src={creator.avatar} alt={creator.name} className="w-12 h-12 rounded-full bg-beastly-dark" />
                                            <div className="flex-1 min-w-0">
                                                <p className="font-black text-beastly-dark text-sm">{creator.name}</p>
                                                <p className="text-xs font-bold text-beastly-dark/50">{creator.handle}</p>
                                                <div className="flex items-center gap-1.5 mt-1">
                                                    <span className={`inline-block text-[9px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded-full ${platformColors[creator.platform] || 'bg-beastly-dark/10 text-beastly-dark/50'}`}>
                                                        {creator.platform}
                                                    </span>
                                                    <span className="inline-block text-[9px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded-full bg-beastly-green/20 text-beastly-dark">
                                                        Nano
                                                    </span>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-3 gap-2">
                                            <div className="p-2 bg-beastly-dark rounded-xl text-center">
                                                <p className="text-sm font-black text-beastly-green">{formatFollowers(creator.followers)}</p>
                                                <p className="text-[8px] font-extrabold text-beastly-beige/40 uppercase tracking-wider">Abonnés</p>
                                            </div>
                                            <div className="p-2 bg-beastly-dark rounded-xl text-center">
                                                <p className="text-sm font-black text-beastly-orange">{creator.engagement}%</p>
                                                <p className="text-[8px] font-extrabold text-beastly-beige/40 uppercase tracking-wider">Engagement</p>
                                            </div>
                                            <div className="p-2 bg-beastly-dark rounded-xl text-center">
                                                <p className="text-sm font-black text-beastly-blue">{creator.aiScore}</p>
                                                <p className="text-[8px] font-extrabold text-beastly-beige/40 uppercase tracking-wider">Score IA</p>
                                            </div>
                                        </div>

                                        {creator.aiReason && (
                                            <div className="p-3 bg-beastly-dark border border-beastly-blue/30 rounded-xl">
                                                <div className="flex items-center gap-2 mb-1.5">
                                                    <Sparkles size={11} className="text-beastly-blue" />
                                                    <span className="text-[10px] font-black uppercase tracking-wider text-beastly-beige/80">Analyse IA</span>
                                                </div>
                                                <p className="text-[10px] font-bold text-beastly-beige/60 italic leading-relaxed">"{creator.aiReason}"</p>
                                            </div>
                                        )}

                                        <button
                                            onClick={() => toggleCheck(creator.id)}
                                            className={`w-full py-2.5 rounded-xl text-xs font-extrabold uppercase tracking-wider transition-all ${checkedIds.has(creator.id) ? 'bg-beastly-green text-beastly-dark' : 'bg-beastly-dark/10 text-beastly-dark/60 hover:bg-beastly-dark/20'}`}
                                        >
                                            {checkedIds.has(creator.id) ? '✓ Ajouté à la sélection' : '+ Ajouter à la sélection'}
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
