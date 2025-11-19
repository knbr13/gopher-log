import React, { useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Layout } from '../components/Layout';
import { MarkdownRenderer } from '../components/MarkdownRenderer';
import { getPostBySlug } from '../lib/markdown';
import { ArrowLeft, Calendar, Tag, Clock } from 'lucide-react';
import { formatDate } from '../lib/utils';

export const Post: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const post = slug ? getPostBySlug(slug) : undefined;

  useEffect(() => {
    window.scrollTo(0, 0);
    if (!post && slug) {
       // Optionally handle 404 here
    }
  }, [slug, post]);

  if (!post) {
    return (
      <Layout>
        <div className="text-center py-20">
          <h1 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Post not found</h1>
          <Link to="/" className="text-primary-600 hover:underline">Return Home</Link>
        </div>
      </Layout>
    );
  }

  // Calculate read time (rough estimate: 200 wpm)
  const readTime = Math.ceil(post.content.split(/\s+/).length / 200);

  return (
    <Layout>
      <article className="max-w-3xl mx-auto">
        {/* Back Link */}
        <button 
          onClick={() => navigate(-1)} 
          className="mb-8 inline-flex items-center text-sm text-gray-500 hover:text-primary-600 dark:text-gray-400 dark:hover:text-primary-400 transition-colors"
        >
          <ArrowLeft size={16} className="mr-2" />
          Back
        </button>

        {/* Header */}
        <header className="mb-10 space-y-6 border-b border-gray-200 dark:border-gray-800 pb-8">
          <div className="flex flex-wrap gap-3 text-sm text-gray-500 dark:text-gray-400">
             <span className="flex items-center gap-1 bg-primary-50 dark:bg-primary-900/20 text-primary-700 dark:text-primary-300 px-2.5 py-0.5 rounded-full font-medium">
              <Tag size={12} />
              {post.frontmatter.category}
            </span>
            <span className="flex items-center gap-1">
              <Calendar size={14} />
              {formatDate(post.frontmatter.date)}
            </span>
            <span className="flex items-center gap-1">
              <Clock size={14} />
              {readTime} min read
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-gray-900 dark:text-white leading-tight">
            {post.frontmatter.title}
          </h1>
          
          <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed font-light">
            {post.frontmatter.description}
          </p>
        </header>

        {/* Content */}
        <div className="mb-12">
          <MarkdownRenderer content={post.content} />
        </div>

        {/* Footer / Tags */}
        {post.frontmatter.tags && (
          <div className="border-t border-gray-200 dark:border-gray-800 pt-8">
            <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-200 mb-3">Tags:</h3>
            <div className="flex flex-wrap gap-2">
              {post.frontmatter.tags.map(tag => (
                <span key={tag} className="px-3 py-1 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 rounded-full text-sm">
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        )}
      </article>
    </Layout>
  );
};