/*
*Insert SameSite=None and Secure for Browsers cookies compatibility
*/
document.cookie = 'same-site-cookie=foo; SameSite=Lax';
document.cookie = 'cross-site-cookie=bar; SameSite=None; Secure';
//Create variable that holds the hearts
const arcadeHearts = document.querySelectorAll('.fa-heart');
let hearts = 3;
//Create variable that holds the points
const arcadeScore = document.querySelector('.points');
let points = 0;
//Define restart button variable
const longButton = document.getElementById('long-button');
//Create enemy class
class Enemy {
  constructor(x, y, speed) {
  this.x = x;
  this.y = y;
  this.speed = speed;
  this.sprite = 'images/enemy-bug.png';
  this.gameOver = false;
}
update(dt) {
  this.x += this.speed * dt
  if (this.x >= 500) {
    this.x = -110;
  }
  //Set case when the player meet the bug at the distance less than 50px on horizontally and less than 20 px vertically
  if (player.x < this.x + 50 && player.x + 50 > this.x && player.y < this.y + 20 && player.y + 20 > this.y) {
player.resetPlayerPosition();
    this.heartsLeft();
}
};
//Method used for decrease the hearts number
heartsLeft() {
  if(hearts >= 1) {
    arcadeHearts[hearts -1].style.visibility = "hidden";
    hearts--;
  }
  if (hearts <= 0) {
    this.gameOver = true;
    stopTimeCounter();
    this.render();
    stopBugsSpeed();
}
  }
render() {
ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
  if(this.gameOver === true){
    endModal();
}
}
//Create the stop running bugs function
stopBugsSpeed() {
  this.speed = null;
}
};
//Create player class
class Player {
  constructor(x, y, sprite = 'images/char-princess-girl.png') {
    this.x = x;
    this.y = y;
    this.sprite = sprite;
  }
  update() {
  }
  render() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
  }
  //Set the player game area limits
  handleInput(limit) {
    if (limit === 'left' && this.x > 0) {
      this.x -= 101;
    } else if (limit === 'right' && this.x < 400) {
      this.x += 101;
    } else if (limit === 'down' && this.y < 340) {
      this.y += 83;
    }
    else if (limit === 'up' && this.y > 0) {
      this.y -= 83;
      //When the player touch the water the score will increase by 1
      if (this.y < 0) {
        this.pointsCounter();
        player.resetPlayerPosition();
      }
    }
  }
  pointsCounter() {
    points += 1;
    arcadeScore.innerHTML = points;
    document.querySelector('.points').innerHTML = 'Points: '+ points;
  }
resetPointsCounter() {
  points = 0;
  arcadeScore.innerHTML = points;
  document.querySelector('.points').innerHTML = 'Points: '+ points;
}
  //Create resetPlayerPosition function
  resetPlayerPosition() {
  this.x = 200;
  this.y = 405;
  }
};
//Define mobile variable
let mobile = (indication) => {
  player.handleInput(indication);
}
// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    let allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    }
    mobile(allowedKeys[e.keyCode]);
});
//Add events listeners for arrows control
document.querySelector('.move-left').addEventListener('click', function(){
  mobile('left');
});
document.querySelector('.move-up').addEventListener('click', function(){
  mobile('up');
});
document.querySelector('.move-down').addEventListener('click', function(){
  mobile('down');
});
document.querySelector('.move-right').addEventListener('click', function(){
  mobile('right');
});
// All enemies array
const allEnemies = [];
//Define the player
const player = new Player (200, 405);
//Set the enemies
const firstEnemy = new Enemy(-50, 60, Math.floor(Math.random() * 100) + 100);
allEnemies.push(firstEnemy);
const secondEnemy = new Enemy(-100, 145, Math.floor(Math.random() * 100) + 100);
allEnemies.push(secondEnemy);
const thirdEnemy = new Enemy(-150, 225, Math.floor(Math.random() * 100) + 100);
allEnemies.push(thirdEnemy);
const fourthEnemy = new Enemy(-200, 60, Math.floor(Math.random() * 100) + 100);
allEnemies.push(fourthEnemy);
const fifthEnemy = new Enemy(-300, 225, Math.floor(Math.random() * 100) + 100);
allEnemies.push(fifthEnemy);
//Create the time variables
let seconds = 0;
let minutes = 0;
let hours = 0;
//Create variables that holds time values
let timeSecs = 0;
let timeMins = 0;
let timeHrs = 0;
//Create variable that holds setInterval() functions
let interval = null;
//Create timeCounter function
function timeCounter() {
  seconds++;
  //increment next values
  if(seconds / 60 === 1) {
    seconds = 0;
    minutes++;
    if(minutes / 60 === 1) {
      minutes = 0;
      hours++;
    }
  }
  //display 0 before time values < 10
  if(seconds < 10) {
    timeSecs = "0" + seconds.toString();
  }
  else {
    timeSecs = seconds;
  }
  if(minutes < 10) {
    timeMins = "0" + minutes.toString();
  }
  else {
    timeMins = minutes;
  }
  if(hours < 10) {
    timeHrs = "0" + hours.toString();
  }
  else {
    timeHrs = hours;
  }
  document.querySelector('.time').innerHTML = timeHrs + ":" + timeMins + ":" + timeSecs;
};
//Create start time counter function
function startTimeCounter() {
interval = window.setInterval(timeCounter, 1000);
};
//Create stop time counter function
function stopTimeCounter() {
  window.clearInterval(interval);
};
//Create reset hearts number function
function resetHearts() {
  for( h = 0; h < 3; h++) {
    arcadeHearts[h].style.visibility = 'visible';
  }
};
//Create restart function
function restart() {
  points = 0;
  arcadeScore.innerHTML = points;
  document.querySelector('.points').innerHTML = 'Points: '+ points;
  let seconds = 0;
  let minutes = 0;
  let hours = 0;
  document.querySelector('.time').innerHTML = '00:00:00';
  hearts = 3;
  resetHearts();
  this.gameOver = false;
};
//Set the restart button
longButton.addEventListener('click', function(){
restart();
  location.reload()
});
//Create the End Modal with Canvas
let endModal = () => {
    ctx.fillStyle = 'rgba(75, 27, 17, 1)';
    ctx.fillRect(17,50,470,420);
    ctx.fillStyle = 'white';
    ctx.font = '30px Aclonica';
    ctx.textAlign ='center';
    ctx.fillText('All your lives are gone!', 250, 150);
    ctx.fillStyle = 'green';
    ctx.fillText('You can play again.', 250, 210);
    ctx.fillStyle = '#f7e2a6';
    ctx.fillText('Follow the arrow.', 250, 260);
    ctx.fillStyle = 'blue';
    ctx.fillText('Hit Restart Button!', 250, 300);
    ctx.beginPath();
    ctx.fillStyle = '#f7e2a6';
    ctx.moveTo(250, 450);
    ctx.lineTo(275, 330);
    ctx.lineTo(225, 330);
    ctx.fill();
};
//Create start modal variable
let startModal = document.getElementById('start-modal');
//Create the start modal message function
function startModalMsg() {
  startModal.style.display = 'block';
};
startModalMsg();
function closeStartModal() {
  startModal.style.display = 'none';
  startTimeCounter();
};
const keyButton = document.querySelector('input');
keyButton.addEventListener('click', closeStartModal);
