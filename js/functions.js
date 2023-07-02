/**
 * Create Html Elements Of Todo
 */
function makeTodoElement(todoArray) {
    if (!todoArray) {
        return null;
    }
    const ItemsLeft = document.querySelector('#leftItems');

    todoArray.forEach((todoObject) => {

        const card = document.createElement("li");
        const checkBoxDiv = document.createElement("div");
        const cbInput = document.createElement("input");
        const checkSpan = document.createElement("span");
        const item = document.createElement("p");
        const clearBtn = document.createElement("button");
        const img = document.createElement("img");

        //Adding Classes
        card.classList.add("card");
        checkBoxDiv.classList.add("checkBoxDiv");
        cbInput.classList.add("cbInput");
        checkSpan.classList.add("check");
        item.classList.add("item");
        clearBtn.classList.add("clear");

        //Adding Attributes
        card.setAttribute("draggable", true);
        cbInput.setAttribute("type", "checkbox");
        img.setAttribute("src", "./assets/images/icon-cross.svg");
        img.setAttribute("alt", "Clear It");
        item.textContent = todoObject.item;

        if (todoObject.isCompleted) {
            card.classList.add('checked');
            cbInput.setAttribute('checked', 'checked');
        }

        //Add EventListener
        card.addEventListener('dragstart', () => {
            card.classList.add("dragging");
        });

        card.addEventListener('dragend', () => {
            card.classList.remove("dragging");
        });

        cbInput.addEventListener('click', (e) => {
            const currentCard = cbInput.parentElement.parentElement;
            const checked = cbInput.checked;
            const currentCardIndex = [...document.querySelectorAll(".todos .card")]
                .indexOf(currentCard);
            stateTodo(currentCardIndex, checked);

            checked ? currentCard.classList.add('checked') : currentCard.classList.remove('checked')

            ItemsLeft.textContent = document.querySelectorAll(
                ".todos .card:not(.checked)"
            ).length;


        })

        clearBtn.addEventListener('click', (e) => {

            const currentCard = clearBtn.parentElement;
            currentCard.classList.add('fall');
            const indexOfCurrentCard = [...document.querySelectorAll(".todos .card")].indexOf(currentCard);
            removeTodo(indexOfCurrentCard);
            currentCard.addEventListener('animationend', () => {


                setTimeout(() => {
                    currentCard.remove();
                    ItemsLeft.textContent = document.querySelectorAll(
                        ".todos .card:not(.checked)"
                    ).length;
                }, 100);

            });

        });


        //Set Element by Parent Child

        clearBtn.appendChild(img);
        checkBoxDiv.appendChild(cbInput);
        checkBoxDiv.appendChild(checkSpan);
        card.appendChild(checkBoxDiv);
        card.appendChild(item);
        card.appendChild(clearBtn);

        document.querySelector(".todos").appendChild(card);
    });
    ItemsLeft.textContent = document.querySelectorAll(
        ".todos .card:not(.checked)"
    ).length;
}

function removeTodo(index) {
    const todos = JSON.parse(localStorage.getItem("todos"));
    todos.splice(index, 1);
    localStorage.setItem("todos", JSON.stringify(todos));
}

function removeMultipleTodos(indexes) {
    var todos = JSON.parse(localStorage.getItem("todos"));
    todos = todos.filter((todo, index) => {
        return !indexes.includes(index);
    });
    localStorage.setItem("todos", JSON.stringify(todos));

}


function stateTodo(index, isComplete) {
    const todos = JSON.parse(localStorage.getItem("todos"));
    todos[index].isCompleted = isComplete;
    localStorage.setItem("todos", JSON.stringify(todos));
}
