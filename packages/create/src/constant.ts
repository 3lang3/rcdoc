import { join } from 'path';

export const CWD = process.cwd();
export const GENERATOR_DIR = join(__dirname, '../templates');
export const GENERATOR_DIR_SITE = join(GENERATOR_DIR, '/site');
export const GENERATOR_DIR_LIB = join(GENERATOR_DIR, '/lib');
