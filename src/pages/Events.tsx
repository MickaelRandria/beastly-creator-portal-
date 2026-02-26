import React, { useState } from 'react';
import eventsData from '../data/events.json';
import { BeastlyMegaphone, BeastlyEye, GlowLightning } from '../components/BeastlyIcons';
import { QRCodeSVG } from 'qrcode.react';
import { MapPin, Calendar, Clock, Users, CheckCircle2, Plus, X, ChevronRight } from 'lucide-react';

interface Event {
    id: string;
    name: string;
    brand: string;
    date: string;
    time: string;
    location: string;
    address: string;
    brief: string;
    status: string;
    invitedCount: number;
    confirmedCount: number;
    contentCount: number;
    color: string;
}

const statusColors: Record<string, string> = {
    Active: 'bg-beastly-green text-beastly-dark',
    Upcoming: 'bg-beastly-blue text-beastly-dark',
    Completed: 'bg-beastly-dark/20 text-beastly-beige/60',
};

export default function Events() {
    const [events, setEvents] = useState<Event[]>(eventsData as Event[]);
    const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
    const [showForm, setShowForm] = useState(false);
    const [showQR, setShowQR] = useState<string | null>(null);
    const [form, setForm] = useState({
        name: '', brand: '', date: '', time: '', location: '', address: '', brief: ''
    });

    const handleCreate = () => {
        if (!form.name || !form.brand) return;
        const newEvent: Event = {
            id: `ev0${events.length + 1}`,
            ...form,
            status: 'Upcoming',
            invitedCount: 0,
            confirmedCount: 0,
            contentCount: 0,
            color: '#b4ff00',
            lat: 48.8566,
            lng: 2.3522,
        } as Event;
        setEvents(prev => [newEvent, ...prev]);
        setShowForm(false);
        setForm({ name: '', brand: '', date: '', time: '', location: '', address: '', brief: '' });
    };

    const qrValue = (ev: Event) =>
        `https://beastly.fr/event/${ev.id}?brand=${encodeURIComponent(ev.brand)}&event=${encodeURIComponent(ev.name)}`;

    return (
        <div className="grid grid-cols-1 md:grid-cols-12 gap-5 auto-rows-min">

            {/* Header */}
            <div className="md:col-span-12 flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-black text-beastly-beige">Briefs & Invitations</h1>
                    <p className="text-sm font-bold text-beastly-beige/40 mt-1">Gérez vos événements et briefez vos créateurs</p>
                </div>
                <button
                    onClick={() => setShowForm(true)}
                    className="flex items-center gap-2 px-5 py-3 bg-beastly-green text-beastly-dark text-sm font-extrabold rounded-full uppercase tracking-wider hover:brightness-110 transition-all"
                >
                    <Plus size={16} /> Nouvel Event
                </button>
            </div>

            {/* KPI Row */}
            <div className="md:col-span-4 p-6 bg-beastly-beige rounded-2xl flex flex-col gap-1">
                <p className="text-[11px] font-extrabold uppercase tracking-[0.15em] text-beastly-dark/40">Événements actifs</p>
                <p className="text-5xl font-black text-beastly-dark">{events.filter(e => e.status === 'Active').length}</p>
            </div>
            <div className="md:col-span-4 p-6 bg-beastly-beige rounded-2xl flex flex-col gap-1">
                <p className="text-[11px] font-extrabold uppercase tracking-[0.15em] text-beastly-dark/40">Invitations envoyées</p>
                <p className="text-5xl font-black text-beastly-dark">{events.reduce((a, e) => a + e.invitedCount, 0)}</p>
            </div>
            <div className="md:col-span-4 p-6 bg-beastly-beige rounded-2xl flex flex-col gap-1">
                <p className="text-[11px] font-extrabold uppercase tracking-[0.15em] text-beastly-dark/40">Confirmations</p>
                <p className="text-5xl font-black text-beastly-green">{events.reduce((a, e) => a + e.confirmedCount, 0)}</p>
            </div>

            {/* Events list */}
            <div className={`${selectedEvent ? 'md:col-span-7' : 'md:col-span-12'} space-y-3`}>
                {events.map(ev => (
                    <div
                        key={ev.id}
                        onClick={() => setSelectedEvent(selectedEvent?.id === ev.id ? null : ev)}
                        className={[
                            'p-5 rounded-2xl cursor-pointer transition-all duration-200 border-2',
                            selectedEvent?.id === ev.id
                                ? 'border-beastly-green bg-beastly-beige'
                                : 'border-transparent bg-beastly-beige hover:border-beastly-beige/60'
                        ].join(' ')}
                    >
                        <div className="flex items-start justify-between gap-4">
                            <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2 mb-1">
                                    <span className={`text-[10px] font-extrabold px-2.5 py-1 rounded-full uppercase tracking-wider ${statusColors[ev.status]}`}>
                                        {ev.status}
                                    </span>
                                    <span className="text-xs font-extrabold text-beastly-dark/40 uppercase tracking-wider">{ev.brand}</span>
                                </div>
                                <h3 className="text-lg font-black text-beastly-dark truncate">{ev.name}</h3>
                                <div className="flex items-center gap-4 mt-2 flex-wrap">
                                    <span className="flex items-center gap-1.5 text-xs font-bold text-beastly-dark/50">
                                        <Calendar size={12} /> {ev.date}
                                    </span>
                                    <span className="flex items-center gap-1.5 text-xs font-bold text-beastly-dark/50">
                                        <Clock size={12} /> {ev.time}
                                    </span>
                                    <span className="flex items-center gap-1.5 text-xs font-bold text-beastly-dark/50">
                                        <MapPin size={12} /> {ev.location}
                                    </span>
                                </div>
                            </div>
                            <div className="flex items-center gap-3 shrink-0">
                                <div className="text-right">
                                    <p className="text-xl font-black text-beastly-dark">{ev.confirmedCount}<span className="text-sm font-bold text-beastly-dark/40">/{ev.invitedCount}</span></p>
                                    <p className="text-[10px] font-extrabold text-beastly-dark/40 uppercase tracking-wider">Confirmés</p>
                                </div>
                                <ChevronRight size={16} className={`text-beastly-dark/30 transition-transform ${selectedEvent?.id === ev.id ? 'rotate-90' : ''}`} />
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Detail Panel */}
            {selectedEvent && (
                <div className="md:col-span-5 bg-beastly-beige rounded-2xl p-6 space-y-5 self-start sticky top-5">
                    <div className="flex justify-between items-start">
                        <div>
                            <p className="text-[10px] font-extrabold text-beastly-dark/40 uppercase tracking-wider">{selectedEvent.brand}</p>
                            <h2 className="text-xl font-black text-beastly-dark">{selectedEvent.name}</h2>
                        </div>
                        <button onClick={() => setSelectedEvent(null)} className="w-8 h-8 rounded-full bg-beastly-dark/10 flex items-center justify-center hover:bg-beastly-dark/20 transition-colors">
                            <X size={14} className="text-beastly-dark" />
                        </button>
                    </div>

                    {/* Map embed */}
                    <div className="rounded-xl overflow-hidden h-40 border border-beastly-beige/10">
                        <iframe
                            title="Google Map"
                            className="w-full h-full grayscale invert-[.95] hue-rotate-[180deg] contrast-75 opacity-80 bg-beastly-dark"
                            style={{ border: 0 }}
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                            src={`https://www.google.com/maps?q=${encodeURIComponent(selectedEvent.address)}&output=embed`}
                        />
                    </div>

                    {/* Brief */}
                    <div>
                        <p className="text-[10px] font-extrabold uppercase tracking-[0.15em] text-beastly-dark/40 mb-2">Brief créateur</p>
                        <p className="text-sm font-bold text-beastly-dark/70 leading-relaxed">{selectedEvent.brief}</p>
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-3 gap-3">
                        {[
                            { label: 'Invités', value: selectedEvent.invitedCount },
                            { label: 'Confirmés', value: selectedEvent.confirmedCount },
                            { label: 'Contenus', value: selectedEvent.contentCount },
                        ].map(s => (
                            <div key={s.label} className="p-3 bg-beastly-dark rounded-xl text-center">
                                <p className="text-xl font-black text-beastly-green">{s.value}</p>
                                <p className="text-[9px] font-extrabold text-beastly-beige/40 uppercase tracking-wider">{s.label}</p>
                            </div>
                        ))}
                    </div>

                    {/* QR Code */}
                    <div>
                        <button
                            onClick={() => setShowQR(showQR === selectedEvent.id ? null : selectedEvent.id)}
                            className="w-full py-3 bg-beastly-dark text-beastly-beige text-sm font-extrabold rounded-xl uppercase tracking-wider hover:bg-beastly-dark/80 transition-all flex items-center justify-center gap-2"
                        >
                            {showQR === selectedEvent.id ? 'Masquer le QR' : '📱 Générer QR Code invitation'}
                        </button>
                        {showQR === selectedEvent.id && (
                            <div className="mt-4 flex flex-col items-center gap-3 p-5 bg-white rounded-2xl">
                                <QRCodeSVG
                                    value={qrValue(selectedEvent)}
                                    size={160}
                                    bgColor="#ffffff"
                                    fgColor="#000000"
                                    level="H"
                                />
                                <p className="text-[10px] font-bold text-beastly-dark/50 text-center">Scanner pour accéder au brief</p>
                                <p className="text-[9px] font-extrabold text-beastly-dark/30 uppercase tracking-widest">{selectedEvent.brand} × Beastly</p>
                            </div>
                        )}
                    </div>
                </div>
            )}

            {/* Create form modal */}
            {showForm && (
                <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4">
                    <div className="bg-beastly-beige rounded-3xl p-8 w-full max-w-lg space-y-5">
                        <div className="flex justify-between items-center">
                            <h2 className="text-2xl font-black text-beastly-dark">Nouvel Événement</h2>
                            <button onClick={() => setShowForm(false)} className="w-9 h-9 rounded-full bg-beastly-dark/10 flex items-center justify-center hover:bg-beastly-dark/20">
                                <X size={16} className="text-beastly-dark" />
                            </button>
                        </div>
                        {[
                            { field: 'name', label: "Nom de l'événement", placeholder: "Soirée Lancement AW25" },
                            { field: 'brand', label: 'Marque', placeholder: 'Nike, Jacquemus…' },
                            { field: 'date', label: 'Date', placeholder: '2025-04-15', type: 'date' },
                            { field: 'time', label: 'Heure', placeholder: '19h00' },
                            { field: 'location', label: 'Lieu', placeholder: 'Palais Royal, Paris 1er' },
                            { field: 'address', label: 'Adresse complète', placeholder: 'Place du Palais Royal, 75001 Paris' },
                        ].map(({ field, label, placeholder, type }) => (
                            <div key={field}>
                                <label className="text-[10px] font-extrabold uppercase tracking-[0.15em] text-beastly-dark/50 block mb-1.5">{label}</label>
                                <input
                                    type={type || 'text'}
                                    placeholder={placeholder}
                                    value={(form as any)[field]}
                                    onChange={e => setForm(prev => ({ ...prev, [field]: e.target.value }))}
                                    className="w-full bg-beastly-dark/5 border border-beastly-dark/10 rounded-xl px-4 py-3 text-sm font-bold text-beastly-dark placeholder:text-beastly-dark/30 focus:outline-none focus:border-beastly-dark/40"
                                />
                            </div>
                        ))}
                        <div>
                            <label className="text-[10px] font-extrabold uppercase tracking-[0.15em] text-beastly-dark/50 block mb-1.5">Brief créateur</label>
                            <textarea
                                rows={3}
                                placeholder="Décrivez les attentes créatives, les formats, les angles…"
                                value={form.brief}
                                onChange={e => setForm(prev => ({ ...prev, brief: e.target.value }))}
                                className="w-full bg-beastly-dark/5 border border-beastly-dark/10 rounded-xl px-4 py-3 text-sm font-bold text-beastly-dark placeholder:text-beastly-dark/30 focus:outline-none focus:border-beastly-dark/40 resize-none"
                            />
                        </div>
                        <button
                            onClick={handleCreate}
                            className="w-full py-4 bg-beastly-dark text-beastly-green font-extrabold text-sm uppercase tracking-wider rounded-2xl hover:bg-beastly-dark/80 transition-all"
                        >
                            Créer l'événement
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
