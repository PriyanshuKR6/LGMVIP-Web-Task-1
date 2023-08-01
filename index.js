const formEl = document.querySelector(".form");
const inputEl = document.querySelector("input");
const ul = document.querySelector(".list");
let list = JSON.parse(localStorage.getItem("list"));

list?.forEach((item) => {
  addToList(item);
});

formEl.addEventListener("submit", (e) => {
  e.preventDefault();
  addToList();
});

function updateLocalStorage() {
  const lists = document.querySelectorAll("li");
  list = [];
  lists.forEach((item) => {
    list.push({
      task: item.innerText,
      checked: item.classList.contains("checked"),
    });
  });
  localStorage.setItem("list", JSON.stringify(list));
}

function addToList(item) {
  let newTask = inputEl.value;
  if (item) {
    newTask = item.task;
  }
  const li = document.createElement("li");
  if (item && item.checked) {
    li.classList.add("checked");
  }
  li.innerText = newTask;
  ul.appendChild(li);
  inputEl.value = "";
  const tickBtn = document.createElement("div");
  tickBtn.innerHTML = `<i class="fa-regular fa-2x fa-square-check">`;
  li.appendChild(tickBtn);
  const deleteBtn = document.createElement("div");
  deleteBtn.innerHTML = `<i class="fa-solid fa-2x fa-trash">`;
  li.appendChild(deleteBtn);
  tickBtn.addEventListener("click", () => {
    li.classList.toggle("checked");
    updateLocalStorage();
  });
  deleteBtn.addEventListener("click", () => {
    li.remove();
    updateLocalStorage();
  });
  updateLocalStorage();
}
