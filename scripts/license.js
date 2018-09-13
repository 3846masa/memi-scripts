import libpath from 'path';
import axios from 'axios';
import fs from 'fs-extra';

/**
 * @param  {string} userName
 */
export async function license(userName = '3846masa') {
  const licensePath = libpath.resolve(process.cwd(), 'LICENSE');

  if (await fs.pathExists(licensePath)) {
    console.log('LICENSE already exists.');
    return;
  }

  const { data } = await axios.get(`https://${userName}.mit-license.org/license.txt`);
  await fs.writeFile(licensePath, data, 'utf8');
}
