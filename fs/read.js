import fs from 'fs';
import { getPath } from '../utils/getPath.js';
import { isAccess } from '../utils/isAccess.js';
import { commandClose } from '../utils/commandClose.js';

export const read = async (filePath, cwd) => {
    const absolutePath = getPath(filePath, cwd);
    const hasAccess = await isAccess(absolutePath);
    if (hasAccess) {
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
