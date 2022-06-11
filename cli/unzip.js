import fs from 'fs';
import zlib from 'zlib';
import { isAccess } from '../utils/isAccess.js';
import { getPath } from '../utils/getPath.js';
import { commandClose } from '../utils/commandClose.js';

export const decompress = async (pathFrom, pathTo, cwd) => {
    try {
        if (pathFrom.slice(-3) !== '.br') {
            console.log(
                `\n${pathFrom} не катит. Давайте нормальный файл ".br"`
            );
            commandClose(cwd);
        } else {
            const absolutePath = getPath(pathFrom, cwd);
            const hasAccess = await isAccess(absolutePath);
            if (hasAccess) {
                const fileUnzip = fs.createReadStream(absolutePath);
                const writableStream = fs.createWriteStream(
                    getPath(pathTo, cwd)
                );
                const bro = zlib.createBrotliDecompress();

                fileUnzip.pipe(bro).pipe(writableStream);

                process.stdout.write(
                    `\nХозяин, файл ${pathFrom} распакован.\n`
                );
                commandClose(cwd);
            } else {
                process.stdout.write(`\nДа нет такого ${pathFrom} файла.\n`);
                commandClose(cwd);
            }
        }
    } catch (err) {
        console.log(`\nOperation failed.\r\n${err}`);
    }
};
