import React, { useState } from 'react';
import eventsData from '../../data/events.json';
import { QRCodeSVG } from 'qrcode.react';
import { MapPin, Calendar, Clock, ChevronDown, ChevronUp } from 'lucide-react';
import { Brief } from '../../types';

const MY_EVENT = eventsData.find(e => e.id === 'ev01')!;

interface CreatorBriefProps {
    brief?: Brief | null;
}

export default function CreatorBrief({ brief }: CreatorBriefProps) {
    const [showQR, setShowQR] = useState(false);
    const [showMap, setShowMap] = useState(true);

    const deliverables = [
        { id: 1, label: '1× Reel Instagram (30–60s)', done: false },
        { id: 2, label: '3× Stories Instagram', done: true },
        { id: 3, label: 'Hashtags : #Jacquemus #AW25 #Beastly', done: false },
    ];

    return (
        <div className="max-w-2xl mx-auto space-y-5">

            {/* Header */}
            <div>
                <span className="inline-block text-[10px] font-extrabold uppercase tracking-wider px-3 py-1.5 rounded-full bg-beastly-green text-beastly-dark mb-3">
                    Invitation confirmée ✓
                </span>
                <h1 className="text-3xl font-black text-beastly-beige">{brief?.campaignName || MY_EVENT.name}</h1>
                <p className="text-base font-extrabold text-beastly-beige/50 mt-1">{brief?.brand || MY_EVENT.brand} × Beastly</p>
            </div>

            {/* Event info */}
            <div className="p-6 bg-beastly-beige rounded-2xl space-y-4">
                <div className="grid grid-cols-3 gap-3">
                    <div className="p-4 bg-beastly-dark rounded-xl text-center">
                        <Calendar size={16} className="text-beastly-green mx-auto mb-1" />
                        <p className="text-sm font-black text-beastly-beige">{MY_EVENT.date}</p>
                        <p className="text-[9px] font-extrabold text-beastly-beige/40 uppercase tracking-wider mt-0.5">Date</p>
                    </div>
                    <div className="p-4 bg-beastly-dark rounded-xl text-center">
                        <Clock size={16} className="text-beastly-green mx-auto mb-1" />
                        <p className="text-sm font-black text-beastly-beige">{MY_EVENT.time}</p>
                        <p className="text-[9px] font-extrabold text-beastly-beige/40 uppercase tracking-wider mt-0.5">Heure</p>
                    </div>
                    <div className="p-4 bg-beastly-dark rounded-xl text-center">
                        <MapPin size={16} className="text-beastly-green mx-auto mb-1" />
                        <p className="text-[10px] font-black text-beastly-beige leading-tight">{MY_EVENT.location.split(',')[0]}</p>
                        <p className="text-[9px] font-extrabold text-beastly-beige/40 uppercase tracking-wider mt-0.5">Lieu</p>
                    </div>
                </div>

                {/* Map toggle */}
                <div>
                    <button
                        onClick={() => setShowMap(!showMap)}
                        className="flex items-center gap-2 text-xs font-extrabold text-beastly-dark/50 uppercase tracking-wider mb-2 hover:text-beastly-dark transition-colors"
                    >
                        <MapPin size={12} /> {MY_EVENT.address}
                        {showMap ? <ChevronUp size={12} /> : <ChevronDown size={12} />}
                    </button>
                    {showMap && (
                        <div className="rounded-xl overflow-hidden h-44 border border-beastly-beige/10">
                            <iframe
                                title="Google Map"
                                className="w-full h-full grayscale invert-[.95] hue-rotate-[180deg] contrast-75 opacity-80"
                                style={{ border: 0 }}
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                                src={`https://www.google.com/maps?q=${encodeURIComponent(MY_EVENT.address)}&output=embed`}
                            />
                        </div>
                    )}
                </div>
            </div>

            {/* Brief */}
            <div className="p-6 bg-beastly-beige rounded-2xl space-y-3">
                <p className="text-[10px] font-extrabold uppercase tracking-[0.15em] text-beastly-dark/40">Brief créateur</p>
                <p className="text-sm font-bold text-beastly-dark/80 leading-relaxed">{MY_EVENT.brief}</p>
            </div>

            {/* Deliverables */}
            <div className="p-6 bg-beastly-beige rounded-2xl space-y-3">
                <p className="text-[10px] font-extrabold uppercase tracking-[0.15em] text-beastly-dark/40">Livrables attendus</p>
                <div className="space-y-2">
                    {brief?.deliverables ? (
                        brief.deliverables.map((d, i) => (
                            <div key={i} className="flex items-center gap-3 p-3 bg-beastly-dark/5 rounded-xl border border-beastly-dark/10">
                                <div className="w-5 h-5 rounded-full flex items-center justify-center shrink-0 border-2 border-beastly-dark/20" />
                                <span className="text-sm font-bold text-beastly-dark">{d}</span>
                            </div>
                        ))
                    ) : (
                        deliverables.map(d => (
                            <div key={d.id} className="flex items-center gap-3 p-3 bg-beastly-dark/5 rounded-xl border border-beastly-dark/10">
                                <div className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 ${d.done ? 'bg-beastly-green border-beastly-green' : 'border-2 border-beastly-dark/20'}`}>
                                    {d.done && <span className="text-beastly-dark text-[10px] font-black">✓</span>}
                                </div>
                                <span className={`text-sm font-bold ${d.done ? 'text-beastly-dark/40 line-through' : 'text-beastly-dark'}`}>{d.label}</span>
                            </div>
                        ))
                    )}
                </div>
            </div>

            {/* QR Code */}
            <div className="p-6 bg-beastly-beige rounded-2xl space-y-3">
                <p className="text-[10px] font-extrabold uppercase tracking-[0.15em] text-beastly-dark/40">Accès événement</p>
                <p className="text-xs font-bold text-beastly-dark/60">Présente ce QR code à l'entrée de l'événement.</p>
                <button
                    onClick={() => setShowQR(!showQR)}
                    className="w-full py-3 bg-beastly-dark text-beastly-beige text-sm font-extrabold rounded-xl uppercase tracking-wider hover:bg-beastly-dark/80 transition-all"
                >
                    {showQR ? 'Masquer mon QR Code' : '📱 Afficher mon QR Code d\'accès'}
                </button>
                {showQR && (
                    <div className="flex flex-col items-center gap-3 p-6 bg-white rounded-2xl">
                        <QRCodeSVG
                            value={`https://beastly.fr/checkin?creator=c01&event=${MY_EVENT.id}&name=Léa+Moreau`}
                            size={180}
                            bgColor="#ffffff"
                            fgColor="#000000"
                            level="H"
                        />
                        <p className="text-xs font-bold text-black/50 text-center">Léa Moreau — {MY_EVENT.brand} × Beastly</p>
                    </div>
                )}
            </div>
        </div>
    );
}
