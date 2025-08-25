## Kubernetes Components

The components of a Kubernetes cluster:

![image-20250815091851689](./images/image-20250815091851689.png)

## 官方文档笔记 

* Pods are the smallest deployable units of computing that you can create and manage in Kubernetes
* You don't need to run multiple containers to provide replication (for resilience or capacity)
* Restarting a container in a Pod should not be confused with restarting a Pod. A Pod is not a process, but an environment for running container(s). A Pod persists until it is deleted.
* Modifying the pod template or switching to a new pod template has no direct effect on the Pods that already exist.
  > 只会根据新的更新的模板重新创建一个pod
* The name of a Pod must be a valid DNS subdomain value, but this can produce unexpected results for the Pod hostname. For best compatibility, the name should follow the more restrictive rules for a DNS label
* Deployment：负责管理和维护你的应用实例（Pod）。它会确保指定数量的 Nginx Pod 正在运行。如果某个 Pod 挂掉了，Deployment 会自动创建一个新的来替代它
* Service：负责为一组 Pod 提供一个稳定、统一的访问入口。因为 Pod 是“短暂”的，它们的 IP 地址会变化。Service 提供了一个固定的 IP 地址和 DNS 名称，使得其他应用或外部用户可以方便地访问到你的 Nginx 服务，而无需关心后端具体是哪个 Pod 在提供服务。
* 你可以把 app: nginx 理解为你和 Kubernetes 的一个约定：你给一组 Pod 贴上这个独特的“名牌”，然后告诉 Deployment 和 Service 按照这个“名牌”去认领和查找它们
* YAML 文件在两种模式下的“角色”
  * 在 kubectl create -f (命令式) 中：YAML 文件是一个一次性的模板。你命令 Kubernetes：“按照这个模板，给我创建一个对象”。创建完成后，这个 YAML 文件和集群中的那个对象之间，就没有必然的联系了。Kubernetes 不会“记住”你是用哪个文件创建的它。 
  * 在 kubectl apply -f (声明式) 中：YAML 文件是对象的**“期望状态”的声明**。你告诉 Kubernetes：“请确保集群中有一个与这个 YAML 文件描述的状态相匹配的对象”。Kubernetes 不仅会创建这个对象，还会记录下这个“期望状态”，以便于未来的比较和更新。
* 仅仅修改并保存在本地 configs/ 目录下的 YAML 文件，并不会对集群产生任何影响。 Kubernetes 集群完全不知道你本地文件的变化。你必须通过 kubectl apply 这个动作，明确地告诉 Kubernetes：“请按照我最新的配置文件，去同步集群的状态。”
* 仅仅修改并保存在本地 configs/ 目录下的 YAML 文件，并不会对集群产生任何影响。 Kubernetes 集群完全不知道你本地文件的变化。你必须通过 kubectl apply 这个动作，明确地告诉 Kubernetes：“请按照我最新的配置文件，去同步集群的状态。”
  ```shell
   kubectl diff -f configs/
  ```
* Our previous example (replicas): The change from kubectl scale was NOT retained because the replicas field was "owned" by your YAML file. apply enforced your file's value. 
* The note's meaning (LoadBalancer example): Changes from other controllers (like adding a clusterIP) ARE retained because those fields are not "owned" by your YAML file. The patch mechanism surgically updates only the fields you explicitly manage in your file.
* Starting with Kubernetes v1.25, the API server offers server side field validation that detects unrecognized or duplicate fields in an object. It provides all the functionality of kubectl --validate on the server side.
* When you create an object in Kubernetes, you must provide the object spec that describes its desired state, as well as some basic information about the object (such as a name).
* Most often, you provide the information to kubectl in a file known as a manifest. By convention, manifests are YAML (you could also use JSON format).
* Most often, you provide the information to kubectl in a file known as a manifest. By convention, manifests are YAML (you could also use JSON format).


## 未同步的

* Pods that are part of a DaemonSet tolerate being run on an unschedulable Node. DaemonSets typically provide node-local services that should run on the Node even if it is being drained of workload applications.
  
  > 在 Kubernetes 中，这些“必须安装在每个节点上”的后台服务，就是通过 DaemonSet 来部署的。常见的例子有：日志收集器，节点监控器，网络插件，存储插件

