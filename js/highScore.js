let currentHighScoreList = [
  { name: "EGG", score: 10280 },
  { name: "STA", score: 4000 },
  { name: "LPD", score: 1000 },
  { name: "LUL", score: 500 },
  { name: "ZZZ", score: 100 },
];

if (!localStorage.getItem("0")) {
  console.log("no items", localStorage.length);
  saveHighScores();
} else {
  console.log("localstorage length", localStorage.getItem.length);
  currentHighScoreList = [];
  for (let i = 0; i < localStorage.getItem.length; i++) {
    currentEntry = localStorage.getItem(i);

    currentName = currentEntry.split(" ")[0];
    currentScore = currentEntry.split(" ")[1];

    currentHighScoreList.push({ name: currentName, score: currentScore });
  }
  console.log(currentHighScoreList);
  showHighScores();
}

function saveHighScores() {
  console.log(currentHighScoreList);
  for (let i = 0; i < currentHighScoreList.length; i++) {
    localStorage.setItem(
      i,
      currentHighScoreList[i].name + " " + currentHighScoreList[i].score
    );
  }
  showHighScores();
}

function showHighScores() {
  let entries = document.querySelectorAll(".hsEntry");
  entries.forEach((entry) => {
    document.querySelector(".highScoreTable").removeChild(entry);
  });

  for (let i = 0; i < 5; i++) {
    let scoreEntry = localStorage.getItem(i);
    let newScore = document.createElement("div");
    newScore.classList.add("hsEntry");
    newScore.innerText = scoreEntry;
    document.querySelector(".highScoreTable").appendChild(newScore);
  }
}

function updateHighScores(currentScore, initials = "___") {
  console.log(currentScore, initials);
  currentHighScoreList.push({ name: initials, score: currentScore });

  //sort the array highest score at 0 index
  currentHighScoreList.sort(function (entryA, entryB) {
    if (entryA.score > entryB.score) {
      return -1;
    } else {
      return 1;
    }
  });

  //remove the 6th entry
  if (currentHighScoreList.length >= 6) {
    currentHighScoreList.pop();
  }
  //ask for name if they did a high score
  currentHighScoreList.find((entry) => {
    if (entry.name === "___") {
      let newName = prompt(
        `Congrats, you scored ${currentScore}!\nPlease enter your initials`,
        "AAA"
      );

      if (newName.length !== 3) {
        newName = prompt(
          "Please enter your initials, 3 Letters please, arcade-style",
          "AAA"
        );
      }
      entry.name = newName;
    }
  });

  //save and show the data to localstorage
  saveHighScores();
}
