const que_id = localStorage.getItem('questionid');
const ans_id = localStorage.getItem('answerid');
const token = localStorage.getItem('thetoken');
const user = localStorage.getItem('user_id');
let answer_to_edit = null;
let user_who_posted_answer = null;
let user_who_posted_question = null;
let currently_accepted = null;
let upvote_box = null;
let downvote_box = null;
const changed_upvote = false;
const unique = null;
const baseUrl = 'https://finalstack.herokuapp.com/api/v1';

const theQuestion = (id, name, title, description, parentId, elementType) => {
  elem = document.createElement(elementType);
  elem.innerHTML = `<p class="q-name fs-12">Asked by ${name}</p>
          
          <p class="q-que fs-20 fw-800">${title}</p>

          <p class="q-que-xtr fs-14">${description}</p>`;

  elem.setAttribute('data-id', id);
  parentElem = document.getElementById(parentId);
  parentElem.append(elem);
};

const theAnswers = (
  id,
  name,
  body,
  parentId,
  elementType,
  user_id,
  accept_status,
  upvotes,
  downvotes,
  upvote_id,
  downvote_id,
  already_upvoted,
  already_downvoted,
  time
) => {
  elem = document.createElement(elementType);

  part1 = `<div class="q-box">

            <p class="q-name fs-12">Answer by ${name}</p>
          
            <p class="q-que-xtr fs-14">${body}</p>`;

  if (user == user_who_posted_question) {
    if (accept_status == 'true') {
      part2 = `<p class="accept fs-12 fw-200 themecolor-text p-r-1 ta-r pointed" id="accept${id}" onclick={accept(${id})}><i class="fas fa-check-circle fa-2x"></i></p>`;
    } else {
      part2 = `<p class="accept fs-12 fw-200 themecolor-text p-r-1 ta-r pointed" id="accept${id}" onclick={accept(${id})}>Accept</p>`;
    }
  } else if (accept_status == 'true') {
    part2 = `<p class="accept fs-12 fw-200 p-r-1 ta-r themecolor-text pointed" id="accept${id}"><i class="fas fa-check-circle fa-2x"></i></p>`;
  } else {
    part2 = ``;
  }

  if (user_id == user) {
    part3 = `<p class="q-edit fs-12 fw-200 themecolor-text ta-r p-r-1 pointed" id="open-answer" onClick="openAnswer(${id} , ${user_id} , '${body}')"> <i class="fas fa-edit"></i>&nbspEdit</p>`;
  } else {
    part3 = ``;
  }

  part_4 = `<div class="votes"><p class="vote-type pointed" onClick="upVote(${id} , ${upvote_id}, ${upvotes}, ${already_upvoted})"><i class="far fa-thumbs-up fa-lg"></i></p> <p class="upvote-count" id="upvote${upvote_id}">${upvotes}</p><p class="vote-type" onClick="downVote(${id}, ${downvote_id} , ${downvotes}, ${already_downvoted})"> <i class="far fa-thumbs-down fa-lg"></i></p> <p class="downvote-count" id="downvote${downvote_id}">${downvotes}</p></div>`;
  part_5 = `<div class="time">${time}</div>`;
  part1_end = `</div>`;

  elem.innerHTML = part1 + part2 + part3 + part_4 + part_5 + part1_end;
  elem.setAttribute('data-id', id);
  elem.setAttribute('class', 'theme-box');
  parentElem = document.getElementById(parentId);
  parentElem.append(elem);
};

const openQuestion = () => {
  fetch(`${baseUrl}/questions/${que_id}`, {
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
          theQuestion(
            data.question.questionid,
            data.question.user_name,
            data.question.title,
            data.question.description,
            'the-question',
            'div'
          );
          document.getElementById('no-of-answers').innerHTML = data.question.no_of_answers;
          user_who_posted_question = data.question.user_id;

          for (const i in data.answers) {
            theAnswers(
              data.answers[i].answer_id,
              data.answers[i].user_name,
              data.answers[i].answer_body,
              'the-answers',
              'div',
              data.answers[i].user_id,
              data.answers[i].accepted,
              data.answers[i].upvotes,
              data.answers[i].downvotes,
              data.answers[i].upvote_id,
              data.answers[i].downvote_id,
              data.answers[i].already_upvoted,
              data.answers[i].already_downvoted,
              data.answers[i].time
            );
            upvote_box = data.answers[i].upvote_id;
            downvote_box = data.answers[i].downvote_id;
            if (data.answers[i].accepted == 'true') {
              currently_accepted = data.answers[i].answer_id;
            }
          }
        } else {
        }
      });
    })
    .catch(error => {
      console.log(error);
    });
};

// START OF USER POST ANSWER

const answerform = document.getElementById('answer-form');

const makeAnsResponse = (message, parentId, elementType, status) => {
  elem = document.createElement(elementType);

  if (status == 200 || status == 201) {
    elem.innerHTML = `<div class="green alert"> ${message} <div/>`;
  } else {
    elem.innerHTML = `<div class="red alert"> ${message} <div/>`;
  }
  parentElem = document.getElementById(parentId);
  parentElem.append(elem);
};

// POST AN ANSWER

