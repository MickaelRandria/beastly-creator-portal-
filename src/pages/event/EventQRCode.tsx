import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { QRCodeSVG } from 'qrcode.react';
import { ArrowLeft, Calendar, MapPin, Zap } from 'lucide-react';
import { getInfluencerByToken, mockEvent } from '../../lib/mockData';

function getStatusKey(influencerId: string) {
  return `beastly_scan_${influencerId}`;
}

export default function EventQRCode() {
  const { token } = useParams<{ token: string }>();
  const navigate = useNavigate();
  const influencer = token ? getInfluencerByToken(token) : null;

  const [scanned, setScanned] = useState(false);

  useEffect(() => {
    if (!influencer) return;
    const stored = localStorage.getItem(getStatusKey(influencer.id));
    setScanned(stored === 'scanned');
  }, [influencer]);

  if (!influencer) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <p className="text-black/40 font-bold">Token invalide</p>
      </div>
    );
  }

  const qrValue = `BEASTLY-${mockEvent.id}-${influencer.id}`;

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Top bar — minimal, dark on white */}
      <div className="px-5 pt-8 pb-4 flex items-center gap-3">
        <button
          onClick={() => navigate(`/event/${token}/dashboard`)}
          className="flex items-center gap-2 px-4 py-2 bg-beastly-dark text-beastly-beige rounded-full text-sm font-bold hover:bg-beastly-dark/80 transition-colors group"
        >
          <ArrowLeft size={14} className="group-hover:-translate-x-0.5 transition-transform" />
          Retour
        </button>
        <div className="ml-auto flex items-center gap-2">
          <div className="w-7 h-7 bg-beastly-dark rounded-full flex items-center justify-center">
            <Zap size={13} className="text-beastly-green fill-beastly-green" />
          </div>
          <span className="text-sm font-black text-beastly-dark">Beastly</span>
        </div>
      </div>

      {/* Main content — centered */}
      <div className="flex-1 flex flex-col items-center justify-center px-8 pb-10 gap-6 max-w-sm mx-auto w-full">
        {/* Profile */}
        <div className="flex flex-col items-center gap-3 text-center">
          <img
            src={influencer.profilePicture}
            alt={influencer.firstName}
            className="w-24 h-24 rounded-full object-cover border-4 border-beastly-dark bg-gray-100"
          />
          <div>
            <h1 className="text-2xl font-black text-beastly-dark">
              {influencer.firstName} {influencer.lastName}
            </h1>
            <p className="text-sm font-bold text-black/40">{influencer.instagramHandle}</p>
          </div>
        </div>

        {/* QR Code */}
        <div className="p-6 bg-white border-2 border-black/5 rounded-3xl shadow-sm">
          <QRCodeSVG
            value={qrValue}
            size={200}
            bgColor="#ffffff"
            fgColor="#000000"
            level="H"
            includeMargin={false}
          />
        </div>

        {/* Status badge */}
        <div className={`flex items-center gap-2 px-5 py-3 rounded-full font-extrabold text-sm ${
          scanned
            ? 'bg-green-100 text-green-700'
            : 'bg-yellow-100 text-yellow-700'
        }`}>
          <span>{scanned ? '🟢' : '🟡'}</span>
          <span>{scanned ? 'Présence validée' : 'Non scanné'}</span>
        </div>

        {/* Event info */}
        <div className="w-full p-5 bg-black/5 rounded-2xl space-y-2.5">
          <p className="text-xs font-extrabold uppercase tracking-wider text-black/30">Événement</p>
          <p className="font-black text-beastly-dark text-base">{mockEvent.name}</p>
          <div className="flex items-center gap-1.5 text-xs font-bold text-black/50">
            <Calendar size={12} /> {mockEvent.date} · {mockEvent.time}
          </div>
          <div className="flex items-center gap-1.5 text-xs font-bold text-black/50">
            <MapPin size={12} /> {mockEvent.location}
          </div>
        </div>

        <p className="text-[10px] font-bold text-black/30 text-center">
          Présente ce QR code à l'entrée de l'événement.
        </p>
      </div>
    </div>
  );
}
