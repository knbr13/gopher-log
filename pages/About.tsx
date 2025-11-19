import React from 'react';
import { Layout } from '../components/Layout';
import { Terminal, Server, Database, Globe } from 'lucide-react';

export const About: React.FC = () => {
  return (
    <Layout>
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-8">About Me</h1>
        
        <div className="prose prose-lg prose-slate dark:prose-invert mb-12">
          <p className="lead">
            Hello! I'm a <strong>Backend Engineer</strong> specializing in <strong>Go</strong> and distributed systems. 
            I love building high-performance services that scale.
          </p>
          <p>
            Currently, I work on architecting microservices and improving system reliability. 
            When I'm not pushing code, you can find me tinkering with my Neovim config, 
            reading about system design, or hiking.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 gap-6 mb-12">
          <div className="p-6 bg-white dark:bg-dark-card rounded-xl border border-gray-200 dark:border-dark-border shadow-sm">
            <Terminal className="text-primary-600 mb-4" size={32} />
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Languages</h3>
            <p className="text-gray-600 dark:text-gray-400">Go, Rust, Python, TypeScript, SQL</p>
          </div>
          <div className="p-6 bg-white dark:bg-dark-card rounded-xl border border-gray-200 dark:border-dark-border shadow-sm">
            <Server className="text-primary-600 mb-4" size={32} />
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Infrastructure</h3>
            <p className="text-gray-600 dark:text-gray-400">Docker, Kubernetes, Terraform, AWS</p>
          </div>
          <div className="p-6 bg-white dark:bg-dark-card rounded-xl border border-gray-200 dark:border-dark-border shadow-sm">
            <Database className="text-primary-600 mb-4" size={32} />
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Databases</h3>
            <p className="text-gray-600 dark:text-gray-400">PostgreSQL, Redis, Cassandra, DynamoDB</p>
          </div>
          <div className="p-6 bg-white dark:bg-dark-card rounded-xl border border-gray-200 dark:border-dark-border shadow-sm">
            <Globe className="text-primary-600 mb-4" size={32} />
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Interests</h3>
            <p className="text-gray-600 dark:text-gray-400">Distributed Consensus, Networking, Compilers</p>
          </div>
        </div>

        <div className="bg-gray-50 dark:bg-gray-900 rounded-2xl p-8 text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Let's Connect</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            I'm always open to discussing interesting engineering problems or potential collaborations.
          </p>
          <a href="mailto:hello@example.com" className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 transition-colors">
            Get in Touch
          </a>
        </div>
      </div>
    </Layout>
  );
};