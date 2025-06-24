# Project Structure
## Folder and file conversions

### Top-level folders

|                                                              |                                    |
| ------------------------------------------------------------ | ---------------------------------- |
| [`app`](https://nextjs.org/docs/app)                         | App Router                         |
| [`pages`](https://nextjs.org/docs/pages/building-your-application/routing) | Pages Router                       |
| [`public`](https://nextjs.org/docs/app/api-reference/file-conventions/public-folder) | Static assets to be served         |
| [`src`](https://nextjs.org/docs/app/api-reference/file-conventions/src-folder) | Optional application source folder |

### Top-level files

|                                                              |                                         |
| ------------------------------------------------------------ | --------------------------------------- |
| **Next.js**                                                  |                                         |
| [`next.config.js`](https://nextjs.org/docs/app/api-reference/config/next-config-js) | Configuration file for Next.js          |
| [`package.json`](https://nextjs.org/docs/app/getting-started/installation#manual-installation) | Project dependencies and scripts        |
| [`instrumentation.ts`](https://nextjs.org/docs/app/guides/instrumentation) | OpenTelemetry and Instrumentation file  |
| [`middleware.ts`](https://nextjs.org/docs/app/api-reference/file-conventions/middleware) | Next.js request middleware              |
| [`.env`](https://nextjs.org/docs/app/guides/environment-variables) | Environment variables                   |
| [`.env.local`](https://nextjs.org/docs/app/guides/environment-variables) | Local environment variables             |
| [`.env.production`](https://nextjs.org/docs/app/guides/environment-variables) | Production environment variables        |
| [`.env.development`](https://nextjs.org/docs/app/guides/environment-variables) | Development environment variables       |
| [`.eslintrc.json`](https://nextjs.org/docs/app/api-reference/config/eslint) | Configuration file for ESLint           |
| `.gitignore`                                                 | Git files and folders to ignore         |
| `next-env.d.ts`                                              | TypeScript declaration file for Next.js |
| `tsconfig.json`                                              | Configuration file for TypeScript       |
| `jsconfig.json`                                              | Configuration file for JavaScript       |

### Routing Files

|                                                              |                     |                              |
| ------------------------------------------------------------ | ------------------- | ---------------------------- |
| [`layout`](https://nextjs.org/docs/app/api-reference/file-conventions/layout) | `.js` `.jsx` `.tsx` | Layout                       |
| [`page`](https://nextjs.org/docs/app/api-reference/file-conventions/page) | `.js` `.jsx` `.tsx` | Page                         |
| [`loading`](https://nextjs.org/docs/app/api-reference/file-conventions/loading) | `.js` `.jsx` `.tsx` | Loading UI                   |
| [`not-found`](https://nextjs.org/docs/app/api-reference/file-conventions/not-found) | `.js` `.jsx` `.tsx` | Not found UI                 |
| [`error`](https://nextjs.org/docs/app/api-reference/file-conventions/error) | `.js` `.jsx` `.tsx` | Error UI                     |
| [`global-error`](https://nextjs.org/docs/app/api-reference/file-conventions/error#global-error) | `.js` `.jsx` `.tsx` | Global error UI              |
| [`route`](https://nextjs.org/docs/app/api-reference/file-conventions/route) | `.js` `.ts`         | API endpoint                 |
| [`template`](https://nextjs.org/docs/app/api-reference/file-conventions/template) | `.js` `.jsx` `.tsx` | Re-rendered layout           |
| [`default`](https://nextjs.org/docs/app/api-reference/file-conventions/default) | `.js` `.jsx` `.tsx` | Parallel route fallback page |

### Nested routes

|                 |                      |
| --------------- | -------------------- |
| `folder`        | Route segment        |
| `folder/folder` | Nested route segment |

### Dynamic routes

|                                                              |                                  |
| ------------------------------------------------------------ | -------------------------------- |
| [`[folder]`](https://nextjs.org/docs/app/api-reference/file-conventions/dynamic-routes#convention) | Dynamic route segment            |
| [`[...folder]`](https://nextjs.org/docs/app/api-reference/file-conventions/dynamic-routes#catch-all-segments) | Catch-all route segment          |
| [`[[...folder]]`](https://nextjs.org/docs/app/api-reference/file-conventions/dynamic-routes#optional-catch-all-segments) | Optional catch-all route segment |

### Route Groups and private folders

|                                                              |                                                  |
| ------------------------------------------------------------ | ------------------------------------------------ |
| [`(folder)`](https://nextjs.org/docs/app/api-reference/file-conventions/route-groups#convention) | Group routes without affecting routing           |
| [`_folder`](https://nextjs.org/docs/app/getting-started/project-structure#private-folders) | Opt folder and all child segments out of routing |

Route Groups can be nested.

#### Example

* **Organize routes without affecting the URL path**

  ![image-20250620171433724](./images/image-20250620171433724.png)

  Even though routes inside `(marketing)` and `(shop)` share the same URL hierarchy, you can create a different layout for each group by adding a `layout.js` file inside their folders.

  ![image-20250620171456302](./images/image-20250620171456302.png)

### Parallel and Intercepted Routes

|                                                              |                            |
| ------------------------------------------------------------ | -------------------------- |
| [`@folder`](https://nextjs.org/docs/app/api-reference/file-conventions/parallel-routes#slots) | Named slot                 |
| [`(.)folder`](https://nextjs.org/docs/app/api-reference/file-conventions/intercepting-routes#convention) | Intercept same level       |
| [`(..)folder`](https://nextjs.org/docs/app/api-reference/file-conventions/intercepting-routes#convention) | Intercept one level above  |
| [`(..)(..)folder`](https://nextjs.org/docs/app/api-reference/file-conventions/intercepting-routes#convention) | Intercept two levels above |
| [`(...)folder`](https://nextjs.org/docs/app/api-reference/file-conventions/intercepting-routes#convention) | Intercept from root        |

### Metadata file conventions

#### App icons

|                                                              |                                     |                          |
| ------------------------------------------------------------ | ----------------------------------- | ------------------------ |
| [`favicon`](https://nextjs.org/docs/app/api-reference/file-conventions/metadata/app-icons#favicon) | `.ico`                              | Favicon file             |
| [`icon`](https://nextjs.org/docs/app/api-reference/file-conventions/metadata/app-icons#icon) | `.ico` `.jpg` `.jpeg` `.png` `.svg` | App Icon file            |
| [`icon`](https://nextjs.org/docs/app/api-reference/file-conventions/metadata/app-icons#generate-icons-using-code-js-ts-tsx) | `.js` `.ts` `.tsx`                  | Generated App Icon       |
| [`apple-icon`](https://nextjs.org/docs/app/api-reference/file-conventions/metadata/app-icons#apple-icon) | `.jpg` `.jpeg`, `.png`              | Apple App Icon file      |
| [`apple-icon`](https://nextjs.org/docs/app/api-reference/file-conventions/metadata/app-icons#generate-icons-using-code-js-ts-tsx) | `.js` `.ts` `.tsx`                  | Generated Apple App Icon |

#### SEO

|                                                              |             |                       |
| ------------------------------------------------------------ | ----------- | --------------------- |
| [`sitemap`](https://nextjs.org/docs/app/api-reference/file-conventions/metadata/sitemap#sitemap-files-xml) | `.xml`      | Sitemap file          |
| [`sitemap`](https://nextjs.org/docs/app/api-reference/file-conventions/metadata/sitemap#generating-a-sitemap-using-code-js-ts) | `.js` `.ts` | Generated Sitemap     |
| [`robots`](https://nextjs.org/docs/app/api-reference/file-conventions/metadata/robots#static-robotstxt) | `.txt`      | Robots file           |
| [`robots`](https://nextjs.org/docs/app/api-reference/file-conventions/metadata/robots#generate-a-robots-file) | `.js` `.ts` | Generated Robots file |

### Organizing your project

#### Component hierarchy

The components defined in special files are rendered in a specific hierarchy:

- `layout.js`
- `template.js`
- `error.js` (React error boundary)
- `loading.js` (React suspense boundary)
- `not-found.js` (React error boundary)
- `page.js` or nested `layout.js`

![image-20250620115540425](./images/image-20250620115540425.png)

 The components of a route segment will be nested **inside** the components of its parent segment.

![image-20250620115619147](./images/image-20250620115619147.png)

#### Colocation

A route is **not publicly accessible** until a `page.js` or `route.js` file is added to a route segment.

![image-20250620115715915](./images/image-20250620115715915.png)

And, even when a route is made publicly accessible, only the **content returned** by `page.js` or `route.js` is sent to the client.

![image-20250620115803639](./images/image-20250620115803639.png)

#### Private folders

Private folders can be created by prefixing a folder with an underscore: `_folderName`

his indicates the folder is a private implementation detail and should not be considered by the routing system, thereby **opting the folder and all its subfolders** out of routing.

![image-20250620135923483](./images/image-20250620135923483.png)

#### Route groups

Route groups can be created by wrapping a folder in parenthesis: `(folderName)`

This indicates the folder is for organizational purposes and should **not be included** in the route's URL path.

![image-20250620140531898](./images/image-20250620140531898.png)

##### Examples

* **Creating multiple root layouts**

  To create multiple [root layouts](https://nextjs.org/docs/app/api-reference/file-conventions/layout#root-layout), remove the top-level `layout.js` file, and add a `layout.js` file inside each route group. This is useful for partitioning an application into sections that have a completely different UI or experience. The `<html>` and `<body>` tags need to be added to each root layout.

  ![image-20250620150130806](./images/image-20250620150130806.png)

  In the example above, both `(marketing)` and `(shop)` have their own root layout.

# Layouts and Pages

## Creating a page

A **page** is UI that is rendered on a specific route.

![image-20250623105910942](./images/image-20250623105910942.png)

## Creating a layout

A layout is UI that is **shared** between multiple pages. 

```tsx
// app/layout.tsx
export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        {/* Layout UI */}
        {/* Place children where you want to render a page or nested layout */}
        <main>{children}</main>
      </body>
    </html>
  )
}
```

The layout above is called a [root layout](https://nextjs.org/docs/app/api-reference/file-conventions/layout#root-layout) because it's defined at the root of the `app` directory. The root layout is **required** and must contain `html` and `body` tags.

## Creating a nested route

A nested route is a route composed of multiple URL segments. For example, the `/blog/[slug]` route is composed of three segments:

- `/` (Root Segment)
- `blog` (Segment)
- `[slug]` (Leaf Segment)

In Next.js:

- **Folders** are used to define the route segments that map to URL segments.
- **Files** (like `page` and `layout`) are used to create UI that is shown for a segment.

## Nesting layouts

For example, to create a layout for the `/blog` route, add a new `layout` file inside the `blog` folder.

![image-20250623150452533](./images/image-20250623150452533.png)

## Creating a dynamic segment

To create a dynamic segment, wrap the segment (folder) name in square brackets: `[segmentName]`. For example, in the `app/blog/[slug]/page.tsx` route, the `[slug]` is the dynamic segment.

```tsx
export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const post = await getPost(slug)
 
  return (
    <div>
      <h1>{post.title}</h1>
      <p>{post.content}</p>
    </div>
  )
}
```

Dynamic Segments are passed as the `params` prop to [`layout`](https://nextjs.org/docs/app/api-reference/file-conventions/layout), [`page`](https://nextjs.org/docs/app/api-reference/file-conventions/page), [`route`](https://nextjs.org/docs/app/api-reference/file-conventions/route), and [`generateMetadata`](https://nextjs.org/docs/app/api-reference/functions/generate-metadata#generatemetadata-function) functions.

>  the `params` prop is a promise.  In version 14 and earlier, `params` was a synchronous prop.

# Linking and Navigating

## Server Rendering

There are two types of server rendering, based on *when* it happens:

- **Static Rendering (or Prerendering)** happens at build time or during [revalidation](https://nextjs.org/docs/app/getting-started/caching-and-revalidating) and the result is cached.
- **Dynamic Rendering** happens at request time in response to a client request.

## Prefetching

Prefetching is the process of loading a route in the background before the user navigates to it. This makes navigation between routes in your application feel instant, because by the time a user clicks on a link, the data to render the next route is already available client side.

Next.js automatically prefetches routes linked with the [<Link>](https://nextjs.org/docs/app/api-reference/components/link) when they enter the user's viewport.

## Streaming

To use streaming, create a `loading.tsx` in your route folder:

![image-20250624112802944](./images/image-20250624112802944.png)



## What can make transitions slow?

### Slow networks

To improve perceived performance, you can use the [`useLinkStatus` hook](https://nextjs.org/docs/app/api-reference/functions/use-link-status) to show inline visual feedback to the user (like spinners or text glimmers on the link) while a transition is in progress.

```tsx
'use client'
 
import { useLinkStatus } from 'next/link'
 
export default function LoadingIndicator() {
  const { pending } = useLinkStatus()
  return pending ? (
    <div role="status" aria-label="Loading" className="spinner" />
  ) : null
}
```

> `useLinkStatus` must be used within a descendant component of a `Link` component
