// OCR motorunu ve dil verilerini www/tesseract/ içine kopyalar.
// Böylece APK'nın içine girer: uygulama açılırken internetten motor/dil verisi inmez.
const fs = require('fs');
const path = require('path');

const kok = path.join(__dirname, '..');
const hedef = path.join(kok, 'www', 'tesseract');
const paket = ad => path.dirname(require.resolve(ad + '/package.json', { paths: [kok] }));
const DILLER = ['eng', 'tur', 'jpn', 'kor', 'chi_sim', 'chi_tra', 'fra', 'spa', 'deu', 'ita', 'por', 'rus', 'ind', 'ara'];

fs.rmSync(hedef, { recursive: true, force: true });
fs.mkdirSync(path.join(hedef, 'core'), { recursive: true });
fs.mkdirSync(path.join(hedef, 'lang'), { recursive: true });

const ts = paket('tesseract.js');
fs.copyFileSync(path.join(ts, 'dist', 'tesseract.min.js'), path.join(hedef, 'tesseract.min.js'));
fs.copyFileSync(path.join(ts, 'dist', 'worker.min.js'), path.join(hedef, 'worker.min.js'));

const core = paket('tesseract.js-core');
for (const f of fs.readdirSync(core)) {
  if (/^tesseract-core.*\.wasm\.js$/.test(f)) fs.copyFileSync(path.join(core, f), path.join(hedef, 'core', f));
}

const varOlan = [];
for (const d of DILLER) {
  try {
    const kaynak = path.join(paket('@tesseract.js-data/' + d), '4.0.0_best_int', d + '.traineddata.gz');
    fs.copyFileSync(kaynak, path.join(hedef, 'lang', d + '.traineddata.gz'));
    varOlan.push(d);
  } catch (e) {
    console.log('Dil atlandı:', d, '-', e.message);
  }
}

const surum = require(path.join(ts, 'package.json')).version;
fs.writeFileSync(path.join(hedef, 'manifest.json'), JSON.stringify({ surum, diller: varOlan }));
console.log('Tesseract ' + surum + ' kopyalandı. Diller: ' + varOlan.join(', '));
