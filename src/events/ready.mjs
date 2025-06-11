import log from '../log.mjs';
import { getMsg } from '../locales.mjs';
import { getCurrentDirname } from '../esm-filename.mjs';
import { readFileSync } from 'fs';
import { join } from 'path';

// Event handler for ready
export default async function (client) {
    // Dynamically load version from package.json
    const dirname = getCurrentDirname(import.meta);
    const pkgPath = join(dirname, '../../package.json');
    let version = 'unknown';
    try {
        const pkg = JSON.parse(readFileSync(pkgPath, 'utf8'));
        version = pkg.version || version;
    } catch (e) {
        // Optionally log error
    }
    client.user.setPresence({
        activities: [
            {
                name: `/feud v${version}`,
                type: 0
            }],
        status: 'online'
    });
    log.info(`Logged in as ${client.user.tag}`);
}
