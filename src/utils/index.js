const placeholders = [
    "Implement a sorting algorithm in Python.",
    "Develop a restaurant website using React and Bootstrap.",
    "Pay the electricity bill by Friday at 6 p.m.",
    "Read 'The Art of Computer Programming' by Donald Knuth.",
    "Learn to play the guitar on Wednesday at 4 p.m.",
    "Watch 'The Matrix' on Netflix on Friday at 8 p.m.",
    "Play tennis with Steve on Saturday at 10 a.m.",
    "Organize the bookshelf by genre.",
    "Create a monthly budget.",
    "Practice 15 minutes of meditation at 5 a.m.",
];

export function getRandomPlaceholder() {
    let randomIndex = Math.floor(Math.random() * placeholders.length);
    return placeholders[randomIndex];
}

export function generateRandomToken(length) {
    const charset =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    const tokenArray = new Uint8Array(length);
    crypto.getRandomValues(tokenArray);

    let token = "";
    for (let i = 0; i < length; i++) {
        const randomIndex = tokenArray[i] % charset.length;
        token += charset.charAt(randomIndex);
    }
    return token;
}

export function getStoredData(keyName, defaultValue) {
    return localStorage.getItem(keyName) || defaultValue;
}

export function setStoredData(keyName, dataValue) {
    localStorage.setItem(keyName, dataValue);
}
