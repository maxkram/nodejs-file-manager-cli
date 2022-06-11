import * as fs from 'fs/promises';
import { isAccess } from '../utils/isAccess.js';
import { getPath } from '../utils/getPath.js';
import { commandClose } from '../utils/commandClose.js';

export const copy = async (file, newPlace, cwd) => {
    try {
        const absolutePath = getPath(file, cwd);
        const isPath = await isAccess(absolutePath);

        if (isPath) {
            await fs.copyFile(absolutePath, getPath(newPlace, cwd));
            process.stdout.write(
                `\nФайлик ${file} скопировался в ${newPlace}\n`
            );
            commandClose(cwd);
        } else {
            process.stdout.write(`\nФайлик ${file} что-то как-то не нашелся\n`);
            commandClose(cwd);
        }
    } catch (error) {
        console.error(`FS operation failed: ${error}`);
    }
};
