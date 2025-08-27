## Kubernetes Components

The components of a Kubernetes cluster:

![image-20250815091851689](./images/image-20250815091851689.png)

## 官方文档笔记

* Pods are the smallest deployable units of computing that you can create and manage in Kubernetes

* You don't need to run multiple containers to provide replication (for resilience or capacity)

* Restarting a container in a Pod should not be confused with restarting a Pod. A Pod is not a process, but an
  environment for running container(s). A Pod persists until it is deleted.

* Modifying the pod template or switching to a new pod template has no direct effect on the Pods that already exist.
  > 只会根据新的更新的模板重新创建一个pod

* The name of a Pod must be a valid DNS subdomain value, but this can produce unexpected results for the Pod hostname.
  For best compatibility, the name should follow the more restrictive rules for a DNS label

* Deployment：负责管理和维护你的应用实例（Pod）。它会确保指定数量的 Nginx Pod 正在运行。如果某个 Pod 挂掉了，Deployment
  会自动创建一个新的来替代它

* Service：负责为一组 Pod 提供一个稳定、统一的访问入口。因为 Pod 是“短暂”的，它们的 IP 地址会变化。Service 提供了一个固定的
  IP 地址和 DNS 名称，使得其他应用或外部用户可以方便地访问到你的 Nginx 服务，而无需关心后端具体是哪个 Pod 在提供服务。

* 你可以把 app: nginx 理解为你和 Kubernetes 的一个约定：你给一组 Pod 贴上这个独特的“名牌”，然后告诉 Deployment 和 Service
  按照这个“名牌”去认领和查找它们

* Most often, you provide the information to kubectl in a file known as a manifest. By convention, manifests are YAML (
  you could also use JSON format).

* YAML 文件在两种模式下的“角色”
    * 在 kubectl create -f (命令式) 中：YAML 文件是一个一次性的模板。你命令 Kubernetes：“按照这个模板，给我创建一个对象”。创建完成后，这个
      YAML 文件和集群中的那个对象之间，就没有必然的联系了。Kubernetes 不会“记住”你是用哪个文件创建的它。
    * 在 kubectl apply -f (声明式) 中：YAML 文件是对象的**“期望状态”的声明**。你告诉 Kubernetes：“请确保集群中有一个与这个
      YAML 文件描述的状态相匹配的对象”。Kubernetes 不仅会创建这个对象，还会记录下这个“期望状态”，以便于未来的比较和更新。

* 仅仅修改并保存在本地 configs/ 目录下的 YAML 文件，并不会对集群产生任何影响。 Kubernetes 集群完全不知道你本地文件的变化。你必须通过
  kubectl apply 这个动作，明确地告诉 Kubernetes：“请按照我最新的配置文件，去同步集群的状态。”

* 仅仅修改并保存在本地 configs/ 目录下的 YAML 文件，并不会对集群产生任何影响。 Kubernetes 集群完全不知道你本地文件的变化。你必须通过
  kubectl apply 这个动作，明确地告诉 Kubernetes：“请按照我最新的配置文件，去同步集群的状态。”
  ```shell
   kubectl diff -f configs/
  ```

* Our previous example (replicas): The change from kubectl scale was NOT retained because the replicas field was "owned"
  by your YAML file. apply enforced your file's value.

* The note's meaning (LoadBalancer example): Changes from other controllers (like adding a clusterIP) ARE retained
  because those fields are not "owned" by your YAML file. The patch mechanism surgically updates only the fields you
  explicitly manage in your file.

* Starting with Kubernetes v1.25, the API server offers server side field validation that detects unrecognized or
  duplicate fields in an object. It provides all the functionality of kubectl --validate on the server side.

* When you create an object in Kubernetes, you must provide the object spec that describes its desired state, as well as
  some basic information about the object (such as a name).

* Almost every Kubernetes object includes two nested object fields that govern the object's configuration: the object spec and the object status.
  
* The status describes the current state of the object, supplied and updated by the Kubernetes system and its components.
  
  > status可以理解为“看起来是什么样”，而state是“实际是什么样子的”

* Each object in your cluster has a Name that is unique for that type of resource. Every Kubernetes object also has a UID that is unique across your whole cluster.

  > For example, you can only have one Pod named `myapp-1234` within the same namespace, but you can have one Pod and one Deployment that are each named `myapp-1234`.

