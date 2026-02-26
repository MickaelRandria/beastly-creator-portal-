import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ScanLine, CheckCircle2, XCircle, Zap } from 'lucide-react';
import { mockInfluencers, mockEvent } from '../../lib/mockData';
import { GlowLightning } from '../../components/BeastlyIcons';

function getStatusKey(influencerId: string) {
  return `beastly_scan_${influencerId}`;
}

function parseQRValue(value: string) {
  // Format: BEASTLY-EVT_001-INF_001
  const parts = value.split('-');
  if (parts.length < 3 || parts[0] !== 'BEASTLY') return null;
  const eventId = parts[1];
  const influencerId = parts[2];
  if (eventId !== mockEvent.id) return null;
  return mockInfluencers.find(inf => inf.id === influencerId) || null;
}

type ScanState = 'idle' | 'success' | 'error';

export default function AdminScan() {
  const navigate = useNavigate();
  const scannerRef = useRef<HTMLDivElement>(null);
  const html5QrRef = useRef<any>(null);
  const [scanState, setScanState] = useState<ScanState>('idle');
  const [scannedInfluencer, setScannedInfluencer] = useState<(typeof mockInfluencers)[0] | null>(null);
  const [scannerReady, setScannerReady] = useState(false);
  const [cameraError, setCameraError] = useState(false);

  useEffect(() => {
    let scanner: any = null;

    const initScanner = async () => {
      try {
        // Dynamic import to avoid SSR issues
        const { Html5Qrcode } = await import('html5-qrcode');
        if (!scannerRef.current) return;

        scanner = new Html5Qrcode('qr-reader');
        html5QrRef.current = scanner;
        setScannerReady(true);

        await scanner.start(
          { facingMode: 'environment' },
          { fps: 10, qrbox: { width: 250, height: 250 } },
          (decodedText: string) => {
            const inf = parseQRValue(decodedText);
            if (inf) {
              localStorage.setItem(getStatusKey(inf.id), 'scanned');
              setScannedInfluencer(inf);
              setScanState('success');
              scanner.stop().catch(() => {});
            } else {
              setScanState('error');
              setTimeout(() => setScanState('idle'), 2000);
            }
          },
          () => {} // QR code not found frame — ignore
        );
      } catch (err) {
        console.error('Camera init failed', err);
        setCameraError(true);
      }
    };

    initScanner();

    return () => {
      if (html5QrRef.current) {
        html5QrRef.current.stop().catch(() => {});
      }
    };
  }, []);

  const handleReset = () => {
    setScanState('idle');
    setScannedInfluencer(null);
    // Restart scanner
    if (html5QrRef.current) {
      html5QrRef.current.start(
        { facingMode: 'environment' },
        { fps: 10, qrbox: { width: 250, height: 250 } },
        (decodedText: string) => {
          const inf = parseQRValue(decodedText);
          if (inf) {
            localStorage.setItem(getStatusKey(inf.id), 'scanned');
            setScannedInfluencer(inf);
            setScanState('success');
            html5QrRef.current.stop().catch(() => {});
          } else {
            setScanState('error');
            setTimeout(() => setScanState('idle'), 2000);
          }
        },
        () => {}
      ).catch(() => {});
    }
  };

  return (
    <div className="min-h-screen bg-beastly-dark flex flex-col relative overflow-hidden">
      <GlowLightning className="absolute -bottom-10 -left-10 opacity-10 pointer-events-none" size={200} color="#b4ff00" />

      {/* Header */}
      <div className="px-5 pt-8 pb-4 flex items-center gap-3 relative z-10">
        <button
          onClick={() => navigate('/admin')}
          className="flex items-center gap-2 px-4 py-2 bg-beastly-beige rounded-full text-sm font-bold text-beastly-dark hover:bg-beastly-beige/80 transition-colors group"
        >
          <ArrowLeft size={14} className="group-hover:-translate-x-0.5 transition-transform" />
          Retour
        </button>
        <div className="ml-auto flex items-center gap-2">
          <div className="w-7 h-7 bg-beastly-beige rounded-full flex items-center justify-center">
            <Zap size={13} className="text-beastly-dark fill-beastly-dark" />
          </div>
          <span className="text-sm font-black text-beastly-beige">Scanner QR</span>
        </div>
      </div>

      <div className="flex-1 flex flex-col items-center px-5 pb-10 gap-5 max-w-sm mx-auto w-full relative z-10">
        {/* Title */}
        <div className="text-center">
          <ScanLine size={32} className="text-beastly-green mx-auto mb-2" />
          <h1 className="text-2xl font-black text-beastly-beige">Scanner le QR Code</h1>
          <p className="text-sm font-bold text-beastly-beige/40 mt-1">
            Pointe la caméra vers le QR code de l'influenceur.
          </p>
        </div>

        {/* Scanner / Result */}
        {scanState === 'success' && scannedInfluencer ? (
          <div className="w-full p-8 bg-beastly-beige rounded-3xl flex flex-col items-center gap-4 text-center">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center">
              <CheckCircle2 size={40} className="text-green-600" />
            </div>
            <div>
              <p className="text-xl font-black text-beastly-dark">Présence validée ✓</p>
              <img
                src={scannedInfluencer.profilePicture}
                alt={scannedInfluencer.firstName}
                className="w-16 h-16 rounded-full object-cover mx-auto mt-3 border-4 border-beastly-green bg-beastly-dark"
              />
              <p className="text-lg font-black text-beastly-dark mt-2">
                {scannedInfluencer.firstName} {scannedInfluencer.lastName}
              </p>
              <p className="text-sm font-bold text-beastly-dark/50">{scannedInfluencer.instagramHandle}</p>
            </div>
            <button
              onClick={handleReset}
              className="w-full py-3.5 bg-beastly-dark text-beastly-green rounded-full font-extrabold text-sm uppercase tracking-wider hover:bg-beastly-dark/80 transition-all"
            >
              Scanner un autre
            </button>
          </div>
        ) : cameraError ? (
          <div className="w-full p-8 bg-beastly-beige rounded-3xl flex flex-col items-center gap-4 text-center">
            <XCircle size={40} className="text-beastly-orange" />
            <p className="font-black text-beastly-dark">Caméra non disponible</p>
            <p className="text-sm font-bold text-beastly-dark/50 leading-relaxed">
              Autorise l'accès à la caméra ou utilise un navigateur compatible.
            </p>
          </div>
        ) : (
          <>
            {/* Scanner container */}
            <div className="w-full overflow-hidden rounded-2xl relative">
              <div id="qr-reader" ref={scannerRef} className="w-full" />
              {scanState === 'error' && (
                <div className="absolute inset-0 bg-beastly-orange/20 flex items-center justify-center rounded-2xl">
                  <div className="bg-beastly-dark/80 px-4 py-2 rounded-full flex items-center gap-2">
                    <XCircle size={16} className="text-beastly-orange" />
                    <span className="text-sm font-extrabold text-beastly-beige">QR invalide</span>
                  </div>
                </div>
              )}
            </div>
            {!scannerReady && !cameraError && (
              <p className="text-xs font-bold text-beastly-beige/30 animate-pulse">
                Initialisation de la caméra...
              </p>
            )}
          </>
        )}
      </div>
    </div>
  );
}
