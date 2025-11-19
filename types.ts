export interface Frontmatter {
  title: string;
  date: string;
  description: string;
  category: string;
  tags?: string[];
  slug: string;
  coverImage?: string;
}

export interface BlogPost {
  slug: string;
  frontmatter: Frontmatter;
  content: string; // The markdown content
}

export interface Category {
  name: string;
  slug: string;
  count: number;
}