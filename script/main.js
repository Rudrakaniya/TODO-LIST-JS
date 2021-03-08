const mTitle = document.getElementById("todo-title");
const mContent = document.getElementById("todo-content");
const mSubmit = document.getElementById("submit-btn");
const todoItems = document.getElementById("todo-items");

let postId;
var userData = {};

const makeUI = (innerValue) => {
  var li = document.createElement("div");
  li.className = "todo-item";
  var str = `<div class="item-title"> <h2>${
    innerValue["title"]
  }</h2> <p class="todo-item-date">Date: ${
    innerValue["date"].slice(0, 3) + ", " + innerValue["date"].slice(4, 15)
  }</p> </div> <p class="todo-item-content">${innerValue["content"]}</p>`;
  li.insertAdjacentHTML("afterbegin", str);
  todoItems.prepend(li);
};

const setTodoList = (data) => {
  console.log("Setting data!!");

  for (const [key, value] of Object.entries(data)) {
    console.log(key + ":-");
    makeUI(value);
  }
};

(prepWork = () => {
  postId = localStorage.getItem("postCount");
  if (postId == null) {
    postId = 0;
    localStorage.setItem("postCount", 0);
  }
  let tempData = localStorage.getItem("userData");
  if (tempData != null) {
    userData = JSON.parse(tempData);
    setTodoList(userData);
  }
})();

const updatePostID = (currID) => {
  postId = ++currID;
  localStorage.setItem("postCount", postId);
};

const setPostData = (data) => {
  localStorage.setItem("userData", JSON.stringify(data));
  updatePostID(postId);
  // setTodoList(data);
  console.log(data);
  makeUI(data[postId - 1]);
  mTitle.value = "";
  mContent.value = "";
  console.log("Data Saved Sucessfully!!");
};

const submitBtnClicked = () => {
  console.log("Submit button Clicked");
  // console.log("Title = " + mTitle.value + "\n" + "Content = " + mContent.value);
  console.log(postId);
  userData[postId] = {
    title: mTitle.value,
    content: mContent.value,
    date: String(new Date()),
  };
  setPostData(userData);
};

mSubmit.addEventListener("click", (event) => {
  event.preventDefault();
  submitBtnClicked();
});
