/**
 * Server side code for Algorithm Helper.
 *
 * Copyright 2018 Eric Liu. All rights reserved.
 *
 * Licensed under the MIT License (the "License"), you may not use this file
 * except in compliance with the License.
 *
 * You may obtain a copy of the License at
 *
 *      https://opensource.org/licenses/MIT
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */
const bodyParser = require('body-parser');
const express = require('express');
const fs = require('fs');
const path = require('path');
const session = require('express-session');

const app = express();

// Utils:

const publicPath = path.join(__dirname, '..', 'public');
const port = process.env.PORT || 5000;

app.use(express.static(publicPath));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(session({
  secret: '<Algorithm Helper Secret>',
  resave: false,
  saveUninitialized: true,
  cookie: {
    secure: false
  }
}));

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});

/**
 * Account Routes
 */
app.post('/accounts/login', (req, res) => {

});

app.post('/accounts/sign-up', (req, res) => {

});

/**
 * Data Routes
 */



app.get('*', (req, res) => {
  res.sendFile(path.join(publicPath, 'index.html'));
});

module.exports = app;
