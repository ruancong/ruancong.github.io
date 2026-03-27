import{_ as s,c as e,a,o as i}from"./app-YTFI8_kc.js";const l={};function t(c,n){return i(),e("div",null,[...n[0]||(n[0]=[a(`<h3 id="react组件" tabindex="-1"><a class="header-anchor" href="#react组件"><span>React组件</span></a></h3><p>React components are JavaScript functions that return markup:</p><div class="language-react line-numbers-mode" data-highlighter="prismjs" data-ext="react"><pre><code class="language-react"><span class="line">function MyButton() {</span>
<span class="line">  return (</span>
<span class="line">    &lt;button&gt;I&#39;m a button&lt;/button&gt;</span>
<span class="line">  );</span>
<span class="line">}</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>react组件可以嵌入到其它的组件内。</p><div class="language-react line-numbers-mode" data-highlighter="prismjs" data-ext="react"><pre><code class="language-react"><span class="line">export default function MyApp() {</span>
<span class="line">  return (</span>
<span class="line">    &lt;div&gt;</span>
<span class="line">      &lt;h1&gt;Welcome to my app&lt;/h1&gt;</span>
<span class="line">      &lt;MyButton /&gt;</span>
<span class="line">    &lt;/div&gt;</span>
<span class="line">  );</span>
<span class="line">}</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="注意事项" tabindex="-1"><a class="header-anchor" href="#注意事项"><span>注意事项</span></a></h4><ul><li><p>react组件以大写字母开头，而html标签是小写字母</p></li><li><p>return的值，如果返回的值是一行html则可以省略<code>()</code> , 如果我多选，则需要用<code>()</code>括起来，否则return后面的行都会被忽略</p></li><li><p>不能在组件里面定义组件</p><blockquote><div class="language-react line-numbers-mode" data-highlighter="prismjs" data-ext="react"><pre><code class="language-react"><span class="line">export default function Gallery() {</span>
<span class="line">// 🔴 Never define a component inside another component!</span>
<span class="line">function Profile() {</span>
<span class="line"> // ...</span>
<span class="line">}</span>
<span class="line">// ...</span>
<span class="line">}</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></blockquote></li><li><p>需要移到top level</p></li><li><p>The default behavior of rendering all components nested within the updated component is not optimal for performance if the updated component is very high in the tree. If you run into a performance issue, there are several opt-in ways to solve it described in the <a href="https://reactjs.org/docs/optimizing-performance.html" target="_blank" rel="noopener noreferrer">Performance</a> section. <strong>Don’t optimize prematurely!</strong></p></li><li><p><strong>React only changes the DOM nodes if there’s a difference between renders.</strong></p><div class="language-react line-numbers-mode" data-highlighter="prismjs" data-ext="react"><pre><code class="language-react"><span class="line">export default function Clock({ time }) {</span>
<span class="line">  return (</span>
<span class="line">    &lt;&gt;</span>
<span class="line">      &lt;h1&gt;{time}&lt;/h1&gt;</span>
<span class="line">      &lt;input /&gt;</span>
<span class="line">    &lt;/&gt;</span>
<span class="line">  );</span>
<span class="line">}</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这段代码中，如果time一直变化 ，而在input中输入的值还是会被保留。This works because during this last step, React only updates the content of <code>&lt;h1&gt;</code> with the new <code>time</code>. It sees that the <code>&lt;input&gt;</code> appears in the JSX in the same place as last time, so React doesn’t touch the <code>&lt;input&gt;</code>—or its <code>value</code>!</p></li><li><p><strong>Setting state only changes it for the next render.</strong></p><div class="language-react line-numbers-mode" data-highlighter="prismjs" data-ext="react"><pre><code class="language-react"><span class="line">&lt;button onClick={() =&gt; {</span>
<span class="line">  setNumber(number + 1);</span>
<span class="line">  setNumber(number + 1);</span>
<span class="line">  setNumber(number + 1);</span>
<span class="line">}}&gt;+3&lt;/button&gt;</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>点击一次，number只会+1。</p><p>一个state变量在一个渲染里面是不会改变的，即使它在组件内的异步方法内:</p><div class="language-react line-numbers-mode" data-highlighter="prismjs" data-ext="react"><pre><code class="language-react"><span class="line"> const [number, setNumber] = useState(0);</span>
<span class="line"></span>
<span class="line">  return (</span>
<span class="line">    &lt;&gt;</span>
<span class="line">      &lt;h1&gt;{number}&lt;/h1&gt;</span>
<span class="line">      &lt;button onClick={() =&gt; {</span>
<span class="line">        setNumber(number + 5);</span>
<span class="line">        setTimeout(() =&gt; {</span>
<span class="line">          alert(number);</span>
<span class="line">        }, 3000);</span>
<span class="line">      }}&gt;+5&lt;/button&gt;</span>
<span class="line">    &lt;/&gt;</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>alert出来的值还是0</p></li><li></li></ul><h3 id="jsx" tabindex="-1"><a class="header-anchor" href="#jsx"><span>JSX</span></a></h3><h4 id="writing-markup-with-jsx" tabindex="-1"><a class="header-anchor" href="#writing-markup-with-jsx"><span>Writing markup with JSX</span></a></h4><p>The markup syntax you’ve seen above is called <em>JSX</em>.</p><p>JSX is stricter than HTML. You have to close tags like <code>&lt;br /&gt;</code>. <strong>Your component also can’t return multiple JSX tags</strong>. You have to wrap them into a shared parent, like a <code>&lt;div&gt;...&lt;/div&gt;</code> or an empty <code>&lt;&gt;...&lt;/&gt;</code> wrapper:</p><div class="language-react line-numbers-mode" data-highlighter="prismjs" data-ext="react"><pre><code class="language-react"><span class="line">function AboutPage() {</span>
<span class="line">  return (</span>
<span class="line">    &lt;&gt;</span>
<span class="line">      &lt;h1&gt;About&lt;/h1&gt;</span>
<span class="line">      &lt;p&gt;Hello there.&lt;br /&gt;How do you do?&lt;/p&gt;</span>
<span class="line">    &lt;/&gt;</span>
<span class="line">  );</span>
<span class="line">}</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="the-rules-of-jsx" tabindex="-1"><a class="header-anchor" href="#the-rules-of-jsx"><span>The Rules of JSX</span></a></h4><ol><li><p>Return a single root element</p><blockquote><p>JSX looks like HTML, but under the hood it is transformed into plain JavaScript objects. You can’t return two objects from a function without wrapping them into an array. This explains why you also can’t return two JSX tags without wrapping them into another tag or a Fragment.</p></blockquote></li><li><p>Close all the tags</p></li><li><p>camelCase <s>all</s> most of the things!</p><p>JavaScript has limitations on variable names. For example, their names can’t contain dashes or be reserved words like <code>class</code>. This is why, in React, many HTML and SVG attributes are written in camelCase. For example, instead of <code>stroke-width</code> you use <code>strokeWidth</code>. Since <code>class</code> is a reserved word, in React you write <code>className</code> instead</p><blockquote><p>For historical reasons, <a href="https://developer.mozilla.org/docs/Web/Accessibility/ARIA" target="_blank" rel="noopener noreferrer"><code>aria-*</code></a> and <a href="https://developer.mozilla.org/docs/Learn/HTML/Howto/Use_data_attributes" target="_blank" rel="noopener noreferrer"><code>data-*</code></a> attributes are written as in HTML with dashes.</p></blockquote></li></ol><h4 id="html转化成jsx" tabindex="-1"><a class="header-anchor" href="#html转化成jsx"><span>HTML转化成JSX</span></a></h4><p>If you have a lot of HTML to port to JSX, you can use an <a href="https://transform.tools/html-to-jsx" target="_blank" rel="noopener noreferrer">online converter.</a></p><h4 id="jsx中显示数据" tabindex="-1"><a class="header-anchor" href="#jsx中显示数据"><span>JSX中显示数据</span></a></h4><p>JSX中用大括号括起来的内容当作js去运行</p><div class="language-react line-numbers-mode" data-highlighter="prismjs" data-ext="react"><pre><code class="language-react"><span class="line">return (</span>
<span class="line">  &lt;h1&gt;</span>
<span class="line">    {user.name}</span>
<span class="line">  &lt;/h1&gt;</span>
<span class="line">);</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在jsx中的属性中也可以使用，只是属性的双引号要改为大括号</p><div class="language-react line-numbers-mode" data-highlighter="prismjs" data-ext="react"><pre><code class="language-react"><span class="line">return (</span>
<span class="line">  &lt;img</span>
<span class="line">    className=&quot;avatar&quot;</span>
<span class="line">    src={user.imageUrl}</span>
<span class="line">  /&gt;</span>
<span class="line">);</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>可以使用复杂的表达式，如</p><div class="language-react line-numbers-mode" data-highlighter="prismjs" data-ext="react"><pre><code class="language-react"><span class="line"> return (</span>
<span class="line">    &lt;&gt;</span>
<span class="line">      &lt;h1&gt;{user.name}&lt;/h1&gt;</span>
<span class="line">      &lt;img</span>
<span class="line">        className=&quot;avatar&quot;</span>
<span class="line">        src={user.imageUrl}</span>
<span class="line">        alt={&#39;Photo of &#39; + user.name}</span>
<span class="line">        style={{</span>
<span class="line">          width: user.imageSize,</span>
<span class="line">          height: user.imageSize</span>
<span class="line">        }}</span>
<span class="line">      /&gt;</span>
<span class="line">    &lt;/&gt;</span>
<span class="line">  );</span>
<span class="line">}</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>其中的<code>{{}}</code>并不是一个新的语法，里面的<code>{}</code>表示一个对象</p><h4 id="在jsx中写内联样式" tabindex="-1"><a class="header-anchor" href="#在jsx中写内联样式"><span>在JSX中写内联样式</span></a></h4><p>Inline <code>style</code> properties are written in camelCase. For example, HTML <code>&lt;ul style=&quot;background-color: black&quot;&gt;</code> would be written as <code>&lt;ul style={{ backgroundColor: &#39;black&#39; }}&gt;</code> in your component.</p><h3 id="条件渲染" tabindex="-1"><a class="header-anchor" href="#条件渲染"><span>条件渲染</span></a></h3><h4 id="几种实现方式" tabindex="-1"><a class="header-anchor" href="#几种实现方式"><span>几种实现方式</span></a></h4><p>1、</p><div class="language-react line-numbers-mode" data-highlighter="prismjs" data-ext="react"><pre><code class="language-react"><span class="line">let content;</span>
<span class="line">if (isLoggedIn) {</span>
<span class="line">  content = &lt;AdminPanel /&gt;;</span>
<span class="line">} else {</span>
<span class="line">  content = &lt;LoginForm /&gt;;</span>
<span class="line">}</span>
<span class="line">return (</span>
<span class="line">  &lt;div&gt;</span>
<span class="line">    {content}</span>
<span class="line">  &lt;/div&gt;</span>
<span class="line">);</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>2、</p><div class="language-react line-numbers-mode" data-highlighter="prismjs" data-ext="react"><pre><code class="language-react"><span class="line">&lt;div&gt;</span>
<span class="line">  {isLoggedIn ? (</span>
<span class="line">    &lt;AdminPanel /&gt;</span>
<span class="line">  ) : (</span>
<span class="line">    &lt;LoginForm /&gt;</span>
<span class="line">  )}</span>
<span class="line">&lt;/div&gt;</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>3、</p><div class="language-react line-numbers-mode" data-highlighter="prismjs" data-ext="react"><pre><code class="language-react"><span class="line">&lt;div&gt;</span>
<span class="line">  {isLoggedIn &amp;&amp; &lt;AdminPanel /&gt;}</span>
<span class="line">&lt;/div&gt;</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><blockquote><p><strong>Don’t put numbers on the left side of <code>&amp;&amp;</code>.</strong> To test the condition, JavaScript converts the left side to a boolean automatically. However, if the left side is <code>0</code>, then the whole expression gets that value (<code>0</code>), and React will happily render <code>0</code> rather than nothing.</p></blockquote><h4 id="are-these-two-examples-fully-equivalent" tabindex="-1"><a class="header-anchor" href="#are-these-two-examples-fully-equivalent"><span>Are these two examples fully equivalent?</span></a></h4><div class="language-react line-numbers-mode" data-highlighter="prismjs" data-ext="react"><pre><code class="language-react"><span class="line">if (isPacked) {</span>
<span class="line">  return &lt;li className=&quot;item&quot;&gt;{name} ✅&lt;/li&gt;;</span>
<span class="line">}</span>
<span class="line">return &lt;li className=&quot;item&quot;&gt;{name}&lt;/li&gt;;</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-react line-numbers-mode" data-highlighter="prismjs" data-ext="react"><pre><code class="language-react"><span class="line">return (</span>
<span class="line">  &lt;li className=&quot;item&quot;&gt;</span>
<span class="line">    {isPacked ? name + &#39; ✅&#39; : name}</span>
<span class="line">  &lt;/li&gt;</span>
<span class="line">);</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><blockquote><p>you might assume that the two examples above are subtly different because one of them may create two different “instances” of <code>&lt;li&gt;</code>. But JSX elements aren’t “instances” because they don’t hold any internal state and aren’t real DOM nodes. They’re lightweight descriptions, like blueprints. So these two examples, in fact, <em>are</em> completely equivalent.</p></blockquote><h4 id="根据条件渲染多行html" tabindex="-1"><a class="header-anchor" href="#根据条件渲染多行html"><span>根据条件渲染多行HTML</span></a></h4><div class="language-react line-numbers-mode" data-highlighter="prismjs" data-ext="react"><pre><code class="language-react"><span class="line">function Item({ name, isPacked }) {</span>
<span class="line">  return (</span>
<span class="line">    &lt;li className=&quot;item&quot;&gt;</span>
<span class="line">      {isPacked ? (</span>
<span class="line">        &lt;del&gt;</span>
<span class="line">          {name + &#39; ✅&#39;}</span>
<span class="line">        &lt;/del&gt;</span>
<span class="line">      ) : (</span>
<span class="line">        name</span>
<span class="line">      )}</span>
<span class="line">    &lt;/li&gt;</span>
<span class="line">  );</span>
<span class="line">}</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>可以使用<code>()</code> 来修饰多行语句，像retun语句一样</p><blockquote><p>If your components get messy with too much nested conditional markup, consider extracting child components to clean things up. In React, markup is a part of your code, so you can use tools like variables and functions to tidy up complex expressions.</p></blockquote><h4 id="把jsx赋值给变量" tabindex="-1"><a class="header-anchor" href="#把jsx赋值给变量"><span>把JSX赋值给变量</span></a></h4><div class="language-react line-numbers-mode" data-highlighter="prismjs" data-ext="react"><pre><code class="language-react"><span class="line">let itemContent = (</span>
<span class="line">      &lt;del&gt;</span>
<span class="line">        {name + &quot; ✅&quot;}</span>
<span class="line">      &lt;/del&gt;</span>
<span class="line">    );</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="循环渲染" tabindex="-1"><a class="header-anchor" href="#循环渲染"><span>循环渲染</span></a></h3><div class="language-react line-numbers-mode" data-highlighter="prismjs" data-ext="react"><pre><code class="language-react"><span class="line">const products = [</span>
<span class="line">  { title: &#39;Cabbage&#39;, isFruit: false, id: 1 },</span>
<span class="line">  { title: &#39;Garlic&#39;, isFruit: false, id: 2 },</span>
<span class="line">  { title: &#39;Apple&#39;, isFruit: true, id: 3 },</span>
<span class="line">];</span>
<span class="line"></span>
<span class="line">export default function ShoppingList() {</span>
<span class="line">  const listItems = products.map(product =&gt;</span>
<span class="line">    &lt;li</span>
<span class="line">      key={product.id}</span>
<span class="line">      style={{</span>
<span class="line">        color: product.isFruit ? &#39;magenta&#39; : &#39;darkgreen&#39;</span>
<span class="line">      }}</span>
<span class="line">    &gt;</span>
<span class="line">      {product.title}</span>
<span class="line">    &lt;/li&gt;</span>
<span class="line">  );</span>
<span class="line"></span>
<span class="line">  return (</span>
<span class="line">    &lt;ul&gt;{listItems}&lt;/ul&gt;</span>
<span class="line">  );</span>
<span class="line">}</span>
<span class="line"></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><blockquote><p>Keeping list items in order with key</p></blockquote><blockquote><p>do not generate keys on the fly, e.g. with <code>key={Math.random()}</code>. This will cause keys to never match up between renders, leading to all your components and DOM being recreated every time. Not only is this slow, but it will also lose any user input inside the list items. Instead, use a stable ID based on the data.</p></blockquote><blockquote><p>Note that your components won’t receive <code>key</code> as a prop. It’s only used as a hint by React itself. If your component needs an ID, you have to pass it as a separate prop: <code>&lt;Profile key={id} userId={id} /&gt;</code>.</p></blockquote><h4 id="displaying-several-dom-nodes-for-each-list-item" tabindex="-1"><a class="header-anchor" href="#displaying-several-dom-nodes-for-each-list-item"><span>Displaying several DOM nodes for each list item</span></a></h4><p>当在循环渲染时，有多个同级DOM节点要同时渲染时，<code>&lt;&gt;&lt;/&gt;</code>这种语法无法使用<code>key</code>, 也不必要在顶层加一层<code>div</code>，可以使用<code>Fragment </code>.</p><div class="language-react line-numbers-mode" data-highlighter="prismjs" data-ext="react"><pre><code class="language-react"><span class="line">import { Fragment } from &#39;react&#39;;</span>
<span class="line"></span>
<span class="line">// ...</span>
<span class="line"></span>
<span class="line">const listItems = people.map(person =&gt;</span>
<span class="line">  &lt;Fragment key={person.id}&gt;</span>
<span class="line">    &lt;h1&gt;{person.name}&lt;/h1&gt;</span>
<span class="line">    &lt;p&gt;{person.bio}&lt;/p&gt;</span>
<span class="line">  &lt;/Fragment&gt;</span>
<span class="line">);</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><blockquote><p>Fragments disappear from the DOM, so this will produce a flat list of <code>&lt;h1&gt;</code>, <code>&lt;p&gt;</code>, <code>&lt;h1&gt;</code>, <code>&lt;p&gt;</code>, and so on.</p></blockquote><h3 id="响应事件" tabindex="-1"><a class="header-anchor" href="#响应事件"><span>响应事件</span></a></h3><div class="language-react line-numbers-mode" data-highlighter="prismjs" data-ext="react"><pre><code class="language-react"><span class="line">function MyButton() {</span>
<span class="line">  function handleClick() {</span>
<span class="line">    alert(&#39;You clicked me!&#39;);</span>
<span class="line">  }</span>
<span class="line"></span>
<span class="line">  return (</span>
<span class="line">    &lt;button onClick={handleClick}&gt;</span>
<span class="line">      Click me</span>
<span class="line">    &lt;/button&gt;</span>
<span class="line">  );</span>
<span class="line">}</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><blockquote><p>Functions passed to event handlers must be passed, not called. For example:</p><table><thead><tr><th>passing a function (correct)</th><th>calling a function (incorrect)</th></tr></thead><tbody><tr><td><code>&lt;button onClick={handleClick}&gt;</code></td><td><code>&lt;button onClick={handleClick()}&gt;</code></td></tr></tbody></table><p>When you write code inline, the same pitfall presents itself in a different way:</p><table><thead><tr><th>passing a function (correct)</th><th>calling a function (incorrect)</th></tr></thead><tbody><tr><td><code>&lt;button onClick={() =&gt; alert(&#39;...&#39;)}&gt;</code></td><td><code>&lt;button onClick={alert(&#39;...&#39;)}&gt;</code></td></tr></tbody></table></blockquote><p>Event handler functions:</p><ul><li>Are usually defined <em>inside</em> your components.</li><li>Have names that start with <code>handle</code>, followed by the name of the event.</li></ul><h4 id="事件传播与捕获" tabindex="-1"><a class="header-anchor" href="#事件传播与捕获"><span>事件传播与捕获</span></a></h4><p><code>e.stopPropagation()</code> , <code>onClickCapture</code></p><div class="language-react line-numbers-mode" data-highlighter="prismjs" data-ext="react"><pre><code class="language-react"><span class="line">&lt;div onClickCapture={() =&gt; { /* this runs first */ }}&gt;</span>
<span class="line">  &lt;button onClick={e =&gt; e.stopPropagation()} /&gt;</span>
<span class="line">  &lt;button onClick={e =&gt; e.stopPropagation()} /&gt;</span>
<span class="line">&lt;/div&gt;</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="阻止默认行为" tabindex="-1"><a class="header-anchor" href="#阻止默认行为"><span>阻止默认行为</span></a></h4><div class="language-react line-numbers-mode" data-highlighter="prismjs" data-ext="react"><pre><code class="language-react"><span class="line">export default function Signup() {</span>
<span class="line">  return (</span>
<span class="line">    &lt;form onSubmit={e =&gt; {</span>
<span class="line">      e.preventDefault();</span>
<span class="line">      alert(&#39;Submitting!&#39;);</span>
<span class="line">    }}&gt;</span>
<span class="line">      &lt;input /&gt;</span>
<span class="line">      &lt;button&gt;Send&lt;/button&gt;</span>
<span class="line">    &lt;/form&gt;</span>
<span class="line">  );</span>
<span class="line">}</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>Don’t confuse <code>e.stopPropagation()</code> and <code>e.preventDefault()</code>. They are both useful, but are unrelated:</p><ul><li><a href="https://developer.mozilla.org/docs/Web/API/Event/stopPropagation" target="_blank" rel="noopener noreferrer"><code>e.stopPropagation()</code></a> stops the event handlers attached to the tags above from firing.</li><li><a href="https://developer.mozilla.org/docs/Web/API/Event/preventDefault" target="_blank" rel="noopener noreferrer"><code>e.preventDefault()</code></a>prevents the default browser behavior for the few events that have it.</li></ul><h3 id="usestate-的使用" tabindex="-1"><a class="header-anchor" href="#usestate-的使用"><span>useState 的使用</span></a></h3><blockquote><p>一个组件里内多次使用useState，它是怎么知道正确返回某个state的。 React Hooks: Not Magic, Just Arrays.</p></blockquote><div class="language-react line-numbers-mode" data-highlighter="prismjs" data-ext="react"><pre><code class="language-react"><span class="line">import { useState } from &#39;react&#39;;</span>
<span class="line"></span>
<span class="line">function MyButton() {</span>
<span class="line">  const [count, setCount] = useState(0);</span>
<span class="line">  // ...</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><blockquote><p>You’ll get two things from <code>useState</code>: the current state (<code>count</code>), and the function that lets you update it (<code>setCount</code>). You can give them any names, but the convention is to write <code>[something, setSomething]</code>.</p></blockquote><p>多次使用<code>MyButton</code>后，每个<code>MyButton</code>都有自己的隔离的state.</p><p>普通变量可以完成的事就不要使用useState</p><div class="language-react line-numbers-mode" data-highlighter="prismjs" data-ext="react"><pre><code class="language-react"><span class="line">// useState初化值时，可以传入初始化函数</span>
<span class="line">useState(()=&gt;{</span>
<span class="line">return .....</span>
<span class="line">})</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="using-hooks" tabindex="-1"><a class="header-anchor" href="#using-hooks"><span>using Hooks</span></a></h3><p>Functions starting with <code>use</code> are called <em>Hooks</em>. <code>useState</code> is a built-in Hook provided by React. You can find other built-in Hooks in the <a href="https://react.dev/reference/react" target="_blank" rel="noopener noreferrer">API reference.</a> You can also write your own Hooks by combining the existing ones.</p><p>Hooks are more restrictive than other functions. You can only call Hooks <em><strong>at the top</strong></em> of your components (or other Hooks). If you want to use <code>useState</code> in a condition or a loop, extract a new component and put it there.</p><blockquote><p>You “use” React features at the top of your component similar to how you “import” modules at the top of your file.</p></blockquote><h3 id="组件属性" tabindex="-1"><a class="header-anchor" href="#组件属性"><span>组件属性</span></a></h3><div class="language-jsx line-numbers-mode" data-highlighter="prismjs" data-ext="jsx"><pre><code class="language-jsx"><span class="line"><span class="token keyword">function</span> <span class="token function">MyButton</span><span class="token punctuation">(</span><span class="token parameter"><span class="token punctuation">{</span> count<span class="token punctuation">,</span> onClick <span class="token punctuation">}</span></span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">  <span class="token keyword">return</span> <span class="token punctuation">(</span></span>
<span class="line">    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>button</span> <span class="token attr-name">onClick</span><span class="token script language-javascript"><span class="token script-punctuation punctuation">=</span><span class="token punctuation">{</span>onClick<span class="token punctuation">}</span></span><span class="token punctuation">&gt;</span></span><span class="token plain-text"></span>
<span class="line">      Clicked </span><span class="token punctuation">{</span>count<span class="token punctuation">}</span><span class="token plain-text"> times</span>
<span class="line">    </span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>button</span><span class="token punctuation">&gt;</span></span></span>
<span class="line">  <span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code>count</code>与<code>onClick</code>为属性，由使用它的组件传递值给</p><div class="language-jsx line-numbers-mode" data-highlighter="prismjs" data-ext="jsx"><pre><code class="language-jsx"><span class="line"><span class="token keyword">import</span> <span class="token punctuation">{</span> useState <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;react&#39;</span><span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token keyword">function</span> <span class="token function">MyApp</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">  <span class="token keyword">const</span> <span class="token punctuation">[</span>count<span class="token punctuation">,</span> setCount<span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token function">useState</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line">  <span class="token keyword">function</span> <span class="token function">handleClick</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token function">setCount</span><span class="token punctuation">(</span>count <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">  <span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line">  <span class="token keyword">return</span> <span class="token punctuation">(</span></span>
<span class="line">    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span><span class="token punctuation">&gt;</span></span><span class="token plain-text"></span>
<span class="line">      </span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>h1</span><span class="token punctuation">&gt;</span></span><span class="token plain-text">Counters that update together</span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>h1</span><span class="token punctuation">&gt;</span></span><span class="token plain-text"></span>
<span class="line">      </span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span><span class="token class-name">MyButton</span></span> <span class="token attr-name">count</span><span class="token script language-javascript"><span class="token script-punctuation punctuation">=</span><span class="token punctuation">{</span>count<span class="token punctuation">}</span></span> <span class="token attr-name">onClick</span><span class="token script language-javascript"><span class="token script-punctuation punctuation">=</span><span class="token punctuation">{</span>handleClick<span class="token punctuation">}</span></span> <span class="token punctuation">/&gt;</span></span><span class="token plain-text"></span>
<span class="line">      </span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span><span class="token class-name">MyButton</span></span> <span class="token attr-name">count</span><span class="token script language-javascript"><span class="token script-punctuation punctuation">=</span><span class="token punctuation">{</span>count<span class="token punctuation">}</span></span> <span class="token attr-name">onClick</span><span class="token script language-javascript"><span class="token script-punctuation punctuation">=</span><span class="token punctuation">{</span>handleClick<span class="token punctuation">}</span></span> <span class="token punctuation">/&gt;</span></span><span class="token plain-text"></span>
<span class="line">    </span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">&gt;</span></span></span>
<span class="line">  <span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">function</span> <span class="token function">MyButton</span><span class="token punctuation">(</span><span class="token parameter"><span class="token punctuation">{</span> count<span class="token punctuation">,</span> onClick <span class="token punctuation">}</span></span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">  <span class="token keyword">return</span> <span class="token punctuation">(</span></span>
<span class="line">    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>button</span> <span class="token attr-name">onClick</span><span class="token script language-javascript"><span class="token script-punctuation punctuation">=</span><span class="token punctuation">{</span>onClick<span class="token punctuation">}</span></span><span class="token punctuation">&gt;</span></span><span class="token plain-text"></span>
<span class="line">      Clicked </span><span class="token punctuation">{</span>count<span class="token punctuation">}</span><span class="token plain-text"> times</span>
<span class="line">    </span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>button</span><span class="token punctuation">&gt;</span></span></span>
<span class="line">  <span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><blockquote><p>In React, it’s conventional to use <code>onSomething</code> names for props which represent events and <code>handleSomething</code> for the function definitions which handle those events.</p></blockquote><h4 id="属性传递" tabindex="-1"><a class="header-anchor" href="#属性传递"><span>属性传递</span></a></h4><p>React component functions accept a single argument, a <code>props</code> object:</p><div class="language-react line-numbers-mode" data-highlighter="prismjs" data-ext="react"><pre><code class="language-react"><span class="line">function Avatar(props) {</span>
<span class="line">  let person = props.person;</span>
<span class="line">  let size = props.size;</span>
<span class="line">  // ...</span>
<span class="line">}</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>Usually you don’t need the whole <code>props</code> object itself, so you destructure it into individual props.</p><div class="language-react line-numbers-mode" data-highlighter="prismjs" data-ext="react"><pre><code class="language-react"><span class="line">function Avatar({ person, size }) {</span>
<span class="line">  // ...</span>
<span class="line">}</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="设置默认值" tabindex="-1"><a class="header-anchor" href="#设置默认值"><span>设置默认值</span></a></h4><div class="language-react line-numbers-mode" data-highlighter="prismjs" data-ext="react"><pre><code class="language-react"><span class="line">function Avatar({ person, size = 100 }) {</span>
<span class="line">  // ...</span>
<span class="line">}</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>The default value is only used if the <code>size</code> prop is missing or if you pass <code>size={undefined}</code>. But if you pass <code>size={null}</code> or <code>size={0}</code>, the default value will <strong>not</strong> be used.</p><h4 id="向下传递所有属性" tabindex="-1"><a class="header-anchor" href="#向下传递所有属性"><span>向下传递所有属性</span></a></h4><div class="language-react line-numbers-mode" data-highlighter="prismjs" data-ext="react"><pre><code class="language-react"><span class="line">function Profile(props) {</span>
<span class="line">  return (</span>
<span class="line">    &lt;div className=&quot;card&quot;&gt;</span>
<span class="line">      &lt;Avatar {...props} /&gt;</span>
<span class="line">    &lt;/div&gt;</span>
<span class="line">  );</span>
<span class="line">}</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="passing-jsx-as-children" tabindex="-1"><a class="header-anchor" href="#passing-jsx-as-children"><span>Passing JSX as children</span></a></h4><p>When you nest content inside a JSX tag, the parent component will receive that content in a prop called <code>children</code>. For example, the <code>Card</code> component below will receive a <code>children</code> prop set to <code>&lt;Avatar /&gt;</code> and render it in a wrapper div:</p><div class="language-react line-numbers-mode" data-highlighter="prismjs" data-ext="react"><pre><code class="language-react"><span class="line">import Avatar from &#39;./Avatar.js&#39;;</span>
<span class="line"></span>
<span class="line">function Card({ children }) {</span>
<span class="line">  return (</span>
<span class="line">    &lt;div className=&quot;card&quot;&gt;</span>
<span class="line">      {children}</span>
<span class="line">    &lt;/div&gt;</span>
<span class="line">  );</span>
<span class="line">}</span>
<span class="line"></span>
<span class="line">export default function Profile() {</span>
<span class="line">  return (</span>
<span class="line">    &lt;Card&gt;</span>
<span class="line">      &lt;Avatar</span>
<span class="line">        size={100}</span>
<span class="line">        person={{ </span>
<span class="line">          name: &#39;Katsuko Saruhashi&#39;,</span>
<span class="line">          imageId: &#39;YfeOqp2&#39;</span>
<span class="line">        }}</span>
<span class="line">      /&gt;</span>
<span class="line">    &lt;/Card&gt;</span>
<span class="line">  );</span>
<span class="line">}</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><blockquote><p>You can think of a component with a <code>children</code> prop as having a “hole” that can be “filled in” by its parent components with arbitrary JSX.</p></blockquote><h4 id="don-t-try-to-change-props" tabindex="-1"><a class="header-anchor" href="#don-t-try-to-change-props"><span>Don’t try to “change props”</span></a></h4><p>不要在组件内改变props的值 ，要想改变，只能通过父组件传递进来。</p><h3 id="props-vs-state" tabindex="-1"><a class="header-anchor" href="#props-vs-state"><span>Props VS State</span></a></h3><p>There are two types of “model” data in React: props and state. The two are very different:</p><ul><li><a href="https://react.dev/learn/passing-props-to-a-component" target="_blank" rel="noopener noreferrer"><strong>Props</strong> are like arguments you pass</a> to a function. They let a parent component pass data to a child component and customize its appearance. For example, a <code>Form</code> can pass a <code>color</code> prop to a <code>Button</code>.</li><li><a href="https://react.dev/learn/state-a-components-memory" target="_blank" rel="noopener noreferrer"><strong>State</strong> is like a component’s memory.</a> It lets a component keep track of some information and change it in response to interactions. For example, a <code>Button</code> might keep track of <code>isHovered</code> state.</li></ul><p>Props and state are different, but they work together. A parent component will often keep some information in state (so that it can change it), and <em>pass it down</em> to child components as their props. It’s okay if the difference still feels fuzzy on the first read. It takes a bit of practice for it to really stick!</p><h3 id="判断一个变量是否需要state" tabindex="-1"><a class="header-anchor" href="#判断一个变量是否需要state"><span>判断一个变量是否需要State</span></a></h3><p>Which of these are state? Identify the ones that are not:</p><ul><li>Does it <strong>remain unchanged</strong> over time? If so, it isn’t state.</li><li>Is it <strong>passed in from a parent</strong> via props? If so, it isn’t state.</li><li><strong>Can you compute it</strong> based on existing state or props in your component? If so, it <em>definitely</em> isn’t state!</li></ul><h3 id="example-hooks" tabindex="-1"><a class="header-anchor" href="#example-hooks"><span>Example Hooks</span></a></h3><p>doc: https://react.dev/learn/typescript#example-hooks</p><p><code>useMem</code>与<code>useCallback</code>中第二个参数，可以将依赖设置为空数组<code>[]</code>，这样就只有在首次渲染时创建,之后就不会再重新创建。</p><div class="language-react line-numbers-mode" data-highlighter="prismjs" data-ext="react"><pre><code class="language-react"><span class="line">const incrementCount = useCallback(() =&gt; {</span>
<span class="line">    setCount(count + 1);</span>
<span class="line">  }, [])</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="default-vs-named-exports" tabindex="-1"><a class="header-anchor" href="#default-vs-named-exports"><span>Default vs named exports</span></a></h3><table><thead><tr><th>Syntax</th><th>Export statement</th><th>Import statement</th></tr></thead><tbody><tr><td>Default</td><td><code>export default function Button() {}</code></td><td><code>import Button from &#39;./Button.js&#39;;</code></td></tr><tr><td>Named</td><td><code>export function Button() {}</code></td><td><code>import { Button } from &#39;./Button.js&#39;;</code></td></tr></tbody></table><p>When you write a <em>default</em> import, you can put any name you want after <code>import</code>. For example, you could write <code>import Banana from &#39;./Button.js&#39;</code> instead.</p><blockquote><p><strong>People often use default exports if the file exports only one component, and use named exports if it exports multiple components and values.</strong> Regardless of which coding style you prefer, always give meaningful names to your component functions and the files that contain them. Components without names, like <code>export default () =&gt; {}</code>, are discouraged because they make debugging harder.</p></blockquote><h3 id="keep-components-pure" tabindex="-1"><a class="header-anchor" href="#keep-components-pure"><span>keep components pure</span></a></h3><p>React offers a “Strict Mode” in which it calls each component’s function twice during development. <strong>By calling the component functions twice, Strict Mode helps find components that break these rules.</strong></p><p>Strict Mode has no effect in production, so it won’t slow down the app for your users. To opt into Strict Mode, you can wrap your root component into <code>&lt;React.StrictMode&gt;</code>.</p><blockquote><p>It is useful to remember which operations on arrays mutate them, and which don’t. For example, <code>push</code>, <code>pop</code>, <code>reverse</code>, and <code>sort</code> will mutate the original array, but <code>slice</code>, <code>filter</code>, and <code>map</code> will create a new one.</p></blockquote><p>A component must be pure, meaning:</p><ul><li><strong>It minds its own business.</strong> It should not change any objects or variables that existed before rendering.</li><li><strong>Same inputs, same output.</strong> Given the same inputs, a component should always return the same JSX.</li></ul><h3 id="where-you-can-cause-side-effects" tabindex="-1"><a class="header-anchor" href="#where-you-can-cause-side-effects"><span>Where you can cause side effects</span></a></h3><p>While functional programming relies heavily on purity, at some point, somewhere, <em>something</em> has to change. That’s kind of the point of programming! These changes—updating the screen, starting an animation, changing the data—are called <strong>side effects.</strong> They’re things that happen <em>“on the side”</em>, not during rendering.</p><p>Even though event handlers are defined <em>inside</em> your component, they don’t run <em>during</em> rendering! <strong>So event handlers don’t need to be pure.</strong></p><p>If you’ve exhausted all other options and can’t find the right event handler for your side effect, you can still attach it to your returned JSX with a <a href="https://react.dev/reference/react/useEffect" target="_blank" rel="noopener noreferrer"><code>useEffect</code></a> call in your component. This tells React to execute it later, after rendering, when side effects are allowed. <strong>However, this approach should be your last resort.</strong></p><h3 id="queuing-a-series-of-state-updates" tabindex="-1"><a class="header-anchor" href="#queuing-a-series-of-state-updates"><span>Queuing a series of State updates</span></a></h3><div class="language-react line-numbers-mode" data-highlighter="prismjs" data-ext="react"><pre><code class="language-react"><span class="line">const [number,setNumber] = useState(0);</span>
<span class="line">... </span>
<span class="line">return (</span>
<span class="line">    &lt;&gt;</span>
<span class="line">      &lt;h1&gt;{number}&lt;/h1&gt;</span>
<span class="line">      &lt;button onClick={() =&gt; {</span>
<span class="line">        setNumber(n =&gt; n + 1);</span>
<span class="line">        setNumber(n =&gt; n + 1);</span>
<span class="line">        setNumber(n =&gt; n + 1);</span>
<span class="line">      }}&gt;+3&lt;/button&gt;</span>
<span class="line">    &lt;/&gt;</span>
<span class="line">  )</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>Here, <code>n =&gt; n + 1</code> is called an <strong>updater function.</strong> When you pass it to a state setter:</p><ol><li>React queues this function to be processed after all the other code in the event handler has run.</li><li>During the next render, React goes through the queue and gives you the final updated state.</li></ol><table><thead><tr><th><code>n</code></th><th>returns</th><th>queued update</th></tr></thead><tbody><tr><td><code>0</code></td><td><code>0 + 1 = 1</code></td><td><code>n =&gt; n + 1</code></td></tr><tr><td><code>1</code></td><td><code>1 + 1 = 2</code></td><td><code>n =&gt; n + 1</code></td></tr><tr><td><code>2</code></td><td><code>2 + 1 = 3</code></td><td><code>n =&gt; n + 1</code></td></tr></tbody></table><p><strong>updater functions must be pure</strong> and only return the result</p><p>通常命名更新函数里面的参数的名字为state变量的第一个字母：</p><div class="language-react line-numbers-mode" data-highlighter="prismjs" data-ext="react"><pre><code class="language-react"><span class="line">setEnabled(e =&gt; !e);</span>
<span class="line">setLastName(ln =&gt; ln.reverse());</span>
<span class="line">setFriendCount(fc =&gt; fc * 2);</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="state中的objects" tabindex="-1"><a class="header-anchor" href="#state中的objects"><span>State中的Objects</span></a></h3><p>you should <strong>treat any JavaScript object that you put into state as read-only.</strong> 像基本数据类型一样，【number, string】</p><div class="language-react line-numbers-mode" data-highlighter="prismjs" data-ext="react"><pre><code class="language-react"><span class="line">...</span>
<span class="line">const [position, setPosition] = useState({ x: 0, y: 0 });</span>
<span class="line">...</span>
<span class="line">onPointerMove={e =&gt; {</span>
<span class="line">  position.x = e.clientX;</span>
<span class="line">  position.y = e.clientY;</span>
<span class="line">}} </span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面这段代码并不会re-render。需要重新设置一个值：</p><div class="language-react line-numbers-mode" data-highlighter="prismjs" data-ext="react"><pre><code class="language-react"><span class="line">onPointerMove={e =&gt; {</span>
<span class="line">  setPosition({</span>
<span class="line">    x: e.clientX,</span>
<span class="line">    y: e.clientY</span>
<span class="line">  });</span>
<span class="line">}}</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>可以用spread syntax来更方便地change object state</p><div class="language-react line-numbers-mode" data-highlighter="prismjs" data-ext="react"><pre><code class="language-react"><span class="line">onPointerMove={e =&gt; {</span>
<span class="line">  setPerson({</span>
<span class="line">    ...person, // Copy the old fields</span>
<span class="line">    firstName: e.target.value // But override this one</span>
<span class="line">  });</span>
<span class="line">}}</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><blockquote><p><code>...</code> 操作符只能浅拷贝，如果对象有嵌套关系，则需要多次使用它</p><div class="language-react line-numbers-mode" data-highlighter="prismjs" data-ext="react"><pre><code class="language-react"><span class="line">const nextArtwork = { ...person.artwork, city: &#39;New Delhi&#39; };</span>
<span class="line">const nextPerson = { ...person, artwork: nextArtwork };</span>
<span class="line">setPerson(nextPerson);</span>
<span class="line">// 或者</span>
<span class="line">setPerson({</span>
<span class="line">  ...person, // Copy other fields</span>
<span class="line">  artwork: { // but replace the artwork</span>
<span class="line">    ...person.artwork, // with the same one</span>
<span class="line">    city: &#39;New Delhi&#39; // but in New Delhi!</span>
<span class="line">  }</span>
<span class="line">});</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></blockquote><h4 id="using-a-single-event-handler-for-multiple-fields" tabindex="-1"><a class="header-anchor" href="#using-a-single-event-handler-for-multiple-fields"><span>Using a single event handler for multiple fields</span></a></h4><div class="language-react line-numbers-mode" data-highlighter="prismjs" data-ext="react"><pre><code class="language-react"><span class="line">import { useState } from &#39;react&#39;;</span>
<span class="line"></span>
<span class="line">export default function Form() {</span>
<span class="line">  const [person, setPerson] = useState({</span>
<span class="line">    firstName: &#39;Barbara&#39;,</span>
<span class="line">    lastName: &#39;Hepworth&#39;,</span>
<span class="line">    email: &#39;bhepworth@sculpture.com&#39;</span>
<span class="line">  });</span>
<span class="line"></span>
<span class="line">  function handleChange(e) {</span>
<span class="line">    setPerson({</span>
<span class="line">      ...person,</span>
<span class="line">      [e.target.name]: e.target.value</span>
<span class="line">    });</span>
<span class="line">  }</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="使用-immer-写出简洁的更新逻辑" tabindex="-1"><a class="header-anchor" href="#使用-immer-写出简洁的更新逻辑"><span>使用 Immer 写出简洁的更新逻辑</span></a></h4><p>To try Immer:</p><ol><li>Run <code>npm install use-immer</code> to add Immer as a dependency</li><li>Then replace <code>import { useState } from &#39;react&#39;</code> with <code>import { useImmer } from &#39;use-immer&#39;</code></li></ol><div class="language-react line-numbers-mode" data-highlighter="prismjs" data-ext="react"><pre><code class="language-react"><span class="line"> const [person, updatePerson] = useImmer({</span>
<span class="line">    name: &#39;Niki de Saint Phalle&#39;,</span>
<span class="line">    artwork: {</span>
<span class="line">      title: &#39;Blue Nana&#39;,</span>
<span class="line">      city: &#39;Hamburg&#39;,</span>
<span class="line">      image: &#39;https://i.imgur.com/Sd1AgUOm.jpg&#39;,</span>
<span class="line">    }</span>
<span class="line">  });</span>
<span class="line"></span>
<span class="line">  function handleNameChange(e) {</span>
<span class="line">    updatePerson(draft =&gt; {</span>
<span class="line">      draft.name = e.target.value;</span>
<span class="line">    });</span>
<span class="line">  }</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="state中的数组操作" tabindex="-1"><a class="header-anchor" href="#state中的数组操作"><span>State中的数组操作</span></a></h3><p>avoid the methods in the left column, and instead prefer the methods in the right column:</p><table><thead><tr><th></th><th>avoid (mutates the array)</th><th>prefer (returns a new array)</th></tr></thead><tbody><tr><td>adding</td><td><code>push</code>, <code>unshift</code></td><td><code>concat</code>, <code>[...arr]</code> spread syntax (<a href="https://react.dev/learn/updating-arrays-in-state#adding-to-an-array" target="_blank" rel="noopener noreferrer">example</a>)</td></tr><tr><td>removing</td><td><code>pop</code>, <code>shift</code>, <code>splice</code></td><td><code>filter</code>, <code>slice</code> (<a href="https://react.dev/learn/updating-arrays-in-state#removing-from-an-array" target="_blank" rel="noopener noreferrer">example</a>)</td></tr><tr><td>replacing</td><td><code>splice</code>, <code>arr[i] = ...</code> assignment</td><td><code>map</code> (<a href="https://react.dev/learn/updating-arrays-in-state#replacing-items-in-an-array" target="_blank" rel="noopener noreferrer">example</a>)</td></tr><tr><td>sorting</td><td><code>reverse</code>, <code>sort</code></td><td>copy the array first (<a href="https://react.dev/learn/updating-arrays-in-state#making-other-changes-to-an-array" target="_blank" rel="noopener noreferrer">example</a>)</td></tr></tbody></table><p>更简洁的方法，也可以运<code>Immer</code></p><h3 id="controlled-and-uncontrolled-components" tabindex="-1"><a class="header-anchor" href="#controlled-and-uncontrolled-components"><span>Controlled and uncontrolled components</span></a></h3><p>组件内的状态都由组件内自己维护，不受父组件控制就是<code>uncontrolled component</code>, 反之就是<code>controlled component</code></p><h3 id="preserving-and-resetting-state" tabindex="-1"><a class="header-anchor" href="#preserving-and-resetting-state"><span>Preserving and Resetting State</span></a></h3><ol><li>Same component at the same position preserves state</li><li>Different components at the same position reset state</li></ol><h4 id="resetting-state-at-the-same-position" tabindex="-1"><a class="header-anchor" href="#resetting-state-at-the-same-position"><span>Resetting state at the same position</span></a></h4><div class="language-react line-numbers-mode" data-highlighter="prismjs" data-ext="react"><pre><code class="language-react"><span class="line">import { useState } from &#39;react&#39;;</span>
<span class="line"></span>
<span class="line">export default function Scoreboard() {</span>
<span class="line">  const [isPlayerA, setIsPlayerA] = useState(true);</span>
<span class="line">  return (</span>
<span class="line">    &lt;div&gt;</span>
<span class="line">      {isPlayerA ? (</span>
<span class="line">        &lt;Counter person=&quot;Taylor&quot; /&gt;</span>
<span class="line">      ) : (</span>
<span class="line">        &lt;Counter person=&quot;Sarah&quot; /&gt;</span>
<span class="line">      )}</span>
<span class="line">      &lt;button onClick={() =&gt; {</span>
<span class="line">        setIsPlayerA(!isPlayerA);</span>
<span class="line">      }}&gt;</span>
<span class="line">        Next player!</span>
<span class="line">      &lt;/button&gt;</span>
<span class="line">    &lt;/div&gt;</span>
<span class="line">  );</span>
<span class="line">}</span>
<span class="line"></span>
<span class="line">function Counter({ person }) {</span>
<span class="line">  const [score, setScore] = useState(0);</span>
<span class="line">  const [hover, setHover] = useState(false);</span>
<span class="line"></span>
<span class="line">  let className = &#39;counter&#39;;</span>
<span class="line">  if (hover) {</span>
<span class="line">    className += &#39; hover&#39;;</span>
<span class="line">  }</span>
<span class="line"></span>
<span class="line">  return (</span>
<span class="line">    &lt;div</span>
<span class="line">      className={className}</span>
<span class="line">      onPointerEnter={() =&gt; setHover(true)}</span>
<span class="line">      onPointerLeave={() =&gt; setHover(false)}</span>
<span class="line">    &gt;</span>
<span class="line">      &lt;h1&gt;{person}&#39;s score: {score}&lt;/h1&gt;</span>
<span class="line">      &lt;button onClick={() =&gt; setScore(score + 1)}&gt;</span>
<span class="line">        Add one</span>
<span class="line">      &lt;/button&gt;</span>
<span class="line">    &lt;/div&gt;</span>
<span class="line">  );</span>
<span class="line">}</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>In the example above, the state can be preserved because the <code>Counter</code> component is at same position.</p><ol><li><p>Render components in different positions</p><div class="language-react line-numbers-mode" data-highlighter="prismjs" data-ext="react"><pre><code class="language-react"><span class="line"> &lt;div&gt;</span>
<span class="line">      {isPlayerA &amp;&amp;</span>
<span class="line">        &lt;Counter person=&quot;Taylor&quot; /&gt;</span>
<span class="line">      }</span>
<span class="line">      {!isPlayerA &amp;&amp;</span>
<span class="line">        &lt;Counter person=&quot;Sarah&quot; /&gt;</span>
<span class="line">      }</span>
<span class="line">      &lt;button onClick={() =&gt; {</span>
<span class="line">        setIsPlayerA(!isPlayerA);</span>
<span class="line">      }}&gt;</span>
<span class="line">        Next player!</span>
<span class="line">      &lt;/button&gt;</span>
<span class="line">    &lt;/div&gt;</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li><li><p>Give each component an explicit identity with <code>key</code></p><blockquote><p>You can use keys make React distinguish between any components. Remember that keys are not globally unique. They only specify the position <em>within the parent</em>.</p></blockquote></li></ol><h3 id="exstracting-state-logic-into-a-reducer" tabindex="-1"><a class="header-anchor" href="#exstracting-state-logic-into-a-reducer"><span>Exstracting State Logic into a Reducer</span></a></h3><blockquote><p>The <code>useReducer</code> Hook is similar to <code>useState</code>—you must pass it an initial state and it returns a stateful value and a way to set state (in this case, the dispatch function).</p></blockquote><div class="language-react line-numbers-mode" data-highlighter="prismjs" data-ext="react"><pre><code class="language-react"><span class="line">import { useReducer } from &#39;react&#39;;</span>
<span class="line">import AddTask from &#39;./AddTask.js&#39;;</span>
<span class="line">import TaskList from &#39;./TaskList.js&#39;;</span>
<span class="line">import tasksReducer from &#39;./tasksReducer.js&#39;;</span>
<span class="line"></span>
<span class="line">export default function TaskApp() {</span>
<span class="line">  const [tasks, dispatch] = useReducer(tasksReducer, initialTasks);</span>
<span class="line"></span>
<span class="line">  function handleAddTask(text) {</span>
<span class="line">    dispatch({</span>
<span class="line">      type: &#39;added&#39;,</span>
<span class="line">      id: nextId++,</span>
<span class="line">      text: text,</span>
<span class="line">    });</span>
<span class="line">  }</span>
<span class="line"></span>
<span class="line">  function handleChangeTask(task) {</span>
<span class="line">    dispatch({</span>
<span class="line">      type: &#39;changed&#39;,</span>
<span class="line">      task: task,</span>
<span class="line">    });</span>
<span class="line">  }</span>
<span class="line"></span>
<span class="line">  function handleDeleteTask(taskId) {</span>
<span class="line">    dispatch({</span>
<span class="line">      type: &#39;deleted&#39;,</span>
<span class="line">      id: taskId,</span>
<span class="line">    });</span>
<span class="line">  }</span>
<span class="line"></span>
<span class="line">  return (</span>
<span class="line">    &lt;&gt;</span>
<span class="line">      &lt;h1&gt;Prague itinerary&lt;/h1&gt;</span>
<span class="line">      &lt;AddTask onAddTask={handleAddTask} /&gt;</span>
<span class="line">      &lt;TaskList</span>
<span class="line">        tasks={tasks}</span>
<span class="line">        onChangeTask={handleChangeTask}</span>
<span class="line">        onDeleteTask={handleDeleteTask}</span>
<span class="line">      /&gt;</span>
<span class="line">    &lt;/&gt;</span>
<span class="line">  );</span>
<span class="line">}</span>
<span class="line"></span>
<span class="line">let nextId = 3;</span>
<span class="line">const initialTasks = [</span>
<span class="line">  {id: 0, text: &#39;Visit Kafka Museum&#39;, done: true},</span>
<span class="line">  {id: 1, text: &#39;Watch a puppet show&#39;, done: false},</span>
<span class="line">  {id: 2, text: &#39;Lennon Wall pic&#39;, done: false},</span>
<span class="line">];</span>
<span class="line"></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-javascript line-numbers-mode" data-highlighter="prismjs" data-ext="js"><pre><code class="language-javascript"><span class="line"><span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token keyword">function</span> <span class="token function">tasksReducer</span><span class="token punctuation">(</span><span class="token parameter">tasks<span class="token punctuation">,</span> action</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">  <span class="token keyword">switch</span> <span class="token punctuation">(</span>action<span class="token punctuation">.</span>type<span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token keyword">case</span> <span class="token string">&#39;added&#39;</span><span class="token operator">:</span> <span class="token punctuation">{</span></span>
<span class="line">      <span class="token keyword">return</span> <span class="token punctuation">[</span></span>
<span class="line">        <span class="token operator">...</span>tasks<span class="token punctuation">,</span></span>
<span class="line">        <span class="token punctuation">{</span></span>
<span class="line">          <span class="token literal-property property">id</span><span class="token operator">:</span> action<span class="token punctuation">.</span>id<span class="token punctuation">,</span></span>
<span class="line">          <span class="token literal-property property">text</span><span class="token operator">:</span> action<span class="token punctuation">.</span>text<span class="token punctuation">,</span></span>
<span class="line">          <span class="token literal-property property">done</span><span class="token operator">:</span> <span class="token boolean">false</span><span class="token punctuation">,</span></span>
<span class="line">        <span class="token punctuation">}</span><span class="token punctuation">,</span></span>
<span class="line">      <span class="token punctuation">]</span><span class="token punctuation">;</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line">    <span class="token keyword">case</span> <span class="token string">&#39;changed&#39;</span><span class="token operator">:</span> <span class="token punctuation">{</span></span>
<span class="line">      <span class="token keyword">return</span> tasks<span class="token punctuation">.</span><span class="token function">map</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">t</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span></span>
<span class="line">        <span class="token keyword">if</span> <span class="token punctuation">(</span>t<span class="token punctuation">.</span>id <span class="token operator">===</span> action<span class="token punctuation">.</span>task<span class="token punctuation">.</span>id<span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">          <span class="token keyword">return</span> action<span class="token punctuation">.</span>task<span class="token punctuation">;</span></span>
<span class="line">        <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span></span>
<span class="line">          <span class="token keyword">return</span> t<span class="token punctuation">;</span></span>
<span class="line">        <span class="token punctuation">}</span></span>
<span class="line">      <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line">    <span class="token keyword">case</span> <span class="token string">&#39;deleted&#39;</span><span class="token operator">:</span> <span class="token punctuation">{</span></span>
<span class="line">      <span class="token keyword">return</span> tasks<span class="token punctuation">.</span><span class="token function">filter</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">t</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> t<span class="token punctuation">.</span>id <span class="token operator">!==</span> action<span class="token punctuation">.</span>id<span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line">    <span class="token keyword">default</span><span class="token operator">:</span> <span class="token punctuation">{</span></span>
<span class="line">      <span class="token keyword">throw</span> <span class="token function">Error</span><span class="token punctuation">(</span><span class="token string">&#39;Unknown action: &#39;</span> <span class="token operator">+</span> action<span class="token punctuation">.</span>type<span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line">  <span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="writing-reducers-well" tabindex="-1"><a class="header-anchor" href="#writing-reducers-well"><span>Writing reducers well</span></a></h4><ul><li><strong>Reducers must be pure.</strong></li><li><strong>Each action describes a single user interaction, even if that leads to multiple changes in the data.</strong></li></ul><h4 id="writing-concise-reducers-with-immer" tabindex="-1"><a class="header-anchor" href="#writing-concise-reducers-with-immer"><span>Writing concise reducers with Immer</span></a></h4><div class="language-react line-numbers-mode" data-highlighter="prismjs" data-ext="react"><pre><code class="language-react"><span class="line">import { useImmerReducer } from &#39;use-immer&#39;;</span>
<span class="line">import AddTask from &#39;./AddTask.js&#39;;</span>
<span class="line">import TaskList from &#39;./TaskList.js&#39;;</span>
<span class="line"></span>
<span class="line">function tasksReducer(draft, action) {</span>
<span class="line">  switch (action.type) {</span>
<span class="line">    case &#39;added&#39;: {</span>
<span class="line">      draft.push({</span>
<span class="line">        id: action.id,</span>
<span class="line">        text: action.text,</span>
<span class="line">        done: false,</span>
<span class="line">      });</span>
<span class="line">      break;</span>
<span class="line">    }</span>
<span class="line">    case &#39;changed&#39;: {</span>
<span class="line">      const index = draft.findIndex((t) =&gt; t.id === action.task.id);</span>
<span class="line">      draft[index] = action.task;</span>
<span class="line">      break;</span>
<span class="line">    }</span>
<span class="line">    case &#39;deleted&#39;: {</span>
<span class="line">      return draft.filter((t) =&gt; t.id !== action.id);</span>
<span class="line">    }</span>
<span class="line">    default: {</span>
<span class="line">      throw Error(&#39;Unknown action: &#39; + action.type);</span>
<span class="line">    }</span>
<span class="line">  }</span>
<span class="line">}</span>
<span class="line"></span>
<span class="line">export default function TaskApp() {</span>
<span class="line">  const [tasks, dispatch] = useImmerReducer(tasksReducer, initialTasks);</span>
<span class="line"></span>
<span class="line">  function handleAddTask(text) {</span>
<span class="line">    dispatch({</span>
<span class="line">      type: &#39;added&#39;,</span>
<span class="line">      id: nextId++,</span>
<span class="line">      text: text,</span>
<span class="line">    });</span>
<span class="line">  }</span>
<span class="line"></span>
<span class="line">  function handleChangeTask(task) {</span>
<span class="line">    dispatch({</span>
<span class="line">      type: &#39;changed&#39;,</span>
<span class="line">      task: task,</span>
<span class="line">    });</span>
<span class="line">  }</span>
<span class="line"></span>
<span class="line">  function handleDeleteTask(taskId) {</span>
<span class="line">    dispatch({</span>
<span class="line">      type: &#39;deleted&#39;,</span>
<span class="line">      id: taskId,</span>
<span class="line">    });</span>
<span class="line">  }</span>
<span class="line"></span>
<span class="line">  return (</span>
<span class="line">    &lt;&gt;</span>
<span class="line">      &lt;h1&gt;Prague itinerary&lt;/h1&gt;</span>
<span class="line">      &lt;AddTask onAddTask={handleAddTask} /&gt;</span>
<span class="line">      &lt;TaskList</span>
<span class="line">        tasks={tasks}</span>
<span class="line">        onChangeTask={handleChangeTask}</span>
<span class="line">        onDeleteTask={handleDeleteTask}</span>
<span class="line">      /&gt;</span>
<span class="line">    &lt;/&gt;</span>
<span class="line">  );</span>
<span class="line">}</span>
<span class="line"></span>
<span class="line">let nextId = 3;</span>
<span class="line">const initialTasks = [</span>
<span class="line">  {id: 0, text: &#39;Visit Kafka Museum&#39;, done: true},</span>
<span class="line">  {id: 1, text: &#39;Watch a puppet show&#39;, done: false},</span>
<span class="line">  {id: 2, text: &#39;Lennon Wall pic&#39;, done: false},</span>
<span class="line">];</span>
<span class="line"></span>
<span class="line"></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="passing-data-deeply-with-context" tabindex="-1"><a class="header-anchor" href="#passing-data-deeply-with-context"><span>Passing data deeply with Context</span></a></h3><div class="language-react line-numbers-mode" data-highlighter="prismjs" data-ext="react"><pre><code class="language-react"><span class="line">import { createContext } from &#39;react&#39;;</span>
<span class="line"></span>
<span class="line">// 创建,可以初化其它值</span>
<span class="line">export const LevelContext = createContext(0);</span>
<span class="line">//  This initial value of 0 is used as a fallback if a component tries to use the context without being wrapped in a Provider.</span>
<span class="line"></span>
<span class="line">...</span>
<span class="line">// 使用</span>
<span class="line">const level = useContext(LevelContext);</span>
<span class="line">...</span>
<span class="line">// 提供</span>
<span class="line">&lt;LevelContext.Provider value={level + 1}&gt;</span>
<span class="line">        {children}</span>
<span class="line">&lt;/LevelContext.Provider&gt;</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><blockquote><p>但是Context不要过度使用，Here’s a few alternatives you should consider before using context:</p><ol><li>Start by passing props.</li><li>Extract components and pass JSX as children to them.</li></ol><p>If neither of these approaches works well for you, consider context.</p></blockquote><h4 id="use-cases-for-context" tabindex="-1"><a class="header-anchor" href="#use-cases-for-context"><span>Use cases for context</span></a></h4><ul><li>Theming</li><li>Current account</li><li>Routing</li><li>Managing state</li></ul><h3 id="userreducer与usecontext联合使用" tabindex="-1"><a class="header-anchor" href="#userreducer与usecontext联合使用"><span>userReducer与useContext联合使用</span></a></h3><h3 id="escape-hatch" tabindex="-1"><a class="header-anchor" href="#escape-hatch"><span>escape hatch</span></a></h3><p>When you want a component to “remember” some information, but you don’t want that information to trigger new renders, you can use a ref.</p><p>Refs are an “escape hatch” you won’t need often. Here’s how state and refs compare:</p><table><thead><tr><th>refs</th><th>state</th></tr></thead><tbody><tr><td><code>useRef(initialValue)</code> returns <code>{ current: initialValue }</code></td><td><code>useState(initialValue)</code> returns the current value of a state variable and a state setter function ( <code>[value, setValue]</code>)</td></tr><tr><td>Doesn’t trigger re-render when you change it.</td><td>Triggers re-render when you change it.</td></tr><tr><td>Mutable—you can modify and update <code>current</code>’s value outside of the rendering process.</td><td>”Immutable”—you must use the state setting function to modify state variables to queue a re-render.</td></tr><tr><td>You shouldn’t read (or write) the <code>current</code> value during rendering.</td><td>You can read state at any time. However, each render has its own <a href="https://react.dev/learn/state-as-a-snapshot" target="_blank" rel="noopener noreferrer">snapshot</a> of state which does not change.</td></tr></tbody></table><blockquote><p>// Inside of React</p><p>function useRef(initialValue) {</p><p>const [ref, unused] = useState({ current: initialValue });</p><p>return ref;</p><p>}</p></blockquote><p>When you pass a ref to a <code>ref</code> attribute in JSX, like <code>&lt;div ref={myRef}&gt;</code>, React will put the corresponding DOM element into <code>myRef.current</code>.Once the element is removed from the DOM, React will update <code>myRef.current</code> to be <code>null</code>.</p><h4 id="引用dom元素" tabindex="-1"><a class="header-anchor" href="#引用dom元素"><span>引用DOM元素</span></a></h4><div class="language-react line-numbers-mode" data-highlighter="prismjs" data-ext="react"><pre><code class="language-react"><span class="line">&lt;ul&gt;</span>
<span class="line">  {items.map((item) =&gt; {</span>
<span class="line">    // Doesn&#39;t work!</span>
<span class="line">    const ref = useRef(null);</span>
<span class="line">    return &lt;li ref={ref} /&gt;;</span>
<span class="line">  })}</span>
<span class="line">&lt;/ul&gt;</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>One possible way around this is to get a single ref to their parent element, and then use DOM manipulation methods like <a href="https://developer.mozilla.org/en-US/docs/Web/API/Document/querySelectorAll" target="_blank" rel="noopener noreferrer"><code>querySelectorAll</code></a> to “find” the individual child nodes from it. However, this is brittle and can break if your DOM structure changes.</p><p>Another solution is to <strong>pass a function to the <code>ref</code> attribute.</strong> This is called a <a href="https://react.dev/reference/react-dom/components/common#ref-callback" target="_blank" rel="noopener noreferrer"><code>ref</code> callback.</a> React will call your ref callback with the DOM node when it’s time to set the ref, and with <code>null</code> when it’s time to clear it. This lets you maintain your own array or a <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map" target="_blank" rel="noopener noreferrer">Map</a>, and access any ref by its index or some kind of ID.</p><div class="language-react line-numbers-mode" data-highlighter="prismjs" data-ext="react"><pre><code class="language-react"><span class="line">import { useRef, useState } from &quot;react&quot;;</span>
<span class="line"></span>
<span class="line">export default function CatFriends() {</span>
<span class="line">  const itemsRef = useRef(null);</span>
<span class="line">  const [catList, setCatList] = useState(setupCatList);</span>
<span class="line"></span>
<span class="line">  function scrollToCat(cat) {</span>
<span class="line">    const map = getMap();</span>
<span class="line">    const node = map.get(cat);</span>
<span class="line">    node.scrollIntoView({</span>
<span class="line">      behavior: &quot;smooth&quot;,</span>
<span class="line">      block: &quot;nearest&quot;,</span>
<span class="line">      inline: &quot;center&quot;,</span>
<span class="line">    });</span>
<span class="line">  }</span>
<span class="line"></span>
<span class="line">  function getMap() {</span>
<span class="line">    if (!itemsRef.current) {</span>
<span class="line">      // Initialize the Map on first usage.</span>
<span class="line">      itemsRef.current = new Map();</span>
<span class="line">    }</span>
<span class="line">    return itemsRef.current;</span>
<span class="line">  }</span>
<span class="line"></span>
<span class="line">  return (</span>
<span class="line">    &lt;&gt;</span>
<span class="line">      &lt;nav&gt;</span>
<span class="line">        &lt;button onClick={() =&gt; scrollToCat(catList[0])}&gt;Tom&lt;/button&gt;</span>
<span class="line">        &lt;button onClick={() =&gt; scrollToCat(catList[5])}&gt;Maru&lt;/button&gt;</span>
<span class="line">        &lt;button onClick={() =&gt; scrollToCat(catList[9])}&gt;Jellylorum&lt;/button&gt;</span>
<span class="line">      &lt;/nav&gt;</span>
<span class="line">      &lt;div&gt;</span>
<span class="line">        &lt;ul&gt;</span>
<span class="line">          {catList.map((cat) =&gt; (</span>
<span class="line">            &lt;li</span>
<span class="line">              key={cat}</span>
<span class="line">              ref={(node) =&gt; {</span>
<span class="line">                const map = getMap();</span>
<span class="line">                if (node) {</span>
<span class="line">                  map.set(cat, node);</span>
<span class="line">                } else {</span>
<span class="line">                  map.delete(cat);</span>
<span class="line">                }</span>
<span class="line">              }}</span>
<span class="line">            &gt;</span>
<span class="line">              &lt;img src={cat} /&gt;</span>
<span class="line">            &lt;/li&gt;</span>
<span class="line">          ))}</span>
<span class="line">        &lt;/ul&gt;</span>
<span class="line">      &lt;/div&gt;</span>
<span class="line">    &lt;/&gt;</span>
<span class="line">  );</span>
<span class="line">}</span>
<span class="line"></span>
<span class="line">function setupCatList() {</span>
<span class="line">  const catList = [];</span>
<span class="line">  for (let i = 0; i &lt; 10; i++) {</span>
<span class="line">    catList.push(&quot;https://loremflickr.com/320/240/cat?lock=&quot; + i);</span>
<span class="line">  }</span>
<span class="line"></span>
<span class="line">  return catList;</span>
<span class="line">}</span>
<span class="line"></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="useref引用react组件" tabindex="-1"><a class="header-anchor" href="#useref引用react组件"><span>useRef引用react组件</span></a></h4><p>常规用法是不行的。需要forward到组件内的某一个子组件</p><div class="language-react line-numbers-mode" data-highlighter="prismjs" data-ext="react"><pre><code class="language-react"><span class="line">import { forwardRef, useRef } from &#39;react&#39;;</span>
<span class="line"></span>
<span class="line">const MyInput = forwardRef((props, ref) =&gt; {</span>
<span class="line">  return &lt;input {...props} ref={ref} /&gt;;</span>
<span class="line">});</span>
<span class="line"></span>
<span class="line">export default function Form() {</span>
<span class="line">  const inputRef = useRef(null);</span>
<span class="line"></span>
<span class="line">  function handleClick() {</span>
<span class="line">    inputRef.current.focus();</span>
<span class="line">  }</span>
<span class="line"></span>
<span class="line">  return (</span>
<span class="line">    &lt;&gt;</span>
<span class="line">      &lt;MyInput ref={inputRef} /&gt;</span>
<span class="line">      &lt;button onClick={handleClick}&gt;</span>
<span class="line">        Focus the input</span>
<span class="line">      &lt;/button&gt;</span>
<span class="line">    &lt;/&gt;</span>
<span class="line">  );</span>
<span class="line">}</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>只暴露一部分api的方法</p><div class="language-react line-numbers-mode" data-highlighter="prismjs" data-ext="react"><pre><code class="language-react"><span class="line">import {</span>
<span class="line">  forwardRef, </span>
<span class="line">  useRef, </span>
<span class="line">  useImperativeHandle</span>
<span class="line">} from &#39;react&#39;;</span>
<span class="line"></span>
<span class="line">const MyInput = forwardRef((props, ref) =&gt; {</span>
<span class="line">  const realInputRef = useRef(null);</span>
<span class="line">  useImperativeHandle(ref, () =&gt; ({</span>
<span class="line">    // Only expose focus and nothing else</span>
<span class="line">    focus() {</span>
<span class="line">      realInputRef.current.focus();</span>
<span class="line">    },</span>
<span class="line">  }));</span>
<span class="line">  return &lt;input {...props} ref={realInputRef} /&gt;;</span>
<span class="line">});</span>
<span class="line"></span>
<span class="line">export default function Form() {</span>
<span class="line">  const inputRef = useRef(null);</span>
<span class="line"></span>
<span class="line">  function handleClick() {</span>
<span class="line">    inputRef.current.focus();</span>
<span class="line">  }</span>
<span class="line"></span>
<span class="line">  return (</span>
<span class="line">    &lt;&gt;</span>
<span class="line">      &lt;MyInput ref={inputRef} /&gt;</span>
<span class="line">      &lt;button onClick={handleClick}&gt;</span>
<span class="line">        Focus the input</span>
<span class="line">      &lt;/button&gt;</span>
<span class="line">    &lt;/&gt;</span>
<span class="line">  );</span>
<span class="line">}</span>
<span class="line"></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><blockquote><p>Refs are an escape hatch. You should only use them when you have to “step outside React”. Common examples of this include managing focus, scroll position, or calling browser APIs that React does not expose.</p></blockquote><h4 id="useeffect" tabindex="-1"><a class="header-anchor" href="#useeffect"><span>useEffect</span></a></h4><p><strong>Don’t rush to add Effects to your components.</strong> Keep in mind that Effects are typically used to “step out” of your React code and synchronize with some <em>external</em> system.By default, Effects run after <em>every</em> render.</p><p>To write an Effect, follow these three steps:</p><ol><li><strong>Declare an Effect.</strong> By default, your Effect will run after every <a href="https://react.dev/learn/render-and-commit" target="_blank" rel="noopener noreferrer">commit</a>.</li><li><strong>Specify the Effect dependencies.</strong> Most Effects should only re-run <em>when needed</em> rather than after every render. For example, a fade-in animation should only trigger when a component appears. Connecting and disconnecting to a chat room should only happen when the component appears and disappears, or when the chat room changes. You will learn how to control this by specifying <em>dependencies.</em></li><li><strong>Add cleanup if needed.</strong></li></ol><p>例子：</p><div class="language-react line-numbers-mode" data-highlighter="prismjs" data-ext="react"><pre><code class="language-react"><span class="line">import { useState, useRef, useEffect } from &#39;react&#39;;</span>
<span class="line"></span>
<span class="line">function VideoPlayer({ src, isPlaying }) {</span>
<span class="line">  const ref = useRef(null);</span>
<span class="line"></span>
<span class="line">  useEffect(() =&gt; {</span>
<span class="line">    if (isPlaying) {</span>
<span class="line">      console.log(&#39;Calling video.play()&#39;);</span>
<span class="line">      ref.current.play();</span>
<span class="line">    } else {</span>
<span class="line">      console.log(&#39;Calling video.pause()&#39;);</span>
<span class="line">      ref.current.pause();</span>
<span class="line">    }</span>
<span class="line">  }, []); // This causes an error</span>
<span class="line"></span>
<span class="line">  return &lt;video ref={ref} src={src} loop playsInline /&gt;;</span>
<span class="line">}</span>
<span class="line"></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><blockquote><p>You will see an error saying <code>React Hook useEffect has a missing dependency: &#39;isPlaying&#39;</code>:</p><p>The problem is that the code inside of your Effect <em>depends on</em> the <code>isPlaying</code> prop to decide what to do, but this dependency was not explicitly declared. To fix this issue, add <code>isPlaying</code> to the dependency array:</p><div class="language-react line-numbers-mode" data-highlighter="prismjs" data-ext="react"><pre><code class="language-react"><span class="line">useEffect(() =&gt; {</span>
<span class="line">    if (isPlaying) { // It&#39;s used here...</span>
<span class="line">      // ...</span>
<span class="line">    } else {</span>
<span class="line">      // ...</span>
<span class="line">    }</span>
<span class="line">  }, [isPlaying]); // ...so it must be declared here!</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></blockquote><p>useEffect在<code>&lt;StrictMode&gt;</code>开发模式下，会被调用两次，不要试图用元素是否出现去控制里面的逻辑，而需要提供合适的cleanup函数或其它方式来保持正常，下面是一个错误的解决问题的示例：</p><div class="language-react line-numbers-mode" data-highlighter="prismjs" data-ext="react"><pre><code class="language-react"><span class="line"> const connectionRef = useRef(null);</span>
<span class="line">  useEffect(() =&gt; {</span>
<span class="line">    // 🚩 This wont fix the bug!!!</span>
<span class="line">    if (!connectionRef.current) {</span>
<span class="line">      connectionRef.current = createConnection();</span>
<span class="line">      connectionRef.current.connect();</span>
<span class="line">    }</span>
<span class="line">  }, []);</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h5 id="控制一些非react的组件" tabindex="-1"><a class="header-anchor" href="#控制一些非react的组件"><span>控制一些非React的组件</span></a></h5><div class="language-react line-numbers-mode" data-highlighter="prismjs" data-ext="react"><pre><code class="language-react"><span class="line">// 类似地图组件 </span>
<span class="line">useEffect(() =&gt; {</span>
<span class="line">  const map = mapRef.current;</span>
<span class="line">  map.setZoomLevel(zoomLevel);</span>
<span class="line">}, [zoomLevel]);</span>
<span class="line"></span>
<span class="line">// 类似对话框组件</span>
<span class="line">useEffect(() =&gt; {</span>
<span class="line">  const dialog = dialogRef.current;</span>
<span class="line">  dialog.showModal();</span>
<span class="line">  return () =&gt; dialog.close();</span>
<span class="line">}, []);</span>
<span class="line"></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h5 id="订阅事件监听与取消" tabindex="-1"><a class="header-anchor" href="#订阅事件监听与取消"><span>订阅事件监听与取消</span></a></h5><div class="language-react line-numbers-mode" data-highlighter="prismjs" data-ext="react"><pre><code class="language-react"><span class="line">useEffect(() =&gt; {</span>
<span class="line">  function handleScroll(e) {</span>
<span class="line">    console.log(window.scrollX, window.scrollY);</span>
<span class="line">  }</span>
<span class="line">  window.addEventListener(&#39;scroll&#39;, handleScroll);</span>
<span class="line">  return () =&gt; window.removeEventListener(&#39;scroll&#39;, handleScroll);</span>
<span class="line">}, []);</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h5 id="触发动画" tabindex="-1"><a class="header-anchor" href="#触发动画"><span>触发动画</span></a></h5><div class="language-react line-numbers-mode" data-highlighter="prismjs" data-ext="react"><pre><code class="language-react"><span class="line">useEffect(() =&gt; {</span>
<span class="line">  const node = ref.current;</span>
<span class="line">  node.style.opacity = 1; // Trigger the animation</span>
<span class="line">  return () =&gt; {</span>
<span class="line">    node.style.opacity = 0; // Reset to the initial value</span>
<span class="line">  };</span>
<span class="line">}, []);</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h5 id="拉取服务器数据" tabindex="-1"><a class="header-anchor" href="#拉取服务器数据"><span>拉取服务器数据</span></a></h5><div class="language-react line-numbers-mode" data-highlighter="prismjs" data-ext="react"><pre><code class="language-react"><span class="line">useEffect(() =&gt; {</span>
<span class="line">  let ignore = false;</span>
<span class="line"></span>
<span class="line">  async function startFetching() {</span>
<span class="line">    const json = await fetchTodos(userId);</span>
<span class="line">    if (!ignore) {</span>
<span class="line">      setTodos(json);</span>
<span class="line">    }</span>
<span class="line">  }</span>
<span class="line"></span>
<span class="line">  startFetching();</span>
<span class="line"></span>
<span class="line">  return () =&gt; {</span>
<span class="line">    ignore = true;</span>
<span class="line">  };</span>
<span class="line">}, [userId]);</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><blockquote><p>在useEffect里面从服务器拉取数据，有不少有缺点：</p><ul><li><strong>Effects don’t run on the server.</strong> This means that the initial server-rendered HTML will only include a loading state with no data. The client computer will have to download all JavaScript and render your app only to discover that now it needs to load the data. This is not very efficient.</li><li><strong>Fetching directly in Effects makes it easy to create “network waterfalls”.</strong> You render the parent component, it fetches some data, renders the child components, and then they start fetching their data. If the network is not very fast, this is significantly slower than fetching all data in parallel.</li><li><strong>Fetching directly in Effects usually means you don’t preload or cache data.</strong> For example, if the component unmounts and then mounts again, it would have to fetch the data again.</li><li><strong>It’s not very ergonomic.</strong> There’s quite a bit of boilerplate code involved when writing <code>fetch</code> calls in a way that doesn’t suffer from bugs like <a href="https://maxrozen.com/race-conditions-fetching-data-react-with-useeffect" target="_blank" rel="noopener noreferrer">race conditions.</a></li></ul><p>we recommend the following approaches:</p><ul><li><strong>If you use a <a href="https://react.dev/learn/start-a-new-react-project#production-grade-react-frameworks" target="_blank" rel="noopener noreferrer">framework</a>, use its built-in data fetching mechanism.</strong> Modern React frameworks have integrated data fetching mechanisms that are efficient and don’t suffer from the above pitfalls.</li><li><strong>Otherwise, consider using or building a client-side cache.</strong> Popular open source solutions include <a href="https://tanstack.com/query/latest" target="_blank" rel="noopener noreferrer">React Query</a>, <a href="https://swr.vercel.app/" target="_blank" rel="noopener noreferrer">useSWR</a>, and <a href="https://beta.reactrouter.com/en/main/start/overview" target="_blank" rel="noopener noreferrer">React Router 6.4+.</a> You can build your own solution too, in which case you would use Effects under the hood, but add logic for deduplicating requests, caching responses, and avoiding network waterfalls (by preloading data or hoisting data requirements to routes).</li></ul></blockquote><p>还有一个初始化代码还可以写在useEffect外面 ，</p><div class="language-react line-numbers-mode" data-highlighter="prismjs" data-ext="react"><pre><code class="language-react"><span class="line">if (typeof window !== &#39;undefined&#39;) { // Check if we&#39;re running in the browser.</span>
<span class="line">  checkAuthToken();</span>
<span class="line">  loadDataFromLocalStorage();</span>
<span class="line">}</span>
<span class="line"></span>
<span class="line">function App() {</span>
<span class="line">  // ...</span>
<span class="line">}</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><blockquote><p>This guarantees that such logic only runs once after the browser loads the page.</p></blockquote><h5 id="you-might-not-need-an-useeffect" tabindex="-1"><a class="header-anchor" href="#you-might-not-need-an-useeffect"><span>You might not need an UseEffect</span></a></h5><ul><li>You don’t need Effects to transform data for rendering.</li><li>You don’t need Effects to handle user events.</li></ul><p>How to remove unnecessnary Effects:</p><ol><li><p>Updating state based on props or state .</p></li><li><p>Caching expensive calculations .</p><p>How to tell if a calculation is expensive?</p><div class="language-javascript line-numbers-mode" data-highlighter="prismjs" data-ext="js"><pre><code class="language-javascript"><span class="line">console<span class="token punctuation">.</span><span class="token function">time</span><span class="token punctuation">(</span><span class="token string">&#39;filter array&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"><span class="token keyword">const</span> visibleTodos <span class="token operator">=</span> <span class="token function">getFilteredTodos</span><span class="token punctuation">(</span>todos<span class="token punctuation">,</span> filter<span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">console<span class="token punctuation">.</span><span class="token function">timeEnd</span><span class="token punctuation">(</span><span class="token string">&#39;filter array&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>You will then see logs like <code>filter array: 0.15ms</code> in your console. If the overall logged time adds up to a significant amount (say, <code>1ms</code> or more), it might make sense to memoize that calculation.</p></li><li><p>Resetting all state when a prop changes</p><p>experiment code:</p><div class="language-react line-numbers-mode" data-highlighter="prismjs" data-ext="react"><pre><code class="language-react"><span class="line">export default function ProfilePage({ userId }) {</span>
<span class="line">  const [comment, setComment] = useState(&#39;&#39;);</span>
<span class="line"></span>
<span class="line">  // 🔴 Avoid: Resetting state on prop change in an Effect</span>
<span class="line">  useEffect(() =&gt; {</span>
<span class="line">    setComment(&#39;&#39;);</span>
<span class="line">  }, [userId]);</span>
<span class="line">  // ...</span>
<span class="line">}</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>Instead, you can tell React that each user’s profile is conceptually a <em>different</em> profile by giving it an explicit key. Split your component in two and pass a <code>key</code> attribute from the outer component to the inner one:</p><div class="language-react line-numbers-mode" data-highlighter="prismjs" data-ext="react"><pre><code class="language-react"><span class="line">export default function ProfilePage({ userId }) {</span>
<span class="line">  return (</span>
<span class="line">    &lt;Profile</span>
<span class="line">      userId={userId}</span>
<span class="line">      key={userId}</span>
<span class="line">    /&gt;</span>
<span class="line">  );</span>
<span class="line">}</span>
<span class="line"></span>
<span class="line">function Profile({ userId }) {</span>
<span class="line">  // ✅ This and any other state below will reset on key change automatically</span>
<span class="line">  const [comment, setComment] = useState(&#39;&#39;);</span>
<span class="line">  // ...</span>
<span class="line">}</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><blockquote><p>By passing userId as a key to the Profile component, you’re asking React to treat two Profile components with different userId as two different components that should not share any state.</p></blockquote></li><li><p>Adjusting some state when a prop changes</p><div class="language-react line-numbers-mode" data-highlighter="prismjs" data-ext="react"><pre><code class="language-react"><span class="line">function List({ items }) {</span>
<span class="line">  const [isReverse, setIsReverse] = useState(false);</span>
<span class="line">  const [selection, setSelection] = useState(null);</span>
<span class="line"></span>
<span class="line">  // 🔴 Avoid: Adjusting state on prop change in an Effect</span>
<span class="line">  useEffect(() =&gt; {</span>
<span class="line">    setSelection(null);</span>
<span class="line">  }, [items]);</span>
<span class="line">  // ...</span>
<span class="line">}</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>This, too, is not ideal. Every time the <code>items</code> change, the <code>List</code> and its child components will render with a stale <code>selection</code> value at first. Then React will update the DOM and run the Effects. Finally, the <code>setSelection(null)</code> call will cause another re-render of the <code>List</code> and its child components, restarting this whole process again.</p><p>Start by deleting the Effect. Instead, adjust the state directly during rendering:</p><div class="language-react line-numbers-mode" data-highlighter="prismjs" data-ext="react"><pre><code class="language-react"><span class="line">function List({ items }) {</span>
<span class="line">  const [isReverse, setIsReverse] = useState(false);</span>
<span class="line">  const [selection, setSelection] = useState(null);</span>
<span class="line">  // Better: Adjust the state while rendering</span>
<span class="line">  const [prevItems, setPrevItems] = useState(items);</span>
<span class="line">  if (items !== prevItems) {</span>
<span class="line">    setPrevItems(items);</span>
<span class="line">    setSelection(null);</span>
<span class="line">  }</span>
<span class="line">  // ...</span>
<span class="line">}</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><blockquote><p>In the above example, <code>setSelection</code> is called directly during a render. React will re-render the <code>List</code> <em>immediately</em> after it exits with a <code>return</code> statement. React has not rendered the <code>List</code> children or updated the DOM yet, so this lets the <code>List</code> children skip rendering the stale <code>selection</code> value.</p></blockquote><blockquote><p>When you update a component during rendering, React throws away the returned JSX and immediately retries rendering. To avoid very slow cascading retries, React only lets you update the <em><strong>same</strong></em> component’s state during a render. If you update another component’s state during a render, you’ll see an error. A condition like <code>items !== prevItems</code> is necessary to avoid loops.</p></blockquote><p>**Although this pattern is more efficient than an Effect, most components shouldn’t need it either. **For example, instead of storing (and resetting) the selected <em>item</em>, you can store the selected <em>item ID:</em></p><div class="language-react line-numbers-mode" data-highlighter="prismjs" data-ext="react"><pre><code class="language-react"><span class="line">function List({ items }) {</span>
<span class="line">  const [isReverse, setIsReverse] = useState(false);</span>
<span class="line">  const [selectedId, setSelectedId] = useState(null);</span>
<span class="line">  // ✅ Best: Calculate everything during rendering</span>
<span class="line">  const selection = items.find(item =&gt; item.id === selectedId) ?? null;</span>
<span class="line">  // ...</span>
<span class="line">}</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li><li><p>Initializing the application</p><div class="language-react line-numbers-mode" data-highlighter="prismjs" data-ext="react"><pre><code class="language-react"><span class="line">function App() {</span>
<span class="line">  // 🔴 Avoid: Effects with logic that should only ever run once</span>
<span class="line">  useEffect(() =&gt; {</span>
<span class="line">    loadDataFromLocalStorage();</span>
<span class="line">    checkAuthToken();</span>
<span class="line">  }, []);</span>
<span class="line">  // ...</span>
<span class="line">}</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li><li><p>Notifying parent components about state changes</p><div class="language-react line-numbers-mode" data-highlighter="prismjs" data-ext="react"><pre><code class="language-react"><span class="line">function Toggle({ onChange }) {</span>
<span class="line">  const [isOn, setIsOn] = useState(false);</span>
<span class="line"></span>
<span class="line">  // 🔴 Avoid: The onChange handler runs too late</span>
<span class="line">  useEffect(() =&gt; {</span>
<span class="line">    onChange(isOn);</span>
<span class="line">  }, [isOn, onChange])</span>
<span class="line"></span>
<span class="line">  function handleClick() {</span>
<span class="line">    setIsOn(!isOn);</span>
<span class="line">  }</span>
<span class="line"></span>
<span class="line">  function handleDragEnd(e) {</span>
<span class="line">    if (isCloserToRightEdge(e)) {</span>
<span class="line">      setIsOn(true);</span>
<span class="line">    } else {</span>
<span class="line">      setIsOn(false);</span>
<span class="line">    }</span>
<span class="line">  }</span>
<span class="line"></span>
<span class="line">  // ...</span>
<span class="line">}</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>change to:</p><div class="language-react line-numbers-mode" data-highlighter="prismjs" data-ext="react"><pre><code class="language-react"><span class="line">function Toggle({ onChange }) {</span>
<span class="line">  const [isOn, setIsOn] = useState(false);</span>
<span class="line"></span>
<span class="line">  function updateToggle(nextIsOn) {</span>
<span class="line">    // ✅ Good: Perform all updates during the event that caused them</span>
<span class="line">    setIsOn(nextIsOn);</span>
<span class="line">    onChange(nextIsOn);</span>
<span class="line">  }</span>
<span class="line"></span>
<span class="line">  function handleClick() {</span>
<span class="line">    updateToggle(!isOn);</span>
<span class="line">  }</span>
<span class="line"></span>
<span class="line">  function handleDragEnd(e) {</span>
<span class="line">    if (isCloserToRightEdge(e)) {</span>
<span class="line">      updateToggle(true);</span>
<span class="line">    } else {</span>
<span class="line">      updateToggle(false);</span>
<span class="line">    }</span>
<span class="line">  }</span>
<span class="line"></span>
<span class="line">  // ...</span>
<span class="line">}</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li><li><p>Passing data to the parent</p><div class="language-react line-numbers-mode" data-highlighter="prismjs" data-ext="react"><pre><code class="language-react"><span class="line">function Parent() {</span>
<span class="line">  const [data, setData] = useState(null);</span>
<span class="line">  // ...</span>
<span class="line">  return &lt;Child onFetched={setData} /&gt;;</span>
<span class="line">}</span>
<span class="line"></span>
<span class="line">function Child({ onFetched }) {</span>
<span class="line">  const data = useSomeAPI();</span>
<span class="line">  // 🔴 Avoid: Passing data to the parent in an Effect</span>
<span class="line">  useEffect(() =&gt; {</span>
<span class="line">    if (data) {</span>
<span class="line">      onFetched(data);</span>
<span class="line">    }</span>
<span class="line">  }, [onFetched, data]);</span>
<span class="line">  // ...</span>
<span class="line">}</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>In React, data flows from the parent components to their children. Since both the child and the parent need the same data, let the parent component fetch that data, and <em>pass it down</em> to the child instead:</p><div class="language-react line-numbers-mode" data-highlighter="prismjs" data-ext="react"><pre><code class="language-react"><span class="line">function Parent() {</span>
<span class="line">  const data = useSomeAPI();</span>
<span class="line">  // ...</span>
<span class="line">  // ✅ Good: Passing data down to the child</span>
<span class="line">  return &lt;Child data={data} /&gt;;</span>
<span class="line">}</span>
<span class="line"></span>
<span class="line">function Child({ data }) {</span>
<span class="line">  // ...</span>
<span class="line">}</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li><li><p>Subscribing to an external store</p><p>自己实现：</p><div class="language-react line-numbers-mode" data-highlighter="prismjs" data-ext="react"><pre><code class="language-react"><span class="line">function useOnlineStatus() {</span>
<span class="line">  // Not ideal: Manual store subscription in an Effect</span>
<span class="line">  const [isOnline, setIsOnline] = useState(true);</span>
<span class="line">  useEffect(() =&gt; {</span>
<span class="line">    function updateState() {</span>
<span class="line">      setIsOnline(navigator.onLine);</span>
<span class="line">    }</span>
<span class="line"></span>
<span class="line">    updateState();</span>
<span class="line"></span>
<span class="line">    window.addEventListener(&#39;online&#39;, updateState);</span>
<span class="line">    window.addEventListener(&#39;offline&#39;, updateState);</span>
<span class="line">    return () =&gt; {</span>
<span class="line">      window.removeEventListener(&#39;online&#39;, updateState);</span>
<span class="line">      window.removeEventListener(&#39;offline&#39;, updateState);</span>
<span class="line">    };</span>
<span class="line">  }, []);</span>
<span class="line">  return isOnline;</span>
<span class="line">}</span>
<span class="line"></span>
<span class="line">function ChatIndicator() {</span>
<span class="line">  const isOnline = useOnlineStatus();</span>
<span class="line">  // ...</span>
<span class="line">}</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>using built-in Hook: <code>useSyncExternalStore</code></p><div class="language-react line-numbers-mode" data-highlighter="prismjs" data-ext="react"><pre><code class="language-react"><span class="line">function subscribe(callback) {</span>
<span class="line">  window.addEventListener(&#39;online&#39;, callback);</span>
<span class="line">  window.addEventListener(&#39;offline&#39;, callback);</span>
<span class="line">  return () =&gt; {</span>
<span class="line">    window.removeEventListener(&#39;online&#39;, callback);</span>
<span class="line">    window.removeEventListener(&#39;offline&#39;, callback);</span>
<span class="line">  };</span>
<span class="line">}</span>
<span class="line"></span>
<span class="line">function useOnlineStatus() {</span>
<span class="line">  // ✅ Good: Subscribing to an external store with a built-in Hook</span>
<span class="line">  return useSyncExternalStore(</span>
<span class="line">    subscribe, // React won&#39;t resubscribe for as long as you pass the same function</span>
<span class="line">    () =&gt; navigator.onLine, // How to get the value on the client</span>
<span class="line">    () =&gt; true // How to get the value on the server</span>
<span class="line">  );</span>
<span class="line">}</span>
<span class="line"></span>
<span class="line">function ChatIndicator() {</span>
<span class="line">  const isOnline = useOnlineStatus();</span>
<span class="line">  // ...</span>
<span class="line">}</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li><li><p>Fetching data</p><p>首选一些框架里的网络请求库。如果不想用框架的话，可以这样做：</p><div class="language-react line-numbers-mode" data-highlighter="prismjs" data-ext="react"><pre><code class="language-react"><span class="line">function SearchResults({ query }) {</span>
<span class="line">  const [page, setPage] = useState(1);</span>
<span class="line">  const params = new URLSearchParams({ query, page });</span>
<span class="line">  const results = useData(\`/api/search?\${params}\`);</span>
<span class="line"></span>
<span class="line">  function handleNextPageClick() {</span>
<span class="line">    setPage(page + 1);</span>
<span class="line">  }</span>
<span class="line">  // ...</span>
<span class="line">}</span>
<span class="line"></span>
<span class="line">function useData(url) {</span>
<span class="line">  const [data, setData] = useState(null);</span>
<span class="line">  useEffect(() =&gt; {</span>
<span class="line">    let ignore = false;</span>
<span class="line">    fetch(url)</span>
<span class="line">      .then(response =&gt; response.json())</span>
<span class="line">      .then(json =&gt; {</span>
<span class="line">        if (!ignore) {</span>
<span class="line">          setData(json);</span>
<span class="line">        }</span>
<span class="line">      });</span>
<span class="line">    return () =&gt; {</span>
<span class="line">      ignore = true;</span>
<span class="line">    };</span>
<span class="line">  }, [url]);</span>
<span class="line">  return data;</span>
<span class="line">}</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><blockquote><p>In general, whenever you have to resort to writing Effects, keep an eye out for when you can extract a piece of functionality into a custom Hook with a more declarative and purpose-built API like <code>useData</code> above. The fewer raw <code>useEffect</code> calls you have in your components, the easier you will find to maintain your application.</p></blockquote></li></ol><h3 id="removing-effect-dependencies" tabindex="-1"><a class="header-anchor" href="#removing-effect-dependencies"><span>Removing Effect dependencies</span></a></h3><h4 id="are-you-reading-some-state-to-calculate-the-next-state" tabindex="-1"><a class="header-anchor" href="#are-you-reading-some-state-to-calculate-the-next-state"><span>Are you reading some state to calculate the next state?</span></a></h4><div class="language-react line-numbers-mode" data-highlighter="prismjs" data-ext="react"><pre><code class="language-react"><span class="line">function ChatRoom({ roomId }) {</span>
<span class="line">  const [messages, setMessages] = useState([]);</span>
<span class="line">  useEffect(() =&gt; {</span>
<span class="line">    const connection = createConnection();</span>
<span class="line">    connection.connect();</span>
<span class="line">    connection.on(&#39;message&#39;, (receivedMessage) =&gt; {</span>
<span class="line">      setMessages([...messages, receivedMessage]);</span>
<span class="line">    });</span>
<span class="line">    return () =&gt; connection.disconnect();</span>
<span class="line">  }, [roomId, messages]); // ✅ All dependencies declared</span>
<span class="line">  // ...</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>为了防止每收到一个信息，导致effect就重新运行一次，To fix the issue, don’t read <code>messages</code> inside the Effect. Instead, pass an <a href="https://react.dev/reference/react/useState#updating-state-based-on-the-previous-state" target="_blank" rel="noopener noreferrer">updater function</a> to <code>setMessages</code>:</p><div class="language-react line-numbers-mode" data-highlighter="prismjs" data-ext="react"><pre><code class="language-react"><span class="line">function ChatRoom({ roomId }) {</span>
<span class="line">  const [messages, setMessages] = useState([]);</span>
<span class="line">  useEffect(() =&gt; {</span>
<span class="line">    const connection = createConnection();</span>
<span class="line">    connection.connect();</span>
<span class="line">    connection.on(&#39;message&#39;, (receivedMessage) =&gt; {</span>
<span class="line">      setMessages(msgs =&gt; [...msgs, receivedMessage]);</span>
<span class="line">    });</span>
<span class="line">    return () =&gt; connection.disconnect();</span>
<span class="line">  }, [roomId]); // ✅ All dependencies declared</span>
<span class="line">  // ...</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,218)])])}const r=s(l,[["render",t]]),p=JSON.parse('{"path":"/Frontend/react/react.html","title":"","lang":"en-US","frontmatter":{},"git":{"updatedTime":1728526917000,"contributors":[{"name":"RuanCong","username":"RuanCong","email":"1308811723@qq.com","commits":1,"url":"https://github.com/RuanCong"}],"changelog":[{"hash":"1f3cd20aea4f9391855379170d37f9829710025a","time":1728526917000,"email":"1308811723@qq.com","author":"RuanCong","message":"feature: 增加react笔记"}]},"filePathRelative":"Frontend/react/react.md"}');export{r as comp,p as data};
