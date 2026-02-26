import React, { useState } from 'react';
import contentsData from '../../data/contents.json';
import { Upload, Image, Video, CheckCircle2, Clock, XCircle, Plus, Eye, Heart, ScanSearch, Sparkles } from 'lucide-react';
import { GlowLightning } from '../../components/BeastlyIcons';

const MY_CONTENTS = (contentsData as any[]).filter(c => c.creatorId === 'c01');

const statusConfig: Record<string, { label: string; icon: React.ReactNode; cls: string }> = {
    Pending: { label: 'En attente', icon: <Clock size={12} />, cls: 'bg-beastly-orange/20 text-beastly-orange' },
    Validated: { label: 'Validé ✓', icon: <CheckCircle2 size={12} />, cls: 'bg-beastly-green/20 text-beastly-green' },
    Refused: { label: 'Refusé', icon: <XCircle size={12} />, cls: 'bg-red-100 text-red-500' },
};

function formatNum(n: number) {
    if (n >= 1000) return `${(n / 1000).toFixed(0)}k`;
    return `${n}`;
}

export default function CreatorUpload() {
    const [contents, setContents] = useState(MY_CONTENTS);
    const [showForm, setShowForm] = useState(false);
    const [dragging, setDragging] = useState(false);
    const [uploading, setUploading] = useState(false);
    const [scanning, setScanning] = useState(false);
    const [scannedData, setScannedData] = useState<{ views?: number, likes?: number, comments?: number } | null>(null);
    const [form, setForm] = useState({ type: 'Reel IG', caption: '' });

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        setDragging(false);
        setScanning(true);
        // Simulate Gemini Vision API extracting metrics from a screenshot
        setTimeout(() => {
            setScanning(false);
            setScannedData({
                views: Math.floor(Math.random() * 50000) + 15000,
                likes: Math.floor(Math.random() * 5000) + 1200,
                comments: Math.floor(Math.random() * 300) + 40,
            });
        }, 2500);
    };

    const handleFakeUpload = () => {
        setUploading(true);
        setTimeout(() => {
            const newContent = {
                id: `ct_new_${Date.now()}`,
                creatorId: 'c01',
                creatorName: 'Léa Moreau',
                eventId: 'ev01',
                eventName: 'Soirée Lancement AW25',
                brand: 'Jacquemus',
                type: form.type,
                thumbnail: `https://picsum.photos/seed/new${Date.now()}/400/500`,
                submittedAt: new Date().toISOString().split('T')[0],
                status: 'Pending',
                views: scannedData ? scannedData.views : null,
                likes: scannedData ? scannedData.likes : null,
            };
            setContents(prev => [newContent, ...prev]);
            setUploading(false);
            setShowForm(false);
            setForm({ type: 'Reel IG', caption: '' });
            setScannedData(null);
        }, 2000);
    };

    return (
        <div className="max-w-2xl mx-auto space-y-5">

            {/* Header */}
            <div className="flex items-start justify-between">
                <div>
                    <h1 className="text-3xl font-black text-beastly-beige">Mes contenus</h1>
                    <p className="text-sm font-bold text-beastly-beige/40 mt-1">Soirée Lancement AW25 — Jacquemus</p>
                </div>
                <button
                    onClick={() => setShowForm(true)}
                    className="flex items-center gap-2 px-5 py-3 bg-beastly-green text-beastly-dark text-sm font-extrabold rounded-full uppercase tracking-wider hover:brightness-110 transition-all"
                >
                    <Plus size={15} /> Déposer
                </button>
            </div>

            {/* Upload zone */}
            {showForm && (
                <div className="p-6 bg-beastly-beige rounded-2xl space-y-4">
                    <h2 className="text-lg font-black text-beastly-dark">Nouveau contenu</h2>

                    {/* Drop zone with AI Scanner */}
                    {!scannedData && !scanning ? (
                        <div
                            onDragOver={e => { e.preventDefault(); setDragging(true); }}
                            onDragLeave={() => setDragging(false)}
                            onDrop={handleDrop}
                            className={[
                                'border-2 border-dashed rounded-2xl p-10 flex flex-col items-center gap-3 transition-all cursor-pointer relative overflow-hidden',
                                dragging ? 'border-beastly-dark bg-beastly-dark/5 scale-[1.02]' : 'border-beastly-dark/20 hover:border-beastly-dark/40 hover:bg-white/50'
                            ].join(' ')}
                        >
                            <div className="w-14 h-14 rounded-full bg-beastly-dark/10 flex items-center justify-center">
                                <Upload size={24} className="text-beastly-dark/40" />
                            </div>
                            <div className="text-center">
                                <p className="font-extrabold text-beastly-dark text-sm">Glisse ton screenshot ici</p>
                                <p className="text-xs font-bold text-beastly-dark/40 mt-1">L'IA Gemini s'occupe de lire tes stats</p>
                            </div>
                        </div>
                    ) : scanning ? (
                        <div className="border-2 border-beastly-green/50 bg-beastly-green/10 rounded-2xl p-10 flex flex-col items-center gap-4 relative overflow-hidden">
                            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-beastly-green to-transparent opacity-50 scan-line-animation" />
                            <ScanSearch size={40} className="text-beastly-dark animate-pulse" />
                            <div className="text-center">
                                <p className="font-black text-beastly-dark text-sm flex items-center gap-2 justify-center">
                                    <Sparkles size={14} className="text-beastly-dark" /> Analyse IA en cours...
                                </p>
                                <p className="text-xs font-bold text-beastly-dark/50 mt-1">Extraction des vues et likes via Gemini Vision</p>
                            </div>
                        </div>
                    ) : (
                        <div className="border border-beastly-green/20 bg-beastly-green/5 rounded-2xl p-6 relative">
                            <div className="flex justify-between items-start mb-4">
                                <div>
                                    <p className="font-black text-beastly-dark text-sm flex items-center gap-1.5 border border-beastly-green/30 bg-beastly-green/20 px-3 py-1 rounded-full w-max text-[10px] uppercase tracking-wider">
                                        <Sparkles size={12} className="text-beastly-dark" /> Stats extraites
                                    </p>
                                </div>
                                <button onClick={() => setScannedData(null)} className="text-xs font-bold text-beastly-dark/40 hover:text-black">Refaire</button>
                            </div>
                            <div className="grid grid-cols-3 gap-3">
                                <div className="p-3 bg-white rounded-xl text-center border border-beastly-dark/5">
                                    <p className="text-lg font-black text-beastly-dark">{formatNum(scannedData?.views || 0)}</p>
                                    <p className="text-[9px] font-extrabold uppercase tracking-wider text-beastly-dark/40 mt-0.5">Vues</p>
                                </div>
                                <div className="p-3 bg-white rounded-xl text-center border border-beastly-dark/5">
                                    <p className="text-lg font-black text-beastly-dark">{formatNum(scannedData?.likes || 0)}</p>
                                    <p className="text-[9px] font-extrabold uppercase tracking-wider text-beastly-dark/40 mt-0.5">Likes</p>
                                </div>
                                <div className="p-3 bg-white rounded-xl text-center border border-beastly-dark/5">
                                    <p className="text-lg font-black text-beastly-dark">{formatNum(scannedData?.comments || 0)}</p>
                                    <p className="text-[9px] font-extrabold uppercase tracking-wider text-beastly-dark/40 mt-0.5">Coms</p>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Type select */}
                    <div>
                        <label className="text-[10px] font-extrabold uppercase tracking-[0.15em] text-beastly-dark/50 block mb-1.5">Type de contenu</label>
                        <div className="flex gap-2 flex-wrap">
                            {['Reel IG', 'Story IG', 'TikTok', 'Photo Feed'].map(t => (
                                <button
                                    key={t}
                                    onClick={() => setForm(prev => ({ ...prev, type: t }))}
                                    className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-extrabold transition-all ${form.type === t ? 'bg-beastly-dark text-beastly-green' : 'bg-beastly-dark/10 text-beastly-dark/60 hover:bg-beastly-dark/20'}`}
                                >
                                    {t.includes('TikTok') || t.includes('Reel') ? <Video size={12} /> : <Image size={12} />}
                                    {t}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Caption */}
                    <div>
                        <label className="text-[10px] font-extrabold uppercase tracking-[0.15em] text-beastly-dark/50 block mb-1.5">Caption (optionnel)</label>
                        <textarea
                            rows={2}
                            placeholder="Propose une légende pour ton contenu…"
                            value={form.caption}
                            onChange={e => setForm(prev => ({ ...prev, caption: e.target.value }))}
                            className="w-full bg-beastly-dark/5 border border-beastly-dark/10 rounded-xl px-4 py-3 text-sm font-bold text-beastly-dark placeholder:text-beastly-dark/30 focus:outline-none focus:border-beastly-dark/40 resize-none"
                        />
                    </div>

                    <div className="flex gap-3">
                        <button
                            onClick={() => setShowForm(false)}
                            className="flex-1 py-3 bg-beastly-dark/10 text-beastly-dark text-sm font-extrabold rounded-xl uppercase tracking-wider hover:bg-beastly-dark/20 transition-all"
                        >
                            Annuler
                        </button>
                        <button
                            onClick={handleFakeUpload}
                            disabled={uploading}
                            className="flex-1 py-3 bg-beastly-dark text-beastly-green text-sm font-extrabold rounded-xl uppercase tracking-wider hover:bg-beastly-dark/80 transition-all disabled:opacity-50 flex items-center justify-center gap-2"
                        >
                            {uploading ? (
                                <>
                                    <div className="w-4 h-4 border-2 border-beastly-green/30 border-t-beastly-green rounded-full animate-spin" />
                                    Envoi…
                                </>
                            ) : 'Envoyer'}
                        </button>
                    </div>
                </div>
            )}

            {/* Status summary */}
            <div className="grid grid-cols-3 gap-3">
                {[
                    { label: 'Total', value: contents.length, cls: 'text-beastly-beige' },
                    { label: 'En attente', value: contents.filter(c => c.status === 'Pending').length, cls: 'text-beastly-orange' },
                    { label: 'Validés', value: contents.filter(c => c.status === 'Validated').length, cls: 'text-beastly-green' },
                ].map(s => (
                    <div key={s.label} className="p-4 bg-beastly-beige rounded-2xl text-center">
                        <p className={`text-3xl font-black ${s.cls}`}>{s.value}</p>
                        <p className="text-[10px] font-extrabold text-beastly-dark/40 uppercase tracking-wider mt-0.5">{s.label}</p>
                    </div>
                ))}
            </div>

            {/* Contents list */}
            <div className="space-y-3">
                {contents.map((content: any) => {
                    const sc = statusConfig[content.status];
                    return (
                        <div key={content.id} className="flex gap-4 p-4 bg-beastly-beige rounded-2xl items-center">
                            <img
                                src={content.thumbnail}
                                alt={content.type}
                                className="w-16 h-16 rounded-xl object-cover shrink-0"
                            />
                            <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2 mb-1">
                                    <span className="text-[10px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded-full bg-beastly-dark text-beastly-beige">
                                        {content.type}
                                    </span>
                                    <span className={`flex items-center gap-1 text-[10px] font-extrabold px-2 py-0.5 rounded-full ${sc.cls}`}>
                                        {sc.icon} {sc.label}
                                    </span>
                                </div>
                                <p className="text-xs font-bold text-beastly-dark/50">Déposé le {content.submittedAt}</p>
                                {content.views !== null && (
                                    <div className="flex items-center gap-3 mt-1">
                                        <span className="flex items-center gap-1 text-xs font-extrabold text-beastly-dark/60"><Eye size={11} /> {formatNum(content.views!)}</span>
                                        <span className="flex items-center gap-1 text-xs font-extrabold text-beastly-dark/60"><Heart size={11} /> {formatNum(content.likes!)}</span>
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
