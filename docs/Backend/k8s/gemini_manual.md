## 默认配置文件

在`~/.gemini`目录下

## 新增GEMINI.md文件

可以在项目的根目录或者`~/.gemini/GEMINI.md` 增加总体性的文档

## 运行local shell command

输入`!` 符号就可以运行本地命令了。`esc`键退出

## 调用Save Memory工具

例如输入：`remember tnat Itike to use ConventionaT Commit syntax` 它就会把这个信息保存到GEMINI.md文件内。

## 指定文件

用`@`指定文件或文件夹

## 使用`--sandbox`

默认模式下，gemini只会对当前项目下的文件有读写权限。

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



