const letterPool = {
  A: 9,
  B: 2,
  C: 2,
  D: 4,
  E: 12,
  F: 2,
  G: 3,
  H: 2,
  I: 9,
  J: 1,
  K: 1,
  L: 4,
  M: 2,
  N: 6,
  O: 8,
  P: 2,
  Q: 1,
  R: 6,
  S: 4,
  T: 6,
  U: 4,
  V: 2,
  W: 2,
  X: 1,
  Y: 2,
  Z: 1,
};

const scoreChart = {
  A: 1,
  B: 3,
  C: 3,
  D: 2,
  E: 1,
  F: 4,
  G: 2,
  H: 4,
  I: 1,
  J: 8,
  K: 5,
  L: 1,
  M: 3,
  N: 1,
  O: 1,
  P: 3,
  Q: 10,
  R: 1,
  S: 1,
  T: 1,
  U: 1,
  V: 4,
  W: 4,
  X: 8,
  Y: 4,
  Z: 10,
};
const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

// ------------ Wave 05---------------------------
class Adagrams {
  static drawLetters() {
    let availableLetters = { ...letterPool };
    const lettersInHand = [];

    while (lettersInHand.length < 10) {
      const letter = alphabet[Math.floor(Math.random() * alphabet.length)];

      if (availableLetters[letter] > 0) {
        availableLetters[letter]--;
        lettersInHand.push(letter);
      }
    }
    return lettersInHand;
  }

  static usesAvailableLetters(input, lettersInHand) {
    const drawnDict = {};
    lettersInHand.forEach((letter) => {
      if (letter in drawnDict) {
        drawnDict[letter]++;
      } else {
        drawnDict[letter] = 1;
      }
    });
    const word = [...input.toUpperCase()];

    for (const letter of word) {
      if (drawnDict[letter] == 0 || !drawnDict[letter]) {
        return false;
      } else {
        drawnDict[letter]--;
      }
    }

    return true;
  }

  static scoreWord(word) {
    const wordList = [...word.toUpperCase()];
    let score = 0;
    if (wordList.length >= 7) {
      score += 8;
    }

    wordList.forEach((letter) => (score += scoreChart[letter]));

    return score;
  }

  static highestScoreFrom(words) {
    let highestScore = 0;
    let winningWord = "";

    words.forEach((word) => {
      const score = Adagrams.scoreWord(word);

      if (score > highestScore) {
        highestScore = score;
        winningWord = word;
      } else if (score === highestScore) {
        if (word.length === 10 && winningWord.length != 10) {
          winningWord = word;
        } else if (
          word.length < winningWord.length &&
          winningWord.length != 10
        ) {
          winningWord = word;
        }
      }
    });

    const winner = { word: winningWord, score: highestScore };
    return winner;
  }
}

export default Adagrams;
