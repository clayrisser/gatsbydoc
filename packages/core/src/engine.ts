import fs from 'fs-extra';
import path from 'path';
import pkgDir from 'pkg-dir';
import { Paths, Config } from './types';

const projectPath = pkgDir.sync(process.cwd()) || process.cwd();

export default class Engine {
  _paths: Paths;

  constructor(public config: Config) {}

  async loadEnvironment() {
    await fs.mkdirs(this.paths.working);
    await fs.copy(
      path.resolve(this.paths.self, 'archetype'),
      this.paths.working
    );
    let sphinxdocrcPath = path.resolve(this.paths.project, '.sphinxdocrc');
    const sphinxdocrcPyPath = path.resolve(
      this.paths.project,
      '.sphinxdocrc.py'
    );
    if (fs.existsSync(sphinxdocrcPyPath)) sphinxdocrcPath = sphinxdocrcPyPath;
    if (fs.existsSync(sphinxdocrcPath)) {
      await fs.copy(
        sphinxdocrcPath,
        path.resolve(this.paths.working, 'conf.py')
      );
    }
    const requirementsPath = path.resolve(
      this.paths.project,
      '.sphinxdoc.requirements'
    );
    if (fs.existsSync(requirementsPath)) {
      await fs.copy(
        requirementsPath,
        path.resolve(this.paths.working, 'requirements.txt')
      );
    }
    if (this.config.readme) {
      const readmePath = path.resolve(this.paths.project, 'README.md');
      if (fs.existsSync(readmePath)) {
        await fs.copy(readmePath, path.resolve(this.paths.working, 'index.md'));
      }
      const readmeRstPath = path.resolve(this.paths.project, 'README.rst');
      if (fs.existsSync(readmeRstPath)) {
        await fs.copy(
          readmeRstPath,
          path.resolve(this.paths.working, 'index.rst')
        );
      }
    }
    if (fs.existsSync(this.paths.docs)) {
      await fs.copy(this.paths.docs, this.paths.working);
    }
    await fs.writeJson(
      path.resolve(this.paths.working, 'config.json'),
      this.config
    );
  }

  get paths(): Paths {
    if (this._paths) return this._paths;
    const outputPath = path.resolve(projectPath, this.config.outputPath);
    const workingPath = path.resolve(projectPath, '.tmp/gatsbydoc');
    this._paths = {
      docs: path.resolve(projectPath, this.config.docsPath),
      output: outputPath,
      project: projectPath,
      self: pkgDir.sync(__dirname) || path.resolve(__dirname, '..'),
      working: workingPath
    };
    return this._paths;
  }
}

export function getEngines(): string[] {
  const engineNames: string[] = Object.keys(
    require(path.resolve(projectPath, 'package.json')).dependencies
  );
  return engineNames.filter(engineName => {
    return !!require(path.resolve(
      projectPath,
      'node_modules',
      engineName,
      'package.json'
    )).gatsbydocEngine;
  });
}

export function loadEngine(engineName: string): Engine {
  const rootPath = path.resolve(projectPath, 'node_modules', engineName);
  const enginePkg = require(path.resolve(rootPath, 'package.json'));
  let engine = require(path.resolve(projectPath, enginePkg.gatsbydocEngine));
  if (engine.__esModule) engine = engine.default;
  return engine as Engine;
}
