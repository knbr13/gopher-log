import { Project } from '../types';

export const projects: Project[] = [
  {
    name: "gitcs",
    description: "Command line tool that allows developers to scan their local Git repositories and generate a visual contributions graph. Works across multiple Git services and functions offline.",
    githubUrl: "https://github.com/knbr13/gitcs",
    language: "Go",
    features: [
      "Analyze local Git repositories",
      "Generate visual contributions graphs",
      "Cross-platform compatibility (GitHub, GitLab)",
      "Offline functionality",
      "Customizable date ranges",
      "Email filtering capability"
    ],
    tags: ["git", "cli", "visualization", "contributions"],
    slug: "gitcs"
  },
  {
    name: "watcher",
    description: "File system watcher that automates workflows with surgical precision. Monitors file events and executes user-defined commands based on glob patterns.",
    githubUrl: "https://github.com/knbr13/watcher",
    language: "Go",
    features: [
      "Real-time file system monitoring",
      "Event-based triggers (write, create, remove)",
      "Glob pattern matching",
      "Timeout control",
      "Environment variable support",
      "Parallel/sequential command execution"
    ],
    tags: ["file-system", "automation", "cli", "development-tools"],
    slug: "watcher"
  },
  {
    name: "http-client",
    description: "HTTP Client is a command-line tool for executing HTTP requests with ease. Perfect for API testing and automation workflows.",
    githubUrl: "https://github.com/knbr13/http-client",
    language: "Go",
    features: [
      "Command-line HTTP requests",
      "Support for multiple HTTP methods",
      "Custom headers and parameters",
      "Response formatting",
      "Request history",
      "Environment variable interpolation"
    ],
    tags: ["http", "cli", "api-testing", "development-tools"],
    slug: "http-client"
  },
  {
    name: "incache",
    description: "Simple, fast, concurrent in-memory database. Designed for high-performance caching and temporary data storage.",
    githubUrl: "https://github.com/knbr13/incache",
    language: "Go",
    features: [
      "In-memory data storage",
      "Concurrent access support",
      "Fast operations",
      "Key-value operations",
      "TTL support",
      "Thread-safe operations"
    ],
    tags: ["database", "caching", "in-memory", "performance"],
    slug: "incache"
  },
  {
    name: "dugo",
    description: "File deduplication tool written in Go. Efficiently identifies and removes duplicate files from your system.",
    githubUrl: "https://github.com/knbr13/dugo",
    language: "Go",
    features: [
      "Fast duplicate detection",
      "Multiple hash algorithms",
      "Safe file removal",
      "Detailed reports",
      "Recursive directory scanning",
      "Pattern matching support"
    ],
    tags: ["file-system", "utilities", "deduplication", "cli"],
    slug: "dugo"
  },
  {
    name: "maze-game",
    description: "Test your skills, tackle mazes, and race against the clock. Pick your difficulty level and dive into the challenge!",
    githubUrl: "https://github.com/knbr13/maze-game",
    language: "Go",
    features: [
      "Multiple difficulty levels",
      "Timer-based challenges",
      "Maze generation algorithms",
      "Score tracking",
      "Interactive gameplay",
      "Cross-platform support"
    ],
    tags: ["game", "puzzle", "entertainment", "interactive"],
    slug: "maze-game"
  }
];

export const getProjectsByLanguage = (language: string): Project[] => {
  return projects.filter(project =>
    project.language.toLowerCase() === language.toLowerCase()
  );
};

export const getProjectsByTag = (tag: string): Project[] => {
  return projects.filter(project =>
    project.tags.some(projectTag => projectTag.toLowerCase() === tag.toLowerCase())
  );
};

export const getAllTags = (): string[] => {
  const allTags = projects.flatMap(project => project.tags);
  return Array.from(new Set(allTags)).sort();
};

export const getAllLanguages = (): string[] => {
  const allLanguages = projects.map(project => project.language);
  return Array.from(new Set(allLanguages)).sort();
};