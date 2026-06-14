# Spring Boot 本机 HTTPS 调试方案：mkcert + 域名映射到本地服务

## 目标

把一个线上/测试环境域名映射到本机服务，例如：

```text
https://api-cloud-uat.xhsz.cc/school-api/user/auth/login
```

实际访问本机 Spring Boot 服务：

```text
https://localhost:8443/school-api/user/auth/login
```

并且 Chrome 不报证书红色警告。

---

# 一、核心原理

浏览器 HTTPS 不报错，需要同时满足两个条件：

```text
1. 证书被浏览器信任
2. 当前访问的域名在证书里
```

所以如果你访问的是：

```text
https://api-cloud-uat.xhsz.cc
```

证书里就必须包含：

```text
api-cloud-uat.xhsz.cc
```

只给 `localhost` 生成证书是不够的。

---

# 二、安装 mkcert

## Ubuntu / WSL

```bash
sudo apt install mkcert libnss3-tools
```

安装本机根证书：

```bash
mkcert -install
```

---

## Windows

PowerShell 执行：

```powershell
winget install FiloSottile.mkcert
```

然后：

```powershell
mkcert -install
```

注意：

```text
Windows Chrome 访问，就必须让 Windows 信任 mkcert CA。
WSL 里的 mkcert -install 不能让 Windows Chrome 信任。
```

---

# 三、配置域名映射到本机

假设要把这个域名映射到本机：

```text
api-cloud-uat.xhsz.cc
```

## Ubuntu / WSL

编辑 hosts：

```bash
sudo vim /etc/hosts
```

添加：

```text
127.0.0.1 api-cloud-uat.xhsz.cc
```

验证：

```bash
getent hosts api-cloud-uat.xhsz.cc
```

应该看到：

```text
127.0.0.1 api-cloud-uat.xhsz.cc
```

---

## Windows

用管理员权限打开记事本，编辑：

```text
C:\Windows\System32\drivers\etc\hosts
```

添加：

```text
127.0.0.1 api-cloud-uat.xhsz.cc
```

验证：

```powershell
ping api-cloud-uat.xhsz.cc
```

应该解析到：

```text
127.0.0.1
```

---

# 四、生成 Spring Boot 可用的 HTTPS 证书

Spring Boot 推荐使用 `.p12` 格式。

## 只测试 localhost

```bash
mkcert -pkcs12 localhost 127.0.0.1 ::1
```

会生成类似：

```text
localhost+2.p12
```

---

## 带真实域名映射调试

如果你要访问：

```text
https://api-cloud-uat.xhsz.cc:8443
```

就要生成包含这个域名的证书：

```bash
mkcert -pkcs12 api-cloud-uat.xhsz.cc localhost 127.0.0.1 ::1
```

会生成类似：

```text
api-cloud-uat.xhsz.cc+3.p12
```

默认密码一般是：

```text
changeit
```

---

# 五、放到 Spring Boot 项目里

把生成的 `.p12` 文件放到：

```text
src/main/resources/
```

例如：

```text
src/main/resources/api-cloud-uat.xhsz.cc+3.p12
```

---

# 六、配置 Spring Boot HTTPS

`application.yml`：

```yaml
server:
  port: 8443
  ssl:
    enabled: true
    key-store: classpath:api-cloud-uat.xhsz.cc+3.p12
    key-store-password: changeit
    key-store-type: PKCS12
```

如果你的证书文件名是 `localhost+2.p12`，就写：

```yaml
server:
  port: 8443
  ssl:
    enabled: true
    key-store: classpath:localhost+2.p12
    key-store-password: changeit
    key-store-type: PKCS12
```

---

# 七、启动 Spring Boot

启动后访问：

```text
https://localhost:8443
```

或者访问你映射的域名：

```text
https://api-cloud-uat.xhsz.cc:8443
```

如果 hosts 已经配置，并且证书包含 `api-cloud-uat.xhsz.cc`，Chrome 就不会报证书错误。

---

# 八、完整示例：把 UAT 域名转到本机服务

目标：

```text
https://api-cloud-uat.xhsz.cc:8443/school-api/user/auth/login
```

实际访问本机 Spring Boot。

## 1. hosts 添加

Linux / WSL：

```bash
sudo vim /etc/hosts
```

添加：

```text
127.0.0.1 api-cloud-uat.xhsz.cc
```

Windows：

