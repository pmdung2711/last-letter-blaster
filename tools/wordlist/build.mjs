// Builds the game's word list from SCOWL (http://wordlist.aspell.net/), plus extra.txt, minus blocklist.txt.
//
// Usage (Node 18+, run from the repo root):
//   curl -L -o /tmp/scowl.tar.gz https://sourceforge.net/projects/wordlist/files/SCOWL/2020.12.07/scowl-2020.12.07.tar.gz/download
//   tar xzf /tmp/scowl.tar.gz -C /tmp
//   node tools/wordlist/build.mjs /tmp/scowl-2020.12.07
//
// Writes tools/wordlist/words.txt (one word per line, sorted) and SCOWL-LICENSE.txt, prints stats,
// and, once game.js exists, rewrites its `const WORD_LIST_RAW = '…';` line in place.

import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const SCOWL_MAX_LEVEL = 40;                          // 35 misses zoo/zebra/internet; 50 adds many obscure words
const SCOWL_LEVELS = [10, 20, 35, 40, 50, 55, 60, 70, 80, 95];
const SCOWL_VARIANTS = ['english', 'american', 'british'];  // accept both spellings: colour and color
const WORD_RE = /^[a-z]{3,15}$/;                     // WORD_MIN_LEN..WORD_MAX_LEN, lower-case only (drops names, abbreviations)
const RARE_LETTERS = 'qxz';

const here = dirname(fileURLToPath(import.meta.url));
const gameJs = join(here, '..', '..', 'game.js');

function readList(file) {
  return readFileSync(file, 'utf8').split('\n').map(l => l.replace(/#.*/, '').trim()).filter(Boolean);
}

function loadScowl(root) {
  const dir = existsSync(join(root, 'final')) ? join(root, 'final') : root;
  const words = new Set();
  let files = 0;
  for (const level of SCOWL_LEVELS.filter(l => l <= SCOWL_MAX_LEVEL)) {
    for (const variant of SCOWL_VARIANTS) {
      const file = join(dir, `${variant}-words.${level}`);
      if (!existsSync(file)) continue;
      files++;
      readFileSync(file, 'latin1').split('\n').forEach(w => { if (WORD_RE.test(w)) words.add(w); });
    }
  }
  if (!files) throw new Error(`No SCOWL word files found in ${dir}`);
  const copyright = join(dirname(dir), 'Copyright');
  return { words, copyright: existsSync(copyright) ? readFileSync(copyright, 'latin1') : null };
}

function main() {
  const root = process.argv[2];
  if (!root) { console.error('Usage: node tools/wordlist/build.mjs <path to extracted SCOWL>'); process.exit(1); }
  const { words, copyright } = loadScowl(root);
  const scowlCount = words.size;

  const extra = readList(join(here, 'extra.txt'));
  const blocked = readList(join(here, 'blocklist.txt'));
  const bad = extra.concat(blocked).filter(w => !WORD_RE.test(w));
  if (bad.length) throw new Error(`Not 3–15 lower-case letters: ${bad.join(', ')}`);

  const alreadyIn = extra.filter(w => words.has(w));
  extra.forEach(w => words.add(w));
  const notFound = blocked.filter(w => !words.has(w));
  blocked.forEach(w => words.delete(w));

  const sorted = [...words].sort();
  writeFileSync(join(here, 'words.txt'), sorted.join('\n') + '\n');
  if (copyright) writeFileSync(join(here, 'SCOWL-LICENSE.txt'), copyright);

  const raw = sorted.join(' ');
  const starts = {}, ends = {};
  for (const w of sorted) { starts[w[0]] = (starts[w[0]] || 0) + 1; ends[w.at(-1)] = (ends[w.at(-1)] || 0) + 1; }
  console.log(`SCOWL level ≤ ${SCOWL_MAX_LEVEL}: ${scowlCount} words; +${extra.length - alreadyIn.length} extra, −${blocked.length - notFound.length} blocked`);
  console.log(`Total ${sorted.length} words, WORD_LIST_RAW ${(raw.length / 1024).toFixed(0)} KB`);
  console.log('Words starting with each letter: ' + 'abcdefghijklmnopqrstuvwxyz'.split('').map(l => `${l}${starts[l] || 0}`).join(' '));
  console.log('Rare letters (start / end): ' + RARE_LETTERS.split('').map(l => `${l} ${starts[l] || 0}/${ends[l] || 0}`).join(', '));
  if (alreadyIn.length) console.log(`Note: extra.txt words already in SCOWL (can be removed): ${alreadyIn.join(', ')}`);
  if (notFound.length) console.log(`Note: blocklist.txt words not in the list (can be removed): ${notFound.join(', ')}`);

  if (!existsSync(gameJs)) { console.log('game.js not found; paste words.txt as WORD_LIST_RAW when it exists.'); return; }
  const src = readFileSync(gameJs, 'utf8');
  const line = /^const WORD_LIST_RAW = '[a-z ]*';$/m;
  if (!line.test(src)) { console.log('game.js has no `const WORD_LIST_RAW = \'…\';` line; not updated.'); return; }
  writeFileSync(gameJs, src.replace(line, `const WORD_LIST_RAW = '${raw}';`));
  console.log('Updated WORD_LIST_RAW in game.js.');
}

main();
