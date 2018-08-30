window.onload = () =>{
	getQuestions()
}

function makeElement(id, name, title, description, parentId,  elementType){
    elem = document.createElement(elementType);
    elem.innerHTML = `<div class="q-box">

					<p class="q-name fs-12">Asked by ${name}</p>
			

					<p class="q-que fs-20 fw-800 ">${title}</p>

					<p class="q-que-xtr fs-14"> ${description}</p>


					
					<div class="specs">
						<div class="spec-answ themecolor-text"><i class="fas fa-pencil-alt"></i> 19 answers</div>
					</div>

					<button class="view themecolor-bg  view txt-wht pointer">View</button>
				
				 </div>`

    elem.setAttribute('data-id' , id);
    parentElem = document.getElementById(parentId)
    console.log(parent) 
    parentElem.append(elem);
}

var url = "https://finalstack.herokuapp.com/api/v1/questions";

const getQuestions = () => {
    console.log("Fetching questions ...")
    fetch(url , {
        method: "GET",
    })
    .then((res) => {
        res.json().then((data) => {
            console.log(data)
				for (let i in data.list) {
					makeElement(data.list[i]['question_id'],data.list[i]['user_name'], data.list[i]['title'], data.list[i]['description'], 'root', 'div')

				}
			});
        });
    }



var overlay = document.getElementById('overlay');
let modalOpener = document.getElementById('open-modal')
let modalCloser = document.getElementById('close-modal')



	modalOpener.onclick = function () {
         overlay.classList.remove("is-hidden");
     }

	modalCloser.onclick = function () {

   overlay.classList.add("is-hidden");
}



//START OF USER LOGIN

var questionform = document.getElementById('question-form');

if (typeof(questionform) != 'undefined' && questionform != null)
{
questionform.addEventListener('submit', function(event) {

    event.preventDefault();

    const title = document.getElementById('title').value
    const description = document.getElementById('descr').value

    var data = {title : title,
                description : description } ;
    var url = "http://127.0.0.1:5000/api/v1/questions";

    fetch(url , {

      method: 'POST', // or 'PUT'
      body: JSON.stringify(data), // data can be `string` or {object}!
      headers:{
        "Access-Control-Allow-Origin": "*",
        'Content-Type': 'application/json'
      },

  })
    .then(res => res.json(res.status))
    .then(data => {
      if (data.message == 'Sorry, we have no user with those credentials'){
           console(data.message);
         }

    })
})
}

//END OF USER LOGIN

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

function toggleMenuBody(){ 

	var menuid = document.getElementById("bodyMenu")

if ( menuid.classList.contains('not-visible') ){

menuid.classList.remove('not-visible');
menuid.classList.add('visible');
 
}else{
	menuid.classList.remove('visible');
menuid.classList.add('not-visible');
}
}


function toggleMenuButton(){
	
	var menu_button = document.getElementById("menu")

if ( menu_button.classList.contains('show') ){

menu_button.classList.remove('show');
menu_button.classList.add('hide');
 
}else{
	menu_button.classList.remove('hide');
	menu_button.classList.add('show');
}
}


function toggleCloseButton(){
	
	var close_button = document.getElementById("closer")

if ( close_button.classList.contains('show') ){

close_button.classList.remove('show');
close_button.classList.add('hide');
 
}else{
	close_button.classList.remove('hide');
	close_button.classList.add('show');
}
}