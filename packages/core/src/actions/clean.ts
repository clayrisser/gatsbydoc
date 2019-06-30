import { Dependancies, Config } from '../types';

export async function clean(config: Config, { spinner }: Dependancies) {
  spinner.start('cleaning');
  spinner.succeed('cleaned');
}
