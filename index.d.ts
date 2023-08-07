export interface IPluginOptions {
  path?: string,
  version?: string,
  suffix?: ISuffixOptions,
  callback?: Function | null
}

export interface ISuffixOptions {
  date?: boolean,
  time?: boolean,
  timestamp?: boolean
}

export default class VersionWebpackPlugin {
  constructor(options: IPluginOptions);
}