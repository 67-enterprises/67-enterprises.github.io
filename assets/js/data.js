/* ============================================================================
 * The only file you need to edit to change site content.
 *
 * Avatars are derived from the GitHub handle (https://github.com/<handle>.png),
 * so there is nothing to upload and no API call to rate-limit.
 * A product with `demo: null` simply renders without a demo button.
 * ==========================================================================*/

export const org = {
  name: "67 Enterprises",
  github: "https://github.com/67-enterprises",
};

export const founders = [
  {
    name: "Bryan",
    role: "CEO of LARPing",
    bio: "My end goal in life is to be a bubble tea connoisseur. I'm tryna hit the world record for most bubble tea consumed in a lifetime!",
    github: "bryanjhc", // TODO: real GitHub handle — drives the avatar
    linkedin: "https://www.linkedin.com/in/bryanchewjh/",
  },
  {
    name: "Leo",
    role: "CEO of Vibecoding",
    bio: "Together with my interests for software and fitness, I'm on a mission to travel the world, help lots of people improve their lives, and most importantly, learn how to say 6-7 in as many languages as possible.",
    github: "leowolf275", // TODO: real GitHub handle — drives the avatar
    linkedin: "https://www.linkedin.com/in/leonardo-wolf-cs/",
  },
];

export const products = [
  {
    name: "67game",
    tagline: "Put your 67 skills to the test and get exactly 67 points. Works best on PC with a mouse.",
    tags: ["Game Dev", "HTML"],
    repo: "https://github.com/bryanjhc/67game",
    demo: "https://bryanjhc.github.io/67game/",
  },
  {
    name: "Valentines website",
    tagline: "Not enough time to write a valentines envelope? Send this website to her!",
    tags: ["JS", "HTML"],
    repo: "https://github.com/bryanjhc/valentines2026",
    demo: "https://bryanjhc.github.io/valentines2026/"
  },
  {
    name: "TODO: Project One",
    tagline: "TODO: What it does, in one punchy sentence.",
    tags: ["Rust", "Tooling"],
    repo: "https://github.com/67-enterprises",
    demo: "https://example.com",
  },
  {
    name: "TODO: Game One",
    tagline: "TODO: What it does, in one punchy sentence.",
    tags: ["Game", "WebGL"],
    repo: "https://github.com/67-enterprises",
    demo: "https://example.com",
  },
  {
    name: "TODO: Project Two",
    tagline: "TODO: What it does, in one punchy sentence.",
    tags: ["React", "Open Source"],
    repo: "https://github.com/67-enterprises",
    demo: null,
  },
  {
    name: "TODO: Project Three",
    tagline: "TODO: What it does, in one punchy sentence.",
    tags: ["Go", "API"],
    repo: "https://github.com/67-enterprises",
    demo: "https://example.com",
  },
];

/** Every product is free; the $67 is the joke, not a real price. */
export const LIST_PRICE = 67;
