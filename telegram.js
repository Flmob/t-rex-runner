const url = new URL(location.href);
const params = Object.fromEntries(url.searchParams);
let lastSavedScore = 0;

let loadingIndicator;

const setLoadingState = (isLoading = false) => {
  if (isLoading) loadingIndicator.classList.remove("hidden");
  else loadingIndicator.classList.add("hidden");
};

const saveScore = (score = 0) => {
  setLoadingState(true);

  if (!score || lastSavedScore > score) {
    return Promise.resolve().then(() => setLoadingState(false));
  }

  return fetch("/setscore", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ ...params, score }),
  })
    .then((res) => {
      lastSavedScore = score;
      setLoadingState(false);
    })
    .catch((err) => {
      setLoadingState(false);
      throw err;
    });
};

const updateGameScore = (score) => {
  if (!score) return;

  const message = `You've lost! Your score is ${score}.`;

  saveScore(score)
    .then(() => {
      console.log(message);
    })
    .catch(() => {
      console.log(`${message}\nSorry, couldn't save your new score`);
    });
};

window.onload = () => {
  loadingIndicator = document.querySelector(".loading");
};
