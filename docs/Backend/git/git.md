```bash
##设置本地独享式忽略文件
git config --global core.excludesFile ~/.gitignore 

##工作区与暂存区比较
git diff
##工作区与版本库比较
git diff HEAD 
##暂存区与版本库比较
git diff --cached|staged 
git log --pretty=oneline|full|raw
git status -s

git add -i 交互式添加
git commit --amend 更改提交的评论信息
git cat-file -t|p 

git checkout -- file 会丢失工作区，不会丢失暂存区
git reset --soft|mixed|hard     hard 会丢失工作区 
git reflog show master|head-5 


git branch 显示所有分支 * 表示当前工作分支

git stash list
git stash 保存工作区
git stash pop 恢复工作区   会删除这个保存
git stash apply 恢复工作区   不会删除

git mv file1 file2 更改名字

git tag -m '' 打标签，里程碑
git describe   将最新提交显示为一个易记的名称

git blame -L 6，+5 README  查看文件中的某些行是哪个提交加进来的

git rebase --onto newbase <since> <still>
git rebase -i C 交互式变基
git revert head反转提交
git push -f 强制push

git fsck 查看到版本库中包含的没有被任何引用关联的松散对象
git prune 清理


```

  

 git grep <关键词> ：搜索含有关键词的文件。

git blame <文件名>：查看指定文件每一行的提交人和提交时间。

git log -p <文件名>：查看指定文件的每一次提交和改动。 

### git新建分支的命名推荐

在Git中新建分支时，分支的命名应该遵循一些推荐规范，以保持代码库的整洁和易于管理。以下是一些建议的命名规范：

1. **简洁明了**: 分支名称应该简洁明了，能够清楚地表达该分支的目的。避免过长的名称和不必要的缩写。

2. **使用短横线或下划线**: 习惯上，使用短横线（-）或下划线（_）来分隔单词，使分支名称更易读。

3. **使用英文**: 保持使用英文作为分支名称，这样能够保持一致性，特别是当团队中有来自不同国家的成员时。

4. **避免特殊字符**: 避免在分支名称中使用特殊字符，如空格、问号、感叹号等，以防止在不同系统或工具中出现问题。

5. **描述性**: 分支名称应该尽可能地描述该分支的目的或所要解决的问题。例如，feature/login-page,bugfix/issue-123。

6. **使用小写字母**: 通常，分支名称应该使用小写字母，这有助于避免在跨平台或大小写敏感的系统中引发问题。

7. **预留前缀**: 可以考虑在分支名称中使用一些预留的前缀，以帮助区分不同类型的分支，如feature/,bugfix/,hotfix/等。

8. **避免与其他分支重名**: 确保分支名称不与其他分支重名，这有助于避免冲突和混淆。

综合考虑以上建议，一个良好的分支命名示例可以是：feature/add-user-authentication,bugfix/fix-login-issue,hotfix/security-patch-1.0.1等。

注意，命名规范可以根据团队和项目的需要进行适当的调整，但始终保持一致性和可读性是关键。

### 常用git命令

#### 设置全局用户信息

```shell
$ git config --global user.name "your_username" 
$ git config --global user.email "your_email_address"
```

#### 单独设置某一个仓库的用户信息

```shell
$ git config user.name "your_username"
$ git config user.email "your_email_address
```

#### 列出git已有的配置项

```shell
git config --list
```

#### 创建新的仓库

进入需要创建仓库的目录执行下面的命令：

```shell
git init
```

> 会产生一个.git的隐藏文件夹 that contains necessary repository files like index and object database files

#### 克隆远程仓库

```shell
git clone [URL]
## 可以额外地指定目标文件夹
git clone [URL] [target_dir]
#　clone 某一个分支
git clone -b <branch_name> [URL]
```

#### 增加文件到 staging 区

```shell
# add a single file for staging
git add [file_name]
# add multiple files for staging
git add [file_name1] [file_name2]
# add all files
git add -A
# only add deleted and modified files 
git add -u 
# add all created and modified files in the current directory
git add .
# add all files with specific file extention
git add *.py

```

#### Remove files from git repository

```shell
git rm -f [file_name]
# remove multiple files
git rm file1.txt file2.php file3.py file4
# delete a directory
git rm -f -r directory_name
```

