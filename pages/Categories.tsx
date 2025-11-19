import React, { useState } from 'react';
import { Layout } from '../components/Layout';
import { PostCard } from '../components/PostCard';
import { getAllCategories, getPostsByCategory } from '../lib/markdown';
import { Tag, FolderOpen } from 'lucide-react';
import { cn } from '../lib/utils';

export const Categories: React.FC = () => {
  const categories = getAllCategories();
  const [selectedCategory, setSelectedCategory] = useState<string>(categories[0]?.name || '');
  
  const posts = selectedCategory ? getPostsByCategory(selectedCategory) : [];

  return (
    <Layout>
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Sidebar / Category List */}
        <aside className="lg:w-1/4 space-y-6">
          <div>
            <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
              <FolderOpen size={20} className="text-primary-600" />
              Topics
            </h2>
            <div className="flex flex-wrap lg:flex-col gap-2">
              {categories.map((cat) => (
                <button
                  key={cat.name}
                  onClick={() => setSelectedCategory(cat.name)}
                  className={cn(
                    "flex items-center justify-between px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 w-full",
                    selectedCategory === cat.name
                      ? "bg-primary-100 text-primary-800 dark:bg-primary-900/30 dark:text-primary-300"
                      : "bg-white dark:bg-dark-card text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 border border-gray-200 dark:border-dark-border"
                  )}
                >
                  <span>{cat.name}</span>
                  <span className="bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400 py-0.5 px-2 rounded-full text-xs">
                    {cat.count}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </aside>

        {/* Content */}
        <section className="lg:w-3/4">
          <div className="mb-6 pb-4 border-b border-gray-200 dark:border-gray-800">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
              <Tag className="text-primary-600" />
              {selectedCategory}
            </h1>
          </div>
          
          <div className="grid gap-6 md:grid-cols-2">
            {posts.map(post => (
              <PostCard key={post.slug} post={post} />
            ))}
          </div>
        </section>
      </div>
    </Layout>
  );
};