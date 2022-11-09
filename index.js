const textBox = document.querySelector(".append_text_box");
const inputBTN = document.querySelector(".append.btn");
const todoBox = document.querySelector("#todo");
const warningTag = document.querySelector(".warningTag");

const draggable = document.querySelectorAll(".draggable");
const draggableArea = document.querySelectorAll(".parent_div");

const url = "http://localhost:3000";
// appendMe();

draggable.forEach((draggable) => {
  draggable.addEventListener("dragstart", () => {
    draggable.classList.add("blury");
  });
  draggable.addEventListener("dragend", () => {
    draggable.classList.remove("blury");
  });
});

draggableArea.forEach((container) => {
  container.addEventListener("dragover", (e) => {
    e.preventDefault();
    const draggableObject = document.querySelector(".blury");
    const afterElement = getDragAfterElement(container, e.clientY);
    // console.log(afterElement);
    if (afterElement == null) {
      //   console.log("draggableObject", draggableObject);
      container.appendChild(draggableObject);
    } else {
      container.insertBefore(draggableObject, afterElement);
      //   console.log("draggableObject", draggableObject);
    }

    // container.appendChild(draggableObject);
  });
});

function getDragAfterElement(container, y) {
  const draggableElements = [
    ...container.querySelectorAll(".draggable:not(.blury)"),
  ];
  //   console.log(draggableElements);

  return draggableElements.reduce(
    (closest, child) => {
      const box = child.getBoundingClientRect();
      const offset = y - box.top - box.height / 2;
      //   console.log(offset);
      if (offset < 0 && offset > closest.offset) {
        // console.log("its if block");
        return { offset: offset, element: child };
      } else {
        // console.log("its else block");
        return closest;
      }
    },
    { offset: Number.NEGATIVE_INFINITY }
  ).element;
}

async function appendMe() {
  if (textBox.value.length > 0) {
    textBox.style.backgroundColor = "white";
    const TextElement = document.createElement("p");
    TextElement.classList.add("draggable");
    TextElement.draggable = "true";
    const newContent = document.createTextNode(textBox.value);
    TextElement.appendChild(newContent);

    //adding class when drag Start
    TextElement.addEventListener("dragstart", () => {
      TextElement.classList.add("blury");
      console.log("clicked");
    });

    // const resp = await fetch(url);

    //removing class when drag end
    TextElement.addEventListener("dragend", () => {
      TextElement.classList.remove("blury");
    });

    todoBox.appendChild(TextElement);

    textBox.value = "";
  } else {
    textBox.placeholder = "Field can't be empty";
    // textBox.style.border = "1px solid red";
    // textBox.style.backgroundColor = "#d90a0a36";
    // textBox.style.color = "red";
  }
}