* **Kubernetes 的世界观是建立在它自己的 API 对象上的**。它通过 Kubelet 等组件来观测外部物理世界的状态，并尽力使其与内部的声明式状态保持一致。但如果外部世界发生了它无法观测到的剧烈变化（比如一个节点被偷偷替换了），而内部的逻辑对象没有被相应更新，就会导致这种“身份混淆”和状态不一致，从而引发各种难以排查的诡异问题。

  > 在物理/虚拟层面销毁一个节点之前，**务必先在 Kubernetes 中将其删除**。
  >
  > 正确的操作流程应该是：
  >
  > 1. **标记节点不可调度**：
  >
  >    ```shell
  >    kubectl cordon worker-01
  >    ```
  >
  >    这能防止新的 Pod 被调度到该节点上。
  >
  > 2. **驱逐节点上的所有 Pod**：
  >
  >    ```shell
  >    kubectl drain worker-01 --ignore-daemonsets
  >    ```
  >
  >    这会安全地将该节点上现有的 Pod 迁移到其他节点。`--ignore-daemonsets` 是因为 DaemonSet 管理的 Pod 不需要被驱逐。
  >
  > 3. **从 Kubernetes 中删除节点对象**：
  >
  >    ```shell
  >    kubectl delete node worker-01
  >    ```
  >
  >    这一步就是“销毁学籍卡”，彻底清除它在 Kubernetes 中的所有记录。
  >
  > 4. **销毁物理/虚拟机**： 现在，你可以安全地去你的云平台或虚拟化平台删除这台服务器了。

