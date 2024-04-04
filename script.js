let cards = [];
let cardValues = ['#8FC0A9', '#A799B7', '#8D89A6', '#ADF1D2', '#FEEAFA', '#2C2C34', '#B84A62', '#FCE694'];
let flippedCards = [];
let matchedCards = [];

function createCards() {
    for (let value of cardValues) {
        cards.push(value);
        cards.push(value);
    }
    cards.sort(() => Math.random() - 0.5);
}

function renderCards() {
    let cardsContainer = document.getElementById('cards');
    cardsContainer.innerHTML = '';
    for (let value of cards) {
        let card = document.createElement('div');
        card.classList.add('card');
        card.style.setProperty('--card-color', value); // Set background color
        card.addEventListener('click', () => flipCard(card));
        cardsContainer.appendChild(card);
    }
}

function flipCard(card) {
    if (flippedCards.length < 2 && !flippedCards.includes(card) && !matchedCards.includes(card)) {
        card.classList.add('flipped');
        flippedCards.push(card);
        if (flippedCards.length === 2) {
            checkMatch();
        }
    }
}

function checkMatch() {
    if (flippedCards[0].style.getPropertyValue('--card-color') === flippedCards[1].style.getPropertyValue('--card-color')) {
        matchedCards.push(flippedCards[0]);
        matchedCards.push(flippedCards[1]);
        flippedCards = [];
        if (matchedCards.length === cards.length) {
          triggerConfetti();  
          alert('Congratulations! You won!');
        }
    } else {
        setTimeout(() => {
            flippedCards.forEach(card => card.classList.remove('flipped'));
            flippedCards = [];
        }, 1000);
    }
}

function startGame() {
    cards = [];
    matchedCards = [];
    flippedCards = [];
    createCards();
    renderCards();
}

startGame();