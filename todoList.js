// create close button to append to each line
let taskList = document.getElementsByTagName('LI')
let i;

for (i = 0; i < taskList.length; i++) {
    let span = document.createElement('SPAN');
    let txt = document.createTextNode('\u00D7');
    span.className = 'close';
    span.appendChild(txt);
    taskList[i].appendChild(span);
}

// Click on vlose button to hide list item
let close = document.getElementsByClassName('close');
for (i = 0; i < close.length; i++) {
    close[i].onclick = function () {
        let div = this.parentElement
        div.style.display = 'none'
    }
}

let list = document.querySelector('ul');
list.addEventListener(
    'click',
    function (ev) {
        if (ev.target.tagName === 'LI') {
            ev.target.classList.toggle('done');
        }
    },
    false
);

let inputField = document.getElementById('cardDescriptionInput');
inputField.addEventListener('keypress', function (ev) {
    if (ev.defaultPrevented) {
        return;
    }
    if (ev.key === "Enter") {
        newElement();
    }
})

function newElement() {
    let li = document.createElement('li');
    let cardTitle = document.getElementById('cardDescriptionInput').value;
    let t = document.createTextNode(cardTitle);
    li.appendChild(t);
    if (cardTitle === '') {
        alert('A task needs a proper title!')
    } else {
        document.getElementById('taskList').appendChild(li);
    }
    document.getElementById('cardDescriptionInput').value = '';
    let span = document.createElement('SPAN');
    let txt = document.createTextNode('\u00D7')
    span.className = 'close';
    span.appendChild(txt);
    li.appendChild(span);

    for (i = 0; i < close.length; i++) {
        close[i].onclick = function () {
            let div = this.parentElement
            div.style.display = 'none'
        }
    }
}
