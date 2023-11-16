![header](./images/header.png)

> QQ 群: [153535519](https://jq.qq.com/?_wv=1027&k=MSNyMu0O)

## 🖼️ 预览

| 桌面端-主页                                                                                    |
| ---------------------------------------------------------------------------------------------- |
| <details><summary>展开</summary>![PC-主页](images/preview/PC-%E4%B8%BB%E9%A1%B5.png)</details> |

| 桌面端-发帖                                                                                    |
| ---------------------------------------------------------------------------------------------- |
| <details><summary>展开</summary>![PC-发帖](images/preview/PC-%E5%8F%91%E5%B8%96.png)</details> |

| 桌面端-评论                                                                                    |
| ---------------------------------------------------------------------------------------------- |
| <details><summary>展开</summary>![PC-评论](images/preview/PC-%E8%AF%84%E8%AE%BA.png)</details> |

| 移动端-主页                                                                                            |
| ------------------------------------------------------------------------------------------------------ |
| <details><summary>展开</summary>![mobile-主页](images/preview/mobile-%E4%B8%BB%E9%A1%B5.png)</details> |

| 移动端-评论                                                                                            |
| ------------------------------------------------------------------------------------------------------ |
| <details><summary>展开</summary>![mobile-评论](images/preview/mobile-%E8%AF%84%E8%AE%BA.png)</details> |

| 桌面端-后台                                                                                    |
| ---------------------------------------------------------------------------------------------- |
| <details><summary>展开</summary>![PC-后台](images/preview/PC-%E5%90%8E%E5%8F%B0.png)</details> |

## 🛠️ 准备工作

### Node.js `>=18`

推荐使用 [fnm](https://github.com/Schniz/fnm#shell-setup) 安装

### PNPM

如果你安装了正确版本的 Node.js

```sh
corepack enable pnpm
```

## ⬇️ 下载 Release 文件

1. 在 [Release 页面](https://github.com/jsun969/uwall/releases) 下载最新版本的 `.tar.gz` 文件
2. 上传至服务器
3. 解压

```sh
tar -xzf 文件名.tar.gz
```

## 🔑 初始化

1. 进入解压后的目录
2. 安装依赖

```sh
pnpm i
```

3. 初始化数据库

> [!IMPORTANT]  
> 数据库使用 SQLite，初始化后位于 `prisma/db.sqlite`

```sh
pnpm run db:push
pnpm run db:seed
```

4. 设置管理员账户

> [!IMPORTANT]  
> 管理员数据加密存储于 `.env`

```sh
pnpm run set-admin
```

按照提示输入即可

## 🚀 启动项目

> [!TIP]  
> 以下示例端口默认使用 `1314`，可修改

```sh
pnpn run build
pnpm run start -p 1314
```

## 🌐 绑定域名

> [!NOTE]  
> 按需修改即可

### Nginx

```nginx
server {
    listen 80;
    server_name your_domain.com; # 你的域名
    return 301 https://$host$request_uri;
}

server {
    listen 443 ssl;
    server_name your_domain.com; # 你的域名

    ssl_certificate /path/to/your/certificate.crt;
    ssl_certificate_key /path/to/your/private-key.key;

    location / {
        proxy_pass http://127.0.0.1:1314;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

### Caddy

```caddy
your_domain.com { # 你的域名
    reverse_proxy 127.0.0.1:1314
}
```

## 🛡️ 管理员后台

`https://<你的域名>/admin` 即可登录管理员后台
