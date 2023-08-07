import { IPluginOptions } from "..";

// nodejs版本 >= v16
const colors = require("colors"); // 控制台输出颜色
if (process.version < "v16") {
  console.error(
    `npm ${colors.red("ERR!")} ${colors.blue(
      "[version-webpack-plugin]"
    )} require Node.js ${colors.yellow("v16")} or newer\n`
  );
  process.exit(1);
}

const fs = require("fs");
const jsdom = require("jsdom");
const { JSDOM } = jsdom;

class VersionWebpackPlugin {
  private options: IPluginOptions;

  constructor(_options: IPluginOptions = {}) {
    this.options = {
      path: _options?.path || "dist/index.html",
      version: _options?.path || "",
      suffix: {
        date: false,
        time: false,
        timestamp: true,
      },
      callback: _options?.callback || null,
    };
    if (_options.suffix) {
      this.options.suffix = {
        ...this.options.suffix,
        ..._options.suffix
      }
    }
  }

  afterEmit(compilation: any, callback: any) {
    const rawHtml = fs.readFileSync(this.options.path);
    const dom = new JSDOM(rawHtml);
    const document = dom.window.document;
    const metaElement = document.createElement("meta");
    metaElement.name = "version";
    metaElement.content = this.getVersionContent();
    document.head.insertBefore(
      metaElement,
      document.head.querySelector("title")
    );
    fs.writeFileSync(this.options.path, dom.serialize(), "utf-8");
  }

  apply(compiler: any) {
    if (compiler.hooks) {
      const plugin = { name: "VersionWebpackPlugin" };
      compiler.hooks.afterEmit.tap(
        plugin,
        (compilation: any, callback: any) => {
          this.afterEmit.call(this, compilation, callback);
        }
      );
    }
  }

  private getVersionContent() {
    if (this.options.callback) {
      return this.options.callback();
    }

    const versionInfos: string[] = [];
    versionInfos.push(this.getVersionName());
    const suffix = this.getSuffix();
    if (suffix) {
      versionInfos.push(this.getSuffix());
    }
    return versionInfos.join("_");
  }

  private getVersionName() {
    if (this.options.version) {
      return this.options.version;
    }
    const packageJson = JSON.parse(fs.readFileSync("package.json"));
    return "v" + packageJson.version;
  }

  private getSuffix() {
    if (!this.options.suffix) {
      return "";
    }
    const { date, time, timestamp } = this.getDateInfo();
    const suffix: string[] = [];
    if (this.options.suffix.date) {
      suffix.push(date);
    }
    if (this.options.suffix.time) {
      suffix.push(time);
    }
    if (this.options.suffix.timestamp) {
      suffix.push(timestamp);
    }
    return suffix.join("_");
  }

  private getDateInfo() {
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth() + 1;
    const day = today.getDate();
    const hour = today.getHours();
    const minute = today.getMinutes();
    const second = today.getSeconds();

    const date = `${year}${this.paddingNumber(month)}${this.paddingNumber(
      day
    )}`;
    const time = `${this.paddingNumber(hour)}:${this.paddingNumber(
      minute
    )}:${this.paddingNumber(second)}`;
    const timestamp = String(today.getTime());
    return {
      date,
      time,
      timestamp,
    };
  }

  private paddingNumber(num: number): string {
    const numStr = String(num);
    return numStr.length < 2 ? `0${numStr}` : numStr;
  }
}

module.exports = VersionWebpackPlugin;
