const PORT = 8000
const express = require('express')
const cors = require('cors')
const axios = require('axios')
const fs = require('fs')
const FormData = require('form-data')
const path = require('path')
const https = require('https')
require('dotenv').config()

const app = express()

app.use(cors())

app.get('/', (req, res) => {
    res.json('hi')
})

// New route to handle Face++ API request
app.get('/mergeface', (req, res) => {
  const http_url = 'https://api-cn.faceplusplus.com/imagepp/v1/mergeface';
  const key = process.env.REACT_APP_API_KEY;
  const secret = process.env.REACT_APP_API_SECRET;
  const filepath = 'src/components/img/profile_pic_guy.jpeg';
  const filepath2 = 'src/components/img/woman_dating.jpeg';
  
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
      ...form.getHeaders(),
    },
  };
  
  const httpreq = https.request(http_url, options, (response) => {
    let data = '';
    response.on('data', (chunk) => {
      data += chunk;
    });
    response.on('end', () => {
      console.log(data);
      res.json(data); // return the Face++ API response to the client
    });
  });
  
  form.pipe(httpreq);
  
  httpreq.on('error', (error) => {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' }); // handle errors
  });
  
  httpreq.setTimeout(5000, () => {
    httpreq.destroy(); // may need to switch to abort
  });
});

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`))
