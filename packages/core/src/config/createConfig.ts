import cosmiconfig from 'cosmiconfig';
import mergeConfiguration from 'merge-configuration';
import pkgDir from 'pkg-dir';
import { environment } from 'js-info';
import { oc } from 'ts-optchain.macro';
import defaultConfig from './defaultConfig';
import { Config, Option, Options } from '../types';

export default function createConfig(
  action: string,
  options: Options = {},
  customConfig: Partial<Config> = {}
): Config {
  const rootPath = pkgDir.sync(process.cwd()) || process.cwd();
  options = sanitizeOptions(options);
  const userConfig: Partial<Config> = oc(
    cosmiconfig('gatsbydoc').searchSync(rootPath)
  ).config({});
  let config = mergeConfiguration(defaultConfig, userConfig);
  config = mergeConfiguration(config, customConfig);
  config = {
    ...config,
    action,
    docsPath: options.docsPath || config.docsPath,
    env: environment.value,
    open: options.open || config.open,
    outputPath: options.outputPath || config.outputPath,
    port: Number(options.port || config.port),
    readme: options.readme || config.readme,
    serve: options.serve || config.serve
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
