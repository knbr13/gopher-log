import React, { useState } from 'react';
import { Layout } from '../components/Layout';
import { PostCard } from '../components/PostCard';
import { getSortedPosts } from '../lib/markdown';
import { Search } from 'lucide-react';

export const Home: React.FC = () => {
  const posts = getSortedPosts();
  const [searchTerm, setSearchTerm] = useState('');

  const filteredPosts = posts.filter(post => 
    post.frontmatter.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.frontmatter.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Layout>
      <div className="space-y-10">
        {/* Hero Section */}
        <section className="text-center space-y-4 py-8 border-b border-gray-200 dark:border-gray-800">
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-gray-900 dark:text-white">
            Building Scalable <span className="text-primary-600 dark:text-primary-400">Systems</span>
          </h1>
          <p className="max-w-2xl mx-auto text-lg text-gray-600 dark:text-gray-300">
            Thoughts on Go, Distributed Systems, and Backend Engineering.
          </p>
        </section>

        {/* Search & Filter */}
        <div className="relative max-w-md mx-auto">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search articles..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="block w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-700 rounded-full leading-5 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition duration-150 ease-in-out sm:text-sm"
          />
        </div>

        {/* Posts Grid */}
        {filteredPosts.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-2">
            {filteredPosts.map((post) => (
              <PostCard key={post.slug} post={post} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 text-gray-500 dark:text-gray-400">
            No posts found matching your search.
          </div>
        )}
      </div>
    </Layout>
  );
};