import { Dependancies, Config } from '@gatsbydoc/core';

export async function clean(config: Config, { spinner }: Dependancies) {
  spinner.start('cleaning');
  spinner.succeed('cleaned');
}