#### Rename  a project file

```shell
git mv old-name.txt new-name.txt
```

#### Move a project file

```shell
git mv file3.txt beta/file3.txt
```

> ```shell
> #  can be summarized by three sub-operations
> mv file3.txt beta/file3.txt
> git add beta/file3.txt
> rm file3.txt
> ```

#### git commit

```shell
 git commit -m "commit message"
```

#### Fix a Previous Commit

```shell
git commit --amend -m "commit message"
```

#### Commit Modified Files

```shell
git commit -a -m "commit messages"
```

> `-a `: Tell the command to automatically stage files that have been <span style="color:green">**modified and deleted**</span>, but <span style="color:red">**new files** </span>you have not told Git about are not affected.

#### List Repository Branches

```shell
git branch
```

#### Create a New Branch

```shell
git branch [new-branch-name]
```

#### Delete Existing Branch

```shell
git branch -d [branch-name]
```

> 准备删除之前，需要确保已经切换到此分支之外的其它分支之上:  `git checkout main`

#### Show the State of the Repository and Staging Area

```shell
git status 
```

> The **git status** command verifies the existence of files queued for staging in the next commit. It highlights and displays all added, modified, and/or deleted files and their absolute paths.

#### 文件对比

```shell
git diff
```

> 比较的是在工作区做了更改但是没有进入缓存区的变化。但是新建的文件不会显示在其中。

```shell
git diff --staged
```

> 比较已经在缓存区但是还没有提交的区别

不同的分支比较

```shell
git diff feature...master
# 会显示 master分支在与feature的共同祖先分生分离之后，master分支发生的变化
git diff master...feature
# 会显示 master分支在与feature的共同祖先分生分离之后，feature分支发生的变化
```

```shell
git diff feature feature
# 直接显示两个分支的不同，与祖先无关
```

```shell
# 显示当前分支与feature分支的不同 【会显示工作区与缓存区的变化】
git diff feature
```

比较单一文件 

```shell
git diff [--staged] file-name 
# 比较指定版本之间的文件
git diff HEAD~1 HEAD file-name
```

#### 提交日志

```shell
# 会显示所有的log
git log
# 显示只在branch_11上但不在branch_22上的日志。【 double dot syntax (..)】
git log branch_22..branch_11
#　根据提交者进行过滤
git log --author=author_name
```

#### 新建分支并且checkout

```shell
git checkout -b new-branch 
```

#### 恢复文件到某一个版本

```shell
git checkout HEAD -- file3.txt
```

#### checkout某一个分支的文件夹

```shell
git checkout branch_a -- dir
```

####　合并分支

You first need to checkout to your stable or active branch (if not already) like the master branch and then merge the development branch.

```shell
git checkout [active-master]
git merge [development-branch-name] 
# 加合并策略  strategy,  这在某下场景下合适，不会发生冲突。但是加了这个参数之后，feature的某些提交可能会被丢弃而不被合并进去
git merge -s ours feature
# 合并后不进行自动提交[方便处理冲突]， 然后再手动提交
git merge --no-commit feature 
```

##### 最近的一个 Merge Commit 并展示两段式差异

```shell
git show -m --stat $(git log --merges -n 1 --format="%H")
## 当前提交是一个merge
git show -m --stat HEAD
```

##### 看清父节点是谁

```shell
git log -1 --pretty=fuller --parents

```

> commit <当前MergeHash> <父节点1Hash> <父节点2Hash>
>
> * 第一个 hash 是当前提交。
> * 第二个 hash 是 **HEAD^1** (你原本的分支)。
> * 第三个 hash 是 **HEAD^2** (你 merge 进来的分支)。



##### 合并后看给各分支带来的不同

```shell
# 查看合并后，相对于“原来的我”变了什么
git diff HEAD^1 HEAD --stat
```

```shell
# 查看合并后，相对于“对方分支”多（或变）了什么
git diff HEAD^2 HEAD --stat
```



#### 拉远程分支代码

```shell
# 只下载origin分支的代码，并不合并
git fetch origin
# 下载和合并一起
git pull origin
```

#### 推送某一个分支

```shell
git push origin branch-name
```

