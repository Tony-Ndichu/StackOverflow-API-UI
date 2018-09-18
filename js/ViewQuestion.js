var que_id =  localStorage.getItem('questionid');
var token = localStorage.getItem('thetoken');



const makeElement = (id, name, title, description, answers, parentId,  elementType, message, status) => {
    elem = document.createElement(elementType)
    if (status == 200){
    elem.innerHTML = `<div class="q-box">

					<p class="q-name fs-12">Asked by ${name}</p>
			

					<p class="q-que fs-20 fw-800 ">${title}</p>

					<p class="q-que-xtr fs-14"> ${description}</p>


					
					<div class="specs">
						<div class="spec-answ themecolor-text"><i class="fas fa-pencil-alt"></i>${answers} answers</div>
					</div>

					<button class="view themecolor-bg txt-wht pointer" onClick="viewQuestion(${id})"  id="question${id}" value="${id}">View</button>
				
				 </div>`
        } else {
          elem.innerHTML = `<div class="q-box no-questions">${message}</div>`
        }

    elem.setAttribute('data-id' , id);
    parentElem = document.getElementById(parentId)
    parentElem.append(elem)
}


const theQuestion = (id, name, title, description, parentId,  elementType) => {
    elem = document.createElement(elementType)

    elem.innerHTML = `<p class="q-name fs-12">Asked by ${name}</p>
					
					<p class="q-que fs-20 fw-800">${title}</p>

					<p class="q-que-xtr fs-14">${description}</p>`


    elem.setAttribute('data-id' , id);
    parentElem = document.getElementById(parentId)
    parentElem.append(elem)
}


const theAnswers = (id, name, body, parentId,  elementType) => {
    elem = document.createElement(elementType)

    elem.innerHTML = `<div class="q-box">

						<p class="q-name fs-12">Answer by ${name}</p>
					
						<p class="q-que-xtr fs-14">${body}</p>

						<p class="q-time fs-12 fw-200 ta-r p-r-1">Posted about 1 weeks ago</p>

					
					</div>`


    elem.setAttribute('data-id' , id);
    parentElem = document.getElementById(parentId)
    parentElem.append(elem)
}


const openQuestion = () => {
    fetch(`${baseUrl}/questions/${que_id}` , {
        method: "GET",
          headers:{
    "Access-Control-Allow-Origin": "*"
  },
    })
    .then((res) => {
        res.json().then((data) => {
          if (res.status == 200){
          		theQuestion(data.question.questionid, data.question.user_name, data.question.title, data.question.description, 'the-question', 'div')
          		 document.getElementById("no-of-answers").innerHTML = data.question.no_of_answers

          		for (let i in data.answers) {
					theAnswers(data.answers[i]['answer_id'],data.answers[i]['user_name'], data.answers[i]['answer_body'], 'the-answers', 'div')
				}
      } else {
          console.log("Nada")
      }
			});
        });
    }

//START OF USER POST ANSWER

var answerform = document.getElementById('answer-form');


const makeAnsResponse = (message, parentId, elementType, status) => {
    elem = document.createElement(elementType);

    if (status == 201){
    elem.innerHTML = `<div class="green alert"> ${message} <div/>`

} else {
    elem.innerHTML = `<div class="red alert"> ${message} <div/>`
}
    parentElem = document.getElementById(parentId)
    parentElem.append(elem);
}


if (typeof(answerform) != 'undefined' && answerform != null)
{

answerform.addEventListener('submit', function(event) {

    event.preventDefault();



    const answer = document.getElementById('answer-box').value

    var data = {answer: answer};

    fetch(`${baseUrl}/questions/${que_id}/answers`, {

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
            document.getElementById("ans-resp").innerHTML = "",
            makeAnsResponse(data.message, 'ans-resp', 'div', res.status),
            setTimeout(hideDialog, 5000)

            if (res.status == 201){
            document.getElementById("the-question").innerHTML = "",
            document.getElementById("the-answers").innerHTML = "",

            openQuestion()
          }



                })
            });
        });
}

const hideDialog = () => {
      document.getElementById("ans-resp").innerHTML = ""
}