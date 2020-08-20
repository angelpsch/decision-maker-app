import axios from "axios";

export default {
  // Gets all books
  getUsers: function () {
    return axios.get("/api/users");
  },
  // Gets the book with the given id
  getUser: function (id) {
    return axios.get("/api/user/" + id);
  },
  //Gets all polls
  getOptions: function () {
    return axios.get("/api/polls");
  },
  // Deletes the book with the given id
  incrementVote: function (pollId) {
    return axios.put("/api/polls/" + pollId);
  },
  // Saves a book to the database
  postPoll: function (pollData) {
    return axios.post("/api/poll", pollData);
  },
};
