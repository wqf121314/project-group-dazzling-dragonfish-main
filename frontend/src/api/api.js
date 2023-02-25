import axios from "axios";

const apiAdress =
  process.env.REACT_APP_ENV === "mock"
    ? "/mock"
    : "http://localhost:3001/api/v2";
    //: "http://bilibalabow.idv.tw:3001/api/v2";

let getEventById = function (id) {
  return axios.get(apiAdress + "/event/" + id);
};

let getTimelineById = function (id) {
  return axios.get(apiAdress + "/eventgroup/" + id);
};

let getAllTimeline = function (id) {
  return axios.post("/eventgroup/recommend", { count: 10 });
};

let getEventGroups = function () {
  return axios.post(apiAdress + "/eventgroup/recommend", { count: 10 });
};

let getTagResult = function (category) {
  return axios.get(apiAdress + "/eventgroup/recommend/" + category);
};

let getSearchResult = function (query) {
  return axios.post(apiAdress + "/eventgroup/recommend", {
    count: 10,
    query: `${query}`,
  });
};

export {
  getEventById,
  getTimelineById,
  getEventGroups,
  getAllTimeline,
  getTagResult,
  getSearchResult,
};
