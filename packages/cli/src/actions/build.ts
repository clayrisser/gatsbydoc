import { Config, Dependancies } from '@gatsbydoc/core';

export async function build(config: Config, { spinner }: Dependancies) {
  spinner.info('building');
  spinner.succeed('built');
}
