import { Dependancies, Config } from '../types';

export async function start(config: Config, { spinner }: Dependancies) {
  spinner.info('starting');
}
