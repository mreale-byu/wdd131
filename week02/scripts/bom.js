const input = document.getElementById('favchap');
const button = document.querySelector('button');    
const list = document.getElementById('list');

button.addEventListener('click', () => {
    if (input.value.trim() === '') {
        alert('Please enter a book and chapter.');
        input.focus();
        return;
    }
    if (Array.from(list.children).some(li => li.textContent.includes(input.value))) {
        alert('This chapter ' + input.value + ' is already in the list.');
        input.focus();
        return;
    }

    if (list.children.length >= 10) {
        alert('You already reached the maximum of 10 chapters.');
        input.focus();
        return;
    }

    const li = document.createElement('li');
    li.textContent = input.value;
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.classList.add('delete');
    deleteButton.addEventListener('click', () => {
        list.removeChild(li);
    });
    li.appendChild(deleteButton);
    list.appendChild(li);
    input.value = '';
}); 