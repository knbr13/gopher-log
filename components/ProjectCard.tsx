import React from 'react';
import { Link } from 'react-router-dom';
import { ExternalLink, Star, GitBranch, Tag } from 'lucide-react';
import { Project } from '../types';

export const ProjectCard: React.FC<{ project: Project }> = ({ project }) => {
  return (
    <div className="group flex flex-col bg-white dark:bg-dark-card rounded-xl border border-gray-200 dark:border-dark-border p-6 shadow-sm hover:shadow-md transition-all duration-300 hover:border-primary-200 dark:hover:border-primary-900/50">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3 text-xs font-medium text-gray-500 dark:text-gray-400">
          <div className="flex items-center gap-1">
            <GitBranch size={14} />
            <span>{project.language}</span>
          </div>
          {project.stars && (
            <>
              <span>•</span>
              <div className="flex items-center gap-1">
                <Star size={14} />
                <span>{project.stars}</span>
              </div>
            </>
          )}
        </div>
        <div className="flex items-center gap-1">
          {project.tags.slice(0, 2).map((tag) => (
            <span
              key={tag}
              className="px-2 py-1 text-xs font-medium bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 rounded-full"
            >
              {tag}
            </span>
          ))}
          {project.tags.length > 2 && (
            <span className="px-2 py-1 text-xs font-medium bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 rounded-full">
              +{project.tags.length - 2}
            </span>
          )}
        </div>
      </div>

      <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-2 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
        <Link to={`/project/${project.slug}`}>
          {project.name}
        </Link>
      </h3>

      <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-3 flex-grow">
        {project.description}
      </p>

      {/* Key Features */}
      <div className="mb-4">
        <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Key Features:</h4>
        <ul className="space-y-1">
          {project.features.slice(0, 3).map((feature, index) => (
            <li key={index} className="text-xs text-gray-600 dark:text-gray-400 flex items-center gap-1">
              <span className="w-1 h-1 bg-primary-500 rounded-full"></span>
              {feature}
            </li>
          ))}
          {project.features.length > 3 && (
            <li className="text-xs text-gray-500 dark:text-gray-500 italic">
              +{project.features.length - 3} more features
            </li>
          )}
        </ul>
      </div>

      <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-100 dark:border-gray-800">
        <Link
          to={`/project/${project.slug}`}
          className="inline-flex items-center text-sm font-semibold text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300"
        >
          View Details
          <ExternalLink size={16} className="ml-1 transition-transform group-hover:translate-x-1" />
        </Link>
        <a
          href={project.githubUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200"
          onClick={(e) => e.stopPropagation()}
        >
          GitHub
          <ExternalLink size={14} className="ml-1" />
        </a>
      </div>
    </div>
  );
};