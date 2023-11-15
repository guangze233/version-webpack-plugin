export interface IPluginOptions {
  /** html 文件路径 */
  path?: string,
  /** 指定版本号，默认从 package.json 获取 */
  version?: string,
  /** 配置后缀 */
  suffix?: ISuffixOptions,
  /** 自定义版本信息（优先级最高） */
  callback?: Function | null
}

export interface ISuffixOptions {
  /** 是否追加日期 yyyy-MM-dd*/
  date?: boolean,
  /** 是否追加时间 hh:mm:ss*/
  time?: boolean,
  /** 是否追加时间戳 */
  timestamp?: boolean
}

export default class VersionWebpackPlugin {
  constructor(options: IPluginOptions);
}