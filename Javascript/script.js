const continueButton = document.querySelector(".continue");
const allBoxExam = document.querySelector(".all-box-exam");
const boxExam = document.querySelector(".box-exam");
let timerDiv = document.querySelector(".timer");
const nextQue = document.querySelector(".next-que"); //button next que
const numberexam = document.querySelector(".numberexam");
const boxNumberQuiz = document.querySelector(".box-number-quiz");
let result = document.querySelector(".result");
let nextQuiz = 0;
let setTimer;
let numberQuiz = 0;

continueButton.addEventListener("click", plyecontinue);

function plyecontinue(event) {
    event.preventDefault();
    allBoxExam.classList.add("close");
    boxExam.classList.add("open");
    timerDiv.classList.add("timer-ani");
    nextqustionpage(nextQuiz);
    time15second()
}

function time15second() {
    setTimer = setTimeout(() => {
        let boxOptio = document.querySelector(".box-option");
        let optio = boxOptio.querySelectorAll(".option");
        nextQue.style.display = "inline-block";
        nextQue.classList.add("show");
        optio.forEach((event) => {
            if (event.innerText === qustions[nextQuiz].answer) {
                event.classList.add("ture-b");
                boxOptio.style.pointerEvents = "none";
            }
        })
    }, 15000)
}

function nextqustionpage(index) {
    const allAsk = document.querySelector(".allAsk");
    let boxOption = document.querySelector(".box-option");
    boxOption.style.pointerEvents = "all"
    let ask = `<div class="ask">${qustions[index].numb}.${qustions[index].question}</div>`;
    allAsk.innerHTML = ask;
    let optionall = `<div class="option"><span>${qustions[index].option[0]}</span><i class="icon"></i></div>
                     <div class="option"><span>${qustions[index].option[1]}</span><i class="icon"></i></div>
                     <div class="option"><span>${qustions[index].option[2]}</span><i class="icon"></i></div>
                     <div class="option"><span>${qustions[index].option[3]}</span><i class="icon"></i></div>`;
    boxOption.innerHTML = optionall;
    let orNumber = `<span class="numexam1">${nextQuiz + 1}</span> of <span class="numexam2">${qustions.length}</span> Questions`;
    numberexam.innerHTML = orNumber;
    let option = boxOption.querySelectorAll(".option")
    option.forEach((event) => {
        event.addEventListener("click", () => {
            clearTimeout(setTimer);
            if (event.innerText === qustions[index].answer) {
                event.classList.add("ture-b");
                nextQue.style.display = "inline-block";
                nextQue.classList.add("show");
                boxOption.style.pointerEvents = "none";
                timerDiv.style.animationPlayState = "paused";
                numberQuiz++;
            } else {
                event.classList.add("false-b");
                nextQue.style.display = "inline-block";
                nextQue.classList.add("show");
                timerDiv.style.animationPlayState = "paused";
                for (let i = 0; i < 4; i++) {
                    if (option[i].innerText === qustions[index].answer) {
                        option[i].classList.add("ture-b");
                        nextQue.style.display = "inline-block";
                        nextQue.classList.add("show");
                        boxOption.style.pointerEvents = "none"
                    }
                }
            }
        })
    })
}

nextQue.addEventListener("click", () => {
    if (nextQuiz < qustions.length - 1) {
        nextQuiz++;
        nextqustionpage(nextQuiz);
        time15second();
        nextQue.style.display = "none";
        timerDiv.style.animation = 'none';
        timerDiv.offsetHeight; /* trigger reflow */
        timerDiv.style.animation = null;
    } else {
        if (qustions.length / 2 > numberQuiz) {
            boxNumberQuiz.style.display = "block";
            result.innerHTML = `<p class="bad">Performed poorly,You got <span>${numberQuiz}</span> out of <span>${qustions.length}</span></p>`;
        } else {
            boxNumberQuiz.style.display = "block";
            result.innerHTML = `<p class="nice">nice,You got <span>${numberQuiz}</span> out of <span>${qustions.length}</span></p>`;
        }
    }
    // nextqustionpage(nextQuiz)
})