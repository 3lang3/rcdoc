import glob from 'fast-glob';
import chalk from 'chalk';
import consola from 'consola';
import { join } from 'path';
import Yeoman from 'yeoman-environment';
import Generator from 'yeoman-generator';
import { CWD, GENERATOR_DIR, GENERATOR_DIR_SITE, GENERATOR_DIR_LIB } from './constant';

export class ReactVanGenerator extends Generator {
  inputs = {
    name: '',
    mode: '',
    locale: true,
    preprocessor: '',
  };

  constructor(opts) {
    super([], {
      env: Yeoman.createEnv([], {
        cwd: join(CWD, opts.name),
      }),
      resolved: GENERATOR_DIR,
    });

    this.inputs = opts;
  }

  writing() {
    consola.info(`Creating project in ${join(CWD, this.inputs.name)}\n`);
    /**
    @see {@link https://github.com/mrmlnc/fast-glob#how-to-write-patterns-on-windows}
    */
    const templatePath = join(
      this.inputs.mode === 'site' ? GENERATOR_DIR_SITE : GENERATOR_DIR_LIB,
    ).replace(/\\/g, '/');
    const templateFiles = glob.sync(join(templatePath, '**', '*').replace(/\\/g, '/'), {
      dot: true,
    });
    const destinationRoot = this.destinationRoot();

    templateFiles.forEach((filePath) => {
      const outputPath = filePath.replace('.tpl', '').replace(templatePath, destinationRoot);
      this.fs.copyTpl(filePath, outputPath, this.inputs);
    });
  }

  end() {
    const { name } = this.inputs;

    console.log();
    consola.success(`Successfully created ${chalk.yellow(name)}.`);
    consola.success(
      `Run ${chalk.yellow(`cd ${name} && yarn install && yarn dev`)} to start development!`,
    );
  }
}
