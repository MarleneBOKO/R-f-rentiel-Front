const { exec } = require('child_process');

const command = 'npx vue-cli-service serve --port 8080';

const proc = exec(command, (err, stdout, stderr) => {
  if (err) {
    console.error('Erreur :', err);
    return;
  }
  console.log(stdout);
});

proc.stdout.pipe(process.stdout);
proc.stderr.pipe(process.stderr);
