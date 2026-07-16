/* ============================================================================
 * The only file you need to edit to change site content.
 *
 * Avatars are derived from the GitHub handle (https://github.com/<handle>.png),
 * so there is nothing to upload and no API call to rate-limit.
 * A product with `demo: null` simply renders without a demo button.
 * To add a product screenshot, put it in assets/images/products/ and set
 * `image` to its root-relative path, for example "assets/images/products/67game.png".
 * Products without an image use the 67 Enterprises fallback graphic.
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
  {
    name: "Qi Jun",
    role: "CEO of AQJ Pte. Ltd.",
    bio: "I am a malaysian baddie. I like to ride in my myvi.",
    github: "realqijun",
    linkedin: "https://www.linkedin.com/in/realqijun/",
  },
  {
    name: "Nic Tok",
    role: "CEO of Diving",
    bio: "I have a PHD and masters in diving. I can dive into the ocean and find a pearl, and I can dive into code and find a bug. I am a master of both.",
    github: "nictjh",
    linkedin: "https://www.linkedin.com/in/nictjh/",
  },
  {
    name: "Samuel",
    role: "CEO of Education",
    bio: "I love teaching and learning. I believe in the power of education to change the world.",
    github: "Monochromas",
    linkedin: "https://www.linkedin.com/in/samuel/"
  },
  {
    name: "Yashvan",
    role: "CEO of Unpaid Overtime",
    bio: "Paid in exposure",
    github: "YashvanGH",
    linkedin: "https://www.linkedin.com/in/yashvan-samy/",
  },
];

export const products = [
  {
    name: "67game",
    tagline: "Put your 67 skills to the test and get exactly 67 points. Works best on PC with a mouse.",
    tags: ["Game Dev", "HTML"],
    image: "assets/images/products/67game.png",
    imageAlt: "67game screenshot",
    repo: "https://github.com/bryanjhc/67game",
    demo: "https://bryanjhc.github.io/67game/",
  },
  {
    name: "Valentines website",
    tagline: "Not enough time to write a valentines envelope? Send this website to her!",
    tags: ["JS", "HTML"],
    image: "assets/images/products/valentines.png",
    imageAlt: "Valentines website screenshot",
    repo: "https://github.com/bryanjhc/valentines2026",
    demo: "https://bryanjhc.github.io/valentines2026/"
  },
  {
    name: "Subpar Antivirus Tool (SAT)",
    tagline: "Ever thought your antivirus was too strong? Replace it with this one!",
    tags: ["Python", "CLI", "Antivirus"],
    image: null,
    imageAlt: null,
    repo: "https://github.com/YashvanGH/subpar-antivirus-tool",
    demo: "https://github.com/YashvanGH/subpar-antivirus-tool/releases/tag/v0.1.0",
  },
  {
    name: "TODO: Game One",
    tagline: "TODO: What it does, in one punchy sentence.",
    tags: ["Game", "WebGL"],
    image: null,
    imageAlt: null,
    repo: "https://github.com/67-enterprises",
    demo: "https://example.com",
  },
  {
    name: "TODO: Project Two",
    tagline: "TODO: What it does, in one punchy sentence.",
    tags: ["React", "Open Source"],
    image: null,
    imageAlt: null,
    repo: "https://github.com/67-enterprises",
    demo: null,
  },
  {
    name: "TODO: Project Three",
    tagline: "TODO: What it does, in one punchy sentence.",
    tags: ["Go", "API"],
    image: null,
    imageAlt: null,
    repo: "https://github.com/67-enterprises",
    demo: "https://example.com",
  },
];

/** Every product is free; the $67 is the joke, not a real price. */
export const LIST_PRICE = 67;
