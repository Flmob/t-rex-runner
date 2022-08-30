const url = new URL(location.href);
const params = Object.fromEntries(url.searchParams);

const updateGameScore = (score) => {
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
    });
};
