//START OF USER REGISTRATION

var regform = document.getElementById('registration-form');

if (typeof(regform) != 'undefined' && regform != null)
{

regform.addEventListener('submit', function(event) {

    event.preventDefault();
    var url = 'http://127.0.0.1:5000/api/v1/auth/signup';


    const fname = document.getElementById('fname').value
    const lname = document.getElementById('lname').value
    const uname = document.getElementById('uname').value
    const regmail = document.getElementById('regmail').value
    const regpass = document.getElementById('regpass').value

    var data = {first_name: fname,
                last_name: lname,
                username: uname,
                email: regmail,
                password : regpass};

    fetch(url, {

  method: 'POST', // or 'PUT'
  body: JSON.stringify(data), // data can be `string` or {object}!
  headers:{
    "Access-Control-Allow-Origin": "*",
    'Content-Type': 'application/json'
  }
})
    .then(res => res.json())
    .then(data => openDialog(data.message))
    .catch(error => console.log('Error:', error));
})

}