import React, { useState } from 'react';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import Events from './pages/Events';
import Creators from './pages/Creators';
import Contents from './pages/Contents';
import Finance from './pages/Finance';
import AssetBox from './pages/AssetBox';
import Trends from './pages/Trends';
import CreatorDashboard from './pages/creator/CreatorDashboard';
import CreatorBrief from './pages/creator/CreatorBrief';
import CreatorUpload from './pages/creator/CreatorUpload';
import CreatorContracts from './pages/creator/CreatorContracts';
import { Contract, Brief } from './types';

const INITIAL_CONTRACTS: Contract[] = [
  { id: 'c1', name: 'Accord-cadre Beastly', brand: 'Beastly Agency', campaignName: 'Conditions générales OPS', value: 0, status: 'Signed', date: 'Expire Déc 2025' },
  { id: 'c2', name: 'Contrat Event Jacquemus AW25', brand: 'Jacquemus', campaignName: 'Soirée Lancement AW25', value: 8500, status: 'Signed', date: 'Signé Fév 2025' },
  { id: 'c3', name: 'Contrat Pop-up Nike', brand: 'Nike', campaignName: 'Pop-up Store Experience', value: 12000, status: 'Pending', date: 'Envoyé Fév 2025' },
  { id: 'c4', name: 'Contrat Brunch Sézane', brand: 'Sézane', campaignName: 'Brunch Créateurs Printemps', value: 5500, status: 'Pending', date: 'En attente signature' },
  { id: 'c5', name: 'Contrat Galeries Lafayette', brand: 'Galeries Lafayette', campaignName: 'Défilé Influenceurs', value: 15000, status: 'Signed', date: 'Signé Jan 2025' },
];

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [role, setRole] = useState<'ops' | 'creator'>('ops');
  const [contracts, setContracts] = useState<Contract[]>(INITIAL_CONTRACTS);
  const [activeBrief, setActiveBrief] = useState<Brief | null>(null);

  const handleSignContract = (id: string) => {
    setContracts(prev => prev.map(c => c.id === id ? { ...c, status: 'Signed' } : c));
  };

  const renderContent = () => {
    // Creator routes
    if (role === 'creator') {
      switch (activeTab) {
        case 'creator-dashboard': return <CreatorDashboard onNavigate={setActiveTab} />;
        case 'creator-brief': return <CreatorBrief brief={activeBrief} />;
        case 'creator-upload': return <CreatorUpload />;
        case 'creator-contracts': return <CreatorContracts contracts={contracts} onSign={handleSignContract} />;
        case 'assetbox': return <AssetBox />;
        default: return <CreatorDashboard onNavigate={setActiveTab} />;
      }
    }

    // OPS routes
    switch (activeTab) {
      case 'dashboard': return <Dashboard onNavigate={setActiveTab} activeBrief={activeBrief} setActiveBrief={setActiveBrief} />;
      case 'events': return <Events />;
      case 'creators': return <Creators activeBrief={activeBrief} />;
      case 'contents': return <Contents />;
      case 'admin': return <Finance balance={0} contracts={contracts} onSign={handleSignContract} onWithdraw={() => false} />;
      case 'assetbox': return <AssetBox />;
      case 'trends': return <Trends />;
      default: return <Dashboard onNavigate={setActiveTab} activeBrief={activeBrief} setActiveBrief={setActiveBrief} />;
    }
  };

  return (
    <Layout activeTab={activeTab} setActiveTab={setActiveTab} role={role} setRole={setRole}>
      {renderContent()}
    </Layout>
  );
}
