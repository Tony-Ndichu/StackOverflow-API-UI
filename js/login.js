//START OF USER LOGIN

var loginform = document.getElementById('login-form');

function makeElement(message, parentId, elementType){
    elem = document.createElement(elementType);
    elem.innerHTML = `<div class="alert"> ${message} <div/>`
    parentElem = document.getElementById(parentId)
    parentElem.innerHTML(elem);
}


if (typeof(loginform) != 'undefined' && loginform != null)
{
loginform.addEventListener('submit', function(event) {

    event.preventDefault();

    const uname = document.getElementById('uname').value
    const logpass = document.getElementById('logpass').value

    var data = {username: uname,
                password : logpass};
    var url = "https://finalstack.herokuapp.com/api/v1/auth/login";

    fetch(url , {

      method: 'POST', // or 'PUT'
      body: JSON.stringify(data), // data can be `string` or {object}!
      headers:{
        "Access-Control-Allow-Origin": "*",
        'Content-Type': 'application/json'
      },

  })
     .then((res) => {
        res.json().then((data) => {
            console.log(data),
            makeElement(data.message, 'messaging', 'div')

                })
            });
        });
}

//END OF USER LOGIN
