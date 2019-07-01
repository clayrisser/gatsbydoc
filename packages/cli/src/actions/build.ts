import { Config, Dependancies } from '../types';

export async function build(config: Config, { spinner }: Dependancies) {
  spinner.info('building');
  spinner.succeed('built');
}
