// const express = require('express');
// const http = require('http');
// const Buffer = require('buffer').Buffer;

// const app = express();
// const server = http.createServer(app);
// const PORT = process.env.PORT || 3000;

// const PHYLLO_CREATE_USER_URL = "https://api.sandbox.getphyllo.com/v1/users";
// const PHYLLO_CLIENT_ID = process.env.NEXT_PUBLIC_PHYLLO_CLIENT_ID;
// const PHYLLO_SECRET_ID = process.env.NEXT_PUBLIC_PHYLLO_SECRET_ID;

// app.use(express.json());

// app.post('/', (req, res) => {
//   let headers = {
//     "Authorization": "Basic " + Buffer.from(PHYLLO_CLIENT_ID + ":" + PHYLLO_SECRET_ID).toString('base64'),
//     "Content-Type": "application/json"
//   };
  
//   const postData = JSON.stringify(req.body);
  
//   const options = {
//     hostname: 'api.sandbox.getphyllo.com',
//     port: 443,
//     path: '/v1/users',
//     method: 'POST',
//     headers: headers
//   };
  
//   const request = http.request(options, (response) => {
//     let data = '';
    
//     response.on('data', (chunk) => {
//       data += chunk;
//     });
    
//     response.on('end', () => {
//       const result = JSON.parse(data);
//       return res.status(response.statusCode).json(result);
//     });
//   });
  
//   request.on('error', (err) => {
//     return res.status(err.statusCode).json(err);
//   });
  
//   request.write(postData);
//   request.end();
// });

// app.get('/', (req, res) => {
//   let headers = {
//     "Authorization": "Basic " + Buffer.from(PHYLLO_CLIENT_ID + ":" + PHYLLO_SECRET_ID).toString('base64')
//   };
  
//   const options = {
//     hostname: 'api.sandbox.getphyllo.com',
//     port: 443,
//     path: '/v1/users',
//     method: 'GET',
//     headers: headers
//   };
  
//   const request = http.request(options, (response) => {
//     let data = '';
    
//     response.on('data', (chunk) => {
//       data += chunk;
//     });
    
//     response.on('end', () => {
//       const result = JSON.parse(data);
//       return res.status(response.statusCode).json(result);
//     });
//   });
  
//   request.on('error', (err) => {
//     return res.status(err.statusCode).json(err);
//   });
  
//   request.end();
// });

// server.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });
