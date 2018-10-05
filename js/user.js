const baseUrl = 'https://finalstack.herokuapp.com/api/v1';
const token = localStorage.getItem('thetoken');

const makeProfile = (
  first_name,
  last_name,
  username,
  email,
  questions,
  answers,
  parentId,
  elementType
) => {
  elem = document.createElement(elementType);

  elem.innerHTML = `<p class="prof-label">Full name</p> <p class="prof-deet">${first_name} ${last_name}</p>
          <p class="prof-label">Username</p> <p class="prof-deet">${username}</p>
          <p class="prof-label">Email</p> <p class="prof-deet">${email}</p>
          <p class="prof-label">Questions asked</p> <p class="prof-deet">${questions} questions</p>
          <p class="prof-label">Answers given</p> <p class="prof-deet">${answers} answers</p>`;

  parentElem = document.getElementById(parentId);
  parentElem.append(elem);
};

const getProfile = () => {
  fetch(`${baseUrl}/auth/profile`, {
    method: 'GET',
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    }
  })
    .then(res => {
      res.json().then(data => {
        for (const i in data.list) {
          makeProfile(
            data.list[i].first_name,
            data.list[i].last_name,
            data.list[i].username,
            data.list[i].email,
            data.list[i].no_of_questions,
            data.list[i].no_of_answers,
            'profile',
            'div'
          );
        }
      });
    })
    .catch(error => {
      console.log(error);
    });
};

const makeElement = (
  id,
  name,
  title,
  description,
  answers,
  parentId,
  elementType,
  message,
  status,
  time
) => {
  elem = document.createElement(elementType);
  if (status == 200) {
    elem.innerHTML = `<div class="q-box">

          <p class="q-name fs-12">Asked by You</p>
          
          <p class="q-que fs-20 fw-800 ">${title}</p>

          <p class="q-que-xtr fs-14">${description}</p>

          <div class="specs">
          <div class="themecolor-text del-button " onClick="deleteQuestion(${id})" ><i class="fas fa-trash-alt fa-lg"></i></div>
            <div class="spec-answ answ themecolor-text"><i class="fas fa-comments"></i> ${answers} answers</div>
            

          </div>
          <div class="time">${time}</div>

          <button class="view themecolor-bg txt-wht pointer" onClick="viewQuestion(${id})"  id="question${id}" value="${id}">View</button>

          </div>
          <hr >`;
  } else {
    elem.innerHTML = `<div class="q-box no-questions">${message}</div>`;
  }

  elem.setAttribute('data-id', id);

  elem.setAttribute('id', `div${id}`);

  parentElem = document.getElementById(parentId);
  parentElem.append(elem);
};

const getUserRecent = () => {
  fetch(`${baseUrl}/auth/questions`, {
    method: 'GET',
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    }
  })
    .then(res => {
      res.json().then(data => {
        if (res.status == 200) {
          for (const i in data.list) {
            makeElement(
              data.list[i].question_id,
              data.list[i].user_name,
              data.list[i].title,
              data.list[i].description,
              data.list[i].no_of_answers,
              'user-recent',
              'div',
              data.message,
              res.status,
              data.list[i].time
            );
          }
        } else {
          makeElement(null, null, null, null, null, 'user-recent', 'div', data.message, res.status);
        }
      });
    })
    .catch(error => {
      console.log(error);
    });
};

const getMostAnswered = () => {
  fetch(`${baseUrl}/auth/questions/most_answered`, {
    method: 'GET',
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    }
  })
    .then(res => {
      res.json().then(data => {
        if (res.status == 200) {
          for (const i in data.list) {
            makeElement(
              data.list[i].question_id,
              data.list[i].user_name,
              data.list[i].title,
              data.list[i].description,
              data.list[i].no_of_answers,
              'user-most-answered',
              'div',
              data.message,
              res.status,
              data.list[i].time
            );
          }
        } else {
          makeElement(
            null,
            null,
            null,
            null,
            null,
            'user-most-answered',
            'div',
            data.message,
            res.status
          );
        }
      });
    })
    .catch(error => {
      console.log(error);
    });
};

const deleteQuestion = id => {
  fetch(`${baseUrl}/questions/${id}`, {
    method: 'DELETE',
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    }
  })
    .then(res => {
      const to_delete = document.getElementById(`div${id}`);
      removeFadeOut(to_delete, 2000);
    })
    .catch(error => {
      console.log(error);
    });
};

const removeFadeOut = (element, speed) => {
  const seconds = speed / 1000;
  element.style.transition = `opacity ${seconds}s ease`;
  element.style.opacity = 0;
  setTimeout(() => {
    element.parentNode.removeChild(element);
  }, speed);
};

// send data-id
const viewQuestion = id => {
  localStorage.setItem('questionid', id);
  window.location.href = 'ViewQuestion.html';
};
// end of send data-id
