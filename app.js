let userseq = [];
let gameseq = [];

let level = 0;
let started = false;
let highest_score = 0;

let colors = ["red","orange","yellow","blue"];
let h2 = document.createElement("h2");
let h3 = document.querySelector("h3");

document.addEventListener("keypress",function() {
    document.querySelector("body").style.backgroundColor = 'White';
    if(started == false) {
        started = true;
        Levelup();
    }
});

function Btnflash(btn) {
    btn.classList.add("flash");
    setTimeout(function () {
        btn.classList.remove("flash");
    },250);
};

function Userflash(btn) {
    btn.classList.add("Userflash");
    setTimeout(function () {
        btn.classList.remove("Userflash");
    },250);
};

function Levelup() {
    userseq = [];
    level++;
    h3.innerText = `Level ${level}`;
    let idx = Math.floor(Math.random() * 4);
    let color = colors[idx];
    let btn = document.querySelector(`.${color}`);
    gameseq.push(color);
    Btnflash(btn);
};

function Btnpress() {
    usercolor = this.getAttribute("id");
    userseq.push(usercolor);
    SeqMatch_check(userseq.length-1);
    Userflash(this);
}

let allbtns = document.querySelectorAll(".buttons");
for(btn of allbtns) {
    btn.addEventListener("click",Btnpress);
}

function SeqMatch_check(idx) {
    if(userseq[idx] === gameseq[idx]) {
        if(userseq.length == gameseq.length) {
            setTimeout(Levelup,1000);
        }
    }
    else {
        let score = level - 1;
        if(score === -1) {
            score = 0;
        }
        highest_score = Math.max(highest_score,score);
        h2.innerText = `Your Highest Score is ${highest_score}`;
        h3.innerHTML = `Game Over! Your Score is <b>${score}<b> <br> Press any key to start again`;
        h3.prepend(h2);
        document.querySelector("body").style.backgroundColor = `rgb(255,0,0,0.7)`;
        Reset();
    }
}

function Reset() {
    started = false;
    gameseq = [];
    userseq = [];
    level = 0;
}