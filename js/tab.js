const tabOneContent = document.getElementById('tab-one-content');
const tabTwoButton = document.getElementById('tab-two-button');
const tabOneButton = document.getElementById('tab-one-button');
const tabTwoContent = document.getElementById('tab-two-content');

tabOneButton.onclick = () => {
  openTabOne();
  closeTabTwo();
  tabOneActive();
  tabTwoInactive();
};

tabTwoButton.onclick = () => {
  openTabTwo();
  closeTabOne();
  tabTwoActive();
  tabOneInactive();
};

const openTabOne = () => {
  if (tabOneContent.classList.contains('hide-this')) {
    tabOneContent.classList.remove('hide-this');
    tabOneContent.classList.add('show-this');
  } else if (tabOneContent.classList.contains('show-this')) {
  }
};

const openTabTwo = () => {
  if (tabTwoContent.classList.contains('hide-this')) {
    tabTwoContent.classList.remove('hide-this');
    tabTwoContent.classList.add('show-this');
  } else if (tabTwoContent.classList.contains('show-this')) {
  }
};

const closeTabTwo = () => {
  if (tabTwoContent.classList.contains('show-this')) {
    tabTwoContent.classList.remove('show-this');
    tabTwoContent.classList.add('hide-this');
  } else if (tabTwoContent.classList.contains('hide-this')) {
  }
};

const closeTabOne = () => {
  if (tabOneContent.classList.contains('show-this')) {
    tabOneContent.classList.remove('show-this');
    tabOneContent.classList.add('hide-this');
  } else if (tabOneContent.classList.contains('hide-this')) {
  }
};

const tabOneActive = () => {
  if (tabOneButton.classList.contains('not-selected')) {
    tabOneButton.classList.remove('not-selected');
    tabOneButton.classList.add('selected');
  } else if (tabOneButton.classList.contains('selected')) {
  }
};

const tabTwoActive = () => {
  if (tabTwoButton.classList.contains('not-selected')) {
    tabTwoButton.classList.remove('not-selected');
    tabTwoButton.classList.add('selected');
  } else if (tabTwoButton.classList.contains('selected')) {
  }
};

const tabOneInactive = () => {
  if (tabOneButton.classList.contains('selected')) {
    tabOneButton.classList.remove('selected');
    tabOneButton.classList.add('not-selected');
  } else if (tabOneButton.classList.contains('selected')) {
  }
};

const tabTwoInactive = () => {
  if (tabTwoButton.classList.contains('selected')) {
    tabTwoButton.classList.remove('selected');
    tabTwoButton.classList.add('not-selected');
  } else if (tabTwoButton.classList.contains('selected')) {
  }
};
