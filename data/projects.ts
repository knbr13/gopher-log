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