export function commandClose(cwd) {
    process.stdout.write(`\nYou are currently in: ${cwd}\n`);
}
export default commandClose;
