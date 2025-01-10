import{_ as l,c as a,a as i,o as n}from"./app-CM5yRpI6.js";const s={};function r(d,e){return n(),a("div",null,e[0]||(e[0]=[i(`<h1 id="docker-swarm-锁定密钥丢失处理方案" tabindex="-1"><a class="header-anchor" href="#docker-swarm-锁定密钥丢失处理方案"><span>Docker Swarm 锁定密钥丢失处理方案</span></a></h1><p>如果忘记了 Docker Swarm 的解锁密钥，以下是可能的处理方案：</p><h2 id="集群仍在运行时" tabindex="-1"><a class="header-anchor" href="#集群仍在运行时"><span>集群仍在运行时</span></a></h2><p>如果集群中至少有一个管理节点仍在运行，可以通过以下命令查看解锁密钥：</p><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre><code><span class="line"><span class="token function">docker</span> swarm unlock-key</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><h2 id="所有管理节点已停止且无法获取密钥" tabindex="-1"><a class="header-anchor" href="#所有管理节点已停止且无法获取密钥"><span>所有管理节点已停止且无法获取密钥</span></a></h2><h3 id="方案一-创建新集群-推荐" tabindex="-1"><a class="header-anchor" href="#方案一-创建新集群-推荐"><span>方案一：创建新集群（推荐）</span></a></h3><ol><li>停止所有节点的 docker daemon</li><li>在每个节点上删除 Swarm 状态: <ul><li>删除 <code>/var/lib/docker/swarm</code> 目录</li></ul></li><li>重启 docker daemon</li><li>重新初始化一个新的 Swarm 集群</li><li>重新部署所有服务</li></ol><h3 id="方案二-禁用自动锁定-不推荐-存在安全风险" tabindex="-1"><a class="header-anchor" href="#方案二-禁用自动锁定-不推荐-存在安全风险"><span>方案二：禁用自动锁定（不推荐，存在安全风险）</span></a></h3><ol><li>停止 docker daemon</li><li>编辑 <code>/var/lib/docker/swarm/worker/worker.json</code><ul><li>将 <code>&quot;autolock&quot;: true</code> 改为 <code>&quot;autolock&quot;: false</code></li></ul></li><li>重启 docker daemon</li></ol><h2 id="最佳实践" tabindex="-1"><a class="header-anchor" href="#最佳实践"><span>最佳实践</span></a></h2><p>为避免密钥丢失带来的问题，建议采取以下措施：</p><h3 id="密钥备份" tabindex="-1"><a class="header-anchor" href="#密钥备份"><span>密钥备份</span></a></h3><ul><li>将解锁密钥安全存储在密码管理器中</li><li>将密钥离线保存在安全的位置</li></ul><h3 id="文档记录" tabindex="-1"><a class="header-anchor" href="#文档记录"><span>文档记录</span></a></h3><ul><li>建立密钥管理的标准操作流程</li><li>记录密钥恢复的步骤</li></ul><h3 id="定期测试" tabindex="-1"><a class="header-anchor" href="#定期测试"><span>定期测试</span></a></h3><ul><li>定期进行解锁操作的演练</li><li>验证密钥备份的可用性</li></ul><h3 id="密钥轮换" tabindex="-1"><a class="header-anchor" href="#密钥轮换"><span>密钥轮换</span></a></h3><ul><li>定期更新解锁密钥</li><li>使用以下命令生成新密钥：</li></ul><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre><code><span class="line"><span class="token function">docker</span> swarm unlock-key <span class="token parameter variable">--rotate</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><h2 id="预防措施" tabindex="-1"><a class="header-anchor" href="#预防措施"><span>预防措施</span></a></h2><h3 id="启用自动锁定前的准备" tabindex="-1"><a class="header-anchor" href="#启用自动锁定前的准备"><span>启用自动锁定前的准备</span></a></h3><ol><li>确保理解其影响</li><li>建立密钥管理流程</li><li>准备备份和恢复方案</li></ol><h3 id="评估需求" tabindex="-1"><a class="header-anchor" href="#评估需求"><span>评估需求</span></a></h3><ul><li>评估安全需求</li><li>权衡管理复杂度</li><li>考虑替代安全措施</li></ul><blockquote><p>注意：一旦启用了自动锁定，妥善保管解锁密钥就变得极其重要。失去密钥基本上意味着需要重建整个集群，这在生产环境中可能造成严重影响。</p></blockquote>`,27)]))}const c=l(s,[["render",r],["__file","forget-lock-psw.html.vue"]]),o=JSON.parse('{"path":"/Backend/docker/forget-lock-psw.html","title":"Docker Swarm 锁定密钥丢失处理方案","lang":"en-US","frontmatter":{},"headers":[{"level":2,"title":"集群仍在运行时","slug":"集群仍在运行时","link":"#集群仍在运行时","children":[]},{"level":2,"title":"所有管理节点已停止且无法获取密钥","slug":"所有管理节点已停止且无法获取密钥","link":"#所有管理节点已停止且无法获取密钥","children":[{"level":3,"title":"方案一：创建新集群（推荐）","slug":"方案一-创建新集群-推荐","link":"#方案一-创建新集群-推荐","children":[]},{"level":3,"title":"方案二：禁用自动锁定（不推荐，存在安全风险）","slug":"方案二-禁用自动锁定-不推荐-存在安全风险","link":"#方案二-禁用自动锁定-不推荐-存在安全风险","children":[]}]},{"level":2,"title":"最佳实践","slug":"最佳实践","link":"#最佳实践","children":[{"level":3,"title":"密钥备份","slug":"密钥备份","link":"#密钥备份","children":[]},{"level":3,"title":"文档记录","slug":"文档记录","link":"#文档记录","children":[]},{"level":3,"title":"定期测试","slug":"定期测试","link":"#定期测试","children":[]},{"level":3,"title":"密钥轮换","slug":"密钥轮换","link":"#密钥轮换","children":[]}]},{"level":2,"title":"预防措施","slug":"预防措施","link":"#预防措施","children":[{"level":3,"title":"启用自动锁定前的准备","slug":"启用自动锁定前的准备","link":"#启用自动锁定前的准备","children":[]},{"level":3,"title":"评估需求","slug":"评估需求","link":"#评估需求","children":[]}]}],"git":{"updatedTime":1736308420000,"contributors":[{"name":"RuanCong","username":"RuanCong","email":"1308811723@qq.com","commits":1,"url":"https://github.com/RuanCong"}]},"filePathRelative":"Backend/docker/forget-lock-psw.md"}');export{c as comp,o as data};