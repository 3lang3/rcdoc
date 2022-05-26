#!/usr/bin/env node
import inquirer from 'inquirer';
import consola from 'consola';
import { ensureDir } from 'fs-extra';
import { ReactVanGenerator } from './generator';

const PROMPTS = [
  {
    name: 'name',
    message: '请输入包名称',
    type: 'input',
  },
  {
    name: 'mode',
    message: '文档模式',
    type: 'list',
    choices: [
      { name: '站点模式(eg: https://react-vant.3lang.dev)', value: 'site' },
      { name: '文档模式(eg: https://rcdoc.3lang.dev)', value: 'lib' },
    ],
  },
  // {
  //   name: 'locale',
  //   message: '是否开启多语言',
  //   type: 'confirm',
  //   default: true,
  // },
  // {
  //   name: 'preprocessor',
  //   message: '请选择css预处理器',
  //   type: 'list',
  //   choices: ['Less', 'Sass', 'Stylus'],
  // },
];

export default async function run() {
  // 设置命令行传入参数
  const anwsers = await inquirer.prompt(PROMPTS);

  try {
    await ensureDir(anwsers.name);

    const generator = new ReactVanGenerator(anwsers);
    generator.run();
  } catch (e) {
    consola.error(e);
  }
}

run();
