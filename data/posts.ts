import { BlogPost, Frontmatter } from '../types';

// In a real application, you would use `fs` to read these from a `posts/` directory.
// For this browser-runtime demo, we store the raw markdown content strings here.

const POST_1 = `---
title: Understanding Interfaces in Go
date: 2023-10-15
description: A deep dive into how interfaces work in Go, duck typing, and best practices for composition.
category: Go
tags: [go, interfaces, design-patterns]
slug: understanding-interfaces-in-go
---

# Understanding Interfaces in Go

Go interfaces are implicit. Unlike Java or C#, you don't need to explicitly implement an interface. If a type provides the methods declared in an interface, it implements it. This concept is known as **duck typing**: "If it walks like a duck and quacks like a duck, it's a duck."

## Defining an Interface

Here is a simple example of an interface definition:

\`\`\`go
package main

import "fmt"

// Speaker interface
type Speaker interface {
    Speak() string
}

type Dog struct {
    Name string
}

func (d Dog) Speak() string {
    return "Woof!"
}

type Cat struct {
    Name string
}

func (c Cat) Speak() string {
    return "Meow!"
}

func main() {
    animals := []Speaker{
        Dog{Name: "Buddy"},
        Cat{Name: "Whiskers"},
    }

    for _, animal := range animals {
        fmt.Println(animal.Speak())
    }
}
\`\`\`

## The Empty Interface

The empty interface \`interface{}\` (or \`any\` in generic terms) has no methods. Since every type implements at least *zero* methods, every type satisfies the empty interface.

> **Tip:** Use \`any\` judiciously. Overusing it defeats the purpose of Go's strong type system.

## Best Practices

1.  **Keep interfaces small.** The bigger the interface, the weaker the abstraction. prefer \`io.Reader\` and \`io.Writer\` over large monolithic interfaces.
2.  **Accept interfaces, return structs.** This is a common Go proverb. It allows the caller to define the interface they need.

Happy coding!
`;

const POST_2 = `---
title: Building Resilient Microservices
date: 2023-11-02
description: Strategies for handling failures, retries, and circuit breakers in a distributed system.
category: Distributed Systems
tags: [microservices, reliability, architecture]
slug: building-resilient-microservices
---

# Building Resilient Microservices

In a distributed system, failure is not an exception; it's the rule. Network glitches, database timeouts, and service unavailability happen. 

## The Circuit Breaker Pattern

When a service is failing, repeatedly calling it is wasteful and can cause cascading failures. A **Circuit Breaker** prevents an application from trying to execute an operation that's likely to fail.

\`\`\`go
// Pseudo-code for a circuit breaker middleware
func (cb *CircuitBreaker) Execute(req Request) (Response, error) {
    if cb.State == Open {
        return nil, ErrCircuitOpen
    }
    
    resp, err := cb.Service.Call(req)
    if err != nil {
        cb.RecordFailure()
        return nil, err
    }
    
    cb.Reset()
    return resp, nil
}
\`\`\`

## Idempotency

Ensure your APIs are idempotent. If a client retries a request (e.g., creating a payment), the system should handle the duplicate gracefully without double-charging.

### Key Takeaways

*   Assume everything will fail.
*   Implement **Timeouts** and **Deadlines**.
*   Use **Retries** with **Exponential Backoff**.
*   Monitor your golden signals: Latency, Traffic, Errors, Saturation.
`;

const POST_3 = `---
title: My Developer Setup for 2024
date: 2024-01-10
description: A look at my terminal, Neovim config, and the tools I use daily as a Go engineer.
category: Career / Engineering Tips
tags: [productivity, tools, vim]
slug: my-developer-setup-2024
---

# My Developer Setup for 2024

Efficiency is key. Here is the hardware and software stack that powers my daily workflow.

## The Terminal: Alacritty + Tmux

I live in the terminal. **Alacritty** provides GPU-accelerated performance, and **Tmux** manages my sessions.

## Editor: Neovim

I switched to Neovim years ago and haven't looked back. With the implementation of LSP (Language Server Protocol), writing Go in Neovim feels just as powerful as VSCode but significantly faster.

### Essential Plugins

*   \`nvim-lspconfig\`: Quick config for gopls.
*   \`telescope.nvim\`: Fuzzy finder for everything.
*   \`nvim-treesitter\`: Better syntax highlighting.

## Go Tools

Apart from the standard toolchain, I rely on:

*   **golangci-lint**: For catching bugs early.
*   **delve**: For debugging.
*   **air**: For live reloading during development.

## Conclusion

Your tools should work *for* you, not against you. Spend time sharpening your axe.
`;

const POST_4 = `---
title: Concurrency in Go: Goroutines vs Threads
date: 2024-02-20
description: Understanding the M:N scheduler and why Goroutines are so lightweight.
category: Go
tags: [concurrency, performance, internals]
slug: concurrency-in-go
---

# Concurrency in Go

One of Go's main selling points is its concurrency model. It treats concurrency as a first-class citizen.

## OS Threads vs Goroutines

OS threads have a large stack size (typically 1MB) and significant scheduling overhead. Goroutines, on the other hand, start with a tiny stack (2KB) that grows dynamically.

### The Scheduler

Go uses an M:N scheduler, meaning it multiplexes M goroutines onto N OS threads. This allows a Go program to spawn thousands (or millions) of goroutines without crashing the system.

\`\`\`go
func worker(id int, jobs <-chan int, results chan<- int) {
    for j := range jobs {
        fmt.Println("worker", id, "started  job", j)
        time.Sleep(time.Second)
        fmt.Println("worker", id, "finished job", j)
        results <- j * 2
    }
}
\`\`\`

Concurrency is hard, but Go makes it accessible. Just remember: **Don't communicate by sharing memory; share memory by communicating.**
`;

// Helper to parse raw markdown string into structured data
function parsePost(raw: string): BlogPost {
  const match = raw.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  
  if (!match) {
    throw new Error("Invalid Markdown format. Missing Frontmatter.");
  }

  const frontmatterRaw = match[1];
  const content = match[2];

  const frontmatter: any = {};
  frontmatterRaw.split('\n').forEach(line => {
    const [key, ...valueParts] = line.split(':');
    if (key && valueParts.length) {
      let value = valueParts.join(':').trim();
      
      // Simple array parsing for tags
      if (value.startsWith('[') && value.endsWith(']')) {
        value = value.slice(1, -1).split(',').map(s => s.trim()) as any;
      }
      
      frontmatter[key.trim()] = value;
    }
  });

  return {
    slug: frontmatter.slug,
    frontmatter: frontmatter as Frontmatter,
    content
  };
}

const rawPosts = [POST_1, POST_2, POST_3, POST_4];
export const allPosts: BlogPost[] = rawPosts.map(parsePost).sort((a, b) => {
  return new Date(b.frontmatter.date).getTime() - new Date(a.frontmatter.date).getTime();
});

export const categories: string[] = Array.from(new Set(allPosts.map(p => p.frontmatter.category)));
