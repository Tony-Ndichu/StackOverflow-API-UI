//START OF USER REGISTRATION

var regform = document.getElementById('registration-form');


function makeElement(message, parentId, elementType){
    elem = document.createElement(elementType);
    elem.innerHTML = `<div class="alert"> ${message} <div/>`
    parentElem = document.getElementById(parentId)
    parentElem.append(elem);
}


if (typeof(regform) != 'undefined' && regform != null)
{

regform.addEventListener('submit', function(event) {

    event.preventDefault();



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

    fetch(`${baseUrl}/auth/signup`, {

  method: 'POST', // or 'PUT'
  body: JSON.stringify(data), // data can be `string` or {object}!
  headers:{
    "Access-Control-Allow-Origin": "*",
    'Content-Type': 'application/json'
  }
})
    .then((res) => {
        res.json().then((data) => {
            console.log(data),
            document.getElementById("messaging").innerHTML = "",
            makeElement(data.message, 'messaging', 'div')

                })
            });
        });
}