if (typeof answerform !== 'undefined' && answerform != null) {
  answerform.addEventListener('submit', event => {
    event.preventDefault();

    const answer = document.getElementById('answer-box').value;

    const data = { answer };

    fetch(`${baseUrl}/questions/${que_id}/answers`, {
      method: 'POST', // or 'PUT'
      body: JSON.stringify(data), // data can be `string` or {object}!
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      }
    })
      .then(res => {
        res.json().then(data => {
          (document.getElementById('ans-resp').innerHTML = ''),
            makeAnsResponse(data.message, 'ans-resp', 'div', res.status),
            setTimeout(hideDialog, 2000);

          if (res.status == 201) {
            (document.getElementById('the-question').innerHTML = ''),
              (document.getElementById('the-answers').innerHTML = ''),
              openQuestion();
          }
        });
      })
      .catch(error => {
        console.log(error);
      });
  });
}

const hideDialog = () => {
  document.getElementById('ans-resp').innerHTML = '';
  document.getElementById('ans-edit').innerHTML = '';
};
// END OF "POST AN ANSWER"

// THIS IS THE MODAL JS CODE

const overlayAns = document.getElementById('overlay');
const answerOpener = document.getElementById('open-answer');
const answerCloser = document.getElementById('close-answer');

const openAnswer = (id, user_id, body) => {
  answer_to_edit = id;
  user_who_posted_answer = user_id;
  document.getElementById('answer').innerHTML = '';
  document.getElementById('answer').innerHTML = body;
  overlayAns.classList.remove('is-hidden');
};

const closeAnswer = () => {
  overlayAns.classList.add('is-hidden');
};
// THIS IS THE END OF MODAL JS CODE

// EDIT AN ANSWER

const editanswerform = document.getElementById('edit-answer-form');

if (typeof editanswerform !== 'undefined' && editanswerform != null) {
  editanswerform.addEventListener('submit', event => {
    event.preventDefault();

    const answer = document.getElementById('answer').value;

    const data = { answer };

    fetch(`${baseUrl}/questions/${que_id}/answers/${answer_to_edit}/update`, {
      method: 'PUT', // or 'PUT'
      body: JSON.stringify(data), // data can be `string` or {object}!
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      }
    })
      .then(res => {
        res.json().then(data => {
          (document.getElementById('ans-edit').innerHTML = ''),
            makeAnsResponse(data.message, 'ans-edit', 'div', res.status),
            setTimeout(hideDialog, 2000);

          if (res.status == 200 || res.status == 201) {
            (document.getElementById('the-question').innerHTML = ''),
              (document.getElementById('the-answers').innerHTML = ''),
              openQuestion();
            overlayAns.classList.add('is-hidden');
          }
        });
      })
      .catch(error => {
        console.log(error);
      });
  });
}

// THIS IS THE END OF "EDIT AN ANSWER"

// ACCEPT AN ANSWER

const accept = answer_to_accept => {
  fetch(`${baseUrl}/questions/${que_id}/answers/${answer_to_accept}/accept`, {
    method: 'PUT', // or 'PUT'
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    }
  })
    .then(res => {
      old_div_id = `accept${currently_accepted}`;
      new_div_id = `accept${answer_to_accept}`;

      if (currently_accepted != null) {
        document.getElementById(old_div_id).innerHTML = `Accept`;
      }
      document.getElementById(new_div_id).innerHTML = `<i class="fas fa-check-circle fa-2x"></i>`;

      currently_accepted = answer_to_accept;
    })
    .catch(error => {
      console.log(error);
    });
};

// THIS IS THE END OF "ACCEPT AN ANSWER"

// UPVOTE AN ANSWER

const upVote = (answer_to_upvote, the_box_id, upvotes, already_upvoted) => {
  fetch(`${baseUrl}/answers/${answer_to_upvote}/upvote`, {
    method: 'POST', // or 'PUT'
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    }
  })
    .then(res => {
      div_id = `upvote${the_box_id}`;
      the_div = document.getElementById(div_id);

      if (already_upvoted == 0) {
        if (the_div.classList.contains('changed')) {
          the_div.innerHTML = parseInt(the_div.innerHTML) - 1;
          the_div.classList.remove('changed');
        } else {
          the_div.innerHTML = parseInt(the_div.innerHTML) + 1;
          the_div.classList.add('changed');
        }
      } else if (the_div.classList.contains('changed')) {
        the_div.innerHTML = parseInt(the_div.innerHTML) + 1;
        the_div.classList.remove('changed');
      } else {
        the_div.innerHTML = parseInt(the_div.innerHTML) - 1;
        the_div.classList.add('changed');
      }
    })
    .catch(error => {
      console.log(error);
    });
};

// THIS IS THE END OF "UPVOTE AN ANSWER"

// UPVOTE AN ANSWER

const downVote = (answer_to_downvote, the_box_id, downvotes, already_downvoted) => {
  fetch(`${baseUrl}/answers/${answer_to_downvote}/downvote`, {
    method: 'POST', // or 'PUT'
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    }
  })
    .then(res => {
      div_id = `downvote${the_box_id}`;
      the_div = document.getElementById(div_id);

      if (already_downvoted == 0) {
        if (the_div.classList.contains('changed')) {
          the_div.innerHTML = parseInt(the_div.innerHTML) - 1;
          the_div.classList.remove('changed');
        } else {
          the_div.innerHTML = parseInt(the_div.innerHTML) + 1;
          the_div.classList.add('changed');
        }
      } else if (the_div.classList.contains('changed')) {
        the_div.innerHTML = parseInt(the_div.innerHTML) + 1;
        the_div.classList.remove('changed');
      } else {
        the_div.innerHTML = parseInt(the_div.innerHTML) - 1;
        the_div.classList.add('changed');
      }
    })
    .catch(error => {
      console.log(error);
    });
};

// THIS IS THE END OF "UPVOTE AN ANSWER"
