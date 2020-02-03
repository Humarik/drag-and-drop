function dragAndDrop() {
    let card,
    startParent;
    const containers = document.querySelectorAll('.container'),
    wrapper = document.querySelector('.wrapper');

    function dragStart(e) {
        if (!e.target.classList.contains('card')) return card = undefined;

        card = document.querySelector(`#${e.target.id}`);
        startParent = e.target.parentNode;

        setTimeout(() => {
            e.target.classList.add('hide');
        }, 0);
    };

    function dragEnd(e) {
        if (!e.target.classList.contains('card')) return
        e.target.classList.remove('hide');
    };

    function dragOver(e) {
        if (!card) return;
        e.preventDefault();
    };

    function dragEnter(e) {
        if (!card) return;
        e.preventDefault();
        this.classList.add('hovered');
    };

    function dragLeave(e) {
        if (!card) return;
        this.classList.remove('hovered');
        if (e.target.classList[0] !== 'container') this.classList.add('hovered');
    };

    function dragDrop() {
        if(!card) return;

        this.append(card);
        this.classList.remove('hovered');

        if (this.classList[1] !== startParent.classList[1]) switchBoard(card, this, startParent);
    };

    containers.forEach(container => {
        container.addEventListener('dragover', dragOver);
        container.addEventListener('dragenter', dragEnter);
        container.addEventListener('dragleave', dragLeave);
        container.addEventListener('drop', dragDrop);
    });

    wrapper.addEventListener('dragstart', dragStart);
    wrapper.addEventListener('dragend', dragEnd);

}
dragAndDrop();

const data = [
    {'title': 'first', 'board': [{ 'title': 'first', 'id': 'f' }, { 'title': 'second', 'id': 's' }, { 'title': 'third', 'id': 't' }]},
    {'title': 'second', 'board': []},
    {'title': 'third', 'board': []},
    {'title': 'fourth', 'board': []}
]

function draw() {
    data.forEach(item => {
        item.board.reduce((acc, item) => {
            acc.innerHTML += `<div class='card' id=${item.id} draggable='true'><p> ${item.title} </p></div>`
            return acc;
        }, document.querySelector(`.${item.title}`));
    })
}
draw();

function findCard(id) {
    for(let i = 0; i < data.length; i++) {
        if (data[i].board.some(i => i.id === id)) {
            return data[i].board.find(i => i.id === id);
        }
    }
}

function switchBoard(card, endParent, startParent) {
    const selectedCard = findCard(card.id);

    data.forEach(item => {
        if (item.title === endParent.classList[1]) {
            item.board.push(selectedCard);
        } else if (item.title === startParent.classList[1]) {
            item.board = item.board.filter(i => i.id !== card.id);
        }
    })
}