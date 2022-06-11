import os from 'os';
import path from 'path';
import readline from 'readline';
import isAccess from './utils/isAccess.js';
import listDir from './fs/listDir.js';
import commandClose from './utils/commandClose.js';
import parseArgs from './cli/args.js';
import { read } from './fs/read.js';
import { add } from './fs/add.js';
import { rename } from './fs/rename.js';
import { copy } from './fs/copy.js';
import { move } from './fs/move.js';
import { remove } from './fs/remove.js';
import { calcHash } from './fs/calcHash.js';
import { compress } from './cli/zip.js';
import { decompress } from './cli/unzip.js';

function fileManager() {
    // try {
    let cwd = os.homedir();
    const userName = parseArgs();
    process.chdir(cwd);
    process.stdout.write(`Welcome to the File Manager, ${userName}\n`);
    process.stdout.write(`You currently in: ${cwd}\n`);

    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
    });

    rl.on('line', async (str) => {
        const [cmd, ...args] = str.toString().trim().split(' ');

        switch (cmd) {
            case '.exit':
            case 'exit': {
                process.stdout.write(
                    `Thank you for using File Manager, ${userName}`
                );
                process.exit();
            }
            case 'cd': {
                if (args.length > 0) {
                    cwd = path.join(cwd, args.join(' '));
                    const isRealAccess = await isAccess(cwd);
                    if (isRealAccess) {
                        process.chdir(cwd);
                        commandClose(cwd);
                    } else {
                        process.stdout.write(
                            `Сорян, нету такой папки. Уточните, что там после cd.\n`
                        );
                        commandClose(cwd);
                    }
                } else {
                    process.stdout.write(`Определитесь с папкой после 'cd'.\n`);
                    commandClose(cwd);
                }
                break;
            }
            case 'up': {
                if (cwd === os.homedir()) {
                    process.stdout.write(
                        `А все, выше нельзя. Это рут: ${os.homedir()}\n`
                    );
                } else {
                    cwd = path.join(cwd, '..');
                    process.chdir(cwd);
                    commandClose(cwd);
                }
                break;
            }
            case 'ls': {
                await listDir(cwd);
                break;
            }
            case 'cat': {
                if (args.length > 0) {
                    const userTo = args.join(' ');
                    await read(userTo, cwd);
                } else {
                    process.stdout.write(`Уточните путь после add\n`);
                    commandClose(cwd);
                }
                break;
            }
            case 'add': {
                if (args.length > 0) {
                    const userPath = args.join(' ');
                    await add(userPath, cwd);
                } else {
                    process.stdout.write(`А уточните путь к файлу, пжлста\n`);
                    commandClose(cwd);
                }
                break;
            }
            case 'rn': {
                if (args.length > 1) {
                    const file = args.slice(0, -1).join(' ');
                    const newName = args[args.length - 1];
                    await rename(file, newName, cwd);
                } else {
                    process.stdout.write(
                        `Задайте текущее и желаемое имя файла\n`
                    );
                    commandClose(cwd);
                }
                break;
            }
            case 'cp': {
                if (args.length > 1) {
                    const file = args.slice(0, -1).join(' ');
                    const newPlace = args[args.length - 1];
                    await copy(file, newPlace, cwd);
                } else {
                    process.stdout.write(
                        `Уточните, пжлста, старый и новый пути файла\n`
                    );
                    commandClose(cwd);
                }
                break;
            }
            case 'mv': {
                if (args.length > 1) {
                    const file = args.slice(0, -1).join(' ');
                    const newPlace = args[args.length - 1];
                    await move(file, newPlace, cwd);
                } else {
                    process.stdout.write(
                        `Определитесь, пжлста, откуда и куда будем двигать файлик\n`
                    );
                    commandClose(cwd);
                }
                break;
            }
            case 'rm': {
                if (args.length > 0) {
                    const file = args.join(' ');
                    await remove(file, cwd);
                } else {
                    process.stdout.write(
                        `Определитесь, пжлста, что будем уничтожать\n`
                    );
                    commandClose(cwd);
                }
                break;
            }
            case 'os': {
                if (args.length > 0 && args[0].startsWith('--')) {
                    const arg = args[0].slice(2);
                    switch (arg) {
                        case 'homedir': {
                            process.stdout.write(`${os.homedir()}\n`);
                            commandClose(cwd);
                            break;
                        }
                        case 'architecture': {
                            process.stdout.write(`${os.arch()}\n`);
                            commandClose(cwd);
                            break;
                        }
                        case 'cpus': {
                            // process.stdout.write(`${os.cpus()}\n`);
                            console.table(os.cpus());
                            commandClose(cwd);
                            break;
                        }
                        case 'EOL': {
                            console.log(JSON.stringify(os.EOL));
                            commandClose(cwd);
                            break;
                        }
                        case 'username': {
                            console.log(os.userInfo().username);
                            commandClose(cwd);
                            break;
                        }
                        default: {
                            process.stdout.write(
                                `Хмм.. ${arg}. Нет такой команды\n`
                            );
                            commandClose(cwd);
                            break;
                        }
                    }
                } else {
                    process.stdout.write(
                        `Наберите аргументик после "os". Например, -- и EOL, cpus и т.д.\n`
                    );
                    commandClose(cwd);
                }
                break;
            }
            case 'hash': {
                if (args.length > 0) {
                    const thePath = args.join(' ');
                    await calcHash(thePath, cwd);
                } else {
                    process.stdout.write(
                        `Определитесь, пжлста, с путем к файлу\n`
                    );
                }
                commandClose(cwd);
                break;
            }
            case 'compress': {
                if (args.length > 1) {
                    const fileZip = args.slice(0, -1).join(' ');
                    const bro = args[args.length - 1];
                    await compress(fileZip, bro, cwd);
                } else {
                    process.stdout.write(
                        `Определитесь что и во что жмем, пжлста\n`
                    );
                    commandClose(cwd);
                }
                break;
            }
            case 'decompress': {
                if (args.length > 1) {
                    const fileFrom = args.slice(0, -1).join(' ');
                    const fileTo = args[args.length - 1];
                    await decompress(fileFrom, fileTo, cwd);
                } else {
                    process.stdout.write(`Определитесь с путями к файлику\r\n`);
                    commandClose(cwd);
                }
                break;
            }
            default: {
                process.stdout.write(`Invalid input\n`);
                commandClose(cwd);
                break;
            }
        }
    }).on('close', () => {
        console.log(`Thank you for using File Manager, ${userName}`);
    });
}

fileManager();
