const https = require('https');
const fs = require('fs');
const FormData = require('form-data');
const path = require('path');

//MUST MAKE REQUEST TO BACKEND PORT
const http_url = 'https://api-cn.faceplusplus.com/imagepp/v1/mergeface';
const key = 'CPm1i9jA9ysFJ6cHrlvWsYMwK9Ajm1gd	';
const secret = 'm1kTOEaviZbWenIFoTKEXB6RNGqalcT7';
const filepath = 'src/components/img/profile_pic_guy.jpeg';
const filepath2 = 'src/components/img/woman_dating.jpeg';
const boundary = `----------${Math.floor(new Date().getTime() / 1000).toString(16)}`;

export function makerequest() { 
  const form = new FormData();
  form.append('api_key', key);
  form.append('api_secret', secret);
  form.append('template_file', fs.createReadStream(filepath), {
    filename: path.basename(filepath),
  });
  form.append('template_rectangle', "70,80,100,100");
  form.append('merge_file', fs.createReadStream(filepath2), {
    filename: path.basename(filepath2),
  });
  form.append('merge_rate', "70");
  
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
    req.destroy(); // may need to switch to abort
  });
}
