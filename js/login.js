//START OF USER LOGIN

var loginform = document.getElementById('login-form');

if (typeof(loginform) != 'undefined' && loginform != null)
{
loginform.addEventListener('submit', function(event) {

    event.preventDefault();

    const uname = document.getElementById('uname').value
    const logpass = document.getElementById('logpass').value

    var data = {username: uname,
                password : logpass};

    fetch(`${baseUrl}/auth/login`, {

  method: 'POST', // or 'PUT'
  body: JSON.stringify(data), // data can be `string` or {object}!
  headers:{
    "Access-Control-Allow-Origin": "*",
    'Content-Type': 'application/json'
  }
})
    .then(res => res.json(res.status))
    .then(data =>{
      if (data.message == 'Sorry, we have no user with those credentials'){
           openDialog(data.message);
           console.log(data.access_token);

      }else{
        
      }
    })
})
}

//END OF USER LOGIN
