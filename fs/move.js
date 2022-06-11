import * as fs from 'fs/promises';
import { isAccess } from '../utils/isAccess.js';
import { getPath } from '../utils/getPath.js';
import { commandClose } from '../utils/commandClose.js';

export const move = async (file, newPlace, cwd) => {
    try {
        const absolutePath = getPath(file, cwd);
        const hasAccess = await isAccess(absolutePath);
        if (hasAccess) {
            await fs.copyFile(absolutePath, getPath(newPlace, cwd));
            await fs.rm(absolutePath);
            process.stdout.write(`\nФайлик ${file} послан в ${newPlace}\n`);
            commandClose(cwd);
        } else {
            process.stdout.write(`Что-то нету такого ${file}`);
            commandClose(cwd);
        }
    } catch (error) {
        console.error(`FS operation failed\n`);
    }
};
