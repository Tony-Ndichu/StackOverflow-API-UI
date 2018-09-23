
const profilePage = () => {
    getUserRecent();
    getProfile();
    getMostAnswered()
}


const makeElement = (id, name, title, description, answers, parentId,  elementType, message, status) => {
    elem = document.createElement(elementType)
    if (status == 200){
    elem.innerHTML = `<div class="q-box">

          <p class="q-name fs-12">Asked by You</p>
          
          <p class="q-que fs-20 fw-800 ">${title}</p>

          <p class="q-que-xtr fs-14">${description}</p>

          <div class="specs">
            <div class="spec-answ themecolor-text"><i class="fas fa-pencil-alt"></i> ${answers} answers</div>
            <div class="themecolor-text del-button " onClick="deleteQuestion(${id})" ><i class="fas fa-trash-alt fa-lg"></i></div>

          </div>


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
          makeElement(data.list[i]['question_id'],data.list[i]['user_name'], data.list[i]['title'], data.list[i]['description'], data.list[i]['no_of_answers'], 'user-recent', 'div', data.message, res.status)
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
          makeElement(data.list[i]['question_id'],data.list[i]['user_name'], data.list[i]['title'], data.list[i]['description'], data.list[i]['no_of_answers'], 'user-most-answered', 'div', data.message, res.status)
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
       to_delete.parentNode.removeChild(to_delete);
        });
}


