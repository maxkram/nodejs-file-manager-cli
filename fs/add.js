import * as fs from 'fs/promises';
import { getPath } from '../utils/getPath.js';
import { commandClose } from '../utils/commandClose.js';

export const add = async (userPath, cwd) => {
    const absolutePath = getPath(userPath, cwd);
    try {
        await fs.writeFile(absolutePath, '');
        console.log(`\n Готов ваш ${userPath}, забирайте.`);
    } catch (err) {
        console.log(`FS operation failed\n`);
    }
    commandClose(cwd);
};
