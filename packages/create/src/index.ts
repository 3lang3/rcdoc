#!/usr/bin/env node
import inquirer from 'inquirer';
import consola from 'consola';
import { ensureDir } from 'fs-extra';
import { ReactVanGenerator } from './generator';

const PROMPTS = [
  {
    type: 'input',
    name: 'name',
    message: '请输入包名称',
  },
  {
    name: 'preprocessor',
    message: '请选择css预处理器',
    type: 'list',
    choices: ['Less', 'Sass', 'Stylus'],
  },
];

export default async function run() {
  // 设置命令行传入参数
  const { name } = await inquirer.prompt(PROMPTS);

  try {
    await ensureDir(name);

    const generator = new ReactVanGenerator(name);
    generator.run();
  } catch (e) {
    consola.error(e);
  }
}

run();
