import fs from 'fs';
import crypto from 'crypto';
import { isAccess } from '../utils/isAccess.js';
import { getPath } from '../utils/getPath.js';
import { commandClose } from '../utils/commandClose.js';

export const calcHash = async (file, cwd) => {
    const absolutePath = getPath(file, cwd);
    const hasAccess = await isAccess(absolutePath);
    try {
        if (hasAccess) {
            const stream = fs.createReadStream(file);
            let hash = '';
            stream.on('data', (data) => {
                hash = crypto.createHash('sha256').update(data).digest('hex');
            });
            stream.on('end', () => {
                process.stdout.write(`Хэш для файла ${file} = ${hash}\n`);
                commandClose(cwd);
                return hash;
            });
        } else {
            process.stdout.write(`Хмм... Нет такой ${file}\n`);
            commandClose(cwd);
        }
    } catch (error) {
        process.stdout.write(`FS operation failed\n`);
        commandClose(cwd);
    }
};
