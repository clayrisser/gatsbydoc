import Err from 'err';
import fs from 'fs-extra';
import path from 'path';
import pkgDir from 'pkg-dir';
import { PresetConfig } from './types';

const projectPath = pkgDir.sync(process.cwd()) || process.cwd();

export function getPresets(): string[] {
  const presetNames: string[] = Object.keys(
    require(path.resolve(projectPath, 'package.json')).dependencies
  );
  return presetNames.filter(presetName => {
    return !!require(path.resolve(
      projectPath,
      'node_modules',
      presetName,
      'package.json'
    )).gatsbydocPreset;
  });
}

export function loadPreset(presetName: string): PresetConfig {
  const rootPath = fs.realpathSync(
    path.resolve(projectPath, 'node_modules', presetName)
  );
  const enginePkg = require(path.resolve(rootPath, 'package.json'));
  if (!enginePkg.gatsbydocPreset) {
    throw new Err("preset missing 'gatsbydocPreset' in package.json");
  }
  let presetConfig = require(path.resolve(rootPath, enginePkg.gatsbydocPreset));
  if (presetConfig.__esModule) presetConfig = presetConfig.default;
  return presetConfig as PresetConfig;
}
