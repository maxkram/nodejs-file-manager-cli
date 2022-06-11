import * as fs from 'fs/promises';
import { isAccess } from '../utils/isAccess.js';
import { getPath } from '../utils/getPath.js';
import { commandClose } from '../utils/commandClose.js';

export const rename = async (file, newName, cwd) => {
    try {
        const absolutePath = getPath(file, cwd);
        const isPath = await isAccess(absolutePath);
        if (isPath) {
            await fs.rename(absolutePath, getPath(newName, cwd));
            process.stdout.write(`\n${file} переименован в ${newName}\n`);
            commandClose(cwd);
        } else {
            process.stdout.write(`\nФайл ${file} что-то не нашелся\n`);
            commandClose(cwd);
        }
    } catch (error) {
        console.error(`FS operation failed: ${error}`);
    }
};
