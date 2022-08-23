const puzzleBoard = document.querySelector("#puzzle-container");
console.log(puzzleBoard);
const submitButton = document.querySelector(".submit");
const solveButton = document.querySelector(".solve");
const hintButton = document.querySelector(".hint");
const genPuzzle = document.querySelector(".generate");
const body = document.querySelector("body");
const squares = 81;
let puzGenerated;
let puzSolution;

function createPuzzle() {
  for (let i = 0; i < 81; i++) {
    const inputElement = document.createElement("input");
    inputElement.setAttribute("type", "number");
    inputElement.setAttribute("min", "1");
    inputElement.setAttribute("max", "9");

    if (
      ((i % 9 == 0 || i % 9 == 1 || i % 9 == 2) && i <= 21) ||
      ((i % 9 == 6 || i % 9 == 7 || i % 9 == 8) && i <= 27) ||
      ((i % 9 == 3 || i % 9 == 4 || i % 9 == 5) && i > 27 && i <= 50) ||
      ((i % 9 == 0 || i % 9 == 1 || i % 9 == 2) && i > 53 && i <= 74) ||
      ((i % 9 == 6 || i % 9 == 7 || i % 9 == 8) && i > 55 && i <= 80)
    )
      inputElement.classList.add("odd-pos");

    puzzleBoard.appendChild(inputElement);
  }
}
function fillRiddle(puzzle) {
  puzzleBoard.innerHTML = "";

  for (let i = 0; i < 81; i++) {
    const inputElement = document.createElement("input");
    inputElement.setAttribute("type", "number");
    inputElement.setAttribute("min", "1");
    inputElement.setAttribute("max", "9");
    let value = puzzle.puzzle.charAt(i);
    inputElement.setAttribute("value", value);
    if (value != ".") {
      inputElement.classList.add("fixed-input");
      inputElement.setAttribute("readonly", "readonly");
    }

    if (
      ((i % 9 == 0 || i % 9 == 1 || i % 9 == 2) && i <= 21) ||
      ((i % 9 == 6 || i % 9 == 7 || i % 9 == 8) && i <= 27) ||
      ((i % 9 == 3 || i % 9 == 4 || i % 9 == 5) && i > 27 && i <= 50) ||
      ((i % 9 == 0 || i % 9 == 1 || i % 9 == 2) && i > 53 && i <= 74) ||
      ((i % 9 == 6 || i % 9 == 7 || i % 9 == 8) && i > 55 && i <= 80)
    )
      inputElement.classList.add("odd-pos");
    if ((i % 9 == 2 && i <= 21) || (i % 9 == 2 && i > 53 && i <= 74))
      inputElement.classList.add("margin-right");
    if ((i % 9 == 6 && i <= 27) || (i % 9 == 6 && i > 55 && i <= 80))
      inputElement.classList.add("margin-left");
    if ((i >= 18 && i <= 20) || (i >= 47 && i <= 49))
      inputElement.classList.add("margin-down");
    if (i == 29 || i == 38 || i == 47)
      inputElement.classList.add("margin-right");
    if (i == 33 || i == 42 || i == 51)
      inputElement.classList.add("margin-left");

    puzzleBoard.appendChild(inputElement);
    //inputElement.innerHTML(`${puzGenerated.puzzle.charAt(i)}`);
  }
}
function fillSolution() {
  puzzleBoard.innerHTML = "";

  for (let i = 0; i < 81; i++) {
    const inputElement = document.createElement("input");
    inputElement.setAttribute("type", "number");
    inputElement.setAttribute("min", "1");
    inputElement.setAttribute("max", "9");
    let value = puzSolution.solution.charAt(i);
    inputElement.setAttribute("value", value);
    if (value != ".") {
      inputElement.classList.add("fixed-input");
      inputElement.setAttribute("readonly", "readonly");
    }

    if (
      ((i % 9 == 0 || i % 9 == 1 || i % 9 == 2) && i <= 21) ||
      ((i % 9 == 6 || i % 9 == 7 || i % 9 == 8) && i <= 27) ||
      ((i % 9 == 3 || i % 9 == 4 || i % 9 == 5) && i > 27 && i <= 50) ||
      ((i % 9 == 0 || i % 9 == 1 || i % 9 == 2) && i > 53 && i <= 74) ||
      ((i % 9 == 6 || i % 9 == 7 || i % 9 == 8) && i > 55 && i <= 80)
    )
      inputElement.classList.add("odd-pos");
    if ((i % 9 == 2 && i <= 21) || (i % 9 == 2 && i > 53 && i <= 74))
      inputElement.classList.add("margin-right");
    if ((i % 9 == 6 && i <= 27) || (i % 9 == 6 && i > 55 && i <= 80))
      inputElement.classList.add("margin-left");
    if ((i >= 18 && i <= 20) || (i >= 47 && i <= 49))
      inputElement.classList.add("margin-down");
    if (i == 29 || i == 38 || i == 47)
      inputElement.classList.add("margin-right");
    if (i == 33 || i == 42 || i == 51)
      inputElement.classList.add("margin-left");

    puzzleBoard.appendChild(inputElement);
    //inputElement.innerHTML(`${puzGenerated.puzzle.charAt(i)}`);
  }
}
const getPuzzle = async () => {
  const rand = Math.floor(Math.random() * 5000);
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "47ca6f905cmshc9a54df34d33f1bp10dd8bjsnf854a640f7e2",
      "X-RapidAPI-Host": "sudoku-generator1.p.rapidapi.com",
    },
  };

  let promise = new Promise((resolve) => {
    fetch(
      "https://sudoku-generator1.p.rapidapi.com/sudoku/generate?seed=" + rand,
      options
    )
      .then((response) => response.json())
      .then((response) => {
        puzGenerated = response;
        console.log(response);
        setTimeout(() => resolve(response), 0);
      })
      .catch((err) => console.error(err));
  });
  return await promise;
};
const getSolution = async () => {
  console.log(puzGenerated.puzzle);
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "47ca6f905cmshc9a54df34d33f1bp10dd8bjsnf854a640f7e2",
      "X-RapidAPI-Host": "sudoku-generator1.p.rapidapi.com",
    },
  };

  let promise = fetch(
    "https://sudoku-generator1.p.rapidapi.com/sudoku/solve?puzzle=" +
      puzGenerated.puzzle,
    options
  )
    .then((response) => response.json())
    .then((response) => {
      puzSolution = response;
      console.log(response);
    })
    .catch((err) => console.error(err));
  return await promise;
};
const generatePuzzle = async () => {
  let promise = getPuzzle();
  fillRiddle(await promise);
  getSolution();
};

