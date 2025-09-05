const { DEV, PORT, PROJECT_ROOT } = process.env;

export const isDev = Boolean(DEV);

export const port = Number(PORT) || 4103;
export const host = `http://localhost:${port}`;
export const cwd = PROJECT_ROOT || process.cwd();
