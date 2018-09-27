var token = localStorage.getItem('thetoken');


window.onload = () =>{
	getQuestions()
}

const makeElement = (id, name, title, description, answers, parentId,  elementType, message, status, time) => {
    elem = document.createElement(elementType)
    if (status == 200){
    elem.innerHTML = `<div class="q-box">

					<p class="q-name fs-12">Asked by ${name}</p>
			

					<p class="q-que fs-20 fw-800 ">${title}</p>

					<p class="q-que-xtr fs-14"> ${description}</p>


					
					<div class="specs">
						<div class="spec-answ answ themecolor-text"><i class="fas fa-comments"></i>&nbsp</i>${answers} answers</div>
					</div>

          <div class="time">${time}</div>
					<button class="view themecolor-bg txt-wht pointer" onClick="viewQuestion(${id})"  id="question${id}" value="${id}">View</button>
				
				 </div>`
        } else {
          elem.innerHTML = `<div class="q-box no-questions">${message}</div>`
        }

    elem.setAttribute('data-id' , id);
    elem.setAttribute('class' , 'theme-box');
    parentElem = document.getElementById(parentId)
    parentElem.append(elem)
}

const getQuestions = () => {
    console.log("Fetching questions ...")
    fetch(`${baseUrl}/questions` , {
        method: "GET",
          headers:{
    "Access-Control-Allow-Origin": "*"
  },
    })
    .then((res) => {
        res.json().then((data) => {
          if (res.status == 200){
				for (let i in data.list) {
					makeElement(data.list[i]['question_id'],data.list[i]['user_name'], data.list[i]['title'], data.list[i]['description'], data.list[i]['no_of_answers'], 'root', 'div', data.message, res.status, data.list[i]['time'])
				}
      } else {
          makeElement(null, null, null, null, null, 'root', 'div', data.message, res.status)
      }
			});
        });
    }

//send data-id
const viewQuestion = (id) => {
  console.log("This is the id: " + id)
  localStorage.setItem('questionid', id);
  window.location.href = 'ViewQuestion.html';
}
//end of send data-id


var overlay = document.getElementById('overlay');
let modalOpener = document.getElementById('open-modal')
let modalCloser = document.getElementById('close-modal')



	modalOpener.onclick = function () {
         overlay.classList.remove("is-hidden");
     }

	modalCloser.onclick = function () {

   overlay.classList.add("is-hidden");
}


let theMenuButton = document.getElementById('menu');

let theCloseButton = document.getElementById('closer');


theMenuButton.onclick = () => {
	toggleMenuBody()
	toggleCloseButton()
}

theCloseButton.onclick = () => {
	toggleMenuBody()
	toggleCloseButton()
}

const toggleMenuBody = () =>{ 

	var menuid = document.getElementById("bodyMenu")

if ( menuid.classList.contains('not-visible') ){

menuid.classList.remove('not-visible');
menuid.classList.add('visible');
 
}else{
	menuid.classList.remove('visible');
menuid.classList.add('not-visible');
}
}


const toggleMenuButton = () =>{
	
	var menu_button = document.getElementById("menu")

if ( menu_button.classList.contains('show') ){

menu_button.classList.remove('show');
menu_button.classList.add('hide');
 
}else{
	menu_button.classList.remove('hide');
	menu_button.classList.add('show');
}
}


const toggleCloseButton = () =>{
	
	var close_button = document.getElementById("closer")

if ( close_button.classList.contains('show') ){

close_button.classList.remove('show');
close_button.classList.add('hide');
 
}else{
	close_button.classList.remove('hide');
	close_button.classList.add('show');
}
}



//START OF USER POST QUESTION

var questionform = document.getElementById('question-form');


const makeQueResponse = (message, parentId, elementType, status) => {
    elem = document.createElement(elementType);

    if (status == 201){
    elem.innerHTML = `<div class="green alert"> ${message} <div/>`

} else {
    elem.innerHTML = `<div class="red alert"> ${message} <div/>`
}
    parentElem = document.getElementById(parentId)
    parentElem.append(elem);
}


if (typeof(questionform) != 'undefined' && questionform != null)
{

questionform.addEventListener('submit', function(event) {

    event.preventDefault();



    const title = document.getElementById('title').value
    const description = document.getElementById('descr').value

    var data = {title: title,
                description: description};

    fetch(`${baseUrl}/questions`, {

  method: 'POST', // or 'PUT'
  body: JSON.stringify(data), // data can be `string` or {object}!
  headers:{
    "Access-Control-Allow-Origin": "*",
    'Content-Type': 'application/json',
    'Authorization': 'Bearer '+ token
  }
})
    .then((res) => {
        res.json().then((data) => {
            document.getElementById("que-resp").innerHTML = "",
            makeQueResponse(data.message, 'que-resp', 'div', res.status),
            setTimeout(hideDialog, 5000)

            if (res.status == 201){
            document.getElementById("root").innerHTML = "",

            getQuestions()
          }



                })
            });
        });
}

const hideDialog = () => {
      document.getElementById("que-resp").innerHTML = ""
}