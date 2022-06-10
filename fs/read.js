import { getAbsolutePath } from '../utils/getAbsolutePath.js';
import { isAccess } from '../utils/isAccess.js';
import { commandClose } from '../utils/commandClose.js';
import fs from 'fs';

export const read = async (filePath, cwd) => {
    const absolutePath = getAbsolutePath(filePath, cwd);
    const existPath = await isAccess(absolutePath);
    if (existPath) {
        try {
            const readableStream = fs.createReadStream(absolutePath, 'utf-8');
            readableStream.on('data', (chunk) => {
                process.stdout.write(chunk);
            });
            commandClose(cwd);
        } catch (err) {
            console.log(`\r\nOperation failed\n${err}`);
            commandClose(cwd);
        }
    } else {
        process.stdout.write(`\r\nНет такого файла\n`);
        commandClose(cwd);
        ``;
    }
};
