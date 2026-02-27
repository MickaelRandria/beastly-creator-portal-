import React, { useState } from 'react';
import { Download, FolderOpen, Image, FileText, Send, X, CheckSquare, Square, Users } from 'lucide-react';
import { SelectedInfluencer } from '../types';

interface Asset {
    id: string;
    name: string;
    type: 'image' | 'pdf' | 'zip' | 'video';
    brand: string;
    size: string;
    thumbnail: string;
    description: string;
}

interface AssetBoxProps {
    invitedInfluencers: SelectedInfluencer[];
    onAssetsSent: () => void;
}

const ASSETS: Asset[] = [
    { id: 'a1', name: 'Charte Graphique Beastly', type: 'pdf', brand: 'Beastly', size: '4.2 MB', thumbnail: 'https://picsum.photos/seed/brand1/400/300', description: 'Couleurs, typographies, règles d\'usage du logo' },
    { id: 'a2', name: 'Logo Pack Beastly', type: 'zip', brand: 'Beastly', size: '12 MB', thumbnail: 'https://picsum.photos/seed/brand2/400/300', description: 'SVG, PNG, versions sombre et claire' },
    { id: 'ft1', name: 'Kit Visuel FuzeTea Passion', type: 'zip', brand: 'FuzeTea', size: '245 MB', thumbnail: 'https://picsum.photos/seed/fuzetea_kit/400/300', description: 'Photos HD stand Solidays, visuels tropicaux, packshot bouteille' },
    { id: 'ft2', name: 'Guidelines Créateurs FuzeTea', type: 'pdf', brand: 'FuzeTea', size: '3.1 MB', thumbnail: 'https://picsum.photos/seed/fuzetea_guide/400/300', description: 'Do & don\'t, hashtags officiels, exemples de posts' },
    { id: 'ft3', name: 'Templates Stories FuzeTea', type: 'image', brand: 'FuzeTea', size: '18 MB', thumbnail: 'https://picsum.photos/seed/fuzetea_story/400/300', description: 'Templates Canva pour Stories : ambiance jardin tropical' },
    { id: 'ft4', name: 'Mood Board Solidays 2026', type: 'image', brand: 'FuzeTea', size: '8.4 MB', thumbnail: 'https://picsum.photos/seed/fuzetea_mood/400/300', description: 'Références visuelles : festival, été, tropical, piscine' },
    { id: 'a5', name: 'Kit Press Nike Pop-up', type: 'zip', brand: 'Nike', size: '187 MB', thumbnail: 'https://picsum.photos/seed/nike1/400/300', description: 'Visuels Air Max 2025, look book, BD images' },
    { id: 'a6', name: 'Guidelines Créateurs Nike', type: 'pdf', brand: 'Nike', size: '2.1 MB', thumbnail: 'https://picsum.photos/seed/nike2/400/300', description: 'Messaging, ton de voix, hashtags officiels' },
];

const typeIcons: Record<string, React.ReactNode> = {
    pdf: <FileText size={12} />,
    zip: <FolderOpen size={12} />,
    image: <Image size={12} />,
    video: <FolderOpen size={12} />,
};

const brands = ['Tous', ...Array.from(new Set(ASSETS.map(a => a.brand)))];

const MOCK_INFLUENCERS: SelectedInfluencer[] = [
    { id: 'mock1', name: 'Léa Martin', handle: '@lea.festival', followers: 34000, engagement: 6.2, platform: 'Instagram', niche: 'Lifestyle', avatar: 'https://picsum.photos/seed/lea/100' },
    { id: 'mock2', name: 'Hugo Durand', handle: '@hugo.taste', followers: 18000, engagement: 8.1, platform: 'TikTok', niche: 'Food', avatar: 'https://picsum.photos/seed/hugo/100' },
    { id: 'mock3', name: 'Sarah Benali', handle: '@sarah.vibes', followers: 52000, engagement: 4.9, platform: 'Instagram', niche: 'Lifestyle', avatar: 'https://picsum.photos/seed/sarah/100' },
];

