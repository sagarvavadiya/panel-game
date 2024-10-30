import axios from "axios";

export const GetApi = (url, data) => {
  return new Promise((resolve, reject) => {
    axios
      .get(`${process.env.REACT_APP_SERVER_BASE_URL}/${url}`)
      .then((res) => {
        console.log("");
        resolve(res);
      })
      .catch((err) => {
        console.log("Error in TeamChoice", err);
        reject(err);
      });
  });
};

export const PostApi = (url, data) => {
  // console.log(`${url}, ${data}`);
  if (url === "addPlayer") {
    const playerId = data.playerId;
    localStorage.setItem("playerId", `${playerId}`);
  }

  return new Promise((resolve, reject) => {
    // console.log(process.env.REACT_APP_SERVER_BASE_URL);
    axios
      .post(`${process.env.REACT_APP_SERVER_BASE_URL}/${url}`, data)
      .then((res) => {
        console.log(res);
        resolve(res);
      })
      .catch((err) => {
        console.log("Error in TeamChoice", err);
        reject(err);
      });
  });
};
