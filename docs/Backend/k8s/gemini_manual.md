## 默认配置文件

在`~/.gemini`目录下。运行`gemini`时用的`-- options`，都可以在`setttings.json`里面对应地设置

## 新增`GEMINI.md`文件

可以在项目的根目录或者`~/.gemini/GEMINI.md` 增加总体性的文档

## 运行local shell command

输入`!` 符号就可以运行本地命令了。`esc`键退出

## 调用Save Memory工具

例如输入：`remember tnat Itike to use ConventionaT Commit syntax` 它就会把这个信息保存到GEMINI.md文件内。

## 指定文件

用`@`指定文件或文件夹

## 使用`--sandbox`

默认模式下，`gemini`只会对当前项目下的文件有读写权限。

通过启用沙盒模式，这样会理安全

```shell
gemini --sandbox
```

还可以在`~/.gemini/settings.json`配置文件里配置默认开启sandbox 

```json
{
...
"sandbox":true
...
}
```

还可以在这个配置文件里配置沙盒模式使用`docker`，在使用`docker`的模式下，可能会导致连接的`mcp`用不了，因为默认的`docker `镜像内没有相应的环境（如node环境）

## 使用checkpointing

gemini可能会对文件进行修改，checkpointing 是为了方便回到gemini操作文件之前的状态

```shell
gemini --checkpointing
```

用restore进行恢复 `/restore [checkpoint_file]`

## 对chat的保存与恢复

```shell
### 保存对话
/chat save [chat_name]
## 恢复
/chat resume [chat_name]
```

