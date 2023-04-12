const express = require('express');
const https = require('https');
const Buffer = require('buffer').Buffer;
const app = express();
const PORT = process.env.PORT || 3000;

const PHYLLO_CREATE_TOKEN_URL = "https://api.sandbox.getphyllo.com/v1/sdk-tokens";
const PHYLLO_CLIENT_ID = "c127b69e-ec63-4000-8956-fea5be8566e3";
const PHYLLO_SECRET_ID = "006476f7-6063-4319-aac0-fdf6a3b1cd53";

app.use(express.json());
//create user
app.post('/create-user', (req, res) => {
    let headers = {
      "Authorization": "Basic " + Buffer.from(PHYLLO_CLIENT_ID + ":" + PHYLLO_SECRET_ID).toString('base64'),
      "Content-Type": "application/json"
    };
    
    const postData = JSON.stringify(req.body);
    
    const options = {
      hostname: 'api.sandbox.getphyllo.com',
      port: 443,
      path: '/v1/users',
      method: 'POST',
      headers: headers
    };
    
    const request = https.request(options, (response) => {
      let data = '';
      
      response.on('data', (chunk) => {
        data += chunk;
      });
      
      response.on('end', () => {
        const result = JSON.parse(data);
        return res.status(response.statusCode).json(result);
      });
    });
    
    request.on('error', (err) => {
      return res.status(err.statusCode).json(err);
    });
    
    request.write(postData);
    request.end();
  });
  // get user
  app.get('/get-user', (req, res) => {
    let headers = {
      "Authorization": "Basic " + Buffer.from(PHYLLO_CLIENT_ID + ":" + PHYLLO_SECRET_ID).toString('base64')
    };
    
    const options = {
      hostname: 'api.sandbox.getphyllo.com',
      port: 443,
      path: '/v1/users',
      method: 'GET',
      headers: headers
    };
    
    const request = https.request(options, (response) => {
      let data = '';
      
      response.on('data', (chunk) => {
        data += chunk;
      });
      
      response.on('end', () => {
        const result = JSON.parse(data);
        return res.status(response.statusCode).json(result);
      });
    });
    
    request.on('error', (err) => {
      return res.status(err.statusCode).json(err);
    });
    
    request.end();
  });


  // create token
    app.post('/create-token', async (req, res) => {
    let headers = {
        "Authorization": "Basic " + Buffer.from(PHYLLO_CLIENT_ID + ":" + PHYLLO_SECRET_ID).toString("base64"),
        "Content-Type": "application/json"
    };

    try {
        const options = {
        method: "POST",
        headers: headers,
        };

        const request = https.request(PHYLLO_CREATE_TOKEN_URL, options, (response) => {
        let data = "";
        response.on("data", (chunk) => {
            data += chunk;
        });
        response.on("end", () => {
            const result = JSON.parse(data);
            return res.status(response.statusCode).json(result);
        });
        });

        request.on("error", (err) => {
        return res.status(500).json({ error: err });
        });

        request.write(JSON.stringify(req.body));
        request.end();

    } catch (err) {
        return res.status(500).json({ error: err });
    }
    });

    app.get('/get-accounts', (req, res) => {
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

//   app.get('/account', (req, res) => {
//     // the configuration options for PhylloConnect
//     const config = {
//       clientDisplayName: "Zeeshan Riasat",
//       environment: "sandbox",
//       userId: "bc775c99-215f-46bb-bafc-a8fc4db1a632",
//       token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiYmM3NzVjOTktMjE1Zi00NmJiLWJhZmMtYThmYzRkYjFhNjMyIiwidGVuYW50X2lkIjoiMGNiZDNmM2EtYzE3ZS00M2MwLTk1ZDYtZWE0NGM2NTNhNWNmIiwidGVuYW50X2FwcF9pZCI6ImMxMjdiNjllLWVjNjMtNDAwMC04OTU2LWZlYTViZTg1NjZlMyIsInByb2R1Y3RzIjpbIkVOR0FHRU1FTlRfQVVESUVOQ0UiLCJJREVOVElUWSIsIklERU5USVRZX0FVRElFTkNFIiwiRU5HQUdFTUVOVCIsIklOQ09NRSJdLCJpc3MiOiJodHRwczovL2FwaS5zYW5kYm94LmdldHBoeWxsby5jb20iLCJhdWQiOiJodHRwczovL2FwaS5zYW5kYm94LmdldHBoeWxsby5jb20vdjEvaW50ZXJuYWwiLCJpYXQiOjE2ODEyMjI3NjMuMzY5NDExLCJleHAiOjE2ODE4Mjc1NjMuMzY5NH0.P7DOP9bpWdguQD5ZerxsAreJlXS7OnoPrLNH6FwfCv8"
//     };
    
//     // initialize PhylloConnect and handle events
//     const phylloConnect = PhylloConnect.initialize(config);
//     phylloConnect.on("accountConnected", (accountId, workplatformId, userId) => {
//       console.log(`onAccountConnected: ${accountId}, ${workplatformId}, ${userId}`);
//     });
//     phylloConnect.on("accountDisconnected", (accountId, workplatformId, userId) => {
//       console.log(`onAccountDisconnected: ${accountId}, ${workplatformId}, ${userId}`);
//     });
//     phylloConnect.on("tokenExpired", (userId) => {
//       console.log(`onTokenExpired: ${userId}`);
//     });
//     phylloConnect.on("exit", (reason, userId) => {
//       console.log(`onExit: ${reason}, ${userId}`);
//     });
//     phylloConnect.on("connectionFailure", (reason, workplatformId, userId) => {
//       console.log(`onConnectionFailure: ${reason}, ${workplatformId}, ${userId}`);
//     });
    
//     // return a JSON response with a success message
//     res.json({ message: 'PhylloConnect initialized successfully!' });
//   });
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
