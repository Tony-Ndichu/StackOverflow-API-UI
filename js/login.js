//START OF USER LOGIN

var loginform = document.getElementById('login-form');

function makeElement(message, parentId, elementType, status){
    elem = document.createElement(elementType);

    if (status == 200){
    elem.innerHTML = `<div class="green alert"> ${message} <div/>`
  } else {
    elem.innerHTML = `<div class="red alert"> ${message} <div/>`

  }

    parentElem = document.getElementById(parentId)
    parentElem.append(elem);
}


if (typeof(loginform) != 'undefined' && loginform != null)
{
loginform.addEventListener('submit', function(event) {

    event.preventDefault();

    const uname = document.getElementById('uname').value
    const logpass = document.getElementById('logpass').value

    var data = {username: uname,
                password : logpass};

    fetch(`${baseUrl}/auth/login` , {

      method: 'POST', // or 'PUT'
      body: JSON.stringify(data), // data can be `string` or {object}!
      headers:{
        "Access-Control-Allow-Origin": "*",
        'Content-Type': 'application/json'
      },

  })
     .then((res) => {
        res.json().then((data) => {

            document.getElementById("messaging").innerHTML = "",
            makeElement(data.message, 'messaging', 'div', res.status),
            localStorage.setItem('thetoken', data.access_token);
            localStorage.setItem('user_id', data.user_id)

            if (res.status == 200){
                window.location.href = 'home.html';
            }
                })
            });
        });
}

//END OF USER LOGIN


let toRegister = document.getElementById('redirect-to-register');


toRegister.onclick = () => {
    redirect('Sign-Up.html')
}