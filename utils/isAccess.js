import fs from 'fs';

export const isAccess = async (path) => {
    try {
        await fs.promises.access(path);
        return true;
    } catch (error) {
        console.error(error);
        return false;
    }
};

export default isAccess;
