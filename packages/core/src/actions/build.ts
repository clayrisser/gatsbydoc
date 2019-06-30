import { Config, Dependancies } from '../types';

export async function build(config: Config, { spinner }: Dependancies) {
  spinner.start('building');
  spinner.succeed('built');
}
