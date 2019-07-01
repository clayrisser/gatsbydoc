import { IEngine, Engine } from '@gatsbydoc/core';

export default class SphinxEngine extends Engine implements IEngine {
  name = 'sphinx';

  build() {
    return null;
  }

  clean() {
    return null;
  }

  install() {
    return null;
  }

  watch() {
    return null;
  }
}
