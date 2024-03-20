const stars = 500;

for (let i = 0; i < stars; i++) {
    let star = document.createElement("div");
    star.className = 'stars';
    let xy = randomPosition();
    star.style.top = xy[0] + 'px';
    star.style.left = xy[1] + 'px';
    document.body.append(star);
}

function randomPosition () {
    let y = window.document.body.clientWidth;
    let x = window.document.body.clientHeight;
    let randomX = Math.floor(Math.random() * x);
    let randomY = Math.floor(Math.random() * y);

    return [randomX, randomY];
}