export default function AssetBox({ invitedInfluencers, onAssetsSent }: AssetBoxProps) {
    const [selectedBrand, setSelectedBrand] = useState('Tous');
    const [downloaded, setDownloaded] = useState<Set<string>>(new Set());

    // Send modal state
    const [sendModalAsset, setSendModalAsset] = useState<Asset | null>(null);
    const [sendChecked, setSendChecked] = useState<Set<string>>(new Set());
    const [sentAssets, setSentAssets] = useState<Set<string>>(new Set());
    const [sendState, setSendState] = useState<'idle' | 'sending' | 'sent'>('idle');

    const influencers = invitedInfluencers.length > 0 ? invitedInfluencers : MOCK_INFLUENCERS;
    const filtered = ASSETS.filter(a => selectedBrand === 'Tous' || a.brand === selectedBrand);

    const handleDownload = (id: string) => {
        setDownloaded(prev => new Set(prev).add(id));
        setTimeout(() => {
            setDownloaded(prev => {
                const next = new Set(prev);
                next.delete(id);
                return next;
            });
        }, 2000);
    };

    const openSendModal = (asset: Asset) => {
        setSendModalAsset(asset);
        setSendChecked(new Set(influencers.map(i => i.id)));
        setSendState('idle');
    };

    const closeSendModal = () => {
        setSendModalAsset(null);
        setSendChecked(new Set());
        setSendState('idle');
    };

    const toggleSendCheck = (id: string) => {
        setSendChecked(prev => {
            const next = new Set(prev);
            if (next.has(id)) next.delete(id);
            else next.add(id);
            return next;
        });
    };

    const toggleAllSend = () => {
        if (sendChecked.size === influencers.length) {
            setSendChecked(new Set());
        } else {
            setSendChecked(new Set(influencers.map(i => i.id)));
        }
    };

    const confirmSend = () => {
        setSendState('sending');
        setTimeout(() => {
            setSendState('sent');
            setSentAssets(prev => {
                const next = new Set(prev).add(sendModalAsset!.id);
                // Advance stepper only on first asset sent
                if (prev.size === 0) onAssetsSent();
                return next;
            });
            setTimeout(closeSendModal, 1500);
        }, 1500);
    };

    return (
        <div className="space-y-5">
            {/* Header */}
            <div>
                <h1 className="text-3xl font-black text-beastly-beige">Asset Box</h1>
                <p className="text-sm font-bold text-beastly-beige/40 mt-1">Ressources & kits créatifs par marque</p>
            </div>

            {/* Brand filter */}
            <div className="flex gap-2 flex-wrap">
                {brands.map(b => (
                    <button
                        key={b}
                        onClick={() => setSelectedBrand(b)}
                        className={`px-4 py-2 rounded-full text-xs font-extrabold uppercase tracking-wider transition-all ${selectedBrand === b ? 'bg-beastly-green text-beastly-dark' : 'bg-beastly-beige/10 text-beastly-beige/50 hover:text-beastly-beige border border-beastly-beige/10'}`}
                    >{b}</button>
                ))}
            </div>

            {/* Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {filtered.map(asset => (
                    <div key={asset.id} className="bg-beastly-beige rounded-2xl overflow-hidden group">
                        <div className="relative overflow-hidden">
                            <img
                                src={asset.thumbnail}
                                alt={asset.name}
                                className="w-full h-36 object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                            />
                            <div className="absolute top-2 left-2">
                                <span className="flex items-center gap-1 text-[9px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded-full bg-beastly-dark/80 text-beastly-beige">
                                    {typeIcons[asset.type]} {asset.type.toUpperCase()}
                                </span>
                            </div>
                            {sentAssets.has(asset.id) && (
                                <div className="absolute top-2 right-2">
                                    <span className="text-[9px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded-full bg-beastly-green text-beastly-dark">
                                        Envoyé ✓
                                    </span>
                                </div>
                            )}
                        </div>
                        <div className="p-4 space-y-2">
                            <div>
                                <p className="font-black text-beastly-dark text-sm leading-tight">{asset.name}</p>
                                <p className="text-[10px] font-extrabold text-beastly-dark/40 uppercase tracking-wider mt-0.5">{asset.brand} · {asset.size}</p>
                            </div>
                            <p className="text-xs font-bold text-beastly-dark/50 leading-relaxed">{asset.description}</p>
                            <div className="flex gap-2">
                                <button
                                    onClick={() => handleDownload(asset.id)}
                                    className={`flex-1 py-2.5 rounded-xl text-xs font-extrabold uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all ${
                                        downloaded.has(asset.id)
                                            ? 'bg-beastly-green text-beastly-dark'
                                            : 'bg-beastly-dark text-beastly-beige hover:bg-beastly-dark/80'
                                    }`}
                                >
                                    <Download size={12} />
                                    {downloaded.has(asset.id) ? 'Téléchargé ✓' : 'Télécharger'}
                                </button>
                                <button
                                    onClick={() => openSendModal(asset)}
                                    className="px-3 py-2.5 rounded-xl bg-beastly-dark/10 text-beastly-dark hover:bg-beastly-dark hover:text-beastly-green transition-all flex items-center justify-center"
                                    title="Envoyer aux créateurs"
                                >
                                    <Send size={13} />
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Send Modal */}
            {sendModalAsset && (
                <div className="fixed inset-0 bg-black/70 z-50 flex items-end sm:items-center justify-center p-4 sm:p-4" onClick={closeSendModal}>
                    <div
                        className="bg-beastly-beige rounded-3xl w-full max-w-sm flex flex-col max-h-[85vh] shadow-2xl"
                        onClick={e => e.stopPropagation()}
                    >
                        {/* Header — fixe */}
                        <div className="flex items-start justify-between p-6 pb-4 shrink-0">
                            <div>
                                <p className="text-[10px] font-extrabold uppercase tracking-[0.15em] text-beastly-dark/40">Envoyer l'asset</p>
                                <h2 className="text-lg font-black text-beastly-dark leading-tight">{sendModalAsset.name}</h2>
                            </div>
                            <button onClick={closeSendModal} className="w-8 h-8 rounded-full bg-beastly-dark/10 flex items-center justify-center hover:bg-beastly-dark/20 transition-colors shrink-0">
                                <X size={14} className="text-beastly-dark" />
                            </button>
                        </div>

                        {sendState !== 'sent' ? (
                            <>
                                {/* Liste scrollable */}
                                <div className="flex-1 overflow-y-auto px-6 pb-2 min-h-0">
                                    {invitedInfluencers.length === 0 && (
                                        <div className="p-3 bg-beastly-orange/10 rounded-xl mb-3">
                                            <p className="text-[11px] font-bold text-beastly-orange leading-relaxed">Aucun créateur sélectionné dans le Sourcing — profils de démo.</p>
                                        </div>
                                    )}
                                    <div className="flex items-center justify-between mb-2">
                                        <p className="text-[10px] font-extrabold uppercase tracking-[0.15em] text-beastly-dark/40 flex items-center gap-1.5">
                                            <Users size={11} /> {influencers.length} destinataire{influencers.length !== 1 ? 's' : ''}
                                        </p>
                                        <button onClick={toggleAllSend} className="text-[10px] font-extrabold text-beastly-dark/50 hover:text-beastly-dark transition-colors">
                                            {sendChecked.size === influencers.length ? 'Tout désélectionner' : 'Sélectionner tous'}
                                        </button>
                                    </div>
                                    <div className="space-y-1.5">
                                        {influencers.map(inf => (
                                            <button
                                                key={inf.id}
                                                onClick={() => toggleSendCheck(inf.id)}
                                                className="w-full flex items-center gap-3 p-3 rounded-xl bg-beastly-dark/5 hover:bg-beastly-dark/10 transition-colors"
                                            >
                                                <img src={inf.avatar} alt={inf.name} className="w-8 h-8 rounded-full shrink-0" />
                                                <div className="flex-1 text-left min-w-0">
                                                    <p className="text-xs font-black text-beastly-dark truncate">{inf.name}</p>
                                                    <p className="text-[10px] font-bold text-beastly-dark/40">{inf.handle}</p>
                                                </div>
                                                {sendChecked.has(inf.id)
                                                    ? <CheckSquare size={16} className="text-beastly-green fill-beastly-green shrink-0" />
                                                    : <Square size={16} className="text-beastly-dark/30 shrink-0" />
                                                }
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {/* Bouton épinglé en bas */}
                                <div className="p-6 pt-4 shrink-0 border-t border-beastly-dark/10">
                                    <button
                                        onClick={confirmSend}
                                        disabled={sendChecked.size === 0 || sendState === 'sending'}
                                        className="w-full py-3.5 bg-beastly-dark text-beastly-green font-extrabold text-sm uppercase tracking-wider rounded-2xl hover:bg-beastly-dark/80 transition-all disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                                    >
                                        <Send size={15} />
                                        {sendState === 'sending'
                                            ? 'Envoi en cours...'
                                            : `Confirmer l'envoi (${sendChecked.size})`
                                        }
                                    </button>
                                </div>
                            </>
                        ) : (
                            <div className="flex flex-col items-center gap-3 py-8 px-6">
                                <div className="w-14 h-14 bg-beastly-green/20 rounded-full flex items-center justify-center">
                                    <Send size={24} className="text-beastly-green" />
                                </div>
                                <p className="text-base font-black text-beastly-dark">Asset envoyé !</p>
                                <p className="text-xs font-bold text-beastly-dark/50 text-center">
                                    {sendModalAsset.name} partagé avec {sendChecked.size} créateur{sendChecked.size !== 1 ? 's' : ''}.
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}
