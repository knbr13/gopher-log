import { BlogPost, Frontmatter } from '../types';

// In a real application, you would use `fs` to read these from a `posts/` directory.
// For this browser-runtime demo, we store the raw markdown content strings here.

const POST_1 = `---
title: Singleflight in Go: Preventing Duplicate Work
date: 2025-01-20
description: Learn how to use Go's singleflight package to prevent duplicate work and improve system performance with real-world examples.
category: Go
tags: [go, singleflight, concurrency, performance]
slug: singleflight-in-go
---

# Singleflight in Go: Preventing Duplicate Work

Have you ever had multiple goroutines execute the same expensive operation simultaneously? Maybe fetching the same data from a database, calling the same external API, or computing the same resource-intensive calculation. This is where Go's \`singleflight\` package shines.

## What is Singleflight?

The \`singleflight\` package (in \`golang.org/x/sync/singleflight\`) provides a mechanism to suppress duplicate function calls. When multiple goroutines need to execute the same operation, \`singleflight\` ensures that the function is executed only once, and the result is shared with all callers.

### How It Works

The core of \`singleflight\` is the \`Group\` type, which coordinates duplicate request suppression. Here's its essential API:

\`\`\`go
type Group struct {
    // unexported fields
}

// Do executes and returns the results of the given function, making sure that
// only one execution is in-flight for a given key at a time.
func (g *Group) Do(key string, fn func() (any, error)) (v any, err error, shared bool)

// Forget tells the Group to forget about a key. Future calls to Do with this
// key will call the function rather than waiting for an earlier call to complete.
func (g *Group) Forget(key string)

// DoChan is like Do but returns a channel that will receive the results when ready.
func (g *Group) DoChan(key string, fn func() (any, error)) <-chan Result
\`\`\`

The \`Do()\` method is what you'll use most often. It takes two arguments:
1. **key** (string): A unique identifier for the operation being deduplicated
2. **fn** (function): The expensive function to execute

And it returns three values:
1. **v** (any): The result from the function (you'll need to type-assert this)
2. **err** (error): Any error returned by the function
3. **shared** (bool): Whether this result was shared with other waiting goroutines (true if you weren't the first caller)

When multiple goroutines call \`Do()\` with the **same key**, here's what happens:

1. **First caller** executes the function
2. **Subsequent callers** with the same key wait (block)
3. **All callers** receive the **same result** when the function completes
4. The \`shared\` boolean return value indicates whether the result was shared (true if you were not the first caller)

> **Important:** Singleflight is **NOT a cache**. It only deduplicates **in-flight** requests. Once the function completes and all waiting goroutines receive the result, the next request with the same key will execute the function again. It's about **preventing SIMULTANEOUS duplicate work**, not storing results for future use.

## The Problem: Thundering Herd

Imagine a scenario where your cache expires, and suddenly 1000 concurrent requests hit your server trying to fetch the same data. Without \`singleflight\`, you'd execute 1000 identical database queries or API calls simultaneously. This is known as the "thundering herd" problem.

\`\`\`go
// Without singleflight - PROBLEMATIC
func getUserData(userID int) (User, error) {
    // Every goroutine checks cache
    if val, found := cache.Get(userID); found {
        return val, nil
    }

    // Cache miss! Multiple goroutines will all hit the database
    user, err := db.QueryUser(userID)
    if err != nil {
        return User{}, err
    }

    cache.Set(userID, user)
    return user, nil
}
\`\`\`

## The Solution: Using Singleflight

Here's how to implement \`singleflight\` to solve this problem:

\`\`\`go
package main

import (
    "fmt"
    "sync"
    "time"

    "golang.org/x/sync/singleflight"
)

type User struct {
    ID    int
    Name  string
    Email string
}

var (
    cache    = make(map[int]User)
    cacheMu  sync.RWMutex
    requestGroup singleflight.Group
)

func getUserData(userID int) (User, error) {
    // Check cache first (fast path)
    cacheMu.RLock()
    if user, found := cache[userID]; found {
        cacheMu.RUnlock()
        return user, nil
    }
    cacheMu.RUnlock()

    // Use singleflight for the expensive operation
    result, err, shared := requestGroup.Do(fmt.Sprintf("user-%d", userID), func() (any, error) {
        // This function will only execute ONCE per key
        // even if called by multiple goroutines simultaneously

        // Simulate expensive database call
        time.Sleep(100 * time.Millisecond)

        user := User{
            ID:    userID,
            Name:  fmt.Sprintf("User %d", userID),
            Email: fmt.Sprintf("user%d@example.com", userID),
        }

        // Update cache
        cacheMu.Lock()
        cache[userID] = user
        cacheMu.Unlock()

        return user, nil
    })

    if err != nil {
        return User{}, err
    }

    if shared {
        fmt.Printf("Request for user %d shared a result with another goroutine\\n", userID)
    }

    return result.(User), nil
}
\`\`\`

> **Zero-Value Safety:** The zero-value of \`singleflight.Group\` is ready to use. You don't need to initialize it with \`singleflight.Group{}\` or \`new(singleflight.Group)\`. Just declare \`var g singleflight.Group\` and it's 100% safe to use. This follows Go's convention of zero values being usable.

## Real-World Example: API Gateway

Let's look at a more practical example - an API gateway that fetches user profiles from an external service:

\`\`\`go
package main

import (
    "context"
    "encoding/json"
    "fmt"
    "log"
    "net/http"
    "sync"
 
    "golang.org/x/sync/singleflight"
)

// APIClient represents our external API client
type APIClient struct {
    httpClient *http.Client
    sf         singleflight.Group
}

type UserProfile struct {
    ID       int    \`json:"id"\`
    Username string \`json:"username"\`
    Email    string \`json:"email"\`
}

func NewAPIClient() *APIClient {
    return &APIClient{
        httpClient: &http.Client{Timeout: 10 * time.Second},
        sf:         singleflight.Group{}, // this is optional, zero-value is usable
    }
}

// GetUserProfile fetches a user profile with singleflight protection
func (c *APIClient) GetUserProfile(ctx context.Context, userID int) (*UserProfile, error) {
    key := fmt.Sprintf("user-profile-%d", userID)

    // Singleflight ensures only one request per userID at a time
    result, err, shared := c.sf.Do(key, func() (any, error) {
        return c.fetchUserProfileFromAPI(ctx, userID)
    })

    if err != nil {
        return nil, err
    }

    if shared {
        log.Printf("Request for user %d: shared result (saved API call!)", userID)
    }

    return result.(*UserProfile), nil
}

func (c *APIClient) fetchUserProfileFromAPI(ctx context.Context, userID int) (*UserProfile, error) {
    url := fmt.Sprintf("https://api.example.com/users/%d", userID)
    req, err := http.NewRequestWithContext(ctx, "GET", url, nil)
    if err != nil {
        return nil, err
    }

    resp, err := c.httpClient.Do(req)
    if err != nil {
        return nil, err
    }
    defer resp.Body.Close()

    if resp.StatusCode != http.StatusOK {
        return nil, fmt.Errorf("API returned status %d", resp.StatusCode)
    }

    var profile UserProfile
    if err := json.NewDecoder(resp.Body).Decode(&profile); err != nil {
        return nil, err
    }

    return &profile, nil
}

// HandleIncomingRequest simulates handling incoming HTTP requests
func (c *APIClient) HandleIncomingRequest(userID int) {
    ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
    defer cancel()

    profile, err := c.GetUserProfile(ctx, userID)
    if err != nil {
        log.Printf("Error fetching user %d: %v", userID, err)
        return
    }

    log.Printf("Successfully fetched: %+v", profile)
}

func main() {
    client := NewAPIClient()

    // Simulate 100 concurrent requests for the same user
    var wg sync.WaitGroup
    for i := 0; i < 100; i++ {
        wg.Add(1)
        go func() {
            defer wg.Done()
            client.HandleIncomingRequest(123)
        }()
    }
    wg.Wait()

    // Without singleflight: 100 API calls
    // With singleflight: 1 API call (results shared)
}
\`\`\`

### Singleflight vs Cache: The Key Difference

This is worth repeating because it's a common misconception:

| **Singleflight** | **Cache** |
|-----------------|-----------|
| Prevents **simultaneous** duplicate work | Prevents **repeated** work over time |
| Only deduplicates **in-flight** requests | Stores results for future use |
| No persistence - once complete, next call executes again | Persists results across multiple calls |
| Protects against **thundering herds** | Reduces latency & load over time |

**Think of it this way:**
- **Singleflight** = "Hey, we're already doing that, wait for the result!"
- **Cache** = "We did that earlier, here's the result from last time!"

They solve different problems and work best when used together!

## When to Use Singleflight

**Good use cases:**
- Database queries after cache expiration
- Expensive computations (e.g., data processing, report generation)
- External API calls (especially rate-limited ones)
- Loading configuration or metadata
- Any operation where duplicate work is wasteful

**Not recommended:**
- Fast, cheap operations (the overhead might not be worth it)
- Operations that depend on caller-specific context
- When each caller needs unique results

## Best Practices

1. **Use meaningful keys**: The key should uniquely identify the operation.
2. **Combine with caching**: Use singleflight as a cache-stampede protection, not a replacement for caching. Singleflight prevents duplicate work **while it's happening**, caching prevents repeated work **over time**. They serve different purposes and work great together!
3. **Handle errors properly**: When the singleflight call errors, all waiting callers receive the error.
4. **Forget results when done**: Use \`Forget()\` if you want to invalidate in-flight operations.
5. **Zero-value is safe**: Remember that \`var g singleflight.Group\` is ready to use without initialization.

\`\`\`go
// Example: Forget in-flight results when data changes
func (c *APIClient) InvalidateUser(userID int) {
    key := fmt.Sprintf("user-%d", userID)
    c.sf.Forget(key)
}
\`\`\`

## Conclusion

The \`singleflight\` package is a powerful tool for preventing duplicate work and protecting your systems from cache stampedes. It's simple to implement, has minimal overhead, and can significantly improve your application's performance under high load.

Next time you find yourself with multiple goroutines executing the same expensive operation, remember: \`singleflight\` has your back!
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

const rawPosts = [POST_1];
export const allPosts: BlogPost[] = rawPosts.map(parsePost).sort((a, b) => {
  return new Date(b.frontmatter.date).getTime() - new Date(a.frontmatter.date).getTime();
});

export const categories: string[] = Array.from(new Set(allPosts.map(p => p.frontmatter.category)));
