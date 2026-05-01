const toggleButton = document.querySelector('.toggle');
const textContainer = document.querySelector('.text-container');
const removeButton = document.querySelector('.remove');
const resetButton = document.querySelector('#reset');
const title = document.querySelector('.title');

toggleButton.addEventListener('click', () => {
    const text = document.createElement('div');
    title.textContent = "It's a prank!";
    text.textContent = 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas, voluptate?';
    textContainer.appendChild(text);
});

removeButton.addEventListener("click", () => {
    const lastChild = textContainer.lastElementChild;
    if (lastChild) {
        textContainer.removeChild(lastChild);
    }
    if(textContainer.hasChildNodes() === false){
        title.textContent = "Tic Tac Toe";
    }
});

resetButton.addEventListener("click", () => {
    title.textContent = "Tic Tac Toe";
    textContainer.innerHTML = '';
});
