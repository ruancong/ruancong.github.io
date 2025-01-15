import{_ as i,c as n,a as e,o as t}from"./app-4VTaxiuD.js";const a={};function r(s,l){return t(),n("div",null,l[0]||(l[0]=[e('<h1 id="网络基础知识" tabindex="-1"><a class="header-anchor" href="#网络基础知识"><span>网络基础知识</span></a></h1><h2 id="osi-七层模型" tabindex="-1"><a class="header-anchor" href="#osi-七层模型"><span>OSI 七层模型</span></a></h2><h3 id="_7-应用层-application-layer" tabindex="-1"><a class="header-anchor" href="#_7-应用层-application-layer"><span>7. 应用层 (Application Layer)</span></a></h3><ul><li><strong>功能</strong>：为应用程序提供网络服务</li><li><strong>协议</strong>：HTTP、FTP、SMTP、DNS、Telnet</li><li><strong>数据单位</strong>：数据（Data）</li></ul><h3 id="_6-表示层-presentation-layer" tabindex="-1"><a class="header-anchor" href="#_6-表示层-presentation-layer"><span>6. 表示层 (Presentation Layer)</span></a></h3><ul><li><strong>功能</strong>：数据格式转换、加密解密、压缩解压缩</li><li><strong>协议</strong>：SSL、TLS</li><li><strong>数据单位</strong>：数据（Data）</li></ul><h3 id="_5-会话层-session-layer" tabindex="-1"><a class="header-anchor" href="#_5-会话层-session-layer"><span>5. 会话层 (Session Layer)</span></a></h3><ul><li><strong>功能</strong>：建立、维护和管理会话连接</li><li><strong>协议</strong>：RPC、NetBIOS</li><li><strong>数据单位</strong>：数据（Data）</li></ul><h3 id="_4-传输层-transport-layer" tabindex="-1"><a class="header-anchor" href="#_4-传输层-transport-layer"><span>4. 传输层 (Transport Layer)</span></a></h3><ul><li><strong>功能</strong>：端到端的可靠数据传输</li><li><strong>协议</strong>：TCP、UDP</li><li><strong>数据单位</strong>：段（Segment）</li></ul><h3 id="_3-网络层-network-layer" tabindex="-1"><a class="header-anchor" href="#_3-网络层-network-layer"><span>3. 网络层 (Network Layer)</span></a></h3><ul><li><strong>功能</strong>：路由选择、寻址和转发</li><li><strong>协议</strong>：IP、ICMP、IGMP</li><li><strong>数据单位</strong>：包（Packet）</li></ul><h3 id="_2-数据链路层-data-link-layer" tabindex="-1"><a class="header-anchor" href="#_2-数据链路层-data-link-layer"><span>2. 数据链路层 (Data Link Layer)</span></a></h3><ul><li><strong>功能</strong>：相邻节点之间的数据传输</li><li><strong>协议</strong>：MAC、PPP、ARP</li><li><strong>数据单位</strong>：帧（Frame）</li></ul><h3 id="_1-物理层-physical-layer" tabindex="-1"><a class="header-anchor" href="#_1-物理层-physical-layer"><span>1. 物理层 (Physical Layer)</span></a></h3><ul><li><strong>功能</strong>：比特流的传输</li><li><strong>协议</strong>：IEEE 802.3（以太网）</li><li><strong>数据单位</strong>：比特（Bit）</li></ul><h3 id="常用记忆方法" tabindex="-1"><a class="header-anchor" href="#常用记忆方法"><span>常用记忆方法</span></a></h3><ol><li><strong>自顶向下</strong>：<code>应、表、会、传、网、链、物</code></li><li><strong>英文首字母</strong>：<code>APSTNDP</code></li><li><strong>通俗记忆</strong>：<code>All People Seem To Need Data Processing</code>（所有人似乎都需要数据处理）</li></ol><p>在实际应用中，我们经常使用 TCP/IP 四层模型，它是 OSI 七层模型的简化版：</p><ul><li>应用层（对应 OSI 的应用层、表示层、会话层）</li><li>传输层（对应 OSI 的传输层）</li><li>网络层（对应 OSI 的网络层）</li><li>网络接口层（对应 OSI 的数据链路层和物理层）</li></ul><h2 id="交换机的作用" tabindex="-1"><a class="header-anchor" href="#交换机的作用"><span>交换机的作用</span></a></h2><p>交换机在计算机网络中扮演着非常重要的角色，主要有以下几个用途：</p><ol><li><p><strong>数据转发</strong></p><ul><li>根据 MAC 地址表将数据包准确转发到目标设备</li><li>在同一个局域网内实现设备之间的通信</li></ul></li><li><p><strong>网络分段</strong></p><ul><li>将大型网络分割成多个小型网络段</li><li>减少广播域的范围，提高网络性能</li></ul></li><li><p><strong>提高网络性能</strong></p><ul><li>支持全双工通信</li><li>可以同时处理多个数据包的传输</li><li>减少网络冲突</li></ul></li><li><p><strong>MAC地址学习</strong></p><ul><li>自动学习连接设备的 MAC 地址</li><li>建立并维护 MAC 地址表</li><li>实现智能转发</li></ul></li><li><p><strong>提供网络安全</strong></p><ul><li>可以配置 VLAN 进行逻辑隔离</li><li>支持端口安全等功能</li><li>控制访问权限</li></ul></li></ol><h2 id="网络通信需求" tabindex="-1"><a class="header-anchor" href="#网络通信需求"><span>网络通信需求</span></a></h2><p>如果没有交换机，不同网段间不能直接进行数据通信。这是因为：</p><ol><li><p><strong>物理连接问题</strong></p><ul><li>没有交换机，就缺少了连接两个网络的物理媒介</li><li>设备之间无法建立网络连接通路</li></ul></li><li><p><strong>网段隔离</strong></p><ul><li>不同网段之间的通信需要三层设备（如路由器）的支持</li></ul></li><li><p><strong>通信方式限制</strong></p><ul><li>即使用网线直接连接两台计算机，也只能实现点对点通信</li><li>无法实现多台设备之间的网络互联</li></ul></li></ol><p>要实现两个网络之间的通信，通常需要：</p><ul><li>交换机（二层设备）：实现同一网段内的通信</li><li>路由器（三层设备）：实现不同网段之间的通信</li></ul><h2 id="二层网络与三层网络" tabindex="-1"><a class="header-anchor" href="#二层网络与三层网络"><span>二层网络与三层网络</span></a></h2><h3 id="二层网络-数据链路层" tabindex="-1"><a class="header-anchor" href="#二层网络-数据链路层"><span>二层网络（数据链路层）</span></a></h3><ol><li><p><strong>主要特征</strong></p><ul><li>基于 MAC 地址进行数据转发</li><li>工作在 OSI 第二层</li><li>只能在同一广播域内通信</li></ul></li><li><p><strong>典型设备</strong></p><ul><li>交换机（Switch）</li><li>网桥（Bridge）</li></ul></li><li><p><strong>主要功能</strong></p><ul><li>MAC 地址学习和转发</li><li>帧的封装和解封装</li><li>差错检测</li><li>VLAN 划分</li></ul></li></ol><h3 id="三层网络-网络层" tabindex="-1"><a class="header-anchor" href="#三层网络-网络层"><span>三层网络（网络层）</span></a></h3><ol><li><p><strong>主要特征</strong></p><ul><li>基于 IP 地址进行数据路由</li><li>工作在 OSI 第三层</li><li>可以跨网段通信</li></ul></li><li><p><strong>典型设备</strong></p><ul><li>路由器（Router）</li><li>三层交换机</li></ul></li><li><p><strong>主要功能</strong></p><ul><li>IP 路由</li><li>数据包转发</li><li>网络互联</li><li>流量控制</li></ul></li></ol><h3 id="区别对比" tabindex="-1"><a class="header-anchor" href="#区别对比"><span>区别对比</span></a></h3><ol><li><p><strong>寻址方式</strong></p><ul><li>二层：使用 MAC 地址（物理地址）</li><li>三层：使用 IP 地址（逻辑地址）</li></ul></li><li><p><strong>通信范围</strong></p><ul><li>二层：限于同一广播域内</li><li>三层：可以跨网段、跨广播域</li></ul></li><li><p><strong>应用场景</strong></p><ul><li>二层：局域网内部通信</li><li>三层：跨网段通信、互联网通信</li></ul></li></ol><h2 id="交换机类型对比" tabindex="-1"><a class="header-anchor" href="#交换机类型对比"><span>交换机类型对比</span></a></h2><h3 id="普通交换机-二层交换机" tabindex="-1"><a class="header-anchor" href="#普通交换机-二层交换机"><span>普通交换机（二层交换机）</span></a></h3><ol><li><p><strong>工作原理</strong></p><ul><li>只工作在数据链路层</li><li>基于 MAC 地址转发数据</li><li>只能识别和转发二层数据帧</li></ul></li><li><p><strong>功能特点</strong></p><ul><li>维护 MAC 地址表</li><li>支持 VLAN 划分</li><li>只能在同一网段内转发数据</li></ul></li><li><p><strong>应用场景</strong></p><ul><li>小型局域网</li><li>同一网段内的设备互联</li><li>网络接入层使用</li></ul></li></ol><h3 id="三层交换机" tabindex="-1"><a class="header-anchor" href="#三层交换机"><span>三层交换机</span></a></h3><ol><li><p><strong>工作原理</strong></p><ul><li>同时工作在数据链路层和网络层</li><li>可以基于 MAC 地址和 IP 地址转发数据</li><li>具备路由功能</li></ul></li><li><p><strong>功能特点</strong></p><ul><li>具备二层交换机的所有功能</li><li>支持 IP 路由</li><li>可以实现 VLAN 间路由</li><li>支持访问控制列表（ACL）</li><li>支持 QoS</li></ul></li><li><p><strong>应用场景</strong></p><ul><li>大型局域网</li><li>不同网段间的通信</li><li>网络核心层和汇聚层使用</li></ul></li></ol><h3 id="主要区别总结" tabindex="-1"><a class="header-anchor" href="#主要区别总结"><span>主要区别总结</span></a></h3><ol><li><p><strong>功能范围</strong></p><ul><li>二层交换机：只能转发同一网段数据</li><li>三层交换机：可以实现跨网段通信</li></ul></li><li><p><strong>转发依据</strong></p><ul><li>二层交换机：只依据 MAC 地址</li><li>三层交换机：可依据 MAC 地址和 IP 地址</li></ul></li><li><p><strong>处理能力</strong></p><ul><li>二层交换机：处理能力相对较弱</li><li>三层交换机：处理能力更强，可以同时处理二层和三层数据</li></ul></li><li><p><strong>价格成本</strong></p><ul><li>二层交换机：价格相对较低</li><li>三层交换机：价格较高</li></ul></li><li><p><strong>适用规模</strong></p><ul><li>二层交换机：适合小型网络</li><li>三层交换机：适合中大型网络</li></ul></li></ol><h2 id="家用路由器" tabindex="-1"><a class="header-anchor" href="#家用路由器"><span>家用路由器</span></a></h2><p>家用路由器实际上是一个多层设备，主要工作在网络层（第三层），但也集成了其他层的功能：</p><h3 id="主要工作层次" tabindex="-1"><a class="header-anchor" href="#主要工作层次"><span>主要工作层次</span></a></h3><ol><li><p><strong>网络层（第三层）- 核心功能</strong></p><ul><li>IP 路由功能</li><li>NAT 网络地址转换</li><li>防火墙功能</li><li>DHCP 服务</li></ul></li><li><p><strong>数据链路层（第二层）</strong></p><ul><li>无线接入点（AP）功能</li><li>MAC 地址过滤</li><li>交换机功能</li></ul></li><li><p><strong>应用层（第七层）</strong></p><ul><li>Web 管理界面</li><li>DNS 服务</li><li>QoS 服务质量控制</li></ul></li></ol><h3 id="家用路由器的主要功能" tabindex="-1"><a class="header-anchor" href="#家用路由器的主要功能"><span>家用路由器的主要功能</span></a></h3><ol><li><p><strong>网络接入</strong></p><ul><li>连接互联网（WAN 口）</li><li>提供无线网络接入</li><li>提供有线网络接入（LAN 口）</li></ul></li><li><p><strong>网络管理</strong></p><ul><li>IP 地址分配（DHCP）</li><li>访问控制</li><li>端口映射</li><li>网络安全</li></ul></li><li><p><strong>地址转换</strong></p><ul><li>NAT 功能</li><li>内外网络隔离</li><li>公网 IP 共享</li></ul></li></ol><h2 id="nat" tabindex="-1"><a class="header-anchor" href="#nat"><span>NAT</span></a></h2><p>NAT (Network Address Translation，网络地址转换) 是一种在计算机网络中广泛使用的技术。让我为您详细解释：</p><p>NAT的主要功能和用途：</p><ol><li><p>地址转换：将内部网络的私有IP地址转换为外部网络的公网IP地址，使内部网络的设备能够访问互联网。</p></li><li><p>节省IPv4地址：通过让多台内网设备共用一个公网IP地址，有效缓解了IPv4地址短缺的问题。</p></li><li><p>提高安全性：由于外部网络无法直接访问内部私有地址，NAT起到了类似防火墙的保护作用。</p></li></ol><p>NAT的工作原理： 当内网设备需要访问互联网时，NAT会：</p><ul><li>记录内网设备的私有IP地址和端口号</li><li>将其转换为路由器的公网IP地址和一个新的端口号</li><li>建立转换表来维护这些对应关系</li><li>当收到响应时，再根据转换表将数据包发送回正确的内网设备</li></ul><p>常见的NAT类型：</p><ul><li>静态NAT：一个私有IP固定对应一个公网IP</li><li>动态NAT：从公网IP地址池中动态分配</li><li>PAT（端口地址转换）：多个私有IP共用一个公网IP，通过不同端口号区分</li></ul><p>这项技术在家用路由器和企业网络中都得到广泛应用，是现代互联网基础设施的重要组成部分。</p><h2 id="linux系统中-以太网接口的命名" tabindex="-1"><a class="header-anchor" href="#linux系统中-以太网接口的命名"><span>Linux系统中,以太网接口的命名</span></a></h2><p>在Linux系统中,以太网接口的命名通常遵循以下规则:</p><ul><li>以太网接口的名称通常以&quot;eth&quot;开头,例如&quot;eth0&quot;、&quot;eth1&quot;等。</li><li>如果接口是虚拟的,则名称中会包含&quot;veth&quot;前缀,例如&quot;veth0&quot;、&quot;veth1&quot;等。</li><li>如果接口是桥接接口,则名称中会包含&quot;br&quot;前缀,例如&quot;br0&quot;、&quot;br1&quot;等。</li><li>如果接口是无线接口,则名称中会包含&quot;wlan&quot;前缀,例如&quot;wlan0&quot;、&quot;wlan1&quot;等。</li></ul><div class="hint-container note"><p class="hint-container-title">Note</p><ol><li><p>传统命名方式: eth0, eth1, eth2 等。这是最早期的命名方式,按照网卡被系统检测到的顺序依次编号。</p></li><li><p>新的可预测命名方式(Predictable Network Interface Names):</p></li></ol><ul><li>eno1, eno2 等 - 主板板载网卡</li><li>enp0s3, enp2s0 等 - PCI网卡(基于PCI总线位置)</li><li>enx78e7d1ea46da 等 - 基于MAC地址的命名</li></ul><p>这种改变始于systemd的引入。新的命名方案主要是为了解决传统eth<em>命名方式的一些问题,比如网卡顺序可能会在重启后发生变化。不过你仍然可以通过修改配置禁用这种新命名方式,回到传统的eth</em>命名。</p></div><div class="hint-container note"><p class="hint-container-title">Note</p><p>eno = Ethernet On-board（板载以太网） enp = Ethernet PCI（PCI接口的以太网卡） ens = Ethernet Slot（热插拔槽的以太网） enx = Ethernet + MAC地址（基于MAC地址命名的以太网）</p></div>',62)]))}const p=i(a,[["render",r],["__file","network-basis.html.vue"]]),h=JSON.parse('{"path":"/Backend/network/network-basis.html","title":"网络基础知识","lang":"en-US","frontmatter":{},"headers":[{"level":2,"title":"OSI 七层模型","slug":"osi-七层模型","link":"#osi-七层模型","children":[{"level":3,"title":"7. 应用层 (Application Layer)","slug":"_7-应用层-application-layer","link":"#_7-应用层-application-layer","children":[]},{"level":3,"title":"6. 表示层 (Presentation Layer)","slug":"_6-表示层-presentation-layer","link":"#_6-表示层-presentation-layer","children":[]},{"level":3,"title":"5. 会话层 (Session Layer)","slug":"_5-会话层-session-layer","link":"#_5-会话层-session-layer","children":[]},{"level":3,"title":"4. 传输层 (Transport Layer)","slug":"_4-传输层-transport-layer","link":"#_4-传输层-transport-layer","children":[]},{"level":3,"title":"3. 网络层 (Network Layer)","slug":"_3-网络层-network-layer","link":"#_3-网络层-network-layer","children":[]},{"level":3,"title":"2. 数据链路层 (Data Link Layer)","slug":"_2-数据链路层-data-link-layer","link":"#_2-数据链路层-data-link-layer","children":[]},{"level":3,"title":"1. 物理层 (Physical Layer)","slug":"_1-物理层-physical-layer","link":"#_1-物理层-physical-layer","children":[]},{"level":3,"title":"常用记忆方法","slug":"常用记忆方法","link":"#常用记忆方法","children":[]}]},{"level":2,"title":"交换机的作用","slug":"交换机的作用","link":"#交换机的作用","children":[]},{"level":2,"title":"网络通信需求","slug":"网络通信需求","link":"#网络通信需求","children":[]},{"level":2,"title":"二层网络与三层网络","slug":"二层网络与三层网络","link":"#二层网络与三层网络","children":[{"level":3,"title":"二层网络（数据链路层）","slug":"二层网络-数据链路层","link":"#二层网络-数据链路层","children":[]},{"level":3,"title":"三层网络（网络层）","slug":"三层网络-网络层","link":"#三层网络-网络层","children":[]},{"level":3,"title":"区别对比","slug":"区别对比","link":"#区别对比","children":[]}]},{"level":2,"title":"交换机类型对比","slug":"交换机类型对比","link":"#交换机类型对比","children":[{"level":3,"title":"普通交换机（二层交换机）","slug":"普通交换机-二层交换机","link":"#普通交换机-二层交换机","children":[]},{"level":3,"title":"三层交换机","slug":"三层交换机","link":"#三层交换机","children":[]},{"level":3,"title":"主要区别总结","slug":"主要区别总结","link":"#主要区别总结","children":[]}]},{"level":2,"title":"家用路由器","slug":"家用路由器","link":"#家用路由器","children":[{"level":3,"title":"主要工作层次","slug":"主要工作层次","link":"#主要工作层次","children":[]},{"level":3,"title":"家用路由器的主要功能","slug":"家用路由器的主要功能","link":"#家用路由器的主要功能","children":[]}]},{"level":2,"title":"NAT","slug":"nat","link":"#nat","children":[]},{"level":2,"title":"Linux系统中,以太网接口的命名","slug":"linux系统中-以太网接口的命名","link":"#linux系统中-以太网接口的命名","children":[]}],"git":{"updatedTime":1736821931000,"contributors":[{"name":"RuanCong","username":"RuanCong","email":"1308811723@qq.com","commits":2,"url":"https://github.com/RuanCong"}]},"filePathRelative":"Backend/network/network-basis.md"}');export{p as comp,h as data};