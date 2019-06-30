import { Ora } from 'ora';

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
  env: string;
  options: Options;
}

export interface Options {}

export type Option = string | number;

export interface Paths {
  [key: string]: string;
}

export interface Spinner extends Ora {}

export interface Preset {
  name: string;
  engine: string;
}

export interface Engine {
  name: string;
  build(): null;
  clean(): null;
  install(): null;
  watch(): null;
}
