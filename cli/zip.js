import fs from 'fs';
import zlib from 'zlib';
import { isAccess } from '../utils/isAccess.js';
import { getPath } from '../utils/getPath.js';
import { commandClose } from '../utils/commandClose.js';

export const compress = async (pathFrom, pathTo, cwd) => {
    try {
        const absolutePath = getPath(pathFrom, cwd);
        const hasAccess = await isAccess(absolutePath);
        if (pathTo.slice(-3) !== '.br') {
            pathTo += '.br';
        }
        if (hasAccess) {
            const fileZip = fs.createReadStream(absolutePath);
            const writeStream = fs.createWriteStream(getPath(pathTo, cwd));
            const bro = zlib.createBrotliCompress();

            fileZip.pipe(bro).pipe(writeStream);

            process.stdout.write(`Ну че, ужали ${pathFrom} как смогли\n`);
            commandClose(cwd);
        } else {
            process.stdout.write(`Хмм... Нет такой ${pathFrom}\n`);
            commandClose(cwd);
        }
    } catch (error) {
        console.error(`FS operation failed ${error}\n`);
    }
};