```text
C:\Windows\System32\drivers\etc\hosts
```

添加：

```text
127.0.0.1 api-cloud-uat.xhsz.cc
```

---

## 2. 生成证书

```bash
mkcert -pkcs12 api-cloud-uat.xhsz.cc localhost 127.0.0.1 ::1
```

生成：

```text
api-cloud-uat.xhsz.cc+3.p12
```

---

## 3. 放入项目

```text
src/main/resources/api-cloud-uat.xhsz.cc+3.p12
```

---

## 4. 配置 Spring Boot

```yaml
server:
  port: 8443
  ssl:
    enabled: true
    key-store: classpath:api-cloud-uat.xhsz.cc+3.p12
    key-store-password: changeit
    key-store-type: PKCS12
```

---

## 5. 访问

```text
https://api-cloud-uat.xhsz.cc:8443/school-api/user/auth/login
```

---

# 九、Windows + WSL 特别注意

如果你的服务跑在 WSL / Docker 里，但是浏览器在 Windows 上访问：

```text
Windows Chrome -> https://localhost:8443 -> WSL 服务
```

那么证书最好在 **Windows 上生成**。

原因：

```text
Chrome 在 Windows 上运行，只信任 Windows 的证书库。
WSL 里的 mkcert -install 不会影响 Windows Chrome。
```

推荐流程：

```text
1. Windows 安装 mkcert
2. Windows 执行 mkcert -install
3. Windows 生成 .p12 证书
4. 把 .p12 放进 Spring Boot 项目
5. Spring Boot 使用这个 .p12
6. Windows Chrome 访问
```

Windows PowerShell 示例：

```powershell
mkdir C:\certs\springboot
cd C:\certs\springboot

mkcert -pkcs12 api-cloud-uat.xhsz.cc localhost 127.0.0.1 ::1
```

然后把生成的 `.p12` 复制到 Spring Boot 的：

```text
src/main/resources/
```

---

# 十、检查当前服务实际使用的证书

可以用命令检查：

```bash
echo | openssl s_client -connect localhost:8443 -servername api-cloud-uat.xhsz.cc 2>/dev/null | openssl x509 -noout -issuer -subject -ext subjectAltName
```

正常应该看到：

```text
issuer=... mkcert ...
X509v3 Subject Alternative Name:
    DNS:api-cloud-uat.xhsz.cc, DNS:localhost, IP Address:127.0.0.1
```

重点看两个地方：

```text
issuer 里有 mkcert
Subject Alternative Name 里有你访问的域名
```

---

# 十一、常见问题

## 1. 为什么访问 localhost 不报错，访问 api-cloud-uat.xhsz.cc 报错？

因为证书只包含了：

```text
localhost
```

但你访问的是：

```text
api-cloud-uat.xhsz.cc
```

需要重新生成证书：

```bash
mkcert -pkcs12 api-cloud-uat.xhsz.cc localhost 127.0.0.1 ::1
```

---

## 2. 为什么证书显示 mkcert，但 Chrome 还是红？

通常是浏览器所在系统没有信任 mkcert CA。

例如：

```text
服务在 WSL
浏览器在 Windows
```

这种情况下，必须在 Windows 执行：

```powershell
mkcert -install
```

---

## 3. 为什么访问不带端口的域名不行？

例如：

```text
https://api-cloud-uat.xhsz.cc
```

HTTPS 默认访问的是：

```text
443
```

如果 Spring Boot 监听的是：

```text
8443
```

那就必须访问：

```text
https://api-cloud-uat.xhsz.cc:8443
```

如果想不带端口访问，就要让服务监听 443，或者用 Nginx 监听 443 再转发到 8443。

---

# 十二、推荐配置模板

本机开发推荐：

```yaml
server:
  port: 8443
  ssl:
    enabled: true
    key-store: classpath:api-cloud-uat.xhsz.cc+3.p12
    key-store-password: changeit
    key-store-type: PKCS12
```

hosts：

```text
127.0.0.1 api-cloud-uat.xhsz.cc
```

生成证书：

```bash
mkcert -pkcs12 api-cloud-uat.xhsz.cc localhost 127.0.0.1 ::1
```

访问：

```text
https://api-cloud-uat.xhsz.cc:8443/school-api/user/auth/login
```

这样就可以用真实域名调本机 Spring Boot HTTPS 服务，而且 Chrome 不会报证书错误。
