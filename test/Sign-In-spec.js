var assert = require('assert');
var jsdom = require('mocha-jsdom');
var jsdom = require('jsdom');
var isomorphic_fetch =  require('isomorphic-fetch')
require('jsdom-global')()

if (typeof window !== 'undefined') {
    const swal = require('sweetalert');
}

var jsdom = require('jsdom');
const { JSDOM } = jsdom;

const { document } = (new JSDOM('')).window;
global.document = document;

var window = document.defaultView;

global.window = window

const my_div = document.createElement('div')
my_div.innerHTML = `<button class="f-p-login themecolor-bg txt-wht pointer" id="redirect-to-register">Sign-Up</button>`

const loginform = document.createElement('div')
loginform.innerHTML = `						<form class="auth-page-form" id="login-form">								
<input type="text" id="uname" name="username" placeholder="Username or email" />		
<input type="password" id="logpass" name="password" placeholder="Password" />
<button id="submit-login" type="submit" class="f-p-signup themecolor-bg txt-wht pointer">Log-In</button>
</form>`

document.body.appendChild(loginform)
document.body.appendChild(my_div)

it('Gets the url', () => {
    assert.equal(window.baseURL) == 'https://finalstack.herokuapp.com/api/v1';
});



document.getElementById('redirect-to-register');


const operations = require('../js/login.js');
