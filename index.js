import os from 'os';
import getNameUser from './getNameUser.js';
import showInfoDir from './showInfoDir.js';

const fileManager = async () => {
    try {
        let thisDir = os.homedir();

        process.stdout.write(`Welcome to the File Manager, ${getNameUser()}\n`);
        showInfoDir(thisDir);

        process.on('SIGINT', () => {
            process.stdout.write(
                `Thank you for using File Manager, ${getNameUser()}!\n`
            );
            process.exit();
        });

        process.stdin.on('data', (chunk) => {
            const str = chunk.toString();

            if (str.includes('.exit')) {
                process.stdout.write(
                    `Thank you for using File Manager, ${getNameUser()}!\n`
                );
                process.exit();
            }

            showInfoDir(thisDir);
        });
    } catch (err) {
        if (err) {
            throw err;
        }
    }
};

fileManager();
