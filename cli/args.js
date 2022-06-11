export const parseArgs = () => {
    try {
        const userArgs = process.argv.slice(2).toString();

        if (userArgs.startsWith('--')) {
            return userArgs.split('=')[1];
        } else {
            return 'Проверьте, вы точно ввели "-- --": npm run start -- --username=your_username';
        }
    } catch (err) {
        throw new Error('Ошибка чтения аргумента');
    }
};
export default parseArgs;
