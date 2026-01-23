import React from 'react';
import ReactMarkdown from 'react-markdown';
import rehypeHighlight from 'rehype-highlight';
import remarkGfm from 'remark-gfm';

interface MarkdownRendererProps {
  content: string;
}

export const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({ content }) => {
  return (
    <article className="prose prose-slate dark:prose-invert max-w-none 
      prose-headings:font-bold prose-headings:tracking-tight 
      prose-a:text-primary-600 dark:prose-a:text-primary-400 prose-a:no-underline hover:prose-a:underline
      prose-pre:bg-gray-900 dark:prose-pre:bg-gray-900 prose-pre:border prose-pre:border-gray-800
      prose-img:rounded-lg prose-img:shadow-md
      prose-table:border-collapse prose-th:border prose-th:border-gray-300 dark:prose-th:border-gray-700
      prose-td:border prose-td:border-gray-300 dark:prose-td:border-gray-700
    ">
      <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeHighlight]}>
        {content}
      </ReactMarkdown>
    </article>
  );
};