# Go Engineer Blog

A minimalist, high-performance blog template designed specifically for backend engineers. Built with React, TypeScript, and Tailwind CSS, featuring Markdown support, syntax highlighting, and a sleek dark-mode aesthetic.

## Features

- 🚀 **Modern Stack**: Built with React 19, TypeScript, and Vite for fast development
- 📝 **Markdown Support**: Write posts in Markdown with frontmatter metadata
- 🌓 **Dark Mode**: Beautiful dark theme with theme toggle
- ⚡ **Syntax Highlighting**: Code syntax highlighting using rehype-highlight
- 🏷️ **Categories & Tags**: Organize content by categories and tags
- 📱 **Responsive Design**: Mobile-first responsive layout
- 🎯 **Performance Optimized**: Lightweight and fast

## Project Structure

```
go-engineer-blog/
├── components/          # React components
│   ├── Layout.tsx      # Main layout component
│   ├── Header.tsx      # Navigation header
│   ├── PostCard.tsx    # Blog post card component
│   └── ...
├── pages/              # Page components
│   ├── Home.tsx        # Homepage with post listings
│   ├── Post.tsx        # Individual blog post page
│   ├── About.tsx       # About page
│   └── Categories.tsx  # Categories listing
├── data/
│   └── posts.ts        # Blog posts data and content
├── lib/
│   ├── utils.ts        # Utility functions
│   └── markdown.ts     # Markdown processing
└── types.ts            # TypeScript type definitions
```

## Getting Started

**Prerequisites:** Node.js 18+

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start the development server:**
   ```bash
   npm run dev
   ```

3. **Open your browser** and navigate to `http://localhost:5173`

## Available Scripts

- `npm run dev` - Start the development server
- `npm run build` - Build for production
- `npm run preview` - Preview the production build

## Adding New Blog Posts

Blog posts are stored in `data/posts.ts` as Markdown strings with YAML frontmatter. Each post should include:

```markdown
---
title: Your Post Title
date: 2024-01-15
description: A brief description of the post
category: Go
tags: [go, programming, tutorial]
slug: your-post-slug
---

# Your Post Title

Your markdown content here...
```

## Technologies Used

- **React 19** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **React Router** - Client-side routing
- **React Markdown** - Markdown rendering
- **Lucide React** - Icon library
- **rehype-highlight** - Syntax highlighting

## Customization

- **Theme**: Colors and styling can be customized in `tailwind.config.js`
- **Layout**: Modify components in the `components/` directory
- **Content**: Add or edit posts in `data/posts.ts`
- **Routing**: Add new routes in `App.tsx`
