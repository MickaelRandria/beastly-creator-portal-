export const mockEvent = {
  id: "EVT_001",
  name: "Lancement XYZ Beauty",
  brand: "XYZ Beauty",
  date: "2025-07-12",
  time: "18:00 - 23:00",
  location: "Rooftop Le Perchoir, Paris 11e",
  dressCode: "Smart Casual",
  description: "Soirée de lancement de la nouvelle gamme skincare XYZ.",
  brief: {
    objective:
      "Faire découvrir la nouvelle gamme skincare XYZ à ta communauté de manière authentique.",
    checklist: [
      { id: 1, text: "Utiliser #XYZBeauty", checked: false },
      { id: 2, text: "Utiliser #XYZSkinLaunch", checked: false },
      { id: 3, text: "Mentionner @xyzbeauty", checked: false },
      { id: 4, text: "Poster au moins 1 story", checked: false },
      { id: 5, text: "Poster dans les 24h suivant l'event", checked: false },
    ],
    dos: [
      "Montre ton expérience réelle avec les produits",
      "Parle de tes textures et sensations préférées",
      "Utilise la lumière naturelle pour les photos produit",
    ],
    donts: [
      "Pas de produit concurrent visible dans le cadre",
      "Pas de filtre beauté lourd (on veut du naturel)",
      "Pas de script robotique — reste toi-même",
    ],
    keyMessages: [
      "XYZ c'est du clean beauty made in France",
      "Testé sous contrôle dermatologique",
      "Formules véganes et éco-responsables",
    ],
    toneOfVoice: "Authentique, enthousiaste, naturel",
    hashtags: ["#XYZBeauty", "#XYZSkinLaunch", "#CleanBeauty"],
    mentions: ["@xyzbeauty"],
  },
  assets: [
    {
      id: "A1",
      name: "Logo XYZ Beauty",
      type: "image" as const,
      file: "/assets/logo-xyz.png",
    },
    {
      id: "A2",
      name: "Musique ambiance",
      type: "audio" as const,
      file: "/assets/music-xyz.mp3",
    },
    {
      id: "A3",
      name: "Filtre Instagram XYZ Glow",
      type: "link" as const,
      url: "https://instagram.com/ar/xyz",
    },
  ],
};

export const mockInfluencers = [
  {
    id: "INF_001",
    token: "lea-abc123",
    firstName: "Léa",
    lastName: "Martin",
    instagramHandle: "@lea.style",
    profilePicture: "https://api.dicebear.com/7.x/adventurer/svg?seed=Lea",
    style: "Lifestyle, skincare routine, contenus lumineux et épurés",
    status: "invited" as const,
  },
  {
    id: "INF_002",
    token: "hugo-def456",
    firstName: "Hugo",
    lastName: "Durand",
    instagramHandle: "@hugo.groom",
    profilePicture: "https://api.dicebear.com/7.x/adventurer/svg?seed=Hugo",
    style: "Grooming masculin, humour, before/after",
    status: "invited" as const,
  },
  {
    id: "INF_003",
    token: "sarah-ghi789",
    firstName: "Sarah",
    lastName: "Benali",
    instagramHandle: "@sarah.b",
    profilePicture: "https://api.dicebear.com/7.x/adventurer/svg?seed=Sarah",
    style: "Clean girl aesthetic, ASMR textures, tons pastels",
    status: "invited" as const,
  },
];

export type Influencer = (typeof mockInfluencers)[number];

export function getInfluencerByToken(token: string): Influencer | null {
  return mockInfluencers.find((inf) => inf.token === token) || null;
}
