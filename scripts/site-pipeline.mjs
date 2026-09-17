// AI-assisted modification by Luftballon, 2026-09-17.
// Build and, only when requested, publish the Gatsby site to GitHub Pages.
import { execFileSync } from 'node:child_process';
import { existsSync, readFileSync, statSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const projectRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const repository = 'quangphucqp/quangphucphung.github.io';
const siteDomain = 'quangphucphung.com';
const requiredNodeVersion = readFileSync(join(projectRoot, '.nvmrc'), 'utf8').trim();
const requiredNodeMajor = Number(requiredNodeVersion.replace(/^v/, '').split('.')[0]);
if (!Number.isInteger(requiredNodeMajor)) {
  throw new Error(`Invalid .nvmrc value: ${requiredNodeVersion}`);
}

const nodeBinCandidates = [
  `/opt/homebrew/opt/node@${requiredNodeMajor}/bin`,
  `/usr/local/opt/node@${requiredNodeMajor}/bin`,
];
const nodeBin = nodeBinCandidates.find((candidate) => existsSync(join(candidate, 'node')));
if (!nodeBin) {
  throw new Error(`Node ${requiredNodeMajor} is required. Install it with Homebrew before running the website pipeline.`);
}

const runtimeNode = join(nodeBin, 'node');
const childEnvironment = { ...process.env, PATH: `${nodeBin}:${process.env.PATH ?? ''}` };
const currentNodeMajor = Number(process.versions.node.split('.')[0]);
if (currentNodeMajor !== requiredNodeMajor) {
  try {
    execFileSync(runtimeNode, [fileURLToPath(import.meta.url), ...process.argv.slice(2)], {
      cwd: projectRoot,
      env: childEnvironment,
      stdio: 'inherit',
    });
  } catch (error) {
    process.exit(error.status ?? 1);
  }
  process.exit(0);
}

const deployRequested = process.argv.slice(2).includes('--deploy');
const allowedArguments = deployRequested ? ['--deploy'] : [];

for (const argument of process.argv.slice(2)) {
  if (!allowedArguments.includes(argument)) {
    throw new Error(`Unknown argument: ${argument}`);
  }
}

const run = (command, argumentsList, options = {}) => {
  const output = execFileSync(command, argumentsList, {
    cwd: projectRoot,
    encoding: 'utf8',
    env: childEnvironment,
    stdio: options.capture ? ['ignore', 'pipe', 'pipe'] : 'inherit',
  });
  return typeof output === 'string' ? output.trim() : '';
};

const runCaptured = (command, argumentsList) => run(command, argumentsList, { capture: true });

const normalizeRemote = (remote) => remote
  .replace(/^git@github\.com:/, 'https://github.com/')
  .replace(/^ssh:\/\/git@github\.com\//, 'https://github.com/')
  .replace(/\.git$/, '')
  .replace(/\/$/, '');

const assertSourceCheckout = () => {
  const branch = runCaptured('git', ['rev-parse', '--abbrev-ref', 'HEAD']);
  if (branch !== 'main') {
    throw new Error(`Refusing to run the website pipeline from '${branch}'. Check out main first.`);
  }

  const remote = normalizeRemote(runCaptured('git', ['remote', 'get-url', 'origin']));
  const expectedRemote = `https://github.com/${repository}`;
  if (remote !== expectedRemote) {
    throw new Error(`Refusing to use unexpected origin: ${remote}`);
  }

  const status = runCaptured('git', ['status', '--short']);
  if (status && deployRequested) {
    throw new Error('Refusing to deploy with a dirty working tree. Commit or stash source changes first.');
  }
  if (status) {
    console.log('Working tree has local changes; the verification pipeline will use the current files.');
  }
};

const assertBuildOutput = () => {
  const outputRoot = join(projectRoot, 'public');
  const requiredFiles = [
    'index.html',
    '404.html',
    'CNAME',
    'CV.pdf',
    'page-data/index/page-data.json',
  ];

  for (const relativePath of requiredFiles) {
    const absolutePath = join(outputRoot, relativePath);
    if (!existsSync(absolutePath)) {
      throw new Error(`Build output is missing ${relativePath}`);
    }
  }

  const cname = readFileSync(join(outputRoot, 'CNAME'), 'utf8').trim();
  if (cname !== siteDomain) {
    throw new Error(`Build output has unexpected CNAME: ${cname}`);
  }

  const indexPath = join(outputRoot, 'index.html');
  const index = readFileSync(indexPath, 'utf8');
  if (!index.includes('<body') || !index.includes('</html>')) {
    throw new Error('Build output index.html does not look like a complete HTML document');
  }

  const nestedPublic = join(outputRoot, 'public');
  if (existsSync(nestedPublic)) {
    throw new Error('Build output contains a nested public/ directory');
  }

  const indexBytes = statSync(indexPath).size;
  if (indexBytes < 1000) {
    throw new Error(`Build output index.html is unexpectedly small: ${indexBytes} bytes`);
  }

  console.log(`Verified build output: ${requiredFiles.length} required files; index.html=${indexBytes} bytes.`);
};

const verifyRemoteDeployment = () => {
  const branchSha = runCaptured('gh', [
    'api',
    `repos/${repository}/branches/public`,
    '--jq',
    '.commit.sha',
  ]);
  const pages = JSON.parse(runCaptured('gh', [
    'api',
    `repos/${repository}/pages`,
  ]));

  if (pages.source?.branch !== 'public' || pages.source?.path !== '/') {
    throw new Error('GitHub Pages is no longer configured for public:/');
  }
  if (pages.cname !== siteDomain) {
    throw new Error(`GitHub Pages reports an unexpected CNAME: ${pages.cname}`);
  }

  const expectedIndexSha = runCaptured('git', ['hash-object', join('public', 'index.html')]);
  const expectedCnameSha = runCaptured('git', ['hash-object', join('public', 'CNAME')]);
  const expectedCvSha = runCaptured('git', ['hash-object', join('public', 'CV.pdf')]);
  const remoteIndexSha = runCaptured('gh', [
    'api',
    `repos/${repository}/contents/index.html?ref=public`,
    '--jq',
    '.sha',
  ]);
  const remoteCnameSha = runCaptured('gh', [
    'api',
    `repos/${repository}/contents/CNAME?ref=public`,
    '--jq',
    '.sha',
  ]);
  const remoteCvSha = runCaptured('gh', [
    'api',
    `repos/${repository}/contents/CV.pdf?ref=public`,
    '--jq',
    '.sha',
  ]);

  if (remoteIndexSha !== expectedIndexSha || remoteCnameSha !== expectedCnameSha || remoteCvSha !== expectedCvSha) {
    throw new Error('Remote public branch does not match the verified local build artifacts.');
  }

  console.log(`Verified remote public branch: ${branchSha}`);
  console.log(`Verified GitHub Pages target: ${pages.source.branch}:${pages.source.path} (${pages.status}).`);
  console.log('Verified remote index.html, CNAME, and CV.pdf blobs against the local build.');
};

process.chdir(projectRoot);
console.log(`Using Node runtime for npm commands: ${runCaptured('node', ['--version'])}`);
assertSourceCheckout();

console.log('Running source checks...');
if (deployRequested) {
  console.log('Auditing dependencies before deployment...');
  run('npm', ['run', 'security']);
}
run('npm', ['run', 'validate']);
console.log('Cleaning previous Gatsby build artifacts...');
run('npm', ['run', 'clean']);
console.log('Building the Gatsby site...');
run('npm', ['run', 'build']);
assertBuildOutput();

if (!deployRequested) {
  console.log('Pipeline verification complete. Deployment was not requested.');
  process.exit(0);
}

console.log(`Publishing the verified build to ${repository}:public...`);
run('npx', [
  '--no-install',
  'gh-pages',
  '--dist', './public',
  '--branch', 'public',
  '--message', 'Deploy website update',
]);
verifyRemoteDeployment();
console.log('Deployment command and remote read-back completed. Pages propagation may still take a short time.');
