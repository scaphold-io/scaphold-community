/* @flow weak */
var frontMatter = require('front-matter');
var markdownIt = require('markdown-it');
var objectAssign = require('object-assign');
var Prism = require('prismjs');
require('../../prism-langs/prism-graphql');
require('../../prism-langs/prism-javascript');
require('../../prism-langs/prism-sql');
require('../../prism-langs/prism-css');
require('../../prism-langs/prism-markdown');
require('../../prism-langs/prism-jsx');
require('../../prism-langs/prism-typescript');
require('../../prism-langs/prism-bash');

// var langs = {
//   graphql: require('../../prism-langs/prism-graphql'),
//   javascript: require('../../prism-langs/prism-javascript'),
//   sql: require('../../prism-langs/prism-sql'),
//   css: require('../../prism-langs/prism-css'),
//   markdown: require('../../prism-langs/prism-markdown'),
//   jsx: require('../../prism-langs/prism-jsx'),
//   typescript: require('../../prism-langs/prism-typescript'),
//   bash: require('../../prism-langs/prism-bash'),
// };

function sleep(seconds)
{
  var e = new Date().getTime() + (seconds * 1000);
  while (new Date().getTime() <= e) {}
}

var highlight = function (str, lang) {
  var value;
  if (lang && Prism.languages[lang]) {
    value = Prism.highlight(str, Prism.languages[lang]);
  } else {
    value = Prism.highlight(str, Prism.languages.javascript);
  }
  return value;
}

const md = markdownIt({
  html: true,
  linkify: true,
  typographer: true,
  highlight,
});

module.exports = function (content) {
  this.cacheable();
  const meta = frontMatter(content);
  const body = md.render(meta.body);
  const result = objectAssign({}, meta.attributes, {
    body,
  });
  this.value = result;
  return `module.exports = ${JSON.stringify(result)}`;
};
