const https = require('https');
const fs = require('fs');
const FormData = require('form-data');
const path = require('path');
//MUST MAKE REQUEST TO BACKEND PORT
const http_url = 'https://api-us.faceplusplus.com/facepp/v3/detect';
const key = 'please entry YOUR API_KEY';
const secret = 'please entry YOUR API_SECRET';
const filepath = 'YOUR IMAGE PATH';
const boundary = `----------${hex(Math.floor(new Date().getTime() / 1000))}`;

const form = new FormData();
form.append('api_key', key);
form.append('api_secret', secret);
form.append('image_file', fs.createReadStream(filepath), {
  filename: path.basename(filepath),
});

const options = {
  method: 'POST',
  headers: {
    'Content-Type': `multipart/form-data; boundary=${boundary}`,
    ...form.getHeaders(),
  },
};

const req = https.request(http_url, options, (res) => {
  let data = '';
  res.on('data', (chunk) => {
    data += chunk;
  });
  res.on('end', () => {
    console.log(data);
  });
});

form.pipe(req);

req.on('error', (error) => {
  console.error(error);
});

req.setTimeout(5000, () => {
  req.abort();
});
