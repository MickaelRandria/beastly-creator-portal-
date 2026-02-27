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
    emoji: "🌴",
    title: "Ma pause Solidays",
    script: [
      "Intro depuis le festival : chaleur, foule, musique. Plan large ambiance Solidays.",
      "\"Entre deux concerts, j'avais besoin d'air — et j'ai trouvé THE chill spot.\"",
      "Plan sur le stand FuzeTea : jardin tropical, brumisateurs géants, piscine de glaçons et cannettes.",
      "Tu attrapes une FuzeTea Fruit de la Passion Tropical. Premier sip. Réaction authentique.",
      "\"La nouvelle saveur fruit de la passion ? Sérieusement trop bonne. La fraîcheur qu'il fallait.\"",
      "Outro ambiance + voix off : #FuzeTeaPassion @FuzeTea — lien en bio.",
    ],
    hashtags: ["#FuzeTeaPassion", "#Solidays2026", "#MaPauseSolidays", "#PauseFraîcheur"],
    mentions: ["@FuzeTea"],
    duration: "~45 secondes",
  },
  {
    emoji: "🧃",
    title: "Test & réaction au nouveau goût",
    script: [
      "Tu interpelles 2–3 festivaliers au stand : \"Je vous fais tester quelque chose !\"",
      "Dégustation à la vue du produit : plan sur la canette FuzeTea Fruit de la Passion.",
      "Réactions spontanées filmées : expressions, commentaires à chaud.",
      "\"Note-le sur 10 !\" — compilation de scores (8/10, 9/10, 10/10...).",
      "Comparaison rapide avec une saveur classique : \"Alors ? Passion vs classique ?\"",
      "Ton verdict final : \"Mon verdict : un incontournable de l'été.\"",
    ],
    hashtags: ["#FuzeTeaPassion", "#Solidays2026", "#TestAndTaste", "#NouveauGoût"],
    mentions: ["@FuzeTea"],
    duration: "~60 secondes",
  },
  {
    emoji: "❄️",
    title: "5 minutes pour reset",
    script: [
      "Montage rapide : chaleur écrasante, foule dense, concert intense. Toi, épuisé(e).",
      "Transition : \"Petite pause fraîcheur — j'en avais besoin.\"",
      "Arrivée au stand FuzeTea : brumisateurs géants, ambiance jardin tropical, piscine de glaçons.",
      "Plan slow-mo : tu plonges la main dans les glaçons, tu prends une cannette FuzeTea Passion.",
      "Premier sip — soupir de soulagement, sourire. Authenticité totale.",
      "\"La pause qui a du goût. La fraîcheur qui a du sens.\" — #FuzeTeaPassion.",
    ],
    hashtags: ["#FuzeTeaPassion", "#Solidays2026", "#5MinutesDeReset", "#PauseFraîcheur"],
    mentions: ["@FuzeTea"],
    duration: "~30–40 secondes",
  },
];
