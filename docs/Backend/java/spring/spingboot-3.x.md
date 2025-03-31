### upgrade 2.x to 3.x

Core changes

* Image Banner Support Removed

  `banner.gif`, `banner.jpg`, and `banner.png` files are now ignored and should be replaced with a text-based `banner.txt` file.

* Logging Date Format

  The new default format `yyyy-MM-dd’T’HH:mm:ss.SSSXXX` uses a `T` to separate the date and time  and adds the timezone offset to the end. 

  The `LOG_DATEFORMAT_PATTERN` environment variable or `logging.pattern.dateformat` property can be used to set the format  (like previous default value:  `yyyy-MM-dd HH:mm:ss.SSS`).

* Auto-configuration Files

  Spring Boot 2.7 [introduced](https://github.com/spring-projects/spring-boot/wiki/Spring-Boot-2.7-Release-Notes#changes-to-auto-configuration) a new `META-INF/spring/org.springframework.boot.autoconfigure.AutoConfiguration.imports` file for registering auto-configurations, while maintaining backwards compatibility with registration in `spring.factories`. With this release, support for registering auto-configurations in `spring.factories` using the `org.springframework.boot.autoconfigure.EnableAutoConfiguration` key has been removed in favor of the imports file. Other entries in `spring.factories` under other keys are unaffected.



### `@Import` 、`@ImportResource`

You need not put all your `@Configuration` into a single class. The `@Import` annotation can be used to import additional configuration classes. 

If you absolutely must use XML based configuration, we recommend that you still start with a `@Configuration` class. You can then use an `@ImportResource` annotation to load XML configuration files.

### 排除自动配置的类

* `@SpringBootApplication(exclude = { DataSourceAutoConfiguration.class }) `
* 如果类不在`classPath`上，可以 `excludeName` 属性用全限定类名进行排除
* 还可以使用配置文件  `spring.autoconfigure.exclude` property

### 默认的自动配置的包

申明`@SpringBootApplication`的类所在的包就是默认的参与自动配置的包。如果想要额外的其它包，可以使用`@AutoConfigurationPackage` 进行声明

### spring beans的注入

推荐使用构造函数进行注入。如果有多个构造函数，你需要在你想的那个上使用`@Autowired`。并声明为`final`。例如：

```java
@Service
public class MyAccountService implements AccountService {

    private final RiskAssessor riskAssessor;

    private final PrintStream out;

    @Autowired
    public MyAccountService(RiskAssessor riskAssessor) {
        this.riskAssessor = riskAssessor;
        this.out = System.out;
    }

    public MyAccountService(RiskAssessor riskAssessor, PrintStream out) {
        this.riskAssessor = riskAssessor;
        this.out = out;
    }

    // ...

}
```

### `@SpringBootApplication`

单个 `@SpringBootApplication` 可以包括这三个注解的作用

* `@EnableAutoConfiguration`

- `@ComponentScan`
- `@SpringBootConfiguration`

### 关闭启动日志

`spring.main.log-startup-info` 配置

### Liveness State 与 Readiness State

Liveness State  代表 springboot 应用内部的状态：通常与 `ApplicationContext` 是否初始化完成相关

Readiness State 代表 springboot 应用是可以正常处理正常业务：通常 `CommandLineRunner` and `ApplicationRunner` 处理完成后

可以通过代码主动通报应用的状态

```java
import org.springframework.boot.availability.AvailabilityChangeEvent;
import org.springframework.boot.availability.LivenessState;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.stereotype.Component;

@Component
public class MyLocalCacheVerifier {

    private final ApplicationEventPublisher eventPublisher;

    public MyLocalCacheVerifier(ApplicationEventPublisher eventPublisher) {
        this.eventPublisher = eventPublisher;
    }

    public void checkLocalCache() {
        try {
            // ...
        }
        catch (CacheCompletelyBrokenException ex) {
            AvailabilityChangeEvent.publish(this.eventPublisher, ex, LivenessState.BROKEN);
        }
    }

}

```



### 当应用启动后要完成某个任务

Tasks expected to run during startup should be executed by `CommandLineRunner` and `ApplicationRunner` components instead of using Spring component lifecycle callbacks such as `@PostConstruct`.

### 事件与监听器

注册监听器

* 在`ApplicationContext`创建完成之前的事件，绑定方式`SpringApplication.addListeners(…)`或`SpringApplicationBuilder.listeners(…)`;

* 在`ApplicationContext`创建完后的事件，可以通过`@EventListener`去监听；
* 在`META-INF/spring.factories`文件中增加`org.springframework.context.ApplicationListener=com.example.project.MyListener`, 通过这种方式会被自动注册

> Event listeners should not run potentially lengthy tasks as they execute in the same thread by default. Consider using [application and command-line runners](https://docs.spring.io/spring-boot/docs/current/reference/html/features.html#features.spring-application.command-line-runner) instead.

### 配置文件

> It is recommended to stick with one format for your entire application. If you have configuration files with both `.properties` and YAML format in the same location, `.properties` takes precedence.

#### JSON Application Properties

当有一些配置文件key名字无法在环境变量生效时。可以用inline json 这种方式来设置：

`java -Dspring.application.json='{"my":{"name":"test"}}' -jar myapp.jar`、`java -Dspring.application.json='{"my":{"name":"test"}}' -jar myapp.jar`、`java -jar myapp.jar --spring.application.json='{"my":{"name":"test"}}'`。 这样`my.name=test`就会加入spring environment中。这种方式也支持设置`null`值

#### 设置配置文件路径

默认搜寻配置文件的地方：

1. From the classpath 【项目内的classpath地址】
   1. The classpath root
   2. The classpath `/config` package
2. From the current directory 【打包后jar包所在的位置】
   1. The current directory
   2. The `config/` subdirectory in the current directory
   3. Immediate child directories of the `config/` subdirectory

用`spring.config.name`配置项来修改默认的配置的文件名【`application`】

用`spring.config.location`配置项来指定配置文件地址，

* 多个可以用逗号来隔开, 同一个配置项后面的优先级高于前面的；
* 多个也可以用分号来隔开，但是表示它们是同一个级别
* 它可以配置文件夹，但是要以`/`结尾。还可以使用通配符`/config/*/`。

```shell
java -jar myproject.jar --spring.config.location=\
    optional:classpath:/default.properties,\
    optional:classpath:/override.properties
```

`spring.config.additional-location` 是配置额外的地址，原来的默认的地址不会被覆盖

> Use the prefix `optional:` if the [locations are optional](https://docs.spring.io/spring-boot/docs/current/reference/html/features.html#features.external-config.files.optional-prefix) and you do not mind if they do not exist.

> 注意：`spring.config.name`, `spring.config.location`, and `spring.config.additional-location` are used very early to determine which files have to be loaded. They must be defined as an environment property (typically an **OS environment variable, a system property, or a command-line argument**).

优先级例子

> The last-wins strategy applies at the [location group](https://docs.spring.io/spring-boot/docs/current/reference/html/features.html#features.external-config.files.location-groups) level. A `spring.config.location` of `classpath:/cfg/,classpath:/ext/` will not have the same override rules as `classpath:/cfg/;classpath:/ext/`.
>
> For example, continuing our `prod,live` example above, we might have the following files:
>
> ```
> /cfg
>   application-live.properties
> /ext
>   application-live.properties
>   application-prod.properties
> ```
>
> When we have a `spring.config.location` of `classpath:/cfg/,classpath:/ext/` we process all `/cfg` files before all `/ext` files:
>
> 1. `/cfg/application-live.properties`
> 2. `/ext/application-prod.properties`
> 3. `/ext/application-live.properties`
>
> 会先加载/cfg/里的文件，再加载/ext/里的文件
>
> When we have `classpath:/cfg/;classpath:/ext/` instead (with a `;` delimiter) we process `/cfg` and `/ext` at the same level:
>
> 1. `/ext/application-prod.properties`
> 2. `/cfg/application-live.properties`
> 3. `/ext/application-live.properties`
>
> 因为是同一个级别，所以会按profile设置来加载，先加载-prod的文件，再加载-live的文件

#### 引入额外的配置文件

`spring.config.import`

```pro
spring.config.import=optional:file:/etc/config/myconfig[.yaml]
```


#### 配置随机值

```properties
my.secret=${random.value}
my.number=${random.int}
my.bignumber=${random.long}
my.uuid=${random.uuid}
my.number-less-than-ten=${random.int(10)}
my.number-in-range=${random.int[1024,65536]}
```

#### 设置系统环境变量统一前缀

可以直接通过`SpringApplication.setEnvironmentPrefix`方法来设置。

> For example, if you set the prefix to `input`, a property such as `remote.timeout` will also be resolved as `input.remote.timeout` in the system environment.

#### 单一文件中实现多个文件的作用

在YAML 中使用三个连接符来进行分割 `---`

```yaml
spring:
  application:
    name: "MyApp"
---
spring:
  application:
    name: "MyCloudApp"
  config:
    activate:
      on-cloud-platform: "kubernetes"
```

在 `.properties` 中用 `#---` 或者`!---` 来进行分割

```properties
spring.application.name=MyApp
#---
spring.application.name=MyCloudApp
spring.config.activate.on-cloud-platform=kubernetes
```

> `@PropertySource ` 和`@TestPropertySource` 是不能加载这种被分割的配置文件的。
>
> 分割符的前面不能有空格。上下行也不能有相同的其它分隔符

#### 不同环境激活不同的配置

用 `spring.config.activate.*` 来进行配置

| Property            | Note                                                         |
| :------------------ | :----------------------------------------------------------- |
| `on-profile`        | A profile expression that must match for the document to be active. |
| `on-cloud-platform` | The `CloudPlatform` that must be detected for the document to be active. |

```properties
myprop=always-set
#---
spring.config.activate.on-cloud-platform=kubernetes
spring.config.activate.on-profile=prod | staging
myotherprop=sometimes-set
```

#### 解析YAML 文件

`@PropertySource` 和`@PropertySource`不能加载 YAML 文件, 它们只能加载`.properties`文件。`YamlPropertiesFactoryBean `与`YamlPropertiesFactoryBean` 可以申明为Bean去直接加载YAML文件

 ```java
     @Bean
     public YamlPropertiesFactoryBean yamlProperties() {
         YamlPropertiesFactoryBean yaml = new YamlPropertiesFactoryBean();
         yaml.setResources(new ClassPathResource("application.yml"));
         return yaml;
     }
 ```

可以创建 `YamlPropertySourceLoader` 去解析YAML文件

#### 激活 `@ConfigurationProperties`

要激活自定义的配置文件。需要将它们申明为spring Bean。可以直接使用 `@Component` 等注解或scan的方式进行注册。

但是在按条件进行注册的场景下，就可以用`@ConfigurationProperties` 进行注册。`@ConfigurationProperties` 可以与任何 `@Configuration` 注解下联合使命。

```java
@Configuration(proxyBeanMethods = false)
@EnableConfigurationProperties(SomeProperties.class)
public class MyConfiguration {

}
@ConfigurationProperties("some.properties")
public class SomeProperties {

}
```

还可以使用 `@ConfigurationPropertiesScan` 进行扫描注册

#### 配置第三方包里的配置类

```java
@Configuration(proxyBeanMethods = false)
public class ThirdPartyConfiguration {
    @Bean
    @ConfigurationProperties(prefix = "another")
    public AnotherComponent anotherComponent() {
        return new AnotherComponent();
    }
}
```

#### 绑定到Map类型

```properties
my.map.[/key1]=value1
my.map.[/key2]=value2
my.map./key3=value3

```

```yaml
my:
  map:
    "[/key1]": "value1"
    "[/key2]": "value2"
    "/key3": "value3"
```

The properties above will bind to a `Map` with `/key1`, `/key2` and `key3` as the keys in the map. The slash has been removed from `key3` because it was not surrounded by square brackets.

> For YAML files, the brackets need to be surrounded by quotes for the keys to be parsed properly.

#### 绑定系统环境变量

For example, the configuration property `spring.main.log-startup-info` would be an environment variable named `SPRING_MAIN_LOGSTARTUPINFO`.

For example, the configuration property `my.service[0].other` would use an environment variable named `MY_SERVICE_0_OTHER`.

#### 检验

```java
@ConfigurationProperties("my.service")
@Validated
public class MyProperties {

    @NotNull
    private InetAddress remoteAddress;

    @Valid
    private final Security security = new Security();

    // getters/setters...

    public static class Security {

        @NotEmpty
        private String username;

        // getters/setters...

    }

}
```

> To ensure that validation is always triggered for nested properties, even when no properties are found, the associated field must be annotated with `@Valid`. 

### 日志

如果不想要默认的日志输出不打印应用名，可以通过 `logging.include-application-name` 来进行关闭

#### 打开调试模式

```shell
java -jar myapp.jar --debug
```

打开了调试模式并不意味着会打印应用中 DEBUGE 级别的日志。需要额外设置 `logging.level`

还可以通过 ` --trace` 来进行跟踪

#### 日志分组

进行分组：

```properties
## 分组
logging.group.tomcat=org.apache.catalina,org.apache.coyote,org.apache.tomcat
## 应用分组
logging.level.tomcat=trace

```

springboot中内置的分组

| Name | Loggers                                                      |
| :--- | :----------------------------------------------------------- |
| web  | `org.springframework.core.codec`, `org.springframework.http`, `org.springframework.web`, `org.springframework.boot.actuate.endpoint.web`, `org.springframework.boot.web.servlet.ServletContextInitializerBeans` |
| sql  | `org.springframework.jdbc.core`, `org.hibernate.SQL`, `org.jooq.tools.LoggerListener` |

 #### 自定义配置

可以用`org.springframework.boot.logging.LoggingSystem` 系统变量来设置用的日志系统。

> Since logging is initialized **before** the `ApplicationContext` is created, it is not possible to control logging from `@PropertySources` in Spring `@Configuration` files. The only way to change the logging system or disable it entirely is through System properties.

用 logback 时，using logback-spring.xml rather than logback.xml

### 测试

By default, `@SpringBootTest` does not start the server but instead sets up a mock environment for testing web endpoints.

在 `@SpringBootTest` 中不设置 `webEnvironment` 的值时，默认为 `MOCK` ，这时并不会自动启动内置的web 服务器。

#### 配置测试专用的配置

测试类默认会在搜索`@SpringBootApplication` 当作主配置类。

如果测试需要声明独用的配置，可以使用内部类【非top level的配置类】，用 `@TestConfiguration` 来进行配置

```java
// 为当前测试方法所在主类的内部类    
@TestConfiguration
static class InnerTestStudentConfig {
    @Bean
    public Student student() {
        Student student = new Student();
        student.setName("测试专用");
        return student;
    }
}
```

> 这时候需要注意的是业务代码中不能有相同的Student Bean的配置。除非allow-bean-definition-overriding: true

用内部类时，不需要通过`@Import(OuterTestStudentConfig.class)`引入，而做为top-level的配置类时，就需要通过`Import`进行引入。内部类的优先级最高。

#### 使用main方法内的逻辑

`@SpringBootTest(useMainMethod = UseMainMethod.ALWAYS)` 这样设置的话，也会调用`@SpringBootApplication`标记的main方法内的逻辑

#### 使用启动参数

```java
@SpringBootTest(args = "--app.test=one")
class MyApplicationArgumentTests {

    @Test
    void applicationArgumentsPopulated(@Autowired ApplicationArguments args) {
        assertThat(args.getOptionNames()).containsOnly("app.test");
        assertThat(args.getOptionValues("app.test")).containsOnly("one");
    }

}
```

#### 测试在一个真实启动的服务器上

`@SpringBootTest(webEnvironment=WebEnvironment.RANDOM_PORT)`

```java
@SpringBootTest(webEnvironment = WebEnvironment.RANDOM_PORT)
class MyRandomPortTestRestTemplateTests {

    @Test
    void exampleTest(@Autowired TestRestTemplate restTemplate) {
        String body = restTemplate.getForObject("/", String.class);
        assertThat(body).isEqualTo("Hello World");
    }

}
```

#### 测试MockMVC

```JAVA
@SpringBootTest
@AutoConfigureMockMvc
class MyMockMvcTests {

    @Test
    void testWithMockMvc(@Autowired MockMvc mvc) throws Exception {
        mvc.perform(MockMvcRequestBuilders.get("/test2"))
                .andExpect(status().isOk())
                .andExpect(content().string("hello world2"));
    }
}
```

这种情况不会真正启动一个web environment 。但会构建一个完整的`applicationContext`.

#### 测试WebMVC

`@MockBean`不会在`springContext`中初始化相应的`Bean`

```JAVA
@WebMvcTest(UserVehicleController.class)
class MyControllerTests {

    @Autowired
    private MockMvc mvc;

    @MockBean
    private UserVehicleService userVehicleService;

    @Test
    void testExample() throws Exception {
        given(this.userVehicleService.getVehicleDetails("sboot"))
            .willReturn(new VehicleDetails("Honda", "Civic"));
        this.mvc.perform(get("/sboot/vehicle").accept(MediaType.TEXT_PLAIN))
            .andExpect(status().isOk())
            .andExpect(content().string("Honda Civic"));
    }

}
```

### 自定义自动配置

#### 自动配置类

`@AutoConfiguration` 用来标注需要自己配置的类。用于自动配置的类最好放在一个指定的特定的包类。被`@AutoConfiguration`配置了的类不会成为springboot 自动扫描的对象，它们只能通过在这个文件`META-INF/spring/org.springframework.boot.autoconfigure.AutoConfiguration.imports`内申明，每一行一个类，例如：

```java
com.mycorp.libx.autoconfigure.LibXAutoConfiguration
com.mycorp.libx.autoconfigure.LibXWebAutoConfiguration
```

> springboot中的默认自动配置类`META-INF/spring/org.springframework.boot.autoconfigure.AutoConfiguration.imports`

如果需要对加载顺序有要求，可以通过`before`, `beforeName`, `after` and `afterName` 属性来配置； 或者 `@AutoConfigureBefore` and `@AutoConfigureAfter` 注解

#### 依条件注入

##### Class Conditions

`@ConditionalOnClass`

##### Bean Conditions

`@ConditionalOnMissingBean`

`@ConditionalOnBean`

> `@ConditionalOnBean` and `@ConditionalOnMissingBean` do not prevent `@Configuration` classes from being created.

##### Property Conditions

`@ConditionalOnProperty`

##### Resource Conditions

`@ConditionalOnResource` 

Resources can be specified by using the usual Spring conventions, as shown in the following example: `file:/home/user/test.dat`.

##### Web Application Conditions

`@ConditionalOnWebApplication`

`@ConditionalOnNotWebApplication`

##### SpEL Expression Conditions

`@ConditionalOnExpression` 

> The `@ConditionalOnExpression` annotation lets configuration be included based on the result of a [SpEL expression](https://docs.spring.io/spring-framework/reference/6.1/core/expressions.html).

#### 创建自己的Starter

Concretely, a custom starter can contain the following:

- The `autoconfigure` module that contains the auto-configuration code for "acme".
- The `starter` module that provides a dependency to the `autoconfigure` module as well as "acme" and any additional dependencies that are typically useful. In a nutshell, adding the starter should provide everything needed to start using that library.

不一定要把这两个模块分开来。如果自定义的这个starter包没有可选的特性，可以定义在一起

##### 命名

命名不要以 `spring-boot` 开头

假如创建的是"acme" starter 

命名auto-configure 模块为 `acme-spring-boot` 

命名 starter 模块为 `acme-spring-boot-starter`

如果是两个模块合并成一个那么就直接命名为 `acme-spring-boot-starter`

##### 配置keys

If your starter provides configuration keys, use a unique namespace for them. In particular, do not include your keys in the namespaces that Spring Boot uses (such as `server`, `management`, `spring`, and so on). 

Make sure that configuration keys are documented by adding field javadoc for each property, as shown in the following example:

```java
@ConfigurationProperties("acme")
public class AcmeProperties {

    /**
     * Whether to check the location of acme resources.
     */
    private boolean checkLocation = true;

    /**
     * Timeout for establishing a connection to the acme server.
     */
    private Duration loginTimeout = Duration.ofSeconds(3);

    // getters/setters ...

}
```

Here are some rules we follow internally to make sure descriptions are consistent:

- Do not start the description by "The" or "A".
- For `boolean` types, start the description with "Whether" or "Enable".
- For collection-based types, start the description with "Comma-separated list"
- Use `java.time.Duration` rather than `long` and describe the default unit if it differs from milliseconds, such as "If a duration suffix is not specified, seconds will be used".
- Do not provide the default value in the description unless it has to be determined at runtime.

##### The “autoconfigure” Module

The `autoconfigure` module contains everything that is necessary to get started with the library. It may also contain configuration key definitions (such as `@ConfigurationProperties`) and any callback interface that can be used to further customize how the components are initialized.

When building with Maven, it is recommended to add the following dependency in a module that contains auto-configurations:

```xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-autoconfigure-processor</artifactId>
    <optional>true</optional>
</dependency>
```

##### Starter Module

The starter is really an **empty** jar. Its only purpose is to provide the necessary dependencies to work with the library. You can think of it as an opinionated view of what is required to get started.

### Actuator 模块

#### 加入jar包

```xml
<dependencies>
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-actuator</artifactId>
    </dependency>
</dependencies>
```

#### Endpoints

The following technology-agnostic endpoints are available:

| ID                 | Description                                                  |
| :----------------- | :----------------------------------------------------------- |
| `auditevents`      | Exposes audit events information for the current application. Requires an `AuditEventRepository` bean. |
| `beans`            | Displays a complete list of all the Spring beans in your application. |
| `caches`           | Exposes available caches.                                    |
| `conditions`       | Shows the conditions that were evaluated on configuration and auto-configuration classes and the reasons why they did or did not match. |
| `configprops`      | Displays a collated list of all `@ConfigurationProperties`. Subject to [sanitization](https://docs.spring.io/spring-boot/docs/current/reference/html/actuator.html#actuator.endpoints.sanitization). |
| `env`              | Exposes properties from Spring’s `ConfigurableEnvironment`. Subject to [sanitization](https://docs.spring.io/spring-boot/docs/current/reference/html/actuator.html#actuator.endpoints.sanitization). |
| `flyway`           | Shows any Flyway database migrations that have been applied. Requires one or more `Flyway` beans. |
| `health`           | Shows application health information.                        |
| `httpexchanges`    | Displays HTTP exchange information (by default, the last 100 HTTP request-response exchanges). Requires an `HttpExchangeRepository` bean. |
| `info`             | Displays arbitrary application info.                         |
| `integrationgraph` | Shows the Spring Integration graph. Requires a dependency on `spring-integration-core`. |
| `loggers`          | Shows and modifies the configuration of loggers in the application. |
| `liquibase`        | Shows any Liquibase database migrations that have been applied. Requires one or more `Liquibase` beans. |
| `metrics`          | Shows “metrics” information for the current application.     |
| `mappings`         | Displays a collated list of all `@RequestMapping` paths.     |
| `quartz`           | Shows information about Quartz Scheduler jobs. Subject to [sanitization](https://docs.spring.io/spring-boot/docs/current/reference/html/actuator.html#actuator.endpoints.sanitization). |
| `scheduledtasks`   | Displays the scheduled tasks in your application.            |
| `sessions`         | Allows retrieval and deletion of user sessions from a Spring Session-backed session store. Requires a servlet-based web application that uses Spring Session. |
| `shutdown`         | Lets the application be gracefully shutdown. Only works when using jar packaging. Disabled by default. |
| `startup`          | Shows the [startup steps data](https://docs.spring.io/spring-boot/docs/current/reference/html/features.html#features.spring-application.startup-tracking) collected by the `ApplicationStartup`. Requires the `SpringApplication` to be configured with a `BufferingApplicationStartup`. |
| `threaddump`       | Performs a thread dump.                                      |

If your application is a web application (Spring MVC, Spring WebFlux, or Jersey), you can use the following additional endpoints:

| ID           | Description                                                  |
| :----------- | :----------------------------------------------------------- |
| `heapdump`   | Returns a heap dump file. On a HotSpot JVM, an `HPROF`-format file is returned. On an OpenJ9 JVM, a `PHD`-format file is returned. |
| `logfile`    | Returns the contents of the logfile (if the `logging.file.name` or the `logging.file.path` property has been set). Supports the use of the HTTP `Range` header to retrieve part of the log file’s content. |
| `prometheus` | Exposes metrics in a format that can be scraped by a Prometheus server. Requires a dependency on `micrometer-registry-prometheus`. |

默认除了`shutdown` 端点，其它的端点都启用【enabled】了，但是没有开放、暴露【expose】出来；

```properties
## 默认不开启
management.endpoints.enabled-by-default=false
### 开启某个端点
management.endpoint.info.enabled=true
```

默认只 expose 了 `/actuator/health` 端点。可以通过配置去开放其它的端点

```yaml
management:
  endpoints:
    web:
      exposure:
        include: "*"

```

##### 单独配置某个endpoint

The `management.endpoint.<name>` prefix uniquely identifies the endpoint that is being configured. 例如：

```properties
management.endpoint.beans.cache.time-to-live=10s
```

##### 端点信息脱敏

Information returned by the `/env`, `/configprops` and `/quartz` endpoints can be sensitive, so by default values are always fully sanitized (replaced by `******`).

The `show-values` property can be configured for sanitizable endpoints to one of the following values:

- `NEVER` - values are always fully sanitized (replaced by `******`)
- `ALWAYS` - values are shown to all users (as long as no `SanitizingFunction` bean applies)
- `WHEN_AUTHORIZED` - values are shown only to authorized users (as long as no `SanitizingFunction` bean applies)

```properties
management.endpoint.env.show-values=WHEN_AUTHORIZED
management.endpoint.env.roles=admin
```

##### Health Information

使用这两个配置`management.endpoint.health.show-details` and `management.endpoint.health.show-components` 来控制`/health`端点的信息

###### Auto-configured HealthIndicators

You can also enable or disable selected indicators by configuring `management.health.key.enabled`, with the `key` listed in the following table:

| Key             | Name                                                         | Description                                               |
| :-------------- | :----------------------------------------------------------- | :-------------------------------------------------------- |
| `cassandra`     | [`CassandraDriverHealthIndicator`](https://github.com/spring-projects/spring-boot/tree/v3.2.3/spring-boot-project/spring-boot-actuator/src/main/java/org/springframework/boot/actuate/cassandra/CassandraDriverHealthIndicator.java) | Checks that a Cassandra database is up.                   |
| `couchbase`     | [`CouchbaseHealthIndicator`](https://github.com/spring-projects/spring-boot/tree/v3.2.3/spring-boot-project/spring-boot-actuator/src/main/java/org/springframework/boot/actuate/couchbase/CouchbaseHealthIndicator.java) | Checks that a Couchbase cluster is up.                    |
| `db`            | [`DataSourceHealthIndicator`](https://github.com/spring-projects/spring-boot/tree/v3.2.3/spring-boot-project/spring-boot-actuator/src/main/java/org/springframework/boot/actuate/jdbc/DataSourceHealthIndicator.java) | Checks that a connection to `DataSource` can be obtained. |
| `diskspace`     | [`DiskSpaceHealthIndicator`](https://github.com/spring-projects/spring-boot/tree/v3.2.3/spring-boot-project/spring-boot-actuator/src/main/java/org/springframework/boot/actuate/system/DiskSpaceHealthIndicator.java) | Checks for low disk space.                                |
| `elasticsearch` | [`ElasticsearchRestClientHealthIndicator`](https://github.com/spring-projects/spring-boot/tree/v3.2.3/spring-boot-project/spring-boot-actuator/src/main/java/org/springframework/boot/actuate/elasticsearch/ElasticsearchRestClientHealthIndicator.java) | Checks that an Elasticsearch cluster is up.               |
| `hazelcast`     | [`HazelcastHealthIndicator`](https://github.com/spring-projects/spring-boot/tree/v3.2.3/spring-boot-project/spring-boot-actuator/src/main/java/org/springframework/boot/actuate/hazelcast/HazelcastHealthIndicator.java) | Checks that a Hazelcast server is up.                     |
| `influxdb`      | [`InfluxDbHealthIndicator`](https://github.com/spring-projects/spring-boot/tree/v3.2.3/spring-boot-project/spring-boot-actuator/src/main/java/org/springframework/boot/actuate/influx/InfluxDbHealthIndicator.java) | Checks that an InfluxDB server is up.                     |
| `jms`           | [`JmsHealthIndicator`](https://github.com/spring-projects/spring-boot/tree/v3.2.3/spring-boot-project/spring-boot-actuator/src/main/java/org/springframework/boot/actuate/jms/JmsHealthIndicator.java) | Checks that a JMS broker is up.                           |
| `ldap`          | [`LdapHealthIndicator`](https://github.com/spring-projects/spring-boot/tree/v3.2.3/spring-boot-project/spring-boot-actuator/src/main/java/org/springframework/boot/actuate/ldap/LdapHealthIndicator.java) | Checks that an LDAP server is up.                         |
| `mail`          | [`MailHealthIndicator`](https://github.com/spring-projects/spring-boot/tree/v3.2.3/spring-boot-project/spring-boot-actuator/src/main/java/org/springframework/boot/actuate/mail/MailHealthIndicator.java) | Checks that a mail server is up.                          |
| `mongo`         | [`MongoHealthIndicator`](https://github.com/spring-projects/spring-boot/tree/v3.2.3/spring-boot-project/spring-boot-actuator/src/main/java/org/springframework/boot/actuate/data/mongo/MongoHealthIndicator.java) | Checks that a Mongo database is up.                       |
| `neo4j`         | [`Neo4jHealthIndicator`](https://github.com/spring-projects/spring-boot/tree/v3.2.3/spring-boot-project/spring-boot-actuator/src/main/java/org/springframework/boot/actuate/neo4j/Neo4jHealthIndicator.java) | Checks that a Neo4j database is up.                       |
| `ping`          | [`PingHealthIndicator`](https://github.com/spring-projects/spring-boot/tree/v3.2.3/spring-boot-project/spring-boot-actuator/src/main/java/org/springframework/boot/actuate/health/PingHealthIndicator.java) | Always responds with `UP`.                                |
| `rabbit`        | [`RabbitHealthIndicator`](https://github.com/spring-projects/spring-boot/tree/v3.2.3/spring-boot-project/spring-boot-actuator/src/main/java/org/springframework/boot/actuate/amqp/RabbitHealthIndicator.java) | Checks that a Rabbit server is up.                        |
| `redis`         | [`RedisHealthIndicator`](https://github.com/spring-projects/spring-boot/tree/v3.2.3/spring-boot-project/spring-boot-actuator/src/main/java/org/springframework/boot/actuate/data/redis/RedisHealthIndicator.java) | Checks that a Redis server is up.                         |

|      | You can disable them all by setting the `management.health.defaults.enabled` property. |
| ---- | ------------------------------------------------------------ |
|      |                                                              |

Additional `HealthIndicators` are available but are not enabled by default:

| Key              | Name                                                         | Description                                             |
| :--------------- | :----------------------------------------------------------- | :------------------------------------------------------ |
| `livenessstate`  | [`LivenessStateHealthIndicator`](https://github.com/spring-projects/spring-boot/tree/v3.2.3/spring-boot-project/spring-boot-actuator/src/main/java/org/springframework/boot/actuate/availability/LivenessStateHealthIndicator.java) | Exposes the “Liveness” application availability state.  |
| `readinessstate` | [`ReadinessStateHealthIndicator`](https://github.com/spring-projects/spring-boot/tree/v3.2.3/spring-boot-project/spring-boot-actuator/src/main/java/org/springframework/boot/actuate/availability/ReadinessStateHealthIndicator.java) | Exposes the “Readiness” application availability state. |

###### 自定义HealthIndicators

```java
import org.springframework.boot.actuate.health.Health;
import org.springframework.boot.actuate.health.HealthIndicator;
import org.springframework.stereotype.Component;

@Component
public class MyHealthIndicator implements HealthIndicator {

    @Override
    public Health health() {
        int errorCode = check();
        if (errorCode != 0) {
            return Health.down().withDetail("Error Code", errorCode).build();
        }
        return Health.up().build();
    }

    private int check() {
        // perform some specific health check
        return ...
    }

}

```

> The identifier for a given `HealthIndicator` is the name of the bean without the `HealthIndicator` prefix, if it exists. In the preceding example, the health information is available in an entry named `my`.

###### 不同的服务状态与http code的映射

配置：

```properties
management.endpoint.health.status.http-mapping.down=503
management.endpoint.health.status.http-mapping.fatal=503
management.endpoint.health.status.http-mapping.out-of-service=503
```

If you need more control, you can define your own `HttpCodeStatusMapper` bean.

The following table shows the default status mappings for the built-in statuses:

| Status           | Mapping                                        |
| :--------------- | :--------------------------------------------- |
| `DOWN`           | `SERVICE_UNAVAILABLE` (`503`)                  |
| `OUT_OF_SERVICE` | `SERVICE_UNAVAILABLE` (`503`)                  |
| `UP`             | No mapping by default, so HTTP status is `200` |
| `UNKNOWN`        | No mapping by default, so HTTP status is `200` |

##### Application Information

配置`/info` 端点

When appropriate, Spring auto-configures the following `InfoContributor` beans:

| ID      | Name                                                         | Description                                                  | Prerequisites                                |
| :------ | :----------------------------------------------------------- | :----------------------------------------------------------- | :------------------------------------------- |
| `build` | [`BuildInfoContributor`](https://github.com/spring-projects/spring-boot/tree/v3.2.3/spring-boot-project/spring-boot-actuator/src/main/java/org/springframework/boot/actuate/info/BuildInfoContributor.java) | Exposes build information.                                   | A `META-INF/build-info.properties` resource. |
| `env`   | [`EnvironmentInfoContributor`](https://github.com/spring-projects/spring-boot/tree/v3.2.3/spring-boot-project/spring-boot-actuator/src/main/java/org/springframework/boot/actuate/info/EnvironmentInfoContributor.java) | Exposes any property from the `Environment` whose name starts with `info.`. | None.                                        |
| `git`   | [`GitInfoContributor`](https://github.com/spring-projects/spring-boot/tree/v3.2.3/spring-boot-project/spring-boot-actuator/src/main/java/org/springframework/boot/actuate/info/GitInfoContributor.java) | Exposes git information.                                     | A `git.properties` resource.                 |
| `java`  | [`JavaInfoContributor`](https://github.com/spring-projects/spring-boot/tree/v3.2.3/spring-boot-project/spring-boot-actuator/src/main/java/org/springframework/boot/actuate/info/JavaInfoContributor.java) | Exposes Java runtime information.                            | None.                                        |
| `os`    | [`OsInfoContributor`](https://github.com/spring-projects/spring-boot/tree/v3.2.3/spring-boot-project/spring-boot-actuator/src/main/java/org/springframework/boot/actuate/info/OsInfoContributor.java) | Exposes Operating System information.                        | None.                                        |

 Each can be enabled by setting its `management.info.<id>.enabled` property to `true`

#### Monitoring and Management Over HTTP

##### Customizing the Management Endpoint Paths

purpose. You can use the `management.endpoints.web.base-path` property to change the prefix for your management endpoint, as the following example shows:

```properties
management.endpoints.web.base-path=/manage
```

If you want to map endpoints to a different path, you can use the `management.endpoints.web.path-mapping` property.

The following example remaps `/actuator/health` to `/healthcheck`:

```properties
management.endpoints.web.base-path=/
management.endpoints.web.path-mapping.health=healthcheck
```

##### Customizing the Management Server Port

management 的端口号默认是与`management.server.port=8081` 配置的是一个端口，但是也可以单独配置

```properties
management.server.port=8081
```

##### Configuring Management-specific SSL

When configured to use a custom port, you can also configure the management server with its own SSL by using the various `management.server.ssl.*` properties.

##### Customizing the Management Server Address

```properties
management.server.port=8081
management.server.address=127.0.0.1
```

> 当只有端口与应用的端口不同时才可以设置不同的address

##### Disabling HTTP Endpoints

```properties
### 其中一个方法都可以
management.server.port=-1
management.endpoints.web.exposure.exclude=*
```



#### Observability

todo 实验Observability

#### Loggers

todo 动态设置日志级别与还原日志

`http://localhost:8080/actuator/loggers/com.example.myapp.service`

### Installation as a systemd Service

`systemd` is the successor of the System V init system and is now being used by many modern Linux distributions. Spring Boot applications can be launched by using `systemd` ‘service’ scripts.

Assuming that you have a Spring Boot application packaged as an uber jar in `/var/myapp`, to install it as a `systemd` service, create a script named `myapp.service` and place it in `/etc/systemd/system` directory. The following script offers an example:

```
[Unit]
Description=myapp
After=syslog.target network.target

[Service]
User=myapp
Group=myapp

Environment="JAVA_HOME=/path/to/java/home"

ExecStart=${JAVA_HOME}/bin/java -jar /var/myapp/myapp.jar
ExecStop=/bin/kill -15 $MAINPID
SuccessExitStatus=143

[Install]
WantedBy=multi-user.target
```

> the Description, User, Group, Environment and ExecStart fields for your application. 

The user that runs the application, the PID file, and the console log file are managed by `systemd` itself and therefore must be configured by using appropriate fields in the ‘service’ script. Consult the [service unit configuration man page](https://www.freedesktop.org/software/systemd/man/systemd.service.html) for more details.

To flag the application to start automatically on system boot, use the following command:

```shell
$ systemctl enable myapp.service
```

### Task Execution and Scheduling

配置线程池：

```properties
spring.task.execution.pool.max-size=16
spring.task.execution.pool.queue-capacity=100
spring.task.execution.pool.keep-alive=10s
```
对于常见的8核16G服务器：
```properties
# 计算密集型任务
spring.task.execution.pool.core-size=8      # CPU核心数
spring.task.execution.pool.max-size=16      # CPU核心数 * 2
spring.task.execution.pool.queue-capacity=200
spring.task.execution.pool.keep-alive=60s

# IO密集型任务
spring.task.execution.pool.core-size=16     # CPU核心数 * 2
spring.task.execution.pool.max-size=32      # CPU核心数 * 4
spring.task.execution.pool.queue-capacity=500
spring.task.execution.pool.keep-alive=60s
```

用java 21+后，开启虚拟线程就可以不需要配置这些

```properties
spring.threads.virtual.enabled=true
```





### todo 

https://docs.spring.io/spring-boot/reference/features/developing-auto-configuration.html