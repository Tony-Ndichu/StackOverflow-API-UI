
const profilePage = () => {
    getUserRecent();
    getProfile();
    getMostAnswered()
}


const makeElement = (id, name, title, description, answers, parentId,  elementType, message, status, time) => {
    elem = document.createElement(elementType)
    if (status == 200){
    elem.innerHTML = `<div class="q-box">

          <p class="q-name fs-12">Asked by You</p>
          
          <p class="q-que fs-20 fw-800 ">${title}</p>

          <p class="q-que-xtr fs-14">${description}</p>

          <div class="specs">
            <div class="spec-answ answ themecolor-text"><i class="fas fa-pencil-alt"></i> ${answers} answers</div>
            <div class="themecolor-text del-button " onClick="deleteQuestion(${id})" >Delete<i class="fas fa-trash-alt fa-lg"></i></div>

          </div>
          <div class="time">${time}</div>

<button class="view themecolor-bg txt-wht pointer" onClick="viewQuestion(${id})"  id="question${id}" value="${id}">View</button>

        </div>`
        } else {
          elem.innerHTML = `<div class="q-box no-questions">${message}</div>`
        }

    elem.setAttribute('data-id' , id);
    elem.setAttribute('id' , `div${id}`);

    parentElem = document.getElementById(parentId)
    parentElem.append(elem)
}


const getUserRecent = () =>{
    console.log("Fetching user's most recent questions ...")
    fetch(`${baseUrl}/auth/questions` , {
        method: "GET",
          headers:{
    "Access-Control-Allow-Origin": "*",
    'Content-Type': 'application/json',
    'Authorization': 'Bearer '+ token
  },
    })
    .then((res) => {
        res.json().then((data) => {
          if (res.status == 200){
        for (let i in data.list) {
          makeElement(data.list[i]['question_id'],data.list[i]['user_name'], data.list[i]['title'], data.list[i]['description'], data.list[i]['no_of_answers'], 'user-recent', 'div', data.message, res.status, data.list[i]['time'])
        }
      } else {
          makeElement(null, null, null, null, null, 'user-recent', 'div', data.message, res.status)
      }
      });
        });
}




const getMostAnswered = () =>{
    console.log("Fetching user's most answered questions ...")
    fetch(`${baseUrl}/auth/questions/most_answered` , {
        method: "GET",
          headers:{
    "Access-Control-Allow-Origin": "*",
    'Content-Type': 'application/json',
    'Authorization': 'Bearer '+ token
  },
    })
    .then((res) => {
        res.json().then((data) => {
          if (res.status == 200){
        for (let i in data.list) {
          makeElement(data.list[i]['question_id'],data.list[i]['user_name'], data.list[i]['title'], data.list[i]['description'], data.list[i]['no_of_answers'], 'user-most-answered', 'div', data.message, res.status, data.list[i]['time'])
        }
      } else {
          makeElement(null, null, null, null, null, 'user-most-answered', 'div', data.message, res.status)
      }
      });
        });
}


const deleteQuestion = (id) =>{
    console.log("Deleting question ...")
    fetch(`${baseUrl}/questions/${id}` , {
        method: "DELETE",
          headers:{
    "Access-Control-Allow-Origin": "*",
    'Content-Type': 'application/json',
    'Authorization': 'Bearer '+ token
  },
    })
    .then((res) => {
       var to_delete = document.getElementById(`div${id}`);
       removeFadeOut(to_delete, 2000);
        });
}

const removeFadeOut = (element, speed) =>{
  var seconds = speed/1000;
  element.style.transition = "opacity " + seconds + "s ease";
  element.style.opacity = 0;
  setTimeout(() => {
    element.parentNode.removeChild(element);

  }, speed)
}

//send data-id
const viewQuestion = (id) => {
  console.log("This is the id: " + id)
  localStorage.setItem('questionid', id);
  window.location.href = 'ViewQuestion.html';
}
//end of send data-id