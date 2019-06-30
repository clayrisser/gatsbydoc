import mergeConfiguration from 'merge-configuration';
import { environment } from 'js-info';
import defaultConfig from './defaultConfig';
import { Config, Option, Options } from '../types';

export default function createConfig(
  action: string,
  options: Options = {},
  customConfig: Partial<Config> = {}
): Config {
  options = sanitizeOptions(options);
  let config = mergeConfiguration(defaultConfig, customConfig);
  config = {
    ...config,
    action,
    env: environment.value,
    options
  };
  return config;
}

function sanitizeOptions(options: Options): Options {
  return Object.entries(options).reduce(
    (options: { [key: string]: Option }, [key, option]: [string, Option]) => {
      if (
        key.length &&
        key[0] !== '_' &&
        key !== 'Command' &&
        key !== 'Option' &&
        key !== 'args' &&
        key !== 'commands' &&
        key !== 'options' &&
        key !== 'rawArgs'
      ) {
        options[key] = option;
      }
      return options;
    },
    {}
  );
}