const solvePuzzle = async () => {
  let promise = getSolution();
  fillSolution(await promise);
};
const receiveUserSolution = async () => {
  let userSolution = "";
  for (let i = 0; i < puzzleBoard.children.length; i++) {
    userSolution += puzzleBoard.children[i].value;
  }
  // let check = true;
  //let promise = getSolution();
  compareSolutions(puzSolution, userSolution);

  //   const modalBox = document.createElement("div");
  //   modalBox.innerHTML = check ? "You Are Right!" : "You Have A Mistake";
};
function compareSolutions(systemSolution, userSolution) {
  let check = true;
  console.log(systemSolution.solution, userSolution);
  for (let i = 0; i < userSolution.length; i++) {
    if (puzSolution.solution.charAt(i) != userSolution.charAt(i)) check = false;
  }
  console.log(check);
}
const addCube = () => {
  let check = false;

  while (!check) {
    const rand = Math.floor(Math.random() * 81);
    if (puzzleBoard.children[rand].value == "") {
      puzzleBoard.children[rand].value = puzSolution.solution.charAt(rand);
      puzzleBoard.children[rand].classList.add("hint");
      check = true;
      console.log("hello");
    }
  }
  console.log("it worked");
};

genPuzzle.addEventListener("click", generatePuzzle);
solveButton.addEventListener("click", solvePuzzle);
submitButton.addEventListener("click", receiveUserSolution);
hintButton.addEventListener("click", addCube);

/***************************************************** */
createPuzzle();
