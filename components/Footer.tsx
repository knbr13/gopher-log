import React from 'react';
import { Github, Linkedin, Instagram } from 'lucide-react';

const SocialLink: React.FC<{ href: string; icon: React.ReactNode; label: string }> = ({ href, icon, label }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="text-gray-500 hover:text-primary-600 dark:text-gray-400 dark:hover:text-primary-400 transition-colors"
    aria-label={label}
  >
    {icon}
  </a>
);

export const Footer: React.FC = () => {
  return (
    <footer className="border-t border-gray-200 dark:border-dark-border bg-white dark:bg-dark-bg transition-colors duration-300 mt-auto">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-sm text-gray-500 dark:text-gray-400">
            © {new Date().getFullYear()} GopherLog. All rights reserved.
          </div>
          
          <div className="flex space-x-6">
            <SocialLink href="https://github.com/hrtsegv/" icon={<Github size={20} />} label="GitHub" />
            <SocialLink href="https://www.linkedin.com/in/abdullah-alaadine/" icon={<Linkedin size={20} />} label="LinkedIn" />
            <SocialLink href="https://www.instagram.com/a6h.aladdin" icon={<Instagram size={20} />} label="Instagram" />
          </div>
        </div>
      </div>
    </footer>
  );
};