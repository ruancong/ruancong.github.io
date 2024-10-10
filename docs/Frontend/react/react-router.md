### 相对路径

Relative links are always relative to the route path they are *rendered in*, not to the full URL. 

- React Router的`<Link>`组件提供了更可预测的导航行为
- 链接是相对于组件被渲染时的路由路径，而不是完整URL
- 这解决了客户端路由中的一个常见问题

实际应用示例：

```react
function ProjectLayout() {
  return (
    <div>
      <nav>
        <Link to="settings">设置</Link>  // 始终导航到 /home/project/123/settings
        <Link to="members">成员</Link>   // 始终导航到 /home/project/123/members
      </nav>
      
      <Outlet />  {/* 子路由在这里渲染 */}
    </div>
  );
}

// 即使用户导航到更深的路径，如 /home/project/123/abc/xyz
// ProjectLayout 中的链接行为仍然保持不变
```

### 添加错误页面

Anytime your app throws an error while rendering, loading data, or performing data mutations, React Router will catch it and render an error screen. 

```react
...
const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
  },
]);
...
// ErrorPage
...
export default function ErrorPage() {
  const error = useRouteError();
  return (
    <div id="error-page">
       <i>{error.statusText || error.message}</i>
     </div>
  );
}
....

```

### Client Side Routing

```react
<nav>
    <ul>
        <li>
            <a href={`/contacts/1`}>Your Name</a>
        </li>
        ....
    </ul>
</nav>
```

当代码中用a标签进行导航时，会发再整个浏览器都被刷新了（从服务器请求了整个文档），Client side routing allows our app to update the URL without requesting another document from the server. Instead, the app can immediately render new UI. Let's make it happen with `Link`

```react
<li>
  <Link to={`contacts/1`}>Your Name</Link>
</li>

```

### Form 替代 form

`Form` prevents the browser from sending the request to the server and sends it to your route `action` instead. In web semantics, a POST usually means some data is changing. By convention, React Router uses this as a hint to automatically revalidate the data on the page after the action finishes. That means all of your `useLoaderData` hooks update and the UI **stays in sync with your data automatically**! Pretty cool.
