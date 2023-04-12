const express = require('express');
const https = require('https');
const app = express();
const bodyParser = require('body-parser');
const phyllo = require('phyllo');


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const PHYLLO_CREATE_TOKEN_URL = "https://api.sandbox.getphyllo.com/v1/sdk-tokens";
const PHYLLO_CLIENT_ID = "c127b69e-ec63-4000-8956-fea5be8566e3";
const PHYLLO_SECRET_ID = "006476f7-6063-4319-aac0-fdf6a3b1cd53";

function getCredentials(platform) {
  // retrieve the credentials for the platform from a database or other secure storage
  const credentials = {
    clientId: PHYLLO_CLIENT_ID,
    clientSecret: PHYLLO_SECRET_ID
  };
  return credentials;
}


// Endpoint for authenticating social media accounts through Phyllo
app.post('/auth', (req, res) => {
  const platform = req.body.platform;
  const user_id = req.body.user_id;
  const clientDisplayName = 'YOUR_APP_NAME';
  const environment = 'sandbox';
  const redirectUri = 'YOUR_APP_REDIRECT_URI';
  const authUrl = `https://connect.getphyllo.com/oauth2/${platform}?client_id=${PHYLLO_CLIENT_ID}&client_secret=${PHYLLO_SECRET_ID}&redirect_uri=${redirectUri}&display=${clientDisplayName}&user_id=${user_id}`;

  res.redirect(authUrl);
});

// Endpoint for handling the redirect URI after authentication
app.get('/auth/:platform/callback', (req, res) => {
  const platform = req.params.platform;
  const code = req.query.code;
  const redirectUri = 'YOUR_APP_REDIRECT_URI';
  const userId = req.query.state;

  const headers = {
    'Content-Type': 'application/x-www-form-urlencoded',
    'Authorization': 'Basic ' + Buffer.from(PHYLLO_CLIENT_ID + ':' + PHYLLO_SECRET_ID).toString('base64')
  };

  const postData = `grant_type=authorization_code&code=${code}&redirect_uri=${redirectUri}`;

  const options = {
    hostname: 'connect.getphyllo.com',
    path: `/oauth2/${platform}/token`,
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
      const accessToken = result.access_token;
      const refreshToken = result.refresh_token;
      const expiresIn = result.expires_in;

      // Do something with the access token, refresh token, and expiration time (in seconds)
      // For example, store them in a database for later use

      return res.status(response.statusCode).json(result);
    });
  });

  request.on('error', (err) => {
    return res.status(err.statusCode).json(err);
  });

  request.write(postData);
  request.end();
});

app.get('/auth/:platform', (req, res) => {
  const platform = req.params.platform;
  const { clientId, clientSecret } = getCredentials(platform);
  const redirectUri = `http://${req.headers.host}/auth/${platform}/callback`;

  const phylloInstance = new phyllo(platform, clientId, clientSecret, redirectUri);

  const authUrl = phylloInstance.generateAuthUrl();

  res.redirect(authUrl);
});


const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
