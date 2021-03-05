const compiler = require('vue-template-compiler');

let content = '';

process.stdin.resume();

process.stdin.on('data', buf => {
  content += buf.toString();
});

process.stdin.on('end', () => {
  const parsed = compiler.parseComponent(content);
  const template = parsed.template ? parsed.template.content : '';
  const script = parsed.script ? parsed.script.content : '';

  const templateEscaped = template.trim().replace(/`/g, '\\`');
  const scriptWithTemplate = script.match(/export default ?\{/)
    ? script.replace(/export default ?\{/, `$&\n\ttemplate: \`\n${templateEscaped}\`,`)
    : `${script}\n export default {\n\ttemplate: \`\n${templateEscaped}\`};`;

  process.stdout.write(scriptWithTemplate);
});
