import React, { useState, useEffect } from 'react';
import { Sparkles, TrendingUp, Music, Hash, Clock, Zap } from 'lucide-react';

interface Trend {
    id: string;
    category: string;
    title: string;
    description: string;
    platforms: string[];
    boost: string;
    icon: React.ReactNode;
    color: string;
}

const TRENDS: Trend[] = [
    {
        id: 't1',
        category: 'Format',
        title: '"Get ready with me" en 30s',
        description: 'Les formats GRWM ultra-courts explosent sur TikTok. Montage rapide, musique tendue, transition miroir obligatoire.',
        platforms: ['TikTok', 'Instagram'],
        boost: '+340%',
        icon: <TrendingUp size={18} />,
        color: '#b4ff00'
    },
    {
        id: 't2',
        category: 'Audio Trending',
        title: '"Espresso" – Sabrina Carpenter',
        description: 'Son en top 1 sur TikTok FR. Idéal pour les contenus mode et lifestyle. 2.4M de créations cette semaine.',
        platforms: ['TikTok'],
        boost: '2.4M créas',
        icon: <Music size={18} />,
        color: '#fc846d'
    },
    {
        id: 't3',
        category: 'Hashtag',
        title: '#ootd #streetstyle Paris',
        description: 'Combo performant pour les événements mode parisiens. Portée organique x2 vs hashtags génériques.',
        platforms: ['Instagram'],
        boost: 'x2 portée',
        icon: <Hash size={18} />,
        color: '#b1def3'
    },
    {
        id: 't4',
        category: 'Timing',
        title: 'Post optimal : 19h–21h',
        description: 'Créneau avec le meilleur taux d\'engagement constaté sur les comptes micro FR. Éviter le samedi matin.',
        platforms: ['Instagram', 'TikTok'],
        boost: '+28% engage',
        icon: <Clock size={18} />,
        color: '#b4ff00'
    },
    {
        id: 't5',
        category: 'Format',
        title: 'Carousel "avant/après" event',
        description: 'Les carousels montrant l\'envers du décor d\'un événement génèrent 3x plus de saves que les posts classiques.',
        platforms: ['Instagram'],
        boost: 'x3 saves',
        icon: <Sparkles size={18} />,
        color: '#fc846d'
    }
];

export default function Trends() {
    const [loaded, setLoaded] = useState(false);
    const [visibleCount, setVisibleCount] = useState(0);

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoaded(true);
        }, 2200);
        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        if (!loaded) return;
        TRENDS.forEach((_, i) => {
            setTimeout(() => setVisibleCount(i + 1), i * 200);
        });
    }, [loaded]);

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-start justify-between">
                <div>
                    <h1 className="text-3xl font-black text-beastly-beige">Tendances & Veilles</h1>
                    <p className="text-sm font-bold text-beastly-beige/40 mt-1">Suggestions IA générées via Make</p>
                </div>
                <div className="flex items-center gap-2 px-4 py-2.5 bg-beastly-beige/10 border border-beastly-green/30 rounded-full">
                    <Zap size={12} className="text-beastly-green fill-beastly-green" />
                    <span className="text-[10px] font-extrabold text-beastly-green uppercase tracking-wider">Powered by Make + AI</span>
                </div>
            </div>

            {/* Loading state */}
            {!loaded && (
                <div className="space-y-4">
                    <div className="flex items-center gap-3 p-6 bg-beastly-beige/10 border border-beastly-beige/10 rounded-2xl">
                        <div className="w-8 h-8 rounded-full bg-beastly-green/20 flex items-center justify-center animate-pulse">
                            <Zap size={16} className="text-beastly-green" />
                        </div>
                        <div className="flex-1 space-y-2">
                            <div className="h-3 bg-beastly-beige/20 rounded-full w-3/4 animate-pulse" />
                            <div className="h-2 bg-beastly-beige/10 rounded-full w-1/2 animate-pulse" />
                        </div>
                    </div>
                    {[...Array(4)].map((_, i) => (
                        <div key={i} className="h-24 bg-beastly-beige/5 border border-beastly-beige/5 rounded-2xl animate-pulse" />
                    ))}
                    <p className="text-center text-xs font-bold text-beastly-beige/30">
                        Analyse des tendances en cours via Make…
                    </p>
                </div>
            )}

            {/* Trends */}
            {loaded && (
                <>
                    <div className="p-4 bg-beastly-green/10 border border-beastly-green/20 rounded-2xl flex items-center gap-3">
                        <Sparkles size={16} className="text-beastly-green shrink-0" />
                        <p className="text-sm font-bold text-beastly-green">
                            5 tendances détectées pour la semaine du 24 fév. — optimisées pour vos événements Beastly
                        </p>
                    </div>

                    <div className="space-y-4">
                        {TRENDS.slice(0, visibleCount).map(trend => (
                            <div
                                key={trend.id}
                                className="p-5 bg-beastly-beige rounded-2xl flex gap-4 items-start group hover:scale-[1.01] transition-transform duration-200"
                            >
                                <div
                                    className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                                    style={{ backgroundColor: trend.color + '30', color: trend.color }}
                                >
                                    {trend.icon}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                                        <span className="text-[9px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded-full bg-beastly-dark/10 text-beastly-dark/50">
                                            {trend.category}
                                        </span>
                                        <div className="flex gap-1">
                                            {trend.platforms.map(p => (
                                                <span key={p} className="text-[9px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded-full bg-beastly-dark text-beastly-beige">
                                                    {p}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                    <h3 className="font-black text-beastly-dark text-base">{trend.title}</h3>
                                    <p className="text-xs font-bold text-beastly-dark/60 mt-1 leading-relaxed">{trend.description}</p>
                                </div>
                                <div className="shrink-0 text-right">
                                    <span
                                        className="text-sm font-black px-3 py-1.5 rounded-full"
                                        style={{ backgroundColor: trend.color + '30', color: trend.color }}
                                    >
                                        {trend.boost}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>

                    {visibleCount === TRENDS.length && (
                        <div className="text-center">
                            <button className="px-6 py-3 bg-beastly-beige/10 border border-beastly-beige/10 rounded-full text-xs font-extrabold text-beastly-beige/50 uppercase tracking-wider hover:text-beastly-beige hover:border-beastly-beige/30 transition-all">
                                Rafraîchir l'analyse
                            </button>
                        </div>
                    )}
                </>
            )}
        </div>
    );
}
