## html 追加版本号

### options
| 参数 | 说明 | 类型 | 默认值 |
| ---- | ---- | ---- | ---- |
| path             | html 路径 | string | dist/index.html |
| version          | 版本号 | string | version in pakcage.json |
| suffix           | version 后缀 | ISuffixOptions | { datetimeHuman: true, timestamp: true } |
| callback         | custom full VersinName | Function | |

### require
**[version-webpack-plugin] require Node.js 16 or newer**

### install
```
npm i @xpkj/version-webpack-plugin -D --registry=http://172.25.187.245:6636/repository/npm-public/
npm i @xpkj/version-webpack-plugin -D --registry=http://192.168.3.110:6636/repository/npm-public/
```

### demo
```
const VersionWebpackPlugin = require("@xpkj/version-webpack-plugin")

new VersionWebpackPlugin({
  path: 'dist/index.html',
  version: "",
  suffix: {
    date: true,
    time: true,
    timestamp: false,
  },
  callback: () => {
    return 'custome_version_info_by_callback'
  }
})
```
### dist/index.html
```
<!DOCTYPE html><html><head><meta name="version" content="custome_version_info_by_callback"><title>@gzz-kit/version-webpack-plugin</title>...
```