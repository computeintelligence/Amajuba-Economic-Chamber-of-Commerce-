const fs = require('fs');
const stats = fs.statSync('./public/logo.jpg');
console.log('Size:', stats.size);
