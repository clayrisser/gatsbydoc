export interface Platform {
  config: (config?: Config) => Partial<Config>;
}

export interface Envs {
  [key: string]: string | number | boolean | undefined;
}

export interface Dependancies {
  spinner: Spinner;
}

export interface Config {
  action: string;
  docsPath: string;
  env: string;
  open: boolean;
  outputPath: string;
  port: number;
  presets: Preset[];
  readme: boolean;
  serve: boolean;
}

export interface Options {
  docsPath?: string;
  open?: boolean;
  outputPath?: string;
  port?: string;
  readme?: boolean;
  serve?: boolean;
}

export type Option = string | number;

export interface Paths {
  [key: string]: string;
}

export interface Spinner {
  clear(): Spinner;
  fail(text?: string): Spinner;
  info(text?: string): Spinner;
  start(text?: string): Spinner;
  stop(): Spinner;
  succeed(text?: string): Spinner;
  warn(text?: string): Spinner;
}

export type Preset =
  | string
  | {
      config?: PresetConfig;
      options: Partial<PresetConfig>;
      resolve: string;
    };

export interface IEngine {
  name: string;
  build(): null;
  clean(): null;
  install(): null;
  watch(): null;
}

export interface PresetConfig {
  name: string;
  engine: string;
}
