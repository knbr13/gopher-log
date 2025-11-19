import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Calendar, Tag } from 'lucide-react';
import { BlogPost } from '../types';
import { formatDate } from '../lib/utils';

export const PostCard: React.FC<{ post: BlogPost }> = ({ post }) => {
  return (
    <div className="group flex flex-col bg-white dark:bg-dark-card rounded-xl border border-gray-200 dark:border-dark-border p-6 shadow-sm hover:shadow-md transition-all duration-300 hover:border-primary-200 dark:hover:border-primary-900/50">
      <div className="flex items-center gap-3 text-xs font-medium text-gray-500 dark:text-gray-400 mb-3">
        <div className="flex items-center gap-1">
          <Calendar size={14} />
          <time>{formatDate(post.frontmatter.date)}</time>
        </div>
        <span>•</span>
        <div className="flex items-center gap-1 text-primary-600 dark:text-primary-400">
          <Tag size={14} />
          <span>{post.frontmatter.category}</span>
        </div>
      </div>

      <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-2 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
        <Link to={`/post/${post.slug}`}>
          {post.frontmatter.title}
        </Link>
      </h3>

      <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-2 flex-grow">
        {post.frontmatter.description}
      </p>

      <Link 
        to={`/post/${post.slug}`}
        className="inline-flex items-center text-sm font-semibold text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 mt-auto"
      >
        Read Article
        <ArrowRight size={16} className="ml-1 transition-transform group-hover:translate-x-1" />
      </Link>
    </div>
  );
};