import { allPosts, categories } from '../data/posts';
import { BlogPost } from '../types';

export function getSortedPosts(): BlogPost[] {
  return allPosts;
}

export function getPostBySlug(slug: string): BlogPost | undefined {
  return allPosts.find((post) => post.slug === slug);
}

export function getPostsByCategory(category: string): BlogPost[] {
  return allPosts.filter((post) => post.frontmatter.category === category);
}

export function getAllCategories(): { name: string; count: number }[] {
  const counts: Record<string, number> = {};
  
  allPosts.forEach(post => {
    const cat = post.frontmatter.category;
    counts[cat] = (counts[cat] || 0) + 1;
  });

  return Object.entries(counts).map(([name, count]) => ({ name, count }));
}