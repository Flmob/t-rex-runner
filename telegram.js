let loadingIndicator;

const setLoadingState = (isLoading = false) => {
  if (isLoading) loadingIndicator.classList.remove("hidden");
  else loadingIndicator.classList.add("hidden");
};

const url = new URL(location.href);
const params = Object.fromEntries(url.searchParams);

const updateGameScore = (score) => {
  const message = `You've lost! Your score is ${score}.`;

  if (!score) return;

  setLoadingState(true);
  return fetch("/setscore", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ ...params, score }),
  })
    .then((res) => {
      console.log(message);
    })
    .catch((err) => {
      console.log(`${message}\nSorry, couldn't save your new score`);
    })
    .finally(() => {
      setLoadingState(false);
    });
};

window.onload = () => {
  loadingIndicator = document.querySelector(".loading");
};
