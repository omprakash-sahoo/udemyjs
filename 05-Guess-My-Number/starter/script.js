'use strict';

let randomNumber = Math.trunc(Math.random() * 20)+1;
let score  = 20;
let highScore = 0;
document.querySelector('.score').textContent = score;

//This Function Will show message
const displaymessage = function(message){
    document.querySelector('.message').textContent = message; 
}
const init = function(){
    const guess  = Number(document.querySelector('.guess').value);
   console.log(guess,randomNumber);
   if(!guess){
    displaymessage('No number');   
   }else if(guess === randomNumber){
    displaymessage('Correct number');
    document.querySelector('body').style.backgroundColor = '#60b347';
    document.querySelector('.number').style.width= '30rem';
    document.querySelector('.number').textContent = randomNumber;
    if(score > highScore){
        highScore = score;
        document.querySelector('.highscore').textContent = highScore;
    }
   }else if(guess !== randomNumber){
    if(score >1){
        displaymessage(guess > randomNumber ? 'Too High' : 'Too Low');  
     score--;
     document.querySelector('.score').textContent = score;  
    }else{
        displaymessage('You lost the game');
     document.querySelector('.score').textContent = 0; 
    }
}
}

const startAgain = function(){
    document.querySelector('.score').textContent = 20;
    randomNumber = Math.trunc(Math.random() * 20)+1;
    document.querySelector('.number').textContent = randomNumber;
    document.querySelector('.message').textContent ='Start guessing...';
    document.querySelector('body').style.backgroundColor = '#222';
    document.querySelector('.guess').value = '';
    document.querySelector('.number').textContent = '?';
}
document.querySelector('.check').addEventListener('click',init);
document.querySelector('.again').addEventListener('click',startAgain);
//Escape Key press 
document.addEventListener('keydown',function(e){
    if(e.key == 'Escape'){
        startAgain();
    }
})
document.addEventListener('keydown',function(e){
    if(e.key == 'Enter'){
        init();
    }
})









//Removed Code due to DRY Princple

// else if(guess > randomNumber){
//     if(score >1){
//      document.querySelector('.message').textContent = 'Too High';
//      score--;
//      document.querySelector('.score').textContent = score;  
//     }else{
//      document.querySelector('.message').textContent ='You lost the game';
//      document.querySelector('.score').textContent = 0; 
//     }
// }else if(guess < randomNumber){
//  if(score >1){
//  document.querySelector('.message').textContent = 'Too Low';
//  score--;
//  document.querySelector('.score').textContent = score;
//     }else{
//      document.querySelector('.message').textContent ='You lost the game';
//      document.querySelector('.score').textContent = 0;
//     }
// }