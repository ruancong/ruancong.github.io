import{_ as e,c as s,a,o as i}from"./app-CBcjwgaz.js";const l={};function t(r,n){return i(),s("div",null,n[0]||(n[0]=[a(`<h3 id="相对路径" tabindex="-1"><a class="header-anchor" href="#相对路径"><span>相对路径</span></a></h3><p>Relative links are always relative to the route path they are <em>rendered in</em>, not to the full URL.</p><ul><li>React Router的<code>&lt;Link&gt;</code>组件提供了更可预测的导航行为</li><li>链接是相对于组件被渲染时的路由路径，而不是完整URL</li><li>这解决了客户端路由中的一个常见问题</li></ul><p>实际应用示例：</p><div class="language-react line-numbers-mode" data-highlighter="prismjs" data-ext="react" data-title="react"><pre><code><span class="line">function ProjectLayout() {</span>
<span class="line">  return (</span>
<span class="line">    &lt;div&gt;</span>
<span class="line">      &lt;nav&gt;</span>
<span class="line">        &lt;Link to=&quot;settings&quot;&gt;设置&lt;/Link&gt;  // 始终导航到 /home/project/123/settings</span>
<span class="line">        &lt;Link to=&quot;members&quot;&gt;成员&lt;/Link&gt;   // 始终导航到 /home/project/123/members</span>
<span class="line">      &lt;/nav&gt;</span>
<span class="line">      </span>
<span class="line">      &lt;Outlet /&gt;  {/* 子路由在这里渲染 */}</span>
<span class="line">    &lt;/div&gt;</span>
<span class="line">  );</span>
<span class="line">}</span>
<span class="line"></span>
<span class="line">// 即使用户导航到更深的路径，如 /home/project/123/abc/xyz</span>
<span class="line">// ProjectLayout 中的链接行为仍然保持不变</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="添加错误页面" tabindex="-1"><a class="header-anchor" href="#添加错误页面"><span>添加错误页面</span></a></h3><p>Anytime your app throws an error while rendering, loading data, or performing data mutations, React Router will catch it and render an error screen.</p><div class="language-react line-numbers-mode" data-highlighter="prismjs" data-ext="react" data-title="react"><pre><code><span class="line">...</span>
<span class="line">const router = createBrowserRouter([</span>
<span class="line">  {</span>
<span class="line">    path: &quot;/&quot;,</span>
<span class="line">    element: &lt;Root /&gt;,</span>
<span class="line">    errorElement: &lt;ErrorPage /&gt;,</span>
<span class="line">  },</span>
<span class="line">]);</span>
<span class="line">...</span>
<span class="line">// ErrorPage</span>
<span class="line">...</span>
<span class="line">export default function ErrorPage() {</span>
<span class="line">  const error = useRouteError();</span>
<span class="line">  return (</span>
<span class="line">    &lt;div id=&quot;error-page&quot;&gt;</span>
<span class="line">       &lt;i&gt;{error.statusText || error.message}&lt;/i&gt;</span>
<span class="line">     &lt;/div&gt;</span>
<span class="line">  );</span>
<span class="line">}</span>
<span class="line">....</span>
<span class="line"></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="client-side-routing" tabindex="-1"><a class="header-anchor" href="#client-side-routing"><span>Client Side Routing</span></a></h3><div class="language-react line-numbers-mode" data-highlighter="prismjs" data-ext="react" data-title="react"><pre><code><span class="line">&lt;nav&gt;</span>
<span class="line">    &lt;ul&gt;</span>
<span class="line">        &lt;li&gt;</span>
<span class="line">            &lt;a href={\`/contacts/1\`}&gt;Your Name&lt;/a&gt;</span>
<span class="line">        &lt;/li&gt;</span>
<span class="line">        ....</span>
<span class="line">    &lt;/ul&gt;</span>
<span class="line">&lt;/nav&gt;</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>当代码中用a标签进行导航时，会发再整个浏览器都被刷新了（从服务器请求了整个文档），Client side routing allows our app to update the URL without requesting another document from the server. Instead, the app can immediately render new UI. Let&#39;s make it happen with <code>Link</code></p><div class="language-react line-numbers-mode" data-highlighter="prismjs" data-ext="react" data-title="react"><pre><code><span class="line">&lt;li&gt;</span>
<span class="line">  &lt;Link to={\`contacts/1\`}&gt;Your Name&lt;/Link&gt;</span>
<span class="line">&lt;/li&gt;</span>
<span class="line"></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="form-替代-form" tabindex="-1"><a class="header-anchor" href="#form-替代-form"><span>Form 替代 form</span></a></h3><p><code>Form</code> prevents the browser from sending the request to the server and sends it to your route <code>action</code> instead. In web semantics, a POST usually means some data is changing. By convention, React Router uses this as a hint to automatically revalidate the data on the page after the action finishes. That means all of your <code>useLoaderData</code> hooks update and the UI <strong>stays in sync with your data automatically</strong>! Pretty cool.</p>`,14)]))}const c=e(l,[["render",t],["__file","react-router.html.vue"]]),o=JSON.parse('{"path":"/Frontend/react/react-router.html","title":"","lang":"en-US","frontmatter":{},"headers":[{"level":3,"title":"相对路径","slug":"相对路径","link":"#相对路径","children":[]},{"level":3,"title":"添加错误页面","slug":"添加错误页面","link":"#添加错误页面","children":[]},{"level":3,"title":"Client Side Routing","slug":"client-side-routing","link":"#client-side-routing","children":[]},{"level":3,"title":"Form 替代 form","slug":"form-替代-form","link":"#form-替代-form","children":[]}],"git":{"updatedTime":1728526917000,"contributors":[{"name":"RuanCong","username":"RuanCong","email":"1308811723@qq.com","commits":1,"url":"https://github.com/RuanCong"}]},"filePathRelative":"Frontend/react/react-router.md"}');export{c as comp,o as data};
