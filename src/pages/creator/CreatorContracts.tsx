import React from 'react';
import { Contract } from '../../types';
import { Check, FileText, Clock } from 'lucide-react';

interface Props {
    contracts: Contract[];
    onSign: (id: string) => void;
}

export default function CreatorContracts({ contracts, onSign }: Props) {
    // Show only the creator's contracts (not the general OPS ones)
    const myContracts = contracts.filter(c => c.brand !== 'Beastly Agency');
    const signed = myContracts.filter(c => c.status === 'Signed').length;
    const pending = myContracts.filter(c => c.status === 'Pending').length;

    return (
        <div className="max-w-2xl mx-auto space-y-5">

            {/* Header */}
            <div>
                <h1 className="text-3xl font-black text-beastly-beige">Mes contrats</h1>
                <p className="text-sm font-bold text-beastly-beige/40 mt-1">Consulte et signe tes contrats de collaboration</p>
            </div>

            {/* KPIs */}
            <div className="grid grid-cols-2 gap-4">
                <div className="p-5 bg-beastly-beige rounded-2xl">
                    <p className="text-4xl font-black text-beastly-green">{signed}</p>
                    <p className="text-[10px] font-extrabold uppercase tracking-[0.15em] text-beastly-dark/40 mt-1">Signés</p>
                </div>
                <div className="p-5 bg-beastly-beige rounded-2xl">
                    <p className="text-4xl font-black text-beastly-orange">{pending}</p>
                    <p className="text-[10px] font-extrabold uppercase tracking-[0.15em] text-beastly-dark/40 mt-1">En attente</p>
                </div>
            </div>

            {/* Contracts */}
            <div className="space-y-3">
                {myContracts.map(contract => (
                    <div key={contract.id} className="p-5 bg-beastly-beige rounded-2xl space-y-4">
                        <div className="flex items-start gap-3">
                            <div className="w-10 h-10 bg-beastly-dark rounded-full flex items-center justify-center shrink-0">
                                <FileText size={16} className="text-beastly-green" />
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="font-black text-beastly-dark text-sm">{contract.name}</p>
                                <p className="text-[10px] font-extrabold text-beastly-dark/50 uppercase tracking-wider mt-0.5">{contract.brand} · {contract.campaignName}</p>
                            </div>
                        </div>

                        <div className="flex items-center justify-between px-1">
                            <div>
                                <p className="text-[10px] font-extrabold text-beastly-dark/40 uppercase tracking-wider">Valeur</p>
                                <p className="text-xl font-black text-beastly-dark mt-0.5">
                                    {contract.value > 0 ? `${contract.value.toLocaleString()} €` : 'Inclus'}
                                </p>
                            </div>
                            <div className="text-right">
                                <p className="text-[10px] font-extrabold text-beastly-dark/40 uppercase tracking-wider">Date</p>
                                <p className="text-sm font-bold text-beastly-dark/70 mt-0.5">{contract.date}</p>
                            </div>
                        </div>

                        {contract.status === 'Signed' ? (
                            <div className="w-full py-3 bg-beastly-green/15 text-beastly-green rounded-xl font-extrabold text-center text-xs flex items-center justify-center gap-2 border border-beastly-green/20">
                                <Check size={14} /> Signé
                            </div>
                        ) : (
                            <div className="space-y-2">
                                <div className="flex items-center gap-2 p-3 bg-beastly-orange/10 rounded-xl">
                                    <Clock size={13} className="text-beastly-orange shrink-0" />
                                    <p className="text-xs font-bold text-beastly-orange">Ce contrat nécessite ta signature</p>
                                </div>
                                <button
                                    onClick={() => onSign(contract.id)}
                                    className="w-full py-3 bg-beastly-dark text-beastly-green rounded-xl font-extrabold text-sm hover:bg-beastly-dark/80 transition-all uppercase tracking-wider"
                                >
                                    Signer le contrat
                                </button>
                            </div>
                        )}
                    </div>
                ))}
            </div>

            {/* Info */}
            <div className="p-5 bg-beastly-beige/10 border border-beastly-beige/10 rounded-2xl">
                <p className="text-xs font-bold text-beastly-beige/40 leading-relaxed">
                    Les contrats sont générés par Beastly Agency. En cas de question, contacte ton chargé de compte.
                </p>
            </div>
        </div>
    );
}
