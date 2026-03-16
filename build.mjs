import * as esbuild from 'esbuild';
import fs from 'node:fs';

function stripIndentation(text) {
  return text.replace(/\n|\s{2}/g, '');
}

const rawBuildResult = await esbuild.build({
  entryPoints: ['index.js'],
  bundle: true,
  minify: true,
  target: 'es6',
  format: 'iife',
  globalName: 'hljsJacGrammar',
  write: false
});

const bundledText = rawBuildResult.outputFiles?.[0]?.text;

if (!bundledText) {
  throw new Error('Failed to generate Jac grammar bundle.');
}

if (!fs.existsSync('./dist')) {
  fs.mkdirSync('./dist', { recursive: true });
}

// ESM bundle that exports the grammar function.
fs.writeFileSync(
  './dist/jac.es.min.js',
  stripIndentation(`${bundledText}export default hljsJacGrammar`)
);

// Browser IIFE bundle that self-registers with highlight.js.
fs.writeFileSync(
  './dist/jac.min.js',
  stripIndentation(`(()=>{${bundledText}hljs.registerLanguage('jac',hljsJacGrammar)})()`)
);
