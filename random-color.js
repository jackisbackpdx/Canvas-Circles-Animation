function randomColor() {
    let red = Math.floor(Math.random() * 256);
    let blue = Math.floor(Math.random() * 256);
    let green = Math.floor(Math.random() * 256);
    return (`rgb(${red},${blue},${green})`);
}

export default randomColor;