* A client-provided string that refers to an object in a [resource](https://kubernetes.io/docs/reference/using-api/api-concepts/#standard-api-terminology) URL, such as `/api/v1/pods/some-name`.

  Only one object of a given kind can have a given name at a time.  Names must be unique across **all API versions** of the same resource. API resources are distinguished by their API group, resource type, namespace (for namespaced resources), and name. In other words, API version is irrelevant in this context.

* 在 Deployment（以及 ReplicaSet, StatefulSet, Job, CronJob 等这类控制器）的 Pod 模板（spec.template）中，metadata.name 这个字段是不能设置的。如果你尝试设置它，Kubernetes API Server 会拒绝你的请求。

* `kind: Ingress` 会暴露一个 IP 地址吗？

  > 不会，`Ingress` 资源本身不会。一个 `kind: Ingress` 的 YAML 文件，它仅仅是**一套规则**的集合，就像一张写着“`a.com` 的流量请走A门，`b.com` 的流量请走B门”的说明书。这张说明书本身并没有地址，它需要被人（也就是 `Ingress Controller`）去阅读和执行。
  >
  > 真正暴露 IP 地址的，是 `Ingress Controller` 的 `Service`！
  >
  > 回顾一下 `Ingress Controller` 是如何被安装的：
  >
  > 1. **Ingress Controller 是一个需要被**`安装`**到集群中的应用**，它不是 K8s 自带的。
  > 2. **安装的本质**是应用一套包含了 `Deployment`、`Service`、`RBAC` 等资源的 YAML 文件。
  > 3. **K3s 用户最幸福**，因为 K3s 已经内置了 **Traefik**，无需手动安装。你只需要直接在 `Ingress` 中使用 `ingressClassName: "traefik"` 即可。
  > 4. 在**标准 K8s 环境**中，最常用的选择是 **NGINX Ingress Controller**，可以通过官方 `kubectl apply` 命令或 `Helm` Chart 来安装。
  > 5. **`IngressClass` 资源是在安装 Controller 的过程中被自动创建的**。它像一个“告示牌”，告诉整个集群：“嘿，我这里有一个名为 `nginx` (或 `traefik`) 的 Controller，你们谁需要处理 Ingress 规则，就通过 `ingressClassName` 来找我！”
  >
  > 现在，`Ingress` (规则)、`Ingress Controller` (执行者) 和 `IngressClass` (联系方式) 这三者之
  >
  > 它通常包含一个 `Deployment` (运行 Controller 的 Pods) 和一个 `Service` (把这些 Pods 暴露出去)。这个 `Service` 的类型通常是 `LoadBalancer` 或 `NodePort`。
  >
  > - 当 `Service` 的类型是 `LoadBalancer` 时，云服务商会为**这个 Service**分配一个**公网 IP 地址**。
  > - 当 `Service` 的类型是 `NodePort` 时，你可以通过**任何一个节点的 IP** + `NodePort` 端口来访问。
  >
  > 那个宝贵的、唯一的、对外服务的公网 IP 地址，是属于 **Ingress Controller 的 Service** 的，而不是属于你创建的某一个 `Ingress` 规则对象的。
  >
  > 你可以通过以下命令查看到这个 IP 地址：
  >
  > ```shell
  > # 查看 Ingress Controller 的 Service
  > # 注意命名空间，如果你是用 helm 装的 nginx-ingress，那就在 ingress-nginx 命名空间
  > # 如果是 k3s 自带的 traefik，那就在 kube-system
  > kubectl get service -n ingress-nginx 
  > 
  > # 你会看到类似这样的输出
  > # NAME                       TYPE           CLUSTER-IP      EXTERNAL-IP      PORT(S)                      AGE
  > # ingress-nginx-controller   LoadBalancer   10.43.151.108   203.0.113.55     80:32168/TCP,443:30256/TCP   10m
  > #                                                          ^^^^^^^^^^^^
  > #                                                          就是这个 IP！
  > ```

* kubectl 默认会在你的用户主目录下的 .kube 文件夹中寻找名为 config 的文件。

  > 在 Linux 和 macOS 上，路径通常是 ~/.kube/config。

* 在生产环境中，通常会有多个 Master 节点（在 k3d/k3s 里被称为 Server 节点）来确保高可用性。你不会直接连接到某一个 Master 节点，因为如果那个节点宕机了，你就无法访问集群了。正确的做法是连接到一个**负载均衡器 (Load Balancer)**，由它来将你的请求转发给后面健康的 Master 节点。

  k3d 在本地用 Docker 容器巧妙地复现了这套架构：

  1. **`k3d-my-cluster-server-0` 容器**: 这是真正的 K3s Server，它在**容器内部**运行着 Kubernetes API Server，监听着 `6443` 端口。这个容器没有直接暴露端口到宿主机，所以你从外部无法直接访问它。
  2. **`k3d-my-cluster-serverlb` 容器**: 这是一个基于 NGINX 的反向代理/负载均衡器。k3d 启动它，并让它监听宿主机的一个端口，然后将流量转发给后端的 K3s Server 容器。

* 你的 kubectl 并不是直接和 K3s Server 容器通信。它在和一个作为负载均衡器的代理容器 (k3d-my-cluster-serverlb) 通信。这个代理容器负责将你的请求安全地转发给真正的 K3s Server 容器。39753 是 k3d 为这个负载均衡器随机选择的、暴露在你宿主机上的端口。


* 故障排查三步法

  > 第 1 步：确认 Pods 是否健康运行
  >
  > ```shell
  > kubectl get pods -o wide
  > ```
  >
  > 第 2 步：确认 Service 是否正确关联了 Pods
  >
  > ```shell
  > kubectl describe service nginx-service
  > ```
  >
  > **正确的状态**: `Endpoints` 后面应该列出了一个或多个 IP 地址和端口，这些 IP 应该与你在上一步中看到的 Pod IP 完全一致。`Endpoints:         10.42.0.5:80,10.42.0.6:80`
  >
  > 第 3 步：确认 k3d 节点的端口映射 (最可能的原因)
  

* 最快、最直接的绕过网络问题的方法，我们在上次讨论中也提到了。它不依赖任何端口映射，而是直接在你的电脑和 Service 之间建立一条隧道。

  > ```shell
  > # 在新终端中运行
  > kubectl port-forward service/nginx-service 8080:80
  > ```

* 在k3d里测试时，设置type=LoadBalancer时没有用，即使设置k3d cluster create my-cluster -p "8080:80@loadbalancer"，
  需要映射type=NodePort 的端口，如8080:30080

* 

## 未同步的

* Pods that are part of a DaemonSet tolerate being run on an unschedulable Node. DaemonSets typically provide node-local
  services that should run on the Node even if it is being drained of workload applications.

  > 在 Kubernetes 中，这些“必须安装在每个节点上”的后台服务，就是通过 DaemonSet 来部署的。常见的例子有：日志收集器，节点监控器，网络插件，存储插件

* In case of a Node, it is implicitly assumed that an instance using the same name will have the same state (e.g.
  network settings, root disk contents) and attributes like node labels.

  > 这里的instance是指虚拟机或者物理机。 Kubernetes
  认‘名’不认‘人’。它把节点名称当作身份证号。如果一个新人拿了旧人的身份证号来报到，系统会把他当成旧人，但这个新人的能力和背景（磁盘内容、硬件属性）是全新的。这种身份与实际能力的不匹配，正是很多诡异问题的根源。请务必确保在替换节点时，先‘注销’旧的身份信息（kubectl
  delete node），再让新人用自己的身份注册。

* Register the node with the given list of taints
  > 可以把 Taint (污点) 想象成节点（Node）上的一个“排斥标签”或者“谢绝入内”的牌子。 一旦一个节点被打上了某个
  Taint，Kubernetes 的调度器（Scheduler）默认就不会把任何 Pod 调度到这个节点上。这就好像一个房间门口挂着“请勿打扰”的牌子，正常情况下，没有人会进去。

* 执行这个命令，你会看到 kubectl 正在向 apiserver 发出一系列的 GET 请求来发现资源

```shell
kubectl get pods --v=8
```

* --api-group="" 表示查询核心组

```shell
kubectl api-resources --api-group=""
```

* 首先，我们必须明白 Discovery API 的目的。无论是 kubectl、Rancher UI 还是任何其他与 Kubernetes 集群交互的客户端，它们在执行操作之前，都需要先知道：
  “这个集群里有哪些 API Group？” (例如 apps, batch, networking.k8s.io 等)。“每个 Group 下有哪些版本？” (例如 apps group 下有
  v1)“每个 Group/Version 下有哪些资源 (Resource)？” (例如 apps/v1 下有 deployments, statefulsets, daemonsets 等)
  “这些资源支持哪些操作 (Verb)？” (例如 deployments 支持 create, get, list, delete 等)

* Unaggregated Discovery (非聚合发现)
  Unaggregated Discovery 指的是 单个 API 服务器自身 提供的、关于 它自己所能服务的 API 的发现信息。

* Aggregated Discovery (聚合发现)
  Aggregated Discovery 正是 Kubernetes API Aggregation Layer (聚合层) 的强大之处。它提供了一个 统一的、聚合后 的视图。
  当客户端（如 kubectl）查询主 kube-apiserver 的发现端点时，聚合层不仅会返回 kube-apiserver 自己的 API 信息，还会智能地将所有已注册的扩展
  API 服务器（通过 APIService 对象注册）的发现信息也一并包含进来并返回。
* Kubernetes offers stable support for aggregated discovery, publishing all resources supported by a cluster through two
  endpoints (/api and /apis).
  > * /api: 列出核心 API Group (只有 v1)。
  > * /apis: 列出所有非核心的 API Group (如 apps, batch, apiextensions.k8s.io 等)。
      >   为什么会有两个端点： 最初的设计: 在 Kubernetes 的早期，所有的 API 资源对象（如 Pod, Service, Node,
      ReplicationController 等）都被放在一个没有名字的 API Group 里，这个 Group 就是我们所说的“核心组 (Core Group)
      ”。由于它没有名字，为了访问它，API Server 就提供了 /api/v1 这个特殊的端点。在当时，这就是 Kubernetes 的全部 API。
      发现扩展性问题: 随着项目的发展，开发者们很快意识到，把所有东西都塞进一个没有分组的 API 里是无法扩展的。如果我想添加一组新的
      API 用于处理“批处理任务”，或者另一组 API 用于处理“网络策略”，把它们都堆在核心组里会变得非常混乱。 “命名组”的诞生:
      为了解决这个问题，Kubernetes 引入了“API Group（命名组）”的概念。这允许开发者根据功能领域将 API 资源进行逻辑分组。例如：
      apps 组：包含 Deployment, StatefulSet, DaemonSet 等。batch 组：包含 Job, CronJob 等。 networking.k8s.io 组：包含
      Ingress, NetworkPolicy 等。 所有这些“命名组”的 API 都通过一个统一的前缀 /apis 来访问，例如
      /apis/apps/v1，/apis/batch/v1。

* Without indicating the resource type using the Accept header, the default response for the /api and /apis endpoint is
  an unaggregated discovery document.
* the kubectl tool fetches and caches the API specification for enabling command-line completion and other features. The
  two supported mechanisms are as follows:
    * Discovery API 就像是这本书的 “目录”。
    * OpenAPI Document 就像是这本书 “正文内容中所有名词的详细解释和语法结构说明”
* 这是最简单、最安全，也是最推荐的本地调试方法。kubectl proxy 命令会在你的本地机器上启动一个代理服务器，它负责将你的本地请求安全地转发到
  k3d 集群内部的 API Server。
