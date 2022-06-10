import os from 'os';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import readline from 'readline';
import getNameUser from './getNameUser.js';
import showInfoDir from './showInfoDir.js';
import getHomeDir from './getHomeDir.js';
import getUserName from './getNameUser.js';
import isAccess from './isAccess.js';
import closePhrase from './closePhrase.js';

const fileManager = async () => {
    // try {
    let thisDir = os.homedir();

    process.stdout.write(`Welcome to the File Manager, ${getNameUser()}\n`);
    // showInfoDir(thisDir);
    process.stdout.write(`You currently in: ${thisDir}`);

    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
    });

    rl.on('str', async (str) => {
        const [cmd, ...args] = line.toString().trim().split(' ');

        switch (cmd) {
            case '.exit':
            case 'exit': {
                process.stdout.write(
                    `Thank you for using File Manager, ${getUserName()}`
                );
                process.exit();
            }
            case 'cd': {
                if (args.length > 0) {
                    thisDir = path.join(thisDir, args.join(' '));
                    const isRealAccess = await isAccess(thisDir);
                    if (isRealAccess) {
                        process.chdir(thisDir);
                        closePhrase();
                    } else {
                        process.stdout.write(
                            `Сорян, нету такой папки. Уточните, что там после cd.\n`
                        );
                        closePhrase();
                    }
                } else {
                    process.stdout.write(`Определитесь с папкой после 'cd'.\n`);
                    closePhrase();
                }
                break;
            }
        }
    }).on('close', () => {
        console.log(`Thank you for using File Manager, ${getNameUser()}`);
    });

    //     process.on('SIGINT', () => {
    //         process.stdout.write(
    //             `Thank you for using File Manager, ${getNameUser()}!\n`
    //         );
    //         process.exit();
    //     });

    //     process.stdin.on('data', (chunk) => {
    //         const str = chunk.toString().trim();

    //         if (str.includes('.exit')) {
    //             process.stdout.write(
    //                 `Thank you for using File Manager, ${getNameUser()}!\n`
    //             );
    //             process.exit();
    //         }
    //     });

    //     process.stdin.on('data', (chunk) => {
    //         const str = chunk.toString().trim();

    //         if (str.includes('pwd')) {
    //             console.log(getHomeDir());
    //         }
    //     });

    //     process.stdin.on('data', (chunk) => {
    //         const str = chunk.toString().trim();

    //         if (str.includes('os --cpus')) {
    //             console.table(os.cpus());
    //         }
    //     });

    //     process.stdin.on('data', (chunk) => {
    //         const str = chunk.toString().trim();

    //         if (str.includes('os --homedir')) {
    //             console.log(os.homedir());
    //         }
    //     });

    //     process.stdin.on('data', (chunk) => {
    //         const str = chunk.toString().trim();

    //         if (str.includes('os --username')) {
    //             console.log(os.userInfo().username);
    //         }
    //     });

    //     process.stdin.on('data', (chunk) => {
    //         const str = chunk.toString().trim();

    //         if (str.includes('os --architecture')) {
    //             console.log(os.arch());
    //         }
    //     });

    //     process.stdin.on('data', (chunk) => {
    //         const str = chunk.toString().trim();

    //         if (str.includes('os --EOL')) {
    //             console.log(JSON.stringify(os.EOL));
    //         }

    //         showInfoDir(thisDir);
    //     });
    // } catch (err) {
    //     if (err) {
    //         throw err;
    //     }
    // }
};

fileManager();
