export type Initiative = {
  id: string;
  index: string;
  title: string;
  tagline: string;
  description: string;
  instagramUrl: string;
  highlights: string[];
  accent: "yellow" | "blue" | "coral" | "lime" | "violet";
  photos: { src: string; alt: string; caption: string }[];
};

export const initiatives: Initiative[] = [
  {
    id: "linux-party",
    index: "01",
    title: "LINUX PARTY",
    tagline: "A hands-on welcome to the world beyond Windows.",
    description:
      "Students installed Linux, explored new desktops, and found out that an operating system can be yours to shape.",
    instagramUrl: "https://www.instagram.com/p/DOLxQlGAawb/?hl=en",
    highlights: ["Install", "Explore", "Customize", "Share"],
    accent: "yellow",
    photos: [
      {
        src: "/events/linux-installation-party.jpg",
        alt: "Students gathered at a Linux installation party",
        caption: "install day",
      },
      {
        src: "/events/linux-installation-party-media.jpg",
        alt: "Students working together during the Linux installation party",
        caption: "hands on",
      },
    ],
  },
  {
    id: "foss-sprint",
    index: "02",
    title: "OPEN SOURCE SPRINT",
    tagline: "Learn the tools, then make your first contribution.",
    description:
      "Our FOSS Sprint combined a Git workshop with a focused contribution day, taking students from first commit to first pull request.",
    instagramUrl: "https://www.instagram.com/p/DP1iC_jgWys/?hl=en&img_index=1",
    highlights: ["Git", "Commit", "Collaborate", "Contribute"],
    accent: "blue",
    photos: [
      {
        src: "/events/foss-sprint-1.jpg",
        alt: "Students working together during the open source sprint",
        caption: "sprint day",
      },
      {
        src: "/events/foss-sprint-2.jpg",
        alt: "Students collaborating on laptops during the FOSS Sprint",
        caption: "ship together",
      },
      {
        src: "/events/foss-sprint-3.jpg",
        alt: "Students participating in the open source sprint",
        caption: "make it open",
      },
    ],
  },
  {
    id: "placement-series",
    index: "03",
    title: "PLACEMENT SERIES",
    tagline: "Practical conversations for the road ahead.",
    description:
      "A series of honest sessions to help students prepare, ask better questions, and turn the next opportunity into a real one.",
    instagramUrl: "https://www.instagram.com/p/DUkC079AVLL/?hl=en&img_index=1",
    highlights: ["Talks", "Preparation", "Career", "Community"],
    accent: "coral",
    photos: [
      {
        src: "/events/placement-series-1.jpg",
        alt: "Students attending a placement series session",
        caption: "in session",
      },
      {
        src: "/events/placement-series-2.jpg",
        alt: "A speaker addressing students at the placement series",
        caption: "share the playbook",
      },
      {
        src: "/events/placement-series-3.jpg",
        alt: "Students taking part in the placement series",
        caption: "keep moving",
      },
    ],
  },
  {
    id: "figma-workshop",
    index: "04",
    title: "FIGMA WORKSHOP",
    tagline: "Turn rough ideas into interfaces people can use.",
    description:
      "Students went from a blank canvas to thoughtful screens, learning how design decisions become clear, collaborative products.",
    instagramUrl: "https://www.instagram.com/p/DUvzDXjgcNB/?hl=en&img_index=1",
    highlights: ["Ideas", "Wireframes", "Prototype", "Design"],
    accent: "lime",
    photos: [
      {
        src: "/events/figma-workshop-1.jpg",
        alt: "Students learning together at a Figma workshop",
        caption: "draw it out",
      },
      {
        src: "/events/figma-workshop-2.jpg",
        alt: "A Figma workshop in progress with students collaborating",
        caption: "make it usable",
      },
    ],
  },
  {
    id: "blockchain-workshop",
    index: "05",
    title: "BLOCKCHAIN WORKSHOP",
    tagline: "Look underneath the buzzwords and understand the system.",
    description:
      "A curious, grounded introduction to blockchain concepts, where students could question the hype and explore the technology together.",
    instagramUrl: "https://www.instagram.com/p/DMnXhNaP1rF/?hl=en",
    highlights: ["Explore", "Question", "Learn", "Build"],
    accent: "violet",
    photos: [
      {
        src: "/events/blockchain-workshop.jpg",
        alt: "Students attending the blockchain workshop",
        caption: "follow the chain",
      },
    ],
  },
];
