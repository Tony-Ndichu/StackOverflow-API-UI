//START OF USER LOGIN

var loginform = document.getElementById('login-form');

if (typeof(loginform) != 'undefined' && loginform != null)
{
loginform.addEventListener('submit', function(event) {

    event.preventDefault();
    var url = 'https://finalstack.herokuapp.com/api/v1/auth/login';

    const uname = document.getElementById('uname').value
    const logpass = document.getElementById('logpass').value

    var data = {username: uname,
                password : logpass};

    fetch(url, {

  method: 'POST', // or 'PUT'
  body: JSON.stringify(data), // data can be `string` or {object}!
  headers:{
    "Access-Control-Allow-Origin": "*",
    'Content-Type': 'application/json'
  }
})
    .then(res => res.json(res.status))
    .then(data => openDialog(data.message))
})
}

//END OF USER LOGIN
