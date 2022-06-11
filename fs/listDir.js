import fs from 'fs';
import path from 'path';
import { commandClose } from '../utils/commandClose.js';
import { isAccess } from '../utils/isAccess.js';

const listDir = async (pathTo) => {
    try {
        const hasAccess = isAccess(pathTo);
        if (hasAccess) {
            await fs.readdir(pathTo, (err, files) => {
                if (err) {
                    console.log(err);
                }
                files.forEach(async (file) => {
                    let fileName = path.join(pathTo, file);
                    await fs.stat(fileName, (err, stats) => {
                        if (err) {
                            console.log(`FS operation failed`);
                            return;
                        }
                        if (stats.isFile()) {
                            const item = {
                                name:
                                    path.basename(
                                        file,
                                        path.extname(fileName)
                                    ) + path.extname(fileName),
                            };
                            console.dir(item);
                        } else {
                            const item = { name: file, type: 'directory' };
                            console.dir(item);
                        }
                    });
                });
            });
        } else {
            console.log(`Сорян, нет такой: ${pathTo}`);
            commandClose();
        }
    } catch (error) {
        console.log(`FS operation failed\n`);
        commandClose();
    }
};

export default listDir;
