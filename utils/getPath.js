import path from 'path';

export function getPath(userPath, cwd) {
    const resolvedPath = path.resolve(userPath);
    const isAbsolute = path.isAbsolute(resolvedPath);
    if (isAbsolute) {
        return resolvedPath;
    } else {
        return path.join(cwd, userPath);
    }
}
