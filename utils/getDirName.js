import { fileURLToPath } from 'url';
import { dirname } from 'path';

export default function getDirName(metaUrl) {
    const __filename = fileURLToPath(metaUrl);
    return dirname(__filename);
}
