import randomColor from './random-color.js';

const canvas = document.getElementById('sandbox');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const ctx = canvas.getContext('2d');

function Circle(x, y, r, c) {
    this.x = x;
    this.y = y;
    this.r = r;
    this.c = c;

    this.dx = (Math.random() * 4) + 1;
    this.dx *= Math.floor(Math.random() * 2) === 1 ? 1 : -1;
    this.dy = (Math.random() * 4) + 1;
    this.dy *= Math.floor(Math.random() * 2) === 1 ? 1 : -1;

    this.draw = function() {
        ctx.beginPath();
        ctx.fillStyle = this.c;
        ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
        ctx.fill();
    };

    this.animate = function() {
        this.x += this.dx;
        this.y += this.dy;

        if (this.x + this.r > canvas.width || this.x - this.r < 0) {
            this.dx = -this.dx;
        }
        if (this.y + this.r > canvas.height || this.y - this.r < 0) {
            this.dy = -this.dy;
        }

        this.draw();
    };
}

const balls = [];

for (let i = 0; i < 20; i++) {
    let r = Math.floor(Math.random() * 30) + 15;
    let x = Math.random() * (canvas.width - r * 2) + r;
    let y = Math.random() * (canvas.height - r * 2) + r;
    let c = 'red';

    balls.push(new Circle(x, y, r, c));
}

let clickColor = 'blue';

const p = document.querySelector('p');
let timesClicked = 0;
p.textContent = timesClicked;

const addCircle = (e) => {
    let r = Math.floor(Math.random() * 30) + 15;
    balls.push(new Circle(e.clientX, e.clientY, r, clickColor));
    timesClicked++;
    p.textContent = timesClicked;
    p.style.transitionDuration = '.3s';
    p.style.color = 'white';
    setTimeout(function() {
        p.style.color = 'black';
    }, 500);
};
canvas.addEventListener('click', addCircle, false);
p.addEventListener('click', addCircle, false);

function update() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < balls.length; i++) {
        balls[i].animate();
    }

    requestAnimationFrame(update);
}

update();

function changeColors() {
    setTimeout(function() {
        canvas.removeEventListener('click', addCircle, false);
        for (let i = 0; i < balls.length; i++) {
            if (balls[i].c === 'red') {
                balls[i].c = 'blue';
            } else {
                balls[i].c = 'red';
            }
        }
        if (clickColor === 'red') {
            clickColor = 'blue';
        } else {
            clickColor = 'red';
        }
        canvas.addEventListener('click', addCircle, false);
        changeColors();
        canvas.style.backgroundColor = randomColor();
    }, 2000);
}
changeColors();