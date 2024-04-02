const typingText = document.querySelector('.typing-text p');
const inputField = document.querySelector('input');
const time = document.querySelector('.time span b ');
const mistakes = document.querySelector('.mistakes span');
const wpm = document.querySelector('.wpm span');
const cpm = document.querySelector('.cpm span');
const btn = document.querySelector('button');


loadParagraph();

function loadParagraph() {
    const paragraphArr = [" Avoid daydreaming about the years to come.",
    "You are the most important person in your whole life.",
    "Always be true to who you are, and ignore what other people have to say about you.",
    "Always be true to who you are, and ignore what other people have to say about you.",
    "Only demonstrate your strength when it’s really required.",
    "Subscribe to Drop X Out"];

    const randomIndex = Math.floor(Math.random()*paragraphArr.length);
    typingText.innerHTML = ''
    for(const char of paragraphArr[randomIndex]){
       typingText.innerHTML+=`<span>${char}</span>`
    } 
    typingText.querySelectorAll('span')[0].classList.add('active');
    document.addEventListener("keydown",()=>{
        inputField.focus();
    })
    typingText.addEventListener("click",inputField.focus())
}

// set values

let timer;
let   mistake = 0;
let maxTime = 60;
let timeLeft = maxTime;
let chatIndex = 0;
let isTyping = false;

// Handle user input

function initTyping() {
    inputField.addEventListener("input", () => {

        if(!isTyping){
            timer = setInterval(initTime, 1000);
            isTyping =true;
        }
        const char = typingText.querySelectorAll('span');
        const typedchar = inputField.value.charAt(chatIndex);
        if(chatIndex < char.length && timeLeft){
            if (char[chatIndex].innerText === typedchar) {
                char[chatIndex].classList.add('correct');
                console.log('correct');
            }else{
                mistake++
                char[chatIndex].classList.add('incorrect');
                console.log('incorrect');
            }
            chatIndex++; 
            char[chatIndex].classList.add('active');
            mistakes.innerText = mistake;
            cpm.innerText = chatIndex - mistake;
        }else{
            clearInterval(timer);
            inputField.value = '';
        }
    })
}
 function initTime() {
    if (timeLeft>0) {
        timeLeft --;
        time.innerText = timeLeft;
        const wpmVal = Math.round((((chatIndex - mistake) / 5) / (maxTime - timeLeft)) * 60);
        wpm.innerText = wpmVal;
    }else{
        clearInterval(timer);
    }
 }

initTyping();
btn.addEventListener("click",reset)
function reset() {
    loadParagraph();
    timeLeft = maxTime;
    clearInterval(timer);
    chatIndex = 0;
    mistake = 0;
    isTyping = false;
}
