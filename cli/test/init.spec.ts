import { run, mktmp, read, existsWithRoot } from './util';

import { runCommand } from '../src/common';
import { mkdirAsync } from '../src/util/fs';

import { join } from 'path';

const APP_ID = 'com.getcapacitor.cli.test';
const APP_NAME = 'Capacitor CLI Test';

describe('CLI Init', () => {
  let appDirObj;
  let tmpDirObj;
  let tmpDir;
  let appDir;

  beforeAll(async () => {
    // These commands are slowww...
    jest.setTimeout(20000);
    appDirObj = await mktmp();
    tmpDir = appDirObj.path;
    appDir = join(tmpDir, 'test-app');
    await mkdirAsync(appDir);
  });

  afterAll(() => {
    appDirObj.cleanupCallback();
  });

  it('Should int a project', async () => {
    await run(appDir, `init "${APP_NAME}" "${APP_ID}"`);
    const exists = existsWithRoot(appDir);
    expect(await exists('capacitor.config.json')).toBe(true);
  });
});