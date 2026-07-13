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
    name: "TODO: Co-founder One",
    role: "TODO: e.g. Systems & Infra",
    bio: "TODO: One line on what they build and what they're into.",
    github: "octocat", // TODO: real GitHub handle — drives the avatar
    linkedin: "https://www.linkedin.com/in/TODO",
  },
  {
    name: "TODO: Co-founder Two",
    role: "TODO: e.g. Interfaces & Design",
    bio: "TODO: One line on what they build and what they're into.",
    github: "torvalds", // TODO: real GitHub handle — drives the avatar
    linkedin: "https://www.linkedin.com/in/TODO",
  },
];

export const products = [
  {
    name: "TODO: Project One",
    tagline: "TODO: What it does, in one punchy sentence.",
    tags: ["TypeScript", "CLI"],
    repo: "https://github.com/67-enterprises",
    demo: "https://example.com",
  },
  {
    name: "TODO: Project Two",
    tagline: "TODO: What it does, in one punchy sentence.",
    tags: ["Python", "ML"],
    repo: "https://github.com/67-enterprises",
    demo: null, // no live demo → card shows only the GitHub link
  },
  {
    name: "TODO: Project Three",
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
    name: "TODO: Project Five",
    tagline: "TODO: What it does, in one punchy sentence.",
    tags: ["React", "Open Source"],
    repo: "https://github.com/67-enterprises",
    demo: null,
  },
  {
    name: "TODO: Project Six",
    tagline: "TODO: What it does, in one punchy sentence.",
    tags: ["Go", "API"],
    repo: "https://github.com/67-enterprises",
    demo: "https://example.com",
  },
];

/** Every product is free; the $67 is the joke, not a real price. */
export const LIST_PRICE = 67;
