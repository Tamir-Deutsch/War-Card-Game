const createDeck = () => {
    const deck = [];

    for (let i = 0; i <= 14; i++) {
        for (let j = 0; j < 4; j++) {
            deck.push(i);
        }
    }
    return deck;
};

const getSeperateRandomDecks = () => {
    const deck = createDeck();

    const firstDeck = [];
    const secondDeck = [];

    let isFirstDeck = true;

    const initialDeckLength = deck.length;

    for (let i = 0; i < initialDeckLength; i++) {
        const randomIndex = Math.floor(Math.random() * deck.length);

        const randomCard = deck[randomIndex];

        if (isFirstDeck) {
            firstDeck.push(randomCard);
        } else {
            secondDeck.push(randomCard);
        }
        deck.splice(randomIndex, 1);
        isFirstDeck = !isFirstDeck;
    }

    return [firstDeck, secondDeck];
};

export default getSeperateRandomDecks;
