import libpath from 'path';
import axios from 'axios';
import fs from 'fs-extra';

/**
 * @param  {...string} typeList
 */
export async function gitignore(...typeList) {
  if (typeList.length === 0) {
    console.error('Must pass more than 1 argument.');
    return;
  }

  const gitignorePath = libpath.resolve(process.cwd(), '.gitignore');

  if (await fs.pathExists(gitignorePath)) {
    console.log('.gitignore already exists.');
    return;
  }

  const { data } = await axios.get(`https://gitignore.io/api/${typeList.map(l => l.toLowerCase()).join(',')}`);
  await fs.writeFile(gitignorePath, data, 'utf8');
}
