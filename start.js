const { exec } = require('child_process');

// Iniciar o servidor Node.js
const nodeProcess = exec('node index.js');
nodeProcess.stdout.on('data', (data) => {
    console.log(`Node.js: ${data}`);
});

nodeProcess.stderr.on('data', (data) => {
    console.error(`Node.js error: ${data}`);
});

// Iniciar o ngrok
const ngrokProcess = exec('ngrok http 7777');
ngrokProcess.stdout.on('data', (data) => {
    console.log(`ngrok: ${data}`);
});

ngrokProcess.stderr.on('data', (data) => {
    console.error(`ngrok error: ${data}`);
});
