import { execSync } from 'node:child_process';
import pkg from '../package.json' with { type: 'json' };

const { devDependencies = {} } = pkg;

const list = Object.keys(devDependencies);
if (list.length) {
	const command = `npm i -DE ${list.join('@latest ')}@latest && npx update-browserslist-db@latest --yes`;
	execSync(command, { stdio: 'ignore' });
}
