# Aliyun OSS CLI

阿里云 OSS 文件上传 CLI。

## Install

You can get @whatskit/ossdeployer-cli via [npm](http://npmjs.com).

```
npm install @whatskit/ossdeployer-cli --save-dev
```

## Usage

创建配置文件 `deploy.config.json`：

```
{
  "region": "-",
  "accessKeyId": "-",
  "accessKeySecret": "-",
  "bucket": "-",
  "releaseEnvConf": {
    "dev": {
      "source": "dist/",
      "target": "home/dev/"
    },
    "pre": {
      "source": "dist/",
      "target": "home/pre/"
    },
    "prd": {
      "source": "dist/",
      "target": "home/prd/"
    }
  }
}
```

运行：

```
# 测试
npx ossdeployer-cli --releaseEnv dev
# 预发布
npx ossdeployer-cli --releaseEnv pre
# 生产
npx ossdeployer-cli --releaseEnv prd
```

更多命令 `npx ossdeployer-cli --help`：

```
Usage: ossdeployer-cli [options]
--help               查看帮助
--version            查看版本
--config             配置文件路径 默认: ./deploy.config.json
--releaseEnv         发布环境 例如: dev pre prd
--source             本地静态文件路径 例如: dist/
--target             阿里云 OSS 文件路径 例如: static/home/
--accessKeyId        阿里云 OSS accessKeyId
--accessKeySecret    阿里云 OSS accessKeySecret
--bucket             阿里云 OSS bucket
--region             阿里云 OSS region
```