* In case of a Node, it is implicitly assumed that an instance using the same name will have the same state (e.g. network settings, root disk contents) and attributes like node labels.
  
  > 这里的instance是指虚拟机或者物理机。 Kubernetes 认‘名’不认‘人’。它把节点名称当作身份证号。如果一个新人拿了旧人的身份证号来报到，系统会把他当成旧人，但这个新人的能力和背景（磁盘内容、硬件属性）是全新的。这种身份与实际能力的不匹配，正是很多诡异问题的根源。请务必确保在替换节点时，先‘注销’旧的身份信息（kubectl delete node），再让新人用自己的身份注册。

* Register the node with the given list of taints 
  > 可以把 Taint (污点) 想象成节点（Node）上的一个“排斥标签”或者“谢绝入内”的牌子。 一旦一个节点被打上了某个 Taint，Kubernetes 的调度器（Scheduler）默认就不会把任何 Pod 调度到这个节点上。这就好像一个房间门口挂着“请勿打扰”的牌子，正常情况下，没有人会进去。

* 执行这个命令，你会看到 kubectl 正在向 apiserver 发出一系列的 GET 请求来发现资源 
```shell
kubectl get pods --v=8
```

* --api-group="" 表示查询核心组
```shell
kubectl api-resources --api-group=""
```

* 首先，我们必须明白 Discovery API 的目的。无论是 kubectl、Rancher UI 还是任何其他与 Kubernetes 集群交互的客户端，它们在执行操作之前，都需要先知道： “这个集群里有哪些 API Group？” (例如 apps, batch, networking.k8s.io 等)。“每个 Group 下有哪些版本？” (例如 apps group 下有 v1)“每个 Group/Version 下有哪些资源 (Resource)？” (例如 apps/v1 下有 deployments, statefulsets, daemonsets 等)“这些资源支持哪些操作 (Verb)？” (例如 deployments 支持 create, get, list, delete 等)

* Unaggregated Discovery (非聚合发现)
  Unaggregated Discovery 指的是 单个 API 服务器自身 提供的、关于 它自己所能服务的 API 的发现信息。

* Aggregated Discovery (聚合发现)
Aggregated Discovery 正是 Kubernetes API Aggregation Layer (聚合层) 的强大之处。它提供了一个 统一的、聚合后 的视图。 当客户端（如 kubectl）查询主 kube-apiserver 的发现端点时，聚合层不仅会返回 kube-apiserver 自己的 API 信息，还会智能地将所有已注册的扩展 API 服务器（通过 APIService 对象注册）的发现信息也一并包含进来并返回。
* Kubernetes offers stable support for aggregated discovery, publishing all resources supported by a cluster through two endpoints (/api and /apis). 
    > * /api: 列出核心 API Group (只有 v1)。 
    > * /apis: 列出所有非核心的 API Group (如 apps, batch, apiextensions.k8s.io 等)。
    > 为什么会有两个端点： 最初的设计: 在 Kubernetes 的早期，所有的 API 资源对象（如 Pod, Service, Node, ReplicationController 等）都被放在一个没有名字的 API Group 里，这个 Group 就是我们所说的“核心组 (Core Group)”。由于它没有名字，为了访问它，API Server 就提供了 /api/v1 这个特殊的端点。在当时，这就是 Kubernetes 的全部 API。 发现扩展性问题: 随着项目的发展，开发者们很快意识到，把所有东西都塞进一个没有分组的 API 里是无法扩展的。如果我想添加一组新的 API 用于处理“批处理任务”，或者另一组 API 用于处理“网络策略”，把它们都堆在核心组里会变得非常混乱。 “命名组”的诞生: 为了解决这个问题，Kubernetes 引入了“API Group（命名组）”的概念。这允许开发者根据功能领域将 API 资源进行逻辑分组。例如： apps 组：包含 Deployment, StatefulSet, DaemonSet 等。batch 组：包含 Job, CronJob 等。 networking.k8s.io 组：包含 Ingress, NetworkPolicy 等。 所有这些“命名组”的 API 都通过一个统一的前缀 /apis 来访问，例如 /apis/apps/v1，/apis/batch/v1。

* Without indicating the resource type using the Accept header, the default response for the /api and /apis endpoint is an unaggregated discovery document.
* the kubectl tool fetches and caches the API specification for enabling command-line completion and other features. The two supported mechanisms are as follows:
  * Discovery API 就像是这本书的 “目录”。
  * OpenAPI Document 就像是这本书 “正文内容中所有名词的详细解释和语法结构说明”
* 这是最简单、最安全，也是最推荐的本地调试方法。kubectl proxy 命令会在你的本地机器上启动一个代理服务器，它负责将你的本地请求安全地转发到 k3d 集群内部的 API Server。
