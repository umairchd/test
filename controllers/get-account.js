const express = require('express');
const router = express.Router();
const https = require('https');
const Buffer = require('buffer').Buffer;

const PHYLLO_GET_ACCOUNTS_URL = "https://api.sandbox.getphyllo.com/v1/accounts";

const PHYLLO_CLIENT_ID = process.env.PHYLLO_CLIENT_ID;
const PHYLLO_SECRET_ID = process.env.PHYLLO_SECRET_ID;

router.get('/get-accounts', (req, res) => {
  const { user_id } = req.query;
  
  let auth = `${PHYLLO_CLIENT_ID}:${PHYLLO_SECRET_ID}`;
  let buffer = new Buffer(auth);
  let encodedAuth = buffer.toString('base64');

  let headers = {
    "Authorization": `Basic ${encodedAuth}`,
    "Content-Type": "application/json"
  }

  let options = {
    hostname: 'api.sandbox.getphyllo.com',
    path: `/v1/accounts?user_id=${user_id}`,
    headers: headers
  };

  https.get(options, (response) => {
    let data = '';
    response.on('data', (chunk) => {
      data += chunk;
    });
    response.on('end', () => {
      let result = JSON.parse(data);
      return res.status(response.statusCode).json(result);
    });
  }).on("error", (err) => {
    return res.status(500).json({ error: err.message });
  });
});

module.exports = router;
