class game {
    static PlayerSelect(id) {
        const selected = `<div class="${id} select-btn">
        <div class="select-btn-icon">
            <img src="./assets/icon-${id}.svg" alt="${id}" />
        </div>
    </div>`;

        playerSide.innerHTML += selected;
        playArr.push(id);
    }

    static computerSelect() {
        const rpsArr = ['rock', 'paper', 'scissors'];
        const rndm = Math.floor(Math.random() * rpsArr.length);
        const id = rpsArr[rndm];

        const selected = `<div class="${id} select-btn">
        <div class="select-btn-icon">
            <img src="./assets/icon-${id}.svg" alt="${id}" />
        </div>
    </div>`;
        preSelect.classList.add('display-none');
        computerSide.innerHTML += selected;

        playArr.push(id);
    }

    static winLoose(result) {
        if (result === 'win') {
            outcomeText.innerHTML = 'you win';
            playerSide.classList.add('winner');
            gameScore++;
            scoreNumber.innerHTML = gameScore;
        } else if (result === 'loose') {
            outcomeText.innerHTML = 'you loose';
            computerSide.classList.add('winner');
        } else {
            outcomeText.innerHTML = 'draw';
        }
    }

    static reset() {
        document.location.reload();
    }

    static save() {
        localStorage.setItem('rps.count', JSON.stringify(gameScore));
    }
}

const score = (p1, p2) => {
    if (p1 === p2) {
        return 'draw';
    } else {
        if (p1 === 'rock') {
            if (p2 === 'paper') {
                //loose
                return 'loose';
            } else {
                //win
                return 'win';
            }
        } else if (p1 === 'paper') {
            if (p2 === 'scissors') {
                //loose
                return 'loose';
            } else {
                //win
                return 'win';
            }
        } else {
            if (p2 === 'rock') {
                //loose
                return ' loose';
            } else {
                //win
                return 'win';
            }
        }
    }
};

const rulesBtn = document.querySelector('.rules-btn');
const closeRules = document.querySelector('.close-rules');
const overlay = document.querySelector('.overlay');
const playerSide = document.querySelector('.player');
const computerSide = document.querySelector('.computer');
const icons = document.querySelectorAll('.select-btn');
const selectContainer = document.querySelector('.select');
const resultContainer = document.querySelector('.result');
const preSelect = document.querySelector('.pre-select');
const outcomeText = document.querySelector('.outcome-text');
const scoreNumber = document.querySelector('.score-number');
const resetBtn = document.querySelector('.play-again');
const scoreBoard = document.querySelector('.score');
let playArr = [];
let gameScore = JSON.parse(localStorage.getItem('rps.count')) || 0;
scoreNumber.innerHTML = gameScore;

icons.forEach((icon) => {
    icon.addEventListener('click', () => {
        const data = icon.dataset.name;
        game.PlayerSelect(data);
        selectContainer.classList.add('display-none');
        resultContainer.classList.remove('display-none');
        game.computerSelect();
        score(playArr[0], playArr[1]);
        let outcome = score(playArr[0], playArr[1]);
        game.winLoose(outcome);
        game.save();
    });
});

rulesBtn.addEventListener('click', () => {
    overlay.classList.remove('display-none');
});
closeRules.addEventListener('click', () => {
    overlay.classList.add('display-none');
});

resetBtn.addEventListener('click', () => {
    game.reset();
});

//reset score board
scoreBoard.addEventListener('click', () => {
    localStorage.setItem('rps.count', 0);
    scoreNumber.innerHTML = 0;
});
