class Segment {
    constructor(x, y, w, h) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
    }

    draw() {
        push();
        translate(this.x, this.y);
        fill(150);
        stroke(255);
        rect(0, 0, this.w, this.h)
        pop();
    }

    checkPointing() {
        return mouseX > this.x && mouseX < this.x + this.w &&
            mouseY > this.y && mouseY < this.y + this.w
    }
}

class Brick {
    constructor(w, h, color, type) {
        this.w = w;
        this.h = h;
        this.color = color;
        this.type = type;
    }

    draw() {
        push();
        translate(this.x, this.y);
        stroke(255)

        if (this.type == 'br') {
            fill(this.color);
            rect(0, 0, this.w, this.h)
        } else if (this.type == 't0M') {
            fill(0);
            rect(0, 0, 3 * size, 1 * size);
            fill('white');
            ellipse(0 + size / 2, size / 2, size - 5);
            rect(0 + 2 * size, 0, size, size);
            this.w = 3 * size;
            this.h = size;
        } else if (this.type == 't1M') {
            fill(0);
            rect(0, 0, 3 * size, 1 * size);
            fill('white');
            ellipse(2 * size + size / 2, size / 2, size - 5);
            rect(0, 0, size, size);
            this.w = 3 * size;
            this.h = size;
        } else if (this.type == 't2M') {
            fill(0);
            rect(0, 0, 1 * size, 3 * size);
            fill('white');
            ellipse(size / 2, size / 2, size - 5);
            rect(0, 2 * size, size, size);
            this.w = size;
            this.h = 3 * size;
        } else if (this.type == 't3M') {
            fill(0);
            rect(0, 0, 1 * size, 3 * size);
            fill('white');
            ellipse(size / 2, 2.5 * size, size - 5);
            rect(0, 0, size, size);
            this.w = size;
            this.h = 3 * size;
        } else if (this.type == 't0K') {
            fill(0);
            rect(0, 0, 3 * size, 1 * size);
            this.w = 3 * size;
            this.h = size;
        } else if (this.type == 't1K') {
            fill(0);
            rect(0, 0, 1 * size, 3 * size);
            this.w = size;
            this.h = 3 * size;
        }

        pop();
    }
}

let segments = [];
let bricks = [];
const size = 40;
const colors = ['deepskyblue', 'purple', 'red', 'greenyellow', 'darkorange'];
let imgs = ['Mdown.png', 'Mup.png', 'Mright.png', 'Mleft.png', 'Kup.png', 'Kright.png', ];
let picked;
let counter = 0;
let sel;

function createMyBtn(i, parent, bcgImg, single, txt, cls) {

    let btn;
    if (txt) {
        btn = createDiv(txt);
    } else {
        btn = createDiv(' ');
    }

    if (parent == '.pion' && single == true) {
        btn.size(size, size);
    } else if (parent == '.pion' && single != true) {
        btn.size(size, size * 2);
    } else {
        btn.size(size * 2, size);
    }

    if (bcgImg) {
        btn.style('background-image', 'url("./icons/' + bcgImg + '")')

        if (parent == '.pion') {
            btn.size(size, size * 3);
        } else {
            btn.size(size * 3, size);
        }

    } else {
        btn.style('background-color', colors[i]);
    }

    if (cls) {
        btn.addClass(cls);
    }

    btn.addClass('btn')
    btn.attribute('onclick', 'selectBrick(' + counter + ')');
    counter++;
    select(parent).child(btn);
}

function selectBrick(val) {
    picked = bricks[val];
}

function createMenuBox() {

    createMyBtn(5, '.pion', null, true);

    for (let i = 0; i < 5; i++) {
        createMyBtn(i, '.pion', null, true);
    }

    for (let i = 0; i < 5; i++) {
        createMyBtn(i, '.pion', null, false);
    }

    for (let i = 0; i < 5; i++) {
        createMyBtn(i, '.poziom', null, false);
    }
}

function createTrain() {
    bricks.push(new Brick(null, null, null, 't3M'));
    bricks.push(new Brick(null, null, null, 't2M'));
    bricks.push(new Brick(null, null, null, 't1M'));
    bricks.push(new Brick(null, null, null, 't0M'));

    bricks.push(new Brick(null, null, null, 't1K'));
    bricks.push(new Brick(null, null, null, 't0K'));

    createMyBtn(null, '.pion', imgs[0], false, undefined, 'mtm');
    createMyBtn(null, '.pion', imgs[1], false, undefined, 'mtm');
    createMyBtn(null, '.poziom', imgs[2], false, undefined, 'mtm');
    createMyBtn(null, '.poziom', imgs[3], false, undefined, 'mtm');

    createMyBtn(null, '.pion', imgs[4], false, undefined, 'kr');
    createMyBtn(null, '.poziom', imgs[5], false, undefined, 'kr');
}

function createBricks() {

    bricks.push(new Brick(size, size, colors[5], 'br'));

    for (let i = 0; i < 5; i++) {
        bricks.push(new Brick(size, size, colors[i], 'br'));
    }

    for (let i = 0; i < 5; i++) {
        bricks.push(new Brick(1 * size, 2 * size, colors[i], 'br'));
    }

    for (let i = 0; i < 5; i++) {
        bricks.push(new Brick(2 * size, 1 * size, colors[i], 'br'));
    }


}

function changeSet() {

    let type = sel.value();

    if (type == "Zestaw 1") {

        let btns = selectAll('.mtm');
        for (let b of btns) {
            b.style('display', 'inline-block');
        }

        btns = selectAll('.kr');
        for (let b of btns) {
            b.style('display', 'none');
        }

    } else if (type == "Zestaw 2") {

        let btns = selectAll('.mtm');
        for (let b of btns) {
            b.style('display', 'none');
        }

        btns = selectAll('.kr');
        for (let b of btns) {
            b.style('display', 'inline-block');
        }
    }

}

function saveImg() {
    let data = new Date();
    saveCanvas(`wagony-${data.getHours()}-${data.getMinutes()}-${data.getSeconds()}`, 'png');
}

function setup() {
    let c = createCanvas(641, 321);
    select('.box').child(c);
    colors.push(color(150));
    createBricks();
    createMenuBox();
    createTrain();

    for (let i = 0; i < 8; i++) {
        for (let j = 0; j < 16; j++) {
            segments.push(new Segment(j * size, i * size, size, size));
        }
    }

    save = createButton('Zapis planszy do pliku');
    save.attribute('onclick', 'saveImg()');
    select('.reset').child(save);

    reset = createButton('Reset');
    reset.attribute('onclick', 'redraw()');
    select('.reset').child(reset);

    sel = createSelect();
    sel.option('Zestaw 1');
    sel.option('Zestaw 2');
    sel.changed(changeSet);
    select('.reset').child(sel);

    changeSet();

    noLoop();
}

function draw() {
    background('#553D67');

    for (let s of segments) {
        if (s instanceof Segment) s.draw();
    }
}

function mouseClicked() {
    for (s of segments) {
        if (s.checkPointing && s.checkPointing()) {
            if (picked) {
                picked.x = s.x;
                picked.y = s.y
                picked.draw();
                segments.push(picked);
            }
        }
    }
}