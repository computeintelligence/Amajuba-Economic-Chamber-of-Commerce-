const fs = require('fs');
const https = require('https');
const path = require('path');

const url = 'https://drive.google.com/uc?export=download&id=1U1pK_hwTNvH8RQ_gE3MdnF0gkz0oLRFQ';

// ensure public directory exists
const publicPath = path.join(__dirname, 'public');
if (!fs.existsSync(publicPath)){
    fs.mkdirSync(publicPath);
}

const req = https.get(url, (res) => {
    if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        https.get(res.headers.location, (redirectRes) => {
            const file = fs.createWriteStream(path.join(publicPath, 'logo.jpg'));
            redirectRes.pipe(file);
            file.on('finish', () => {
                file.close();
                console.log('Downloaded');
            });
        });
    } else {
        const file = fs.createWriteStream(path.join(publicPath, 'logo.jpg'));
        res.pipe(file);
        file.on('finish', () => {
            file.close();
            console.log('Downloaded');
        });
    }
});
