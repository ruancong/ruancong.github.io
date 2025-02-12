---
title: MinIO
description: MinIO学习 
keywords: MinIO, MinIO学习 
---

## 单节点-单驱动安装 MinIO

SNSD(Single-Node Single-Drive) 只适用于本地和测试环境，不适用于生产环境。因为它是zero-parity的，没有数据冗余。

### Pre-Existing Data

MinIO 是否可以启动成功，取决于是否存在 pre-existing data。

The following table lists the possible storage volume states and MinIO behavior:

| Storage Volume State                                         | Behavior                                                     |
| :----------------------------------------------------------- | :----------------------------------------------------------- |
| Empty with **no** files, folders, or MinIO backend data      | MinIO starts in SNSD mode and creates the zero-parity backend |
| Existing SNSD zero-parity objects and MinIO backend data     | MinIO resumes in SNSD mode                                   |
| Existing filesystem folders, files, but **no** MinIO backend data | MinIO returns an error and does not start                    |
| Existing filesystem folders, files, and legacy “FS-mode” backend data | MinIO returns an error and does not start*Changed in version RELEASE.2022-10-29T06-21-33Z.* |

### Storage Requirements

* Use Local Storage

* Use XFS-Formatting for Drives

    MinIO strongly recommends provisioning XFS formatted drives for storage. 

* Persist Drive Mounting and Mapping Across Reboots

    Use `/etc/fstab` to ensure consistent drive-to-mount mapping across node reboots.

:::danger

**Exclusive access to drives**

MinIO requires exclusive access to the drives or volumes provided for object storage. No other processes, software, scripts, or persons should perform any actions directly on the drives or volumes provided to MinIO or the objects or files MinIO places on them.

:::

### Memory Requirements

*Changed in version RELEASE.2024-01-28T22-35-53Z:* MinIO pre-allocates 2GiB of system memory at startup.

MinIO recommends a *minimum* of 32GiB of memory per host. See [Memory](https://min.io/docs/minio/linux/operations/checklists/hardware.html#minio-hardware-checklist-memory) for more guidance on memory allocation in MinIO.

### Deploy MinIO

#### 1. 下载 MinIO (Debian/Ubuntu)

```bash
wget https://dl.min.io/server/minio/release/linux-amd64/archive/minio_20250207232109.0.0_amd64.deb -O minio.deb
sudo dpkg -i minio.deb
```

> The RPM and DEB packages automatically install MinIO to the necessary system paths and create a minio service for systemctl. 


#### 2. Create the Environment Variable File

Create an environment variable file at `/etc/default/minio`. The MinIO Server container can use this file as the source of all [environment variables](https://min.io/docs/minio/linux/reference/minio-server/settings.html#minio-server-environment-variables).

The following example provides a starting environment file:

```bash
# MINIO_ROOT_USER and MINIO_ROOT_PASSWORD sets the root account for the MinIO server.
# This user has unrestricted permissions to perform S3 and administrative API operations on any resource in the deployment.
# Omit to use the default values 'minioadmin:minioadmin'.
# MinIO recommends setting non-default values as a best practice, regardless of environment

MINIO_ROOT_USER=myminioadmin
MINIO_ROOT_PASSWORD=minio-secret-key-change-me

# MINIO_VOLUMES sets the storage volume or path to use for the MinIO server.

MINIO_VOLUMES="/mnt/data"

# MINIO_OPTS sets any additional commandline options to pass to the MinIO server.
# For example, `--console-address :9001` sets the MinIO Console listen port
MINIO_OPTS="--console-address :9001"
```

#### 3. Start the MinIO Service

```bash
sudo systemctl start minio.service
```

Use the following commands to confirm the service is online and functional:

```bash
sudo systemctl status minio.service
journalctl -f -u minio.service
```

设置自启动

```bash
sudo systemctl enable minio.service
```

The `journalctl` output should resemble the following:

```bash
Status:         1 Online, 0 Offline.
API: http://192.168.2.100:9000  http://127.0.0.1:9000
RootUser: myminioadmin
RootPass: minio-secret-key-change-me
Console: http://192.168.2.100:9001 http://127.0.0.1:9001
RootUser: myminioadmin
RootPass: minio-secret-key-change-me

Command-line: https://min.io/docs/minio/linux/reference/minio-mc.html
   $ mc alias set myminio http://10.0.2.100:9000 myminioadmin minio-secret-key-change-me

Documentation: https://min.io/docs/minio/linux/index.html
```




