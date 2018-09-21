//START OF USER REGISTRATION

var regform = document.getElementById('registration-form');


function makeElement(message, parentId, elementType, status){
    elem = document.createElement(elementType);

    if (status == 201){
    elem.innerHTML = `<div class="green alert"> ${message} <div/>`

} else {
    elem.innerHTML = `<div class="red alert"> ${message} <div/>`
}
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
            document.getElementById("messaging").innerHTML = "",
            makeElement(data.message, 'messaging', 'div', res.status)

            if (res.status == 201){
                window.location.href = 'Sign-In.html';
            }


                })
            });
        });
}

let toLogin = document.getElementById('redirect-to-login');


toLogin.onclick = () => {
    redirect('Sign-In.html')
}


const redirect = (pagename) => {
    window.location.href = `${pagename}`
}