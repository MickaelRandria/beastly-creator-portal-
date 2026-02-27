export const mockEvent = {
  id: "EVT_001",
  name: "Solidays x FuzeTea Passion",
  brand: "FuzeTea",
  date: "26 – 28 Juin 2026",
  time: "12h – 23h · 3 jours",
  location: "Hippodrome de Longchamp, Paris 16e",
  dressCode: "Festival Vibes 🌿",
  description:
    "FuzeTea débarque à Solidays pour lancer sa nouvelle saveur Fruit de la Passion Tropical. Ta mission : créer du contenu authentique depuis le stand jardin et faire vivre cette pause fraîcheur à ta communauté.",
  perks: [
    "🎫 Accès VIP Solidays (3 jours)",
    "⚡ Backstage pass & coupe-file",
    "🧃 Gifting FuzeTea Passion",
  ],
  deliverables: [
    "1 vidéo in-feed minimum (TikTok ou Reels)",
    "3 à 5 stories sur place",
    "Mention explicite de la nouvelle saveur",
    "Tag @FuzeTea + #FuzeTeaPassion",
  ],
  brief: {
    objective:
      "Générer du trafic sur le stand FuzeTea et faire découvrir la nouvelle saveur Fruit de la Passion Tropical à ta communauté de manière authentique, dans l'ambiance festival de Solidays.",
    checklist: [
      { id: 1, text: "1 vidéo in-feed minimum (TikTok ou Reels)", checked: false },
      { id: 2, text: "3 à 5 stories sur place", checked: false },
      { id: 3, text: "Mentionner explicitement la nouvelle saveur", checked: false },
      { id: 4, text: "Taguer @FuzeTea dans tes publications", checked: false },
      { id: 5, text: "Utiliser le hashtag #FuzeTeaPassion", checked: false },
    ],
    dos: [
      "Montre l'ambiance jardin/tropical du stand",
      "Réaction authentique à la nouvelle saveur",
      "Intègre d'autres festivaliers dans ton contenu",
      "Profite des brumisateurs et de la piscine à glaçons pour du contenu frais",
    ],
    donts: [
      "Pas de ton publicitaire ou scripté",
      "Pas de produits concurrents dans le cadre",
      "Pas de filtre excessif — garde un rendu naturel et festival-friendly",
    ],
    keyMessages: [
      "La pause qui a du goût. La fraîcheur qui a du sens.",
      "Nouvelle saveur : Fruit de la Passion Tropical",
      "FuzeTea = la pause fraîcheur engagée à Solidays",
    ],
    toneOfVoice: "Naturel, festival-friendly, pas trop publicitaire",
    hashtags: ["#FuzeTeaPassion", "#Solidays2026", "#FuzeTea"],
    mentions: ["@FuzeTea"],
  },
  assets: [
    {
      id: "A1",
      name: "Logo FuzeTea",
      type: "image" as const,
      file: "/assets/logo-fuzetea.png",
    },
    {
      id: "A2",
      name: "Kit créateur FuzeTea",
      type: "link" as const,
      url: "https://drive.google.com",
    },
    {
      id: "A3",
      name: "Filtre Instagram FuzeTea Passion",
      type: "link" as const,
      url: "https://instagram.com/ar/fuzetea",
    },
  ],
};

export const mockInfluencers = [
  {
    id: "INF_001",
    token: "lea-abc123",
    firstName: "Léa",
    lastName: "Martin",
    instagramHandle: "@lea.festival",
    followers: "34k",
    profilePicture: "https://api.dicebear.com/7.x/adventurer/svg?seed=Lea",
    style: "Festival lifestyle, contenus colorés et ensoleillés, audience très engagée",
    status: "invited" as const,
  },
  {
    id: "INF_002",
    token: "hugo-def456",
    firstName: "Hugo",
    lastName: "Durand",
    instagramHandle: "@hugo.taste",
    followers: "18k",
    profilePicture: "https://api.dicebear.com/7.x/adventurer/svg?seed=Hugo",
    style: "Test & réaction, humour, vidéos virales et spontanées",
    status: "invited" as const,
  },
  {
    id: "INF_003",
    token: "sarah-ghi789",
    firstName: "Sarah",
    lastName: "Benali",
    instagramHandle: "@sarah.vibes",
    followers: "52k",
    profilePicture: "https://api.dicebear.com/7.x/adventurer/svg?seed=Sarah",
    style: "Éco-friendly, slow life, vibes tropicales et storytelling engagé",
    status: "invited" as const,
  },
];

export type Influencer = (typeof mockInfluencers)[number];

export function getInfluencerByToken(token: string): Influencer | null {
  return mockInfluencers.find((inf) => inf.token === token) || null;
}
