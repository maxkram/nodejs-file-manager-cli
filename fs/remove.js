import * as fs from 'fs/promises';
import { isAccess } from '../utils/isAccess.js';
import { getPath } from '../utils/getPath.js';
import { commandClose } from '../utils/commandClose.js';

export const remove = async (file, cwd) => {
    try {
        const absolutePath = getPath(file, cwd);
        const isAccess = await isAccess(absolutePath);
        if (isAccess) {
            await fs.rm(absolutePath);
            process.stdout.write(`\nА все, стерли ${file} насовсем\n`);
            commandClose(cwd);
        } else {
            process.stdout.write(`Что-то нету такого ${file}`);
            commandClose(cwd);
        }
    } catch (error) {
        console.error(`FS operation failed\n`);
    }
};
