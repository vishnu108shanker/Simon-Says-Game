 let start = document.querySelector("#start") ;
let begin1 = document.querySelector("#begin")
//  let btn1 = document.querySelector("#button1") ;
//  let btn2= document.querySelector("#button2") ;
//  let btn3 = document.querySelector("#button3") ;
//  let btn4 = document.querySelector("#button4") ;
    let button = document.querySelectorAll(".button") ;

                                  let game = [] ;
                                  let userGame = [] ;
                                  let level = 0 ;
                                  let started = false ;


let btncolor = ["red" , "blue" , "green" , "yellow"] ;




// game starts here with start button 
 start.addEventListener("click" , function(){
if (started == false) {
        console.log("start was clicked")
    let begin = document.createElement("p") ;
    begin.textContent= "the game begins" ;
  begin1.append(begin) ;
            }
started = true ;

levelUp() ;
 })
// the display value of lavel is increased by 1 with every click of start button


// created the levelup functionn to increase the level and flash a random button
 function levelUp() {
  userGame = [] ; // reset the user game array
    level++ ;
    begin1.innerHTML = "<h1> level is level-" + level + "</h1>" ;
    
      let randomIndex = Math.floor(Math.random() * 4 ) +1 ;
     let selectedButton = document.querySelector(`#button${randomIndex}`);

     btnFlash(selectedButton);
    }

    
// creted the btn flash function to flash the button when the game starts
 function btnFlash(buttn){
     buttn.classList.add("btnFlash") ;
  setTimeout(function() {
    buttn.classList.remove("btnFlash") ;
  }, 500) ; 
  console.log(buttn.id + " was flashed") ;
  game.push(buttn.id) ;
  console.log(game) ;
}


// created the checkAns function to check if the user has pressed the correct button
function checkAns(){
  let idx = userGame.length - 1 ;
  if(userGame[idx] === game[idx]){
    if(userGame.length == game.length){
    console.log("You are promoted to the next level") ;
    levelUp() ;
  }}
  else{
    begin1.innerHTML = `<h3>Game over , Your score was <h2>${level-1}</h2> <br> Click Start to play again</h3>` ;
    setTimeout(resetGame() , 1000) ; // reset the game after 1 second
  }
}


// created the btnpresed functionn
function btnpresed(){
  console.log(this.id + " was pressed") ;
  userGame.push(this.id) ;
  console.log(userGame) ;

  checkAns() ;
}


// created the userbtnFlash function to flash the button when user clicks on it
 function userbtnFlash(buttn){
     buttn.classList.add("userbtnFlash") ;
  setTimeout(function() {
    buttn.classList.remove("userbtnFlash") ;
  }, 500) ; 
}

// added event listener to the buttons
for(let i =0 ; i<4 ; i++){
  button[i].addEventListener("click" , btnpresed) ;
  button[i].addEventListener("click" , function() {
    userbtnFlash(button[i]) ;
  }) ;
}



function resetGame() { 
  game = [];
  userGame = [];
  level = 0;
  started = false;
begin1.innerHTML = "<h1>Click Start to play</h1>" ;
  console.log("Game has been reset") ;
  start.textContent = "Start Again" ; // reset the start button text
  
}
 
