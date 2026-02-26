import React, { useState } from 'react';
import { Download, FolderOpen, Image, FileText, Info } from 'lucide-react';

interface Asset {
    id: string;
    name: string;
    type: 'image' | 'pdf' | 'zip' | 'video';
    brand: string;
    size: string;
    thumbnail: string;
    description: string;
}

const ASSETS: Asset[] = [
    { id: 'a1', name: 'Charte Graphique Beastly', type: 'pdf', brand: 'Beastly', size: '4.2 MB', thumbnail: 'https://picsum.photos/seed/brand1/400/300', description: 'Couleurs, typographies, règles d\'usage du logo' },
    { id: 'a2', name: 'Logo Pack Beastly', type: 'zip', brand: 'Beastly', size: '12 MB', thumbnail: 'https://picsum.photos/seed/brand2/400/300', description: 'SVG, PNG, versions sombre et claire' },
    { id: 'a3', name: 'Guidelines Jacquemus AW25', type: 'pdf', brand: 'Jacquemus', size: '8.7 MB', thumbnail: 'https://picsum.photos/seed/jacq1/400/300', description: 'Brief créatif, do & don\'t, exemples de posts' },
    { id: 'a4', name: 'Assets Visuels Jacquemus', type: 'zip', brand: 'Jacquemus', size: '340 MB', thumbnail: 'https://picsum.photos/seed/jacq2/400/300', description: 'Photos HD collection, fond blanc et lifestyle' },
    { id: 'a5', name: 'Kit Press Nike Pop-up', type: 'zip', brand: 'Nike', size: '187 MB', thumbnail: 'https://picsum.photos/seed/nike1/400/300', description: 'Visuels Air Max 2025, look book, BD images' },
    { id: 'a6', name: 'Guidelines Créateurs Nike', type: 'pdf', brand: 'Nike', size: '2.1 MB', thumbnail: 'https://picsum.photos/seed/nike2/400/300', description: 'Messaging, ton de voix, hashtags officiels' },
    { id: 'a7', name: 'Template Story Sézane', type: 'image', brand: 'Sézane', size: '650 KB', thumbnail: 'https://picsum.photos/seed/sez1/400/300', description: 'Template PSD pour Stories printanières' },
    { id: 'a8', name: 'Mood Board Brunch Sézane', type: 'image', brand: 'Sézane', size: '3.4 MB', thumbnail: 'https://picsum.photos/seed/sez2/400/300', description: 'Références visuelles pour le brunch créateurs' },
];

const typeIcons: Record<string, React.ReactNode> = {
    pdf: <FileText size={12} />,
    zip: <FolderOpen size={12} />,
    image: <Image size={12} />,
    video: <FolderOpen size={12} />,
};

const brands = ['Tous', ...Array.from(new Set(ASSETS.map(a => a.brand)))];

export default function AssetBox() {
    const [selectedBrand, setSelectedBrand] = useState('Tous');
    const [downloaded, setDownloaded] = useState<Set<string>>(new Set());

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
                        </div>
                        <div className="p-4 space-y-2">
                            <div>
                                <p className="font-black text-beastly-dark text-sm leading-tight">{asset.name}</p>
                                <p className="text-[10px] font-extrabold text-beastly-dark/40 uppercase tracking-wider mt-0.5">{asset.brand} · {asset.size}</p>
                            </div>
                            <p className="text-xs font-bold text-beastly-dark/50 leading-relaxed">{asset.description}</p>
                            <button
                                onClick={() => handleDownload(asset.id)}
                                className={`w-full py-2.5 rounded-xl text-xs font-extrabold uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all ${downloaded.has(asset.id)
                                        ? 'bg-beastly-green text-beastly-dark'
                                        : 'bg-beastly-dark text-beastly-beige hover:bg-beastly-dark/80'
                                    }`}
                            >
                                <Download size={12} />
                                {downloaded.has(asset.id) ? 'Téléchargé ✓' : 'Télécharger'}
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
