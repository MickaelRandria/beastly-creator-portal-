import React, { useState } from 'react';
import contentsData from '../data/contents.json';
import eventsData from '../data/events.json';
import { CheckCircle2, XCircle, Clock, Upload, Eye, Heart, Filter } from 'lucide-react';

interface Content {
    id: string;
    creatorId: string;
    creatorName: string;
    eventId: string;
    eventName: string;
    brand: string;
    type: string;
    thumbnail: string;
    submittedAt: string;
    status: string;
    views: number | null;
    likes: number | null;
}

const statusConfig: Record<string, { label: string; icon: React.ReactNode; cls: string }> = {
    Pending: { label: 'En attente', icon: <Clock size={12} />, cls: 'bg-beastly-orange/20 text-beastly-orange' },
    Validated: { label: 'Validé', icon: <CheckCircle2 size={12} />, cls: 'bg-beastly-green/20 text-beastly-green' },
    Refused: { label: 'Refusé', icon: <XCircle size={12} />, cls: 'bg-red-100 text-red-500' },
};

function formatNum(n: number) {
    if (n >= 1000000) return `${(n / 1000000).toFixed(1)}M`;
    if (n >= 1000) return `${(n / 1000).toFixed(0)}k`;
    return `${n}`;
}

export default function Contents() {
    const [contents, setContents] = useState<Content[]>(contentsData as Content[]);
    const [filterEvent, setFilterEvent] = useState('all');
    const [filterStatus, setFilterStatus] = useState('all');

    const events = eventsData;

    const filtered = contents.filter(c => {
        const matchEvent = filterEvent === 'all' || c.eventId === filterEvent;
        const matchStatus = filterStatus === 'all' || c.status === filterStatus;
        return matchEvent && matchStatus;
    });

    const updateStatus = (id: string, status: string) => {
        setContents(prev => prev.map(c => c.id === id ? { ...c, status } : c));
    };

    const pending = contents.filter(c => c.status === 'Pending').length;
    const validated = contents.filter(c => c.status === 'Validated').length;

    return (
        <div className="space-y-5">
            {/* Header */}
            <div className="flex items-start justify-between">
                <div>
                    <h1 className="text-3xl font-black text-beastly-beige">Contenus déposés</h1>
                    <p className="text-sm font-bold text-beastly-beige/40 mt-1">Validez les créations de vos influenceurs</p>
                </div>
                <button className="flex items-center gap-2 px-5 py-3 bg-beastly-green text-beastly-dark text-sm font-extrabold rounded-full uppercase tracking-wider hover:brightness-110 transition-all">
                    <Upload size={15} /> Demander un dépôt
                </button>
            </div>

            {/* KPIs */}
            <div className="grid grid-cols-3 gap-4">
                <div className="p-5 bg-beastly-beige rounded-2xl">
                    <p className="text-4xl font-black text-beastly-dark">{contents.length}</p>
                    <p className="text-[10px] font-extrabold uppercase tracking-[0.15em] text-beastly-dark/40 mt-1">Total</p>
                </div>
                <div className="p-5 bg-beastly-beige rounded-2xl">
                    <p className="text-4xl font-black text-beastly-orange">{pending}</p>
                    <p className="text-[10px] font-extrabold uppercase tracking-[0.15em] text-beastly-dark/40 mt-1">En attente</p>
                </div>
                <div className="p-5 bg-beastly-beige rounded-2xl">
                    <p className="text-4xl font-black text-beastly-green">{validated}</p>
                    <p className="text-[10px] font-extrabold uppercase tracking-[0.15em] text-beastly-dark/40 mt-1">Validés</p>
                </div>
            </div>

            {/* Filters */}
            <div className="flex items-center gap-3 flex-wrap">
                <select
                    value={filterEvent}
                    onChange={e => setFilterEvent(e.target.value)}
                    className="bg-beastly-beige/10 border border-beastly-beige/10 rounded-xl px-4 py-2.5 text-sm font-bold text-beastly-beige focus:outline-none"
                >
                    <option value="all">Tous les événements</option>
                    {events.map(ev => <option key={ev.id} value={ev.id}>{ev.name}</option>)}
                </select>
                <div className="flex gap-2">
                    {['all', 'Pending', 'Validated', 'Refused'].map(s => (
                        <button
                            key={s}
                            onClick={() => setFilterStatus(s)}
                            className={`px-3 py-2 rounded-xl text-xs font-extrabold transition-all ${filterStatus === s ? 'bg-beastly-green text-beastly-dark' : 'bg-beastly-beige/10 text-beastly-beige/50 hover:text-beastly-beige'}`}
                        >
                            {s === 'all' ? 'Tout' : s === 'Pending' ? 'En attente' : s === 'Validated' ? 'Validé' : 'Refusé'}
                        </button>
                    ))}
                </div>
            </div>

            {/* Content grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {filtered.map(content => {
                    const sc = statusConfig[content.status];
                    return (
                        <div key={content.id} className="bg-beastly-beige rounded-2xl overflow-hidden group">
                            <div className="relative">
                                <img
                                    src={content.thumbnail}
                                    alt={content.type}
                                    className="w-full h-48 object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                                />
                                <div className="absolute top-2 right-2">
                                    <span className={`flex items-center gap-1 text-[10px] font-extrabold px-2.5 py-1 rounded-full ${sc.cls}`}>
                                        {sc.icon} {sc.label}
                                    </span>
                                </div>
                                <div className="absolute bottom-2 left-2">
                                    <span className="text-[10px] font-extrabold px-2.5 py-1 rounded-full bg-beastly-dark/80 text-beastly-beige">
                                        {content.type}
                                    </span>
                                </div>
                            </div>
                            <div className="p-4 space-y-3">
                                <div>
                                    <p className="font-black text-beastly-dark text-sm">{content.creatorName}</p>
                                    <p className="text-xs font-bold text-beastly-dark/50">{content.eventName} · {content.brand}</p>
                                    <p className="text-[10px] font-bold text-beastly-dark/30 mt-0.5">Déposé le {content.submittedAt}</p>
                                </div>
                                {content.views !== null && (
                                    <div className="flex items-center gap-4">
                                        <span className="flex items-center gap-1 text-xs font-extrabold text-beastly-dark/60"><Eye size={12} /> {formatNum(content.views!)}</span>
                                        <span className="flex items-center gap-1 text-xs font-extrabold text-beastly-dark/60"><Heart size={12} /> {formatNum(content.likes!)}</span>
                                    </div>
                                )}
                                {content.status === 'Pending' && (
                                    <div className="flex gap-2">
                                        <button
                                            onClick={() => updateStatus(content.id, 'Validated')}
                                            className="flex-1 py-2 bg-beastly-green text-beastly-dark text-xs font-extrabold rounded-xl uppercase tracking-wider hover:brightness-110 transition-all"
                                        >
                                            ✓ Approuver
                                        </button>
                                        <button
                                            onClick={() => updateStatus(content.id, 'Refused')}
                                            className="flex-1 py-2 bg-beastly-dark/10 text-beastly-dark text-xs font-extrabold rounded-xl uppercase tracking-wider hover:bg-beastly-dark/20 transition-all"
                                        >
                                            ✕ Refuser
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
