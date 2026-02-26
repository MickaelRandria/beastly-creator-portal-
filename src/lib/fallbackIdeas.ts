export interface Idea {
  emoji: string;
  title: string;
  script: string[];
  hashtags: string[];
  mentions: string[];
  duration: string;
}

export const fallbackIdeas: Idea[] = [
  {
    emoji: "🌿",
    title: "Morning Routine Clean Beauty",
    script: [
      "Étape 1 : Réveil naturel, lumière du matin — plan serré sur ta peau au naturel, sans filtre.",
      "Étape 2 : Tu sors le sérum XYZ de ta table de nuit. 'Mon nouveau must-have du matin, et il sent incroyablement bon.'",
      "Étape 3 : Application texture en gros plan, ASMR des sons du produit.",
      "Étape 4 : Résultat — peau hydratée, éclatante. 'Propre, végane, made in France. Rien à ajouter.'",
      "Étape 5 : Fin avec pack produit XYZ posé sur une surface naturelle + hashtags en voix off.",
    ],
    hashtags: ["#XYZBeauty", "#XYZSkinLaunch", "#CleanBeauty", "#MorningRoutine"],
    mentions: ["@xyzbeauty"],
    duration: "~45 secondes",
  },
  {
    emoji: "✨",
    title: "Before & After Skincare Truth",
    script: [
      "Étape 1 : Intro honest — 'Je vais être honnête avec toi sur ma peau. Pas de filtre, pas de retouche.'",
      "Étape 2 : Plan avant — peau sans maquillage, naturelle.",
      "Étape 3 : Application des soins XYZ en accéléré (x2), avec narration tactile.",
      "Étape 4 : '7 jours plus tard' — transition. Résultat visible, toujours sans filtre.",
      "Étape 5 : 'Formule clean, dermatologiquement testée. C'est ça qui fait la différence.'",
    ],
    hashtags: ["#XYZBeauty", "#XYZSkinLaunch", "#CleanBeauty", "#SkincareTruth"],
    mentions: ["@xyzbeauty"],
    duration: "~60 secondes",
  },
  {
    emoji: "🎉",
    title: "Soirée Lancement — Dans les coulisses",
    script: [
      "Étape 1 : Arrivée au Rooftop Le Perchoir — ambiance, lumières, plan panoramique.",
      "Étape 2 : 'Ce soir c'est le lancement XYZ Beauty et je vous emmène avec moi.'",
      "Étape 3 : Découverte des produits sur les stands — réaction authentique, texture en main.",
      "Étape 4 : Moment convivial avec d'autres créateurs, ambiance soirée.",
      "Étape 5 : Fin — produit préféré à la main. 'Linkez en bio pour découvrir la gamme.'",
    ],
    hashtags: ["#XYZBeauty", "#XYZSkinLaunch", "#CleanBeauty", "#EventNight"],
    mentions: ["@xyzbeauty"],
    duration: "~50 secondes",
  },
];
