let maze = document.querySelector(".maze")
let ctx = maze.getContext("2d")
let currentMaze = undefined;
let brick = document.getElementById("brick");

let person = document.getElementById("person");


class Maze{

    constructor(size, rows, cols, title) {
        this.size = size;
        this.rows = rows;
        this.cols = cols;
        this.grid = [];
        this.stack = [];
        this.drawables = [];
        this.currentCell = undefined;
        this.persons = [];
        this.title = title;


    }



    addDrawable(drawable){
        this.drawables.push(drawable);
    }

    setup(){
        for (let r = 0; r < this.rows; r++){
            let row = [];
            for (let c = 0; c < this.cols; c++){
                let cell = new Cell(r,c, this, this.size);
                row.push (cell);
            }
            this.grid.push (row);
        }
        this.currentCell = this.grid[0][0];
        this.currentCell.visited = true;
    }

    draw(){
        document.getElementById("title").innerText = this.title;

        if (currentMaze && this !== currentMaze) return;
        maze.width = this.size;
        maze.height = this.size;
        maze.style.background = "black";
        for (let r = 0; r < this.rows; r++){
            for (let c = 0; c < this.cols; c++){
                this.grid[r][c].show(this.size, this.rows, this.cols);
            }

        }
        for (let i = 0; i < this.drawables.length; i++){
            this.drawables[i].draw();
        }

        this.currentCell.hightlight();

    }

    createMaze(){
        let next  = this.currentCell.checkNeighbours();
        if (next){
            next.visited = true;
            this.stack.push(this.currentCell);
            removeWall(this.currentCell, next);
            this.currentCell = next;
        } else if (this.stack.length > 0){
            let cell = this.stack.pop();
            this.currentCell = cell;
        }

        if (this.stack.length === 0) return;

         this.createMaze();
    }



    async walk(){
        const sleep = ms => new Promise(r => setTimeout(r, ms));
        while(blockEvents) {await sleep(100)}
        for (let i = 0; i < this.persons.length; i++) {
            this.persons[i].walk();
        }
        if (currentMaze === this){
            this.draw();
        }
        await new Promise(r => setTimeout(r, 500));
        window.requestAnimationFrame( () => {this.walk();});
    }

}

class Cell{
    constructor(rownumber, colnumber, parentgrid, parentsize){
        this.rownumber = rownumber;
        this.colnumber = colnumber;
        this.parentgrid = parentgrid;
        this.parentsize = parentsize;
        this.visited = false;
        this.walls = {
            topwall : true,
            bottomwall : true,
            rightwall : true,
            leftwall : true
        }
        this.features = [];
    }

    drawTopWall(x,y,size,cols, rows){
        ctx.beginPath();
        ctx.moveTo(x,y);
        ctx.lineTo(x+size/cols, y);
        ctx.stroke();
    }
    drawBottomWall(x,y,size,cols, rows){
        ctx.beginPath();
        ctx.moveTo(x,y + size/rows);
        ctx.lineTo(x+size/cols, y + size/rows);
        ctx.stroke();
    }
    drawLeftWall(x,y,size,cols, rows){
        ctx.beginPath();
        ctx.moveTo(x,y);
        ctx.lineTo(x, y + size/cols);
        ctx.stroke();
    }
    drawRightWall(x,y,size,cols, rows){
        ctx.beginPath();
        ctx.moveTo(x+size/cols,y);
        ctx.lineTo(x+size/cols, y + size/cols);
        ctx.stroke();
    }

    hightlight(){


        ctx.drawImage(person, this.colnumber * this.parentgrid.size / this.parentgrid.cols + 1,
                                          this.rownumber * this.parentgrid.size / this.parentgrid.rows + 1,
                                           this.parentgrid.size / this.parentgrid.cols -2 ,
                                          this.parentgrid.size / this.parentgrid.rows -2);


//        ctx.fillStyle = "purple";
//        ctx.fillRect(this.colnumber * this.parentgrid.size / this.parentgrid.cols + 1,
//            this.rownumber * this.parentgrid.size / this.parentgrid.rows + 1,
//             this.parentgrid.size / this.parentgrid.cols -2 ,
//            this.parentgrid.size / this.parentgrid.rows -2)
    }



    show(size, rows, cols){
        let x = this.colnumber * size /cols
        let y = this.rownumber * size /rows
        ctx.strokeStyle = "white";
        ctx.fillStyle = "black";
        ctx.lineWidth = 2;
        if (this.walls.topwall) this.drawTopWall(x,y,size,cols, rows);
        if (this.walls.bottomwall) this.drawBottomWall(x,y,size,cols, rows);
        if (this.walls.leftwall) this.drawLeftWall(x,y,size,cols, rows);
        if (this.walls.rightwall) this.drawRightWall(x,y,size,cols, rows);

        for (let f = 0; f < this.features.length; f++){
            this.features[f].draw(this);
        }

        if (this.walls.topwall && this.walls.bottomwall && this.walls.leftwall && this.walls.rightwall ) ctx.drawImage(brick, x, y, size /cols,size /rows);

    }

    checkNeighbours(){
        let neighbours = [];

        if (this.colnumber > 1 && !this.parentgrid.grid[this.rownumber][this.colnumber - 1].visited                    ) neighbours.push(this.parentgrid.grid[this.rownumber][this.colnumber - 1]);
        if (this.colnumber < this.parentgrid.cols - 2 && !this.parentgrid.grid[this.rownumber][this.colnumber + 1].visited ) neighbours.push(this.parentgrid.grid[this.rownumber][this.colnumber + 1]);
        if (this.rownumber > 1 && !this.parentgrid.grid[this.rownumber - 1][this.colnumber].visited                    ) neighbours.push(this.parentgrid.grid[this.rownumber - 1][this.colnumber]);
        if (this.rownumber < this.parentgrid.rows - 2 && !this.parentgrid.grid[this.rownumber + 1][this.colnumber].visited ) neighbours.push(this.parentgrid.grid[this.rownumber + 1][this.colnumber]);

        if (neighbours.length !== 0){
            let random = Math.floor( Math.random()*neighbours.length)
            return neighbours[random];
        }else return undefined;
    }

    getVisitableNeighbour(){
        let neighbours = [];

        if (this.colnumber > 0                        && !this.walls.leftwall  ) neighbours.push(this.parentgrid.grid[this.rownumber][this.colnumber - 1]);
        if (this.colnumber < this.parentgrid.cols - 1 && !this.walls.rightwall ) neighbours.push(this.parentgrid.grid[this.rownumber][this.colnumber + 1]);
        if (this.rownumber > 0                        && !this.walls.topwall   ) neighbours.push(this.parentgrid.grid[this.rownumber - 1][this.colnumber]);
        if (this.rownumber < this.parentgrid.rows - 1 && !this.walls.bottomwall) neighbours.push(this.parentgrid.grid[this.rownumber + 1][this.colnumber]);

        if (neighbours.length !== 0){
            let random = Math.floor( Math.random()*neighbours.length)
            return neighbours[random];
        }else return undefined;
    }

    getInnerNeighbour(){
        if (this.rownumber === 0) return this.parentgrid.grid[1][this.colnumber];
        if (this.rownumber === this.parentgrid.rows - 1) return this.parentgrid.grid[this.parentgrid.rows - 2][this.colnumber];
        if (this.colnumber === 0) return this.parentgrid.grid[this.rownumber][1];
        if (this.colnumber === this.parentgrid.cols - 1) return this.parentgrid.grid[this.rownumber][this.parentgrid.cols - 2];

    }

    addFeature(feature){
        feature.setCell(this);
        this.features.push(feature);
    }

    removeFeature(feature){
        feature.setCell(undefined);
        for (let i = 0; i < this.features.length; i++) {
            if (this.features[i] === feature) {
                this.features.splice(i,1);
            }
        }
    }

    visit(){
        for (let i = 0; i < this.features.length; i++) {
            this.features[i].visit();
        }
    }
}

function randomCell(m){
    var cell =  m.grid[2 + Math.floor(Math.random()* (m.rows-3))][2 + Math.floor(Math.random()* (m.cols - 3))];
    while (cell.features.length > 0)
        cell =  m.grid[2 + Math.floor(Math.random()* (m.rows-3))][2 + Math.floor(Math.random()* (m.cols - 3))];
    return cell;
}

function randomWallCell(m){
    let rwc = undefined;
    let t = Math.floor(Math.random()*4);
    if (t === 0){
        rwc = m.grid[2 + Math.floor(Math.random()* (m.rows-3))][0];
    }
    if (t === 1){
        rwc = m.grid[1 + Math.floor(Math.random()* (m.rows-2))][m.cols-1];
    }
    if (t === 2){
        rwc = m.grid[0][1 + Math.floor(Math.random()* (m.cols-2))]
    }
    if (t === 3){
        rwc = m.grid[m.rows-1][1 + Math.floor(Math.random()* (m.cols-2))]
    }
    if (rwc.features.length > 0) return randomWallCell((m));
    return rwc;
}

class Desk{
    constructor(maze, cell){
        this.maze = maze;
        this.cell = cell;
    }

    setCell(cell){
        this.cell = cell;
    }

    draw(){
        ctx.strokeStyle = "white";
        ctx.fillStyle = "white";
        let text = "Desk";
        ctx.fillText(text,
            (this.cell.colnumber + 0.5) * this.maze.size /this.maze.cols - (ctx.measureText(text).width/2),
            (this.cell.colnumber + 0.5) * this.maze.size /this.maze.rows + (ctx.measureText(text).actualBoundingBoxAscent/2));
    }

    async visit(){



        status.adjustProject(1);
        await new Promise(r => setTimeout(r, 1000));
        if (currentMaze.currentCell === this.cell) await this.visit();
    }
}

class Feature{
    constructor(name){
        this.name = name;
    }

    setCell(cell){
        this.cell = cell;
    }

    draw(cell){
        ctx.strokeStyle = "white";
        ctx.fillStyle = "white";
        let text = this.name;
        ctx.fillText(text,
            (cell.colnumber + 0.5) * cell.parentgrid.size /cell.parentgrid.cols - (ctx.measureText(this.name).width/2),
            (cell.rownumber + 0.5) * cell.parentgrid.size /cell.parentgrid.rows + (ctx.measureText(this.name).actualBoundingBoxAscent/2));

    }

    visit(){}

}

class Person{

    constructor(cell, name){
        this.cell = cell;
        this.name = name;
    }

    setCell(cell){

    }

    draw(cell){
        var lines = this.name.split("\n");
        var twidth = 0;
        for (i = 0; i < lines.length; i++) {
            if (twidth < ctx.measureText(lines[i]).width)
        	    twidth = (ctx.measureText(lines[i]).width)
        }

        var theight = 0;
        for (i = 0; i < lines.length; i++) {
        	    theight += (ctx.measureText(lines[i]).actualBoundingBoxAscent)
        }

        drawString(ctx, this.name,
        (cell.colnumber + 0.5) * cell.parentgrid.size /cell.parentgrid.cols - (twidth/2),
        (cell.rownumber + 0.5) * cell.parentgrid.size /cell.parentgrid.rows + (theight/2), "white", 0, "Verdana", 10);
//        ctx.strokeStyle = "white";
//        ctx.fillStyle = "white";
//        let text = this.name;
//        ctx.fillText(text,
//            (cell.colnumber + 0.5) * cell.parentgrid.size /cell.parentgrid.cols - (ctx.measureText(this.name).width/2),
//            (cell.rownumber + 0.5) * cell.parentgrid.size /cell.parentgrid.rows + (ctx.measureText(this.name).actualBoundingBoxAscent/2));
    }

    async walk(){
        if (!(this.cell === undefined)){
            this.cell.removeFeature(this);
            this.cell = this.cell.getVisitableNeighbour();
            this.cell.addFeature(this);
        }
    }

    visit(){
        if (! hasPerson(this)){
            this.cell.removeFeature(this);
            this.cell = undefined;
            persons.push(this);
            status.draw();

            var experts = 0;
            var sponsors = 0;
            for (i = 0; i < persons.length; i++) {
                if (persons[i].name = "Sponsor") sponsors++;
                if (persons[i].name = "Business \nExpert") experts++;
            }
            if ((sponsors>0) && (experts >1)){
                businessLogic = true;
            }
            if (this.message)
                showMessage(this.message);

        }
    }

}


function removeWall(cell1, cell2){

    if (cell1 === undefined){
        console.log("cel1");
    }

    if (cell2 === undefined){
        console.log("cel2");
    }

    let x = cell1.colnumber - cell2.colnumber
    let y = cell1.rownumber - cell2.rownumber
    if (x===1){
        cell1.walls.leftwall = false;
        cell2.walls.rightwall = false;
    }
    if (x===-1){
        cell1.walls.rightwall = false;
        cell2.walls.leftwall = false;
    }
    if (y===1){
        cell1.walls.topwall = false;
        cell2.walls.bottomwall = false;
    }
    if (y===-1){
        cell1.walls.bottomwall = false;
        cell2.walls.topwall = false;
    }
}








/**
 * Utils
 */

function changeMaze(targetMaze) {
    currentMaze.currentCell = currentMaze.currentCell.getVisitableNeighbour();
    currentMaze = targetMaze;
    currentMaze.draw();
    currentMaze.currentCell.visit();
}



/**
 * movement
 */
let blockEvents = false;
window.addEventListener('keydown',this.check,false);
window.addEventListener('click',this.unblock,false);

function unblock(e) {
    if (blockEvents  && (expectedAnswer === "" ||  expectedAnswer.includes(document.getElementById('input').value))){
        currentMaze.draw();
        blockEvents = false;
        document.getElementById('input').style.display = 'none'
    }
}

function check(e) {

    var code = e.keyCode;
    if (code === 13) unblock(e)


    if (!blockEvents){
    switch (code) {
        case 37: //Left key
            if (currentMaze.currentCell.colnumber > 0 && !currentMaze.currentCell.walls.leftwall) {
                currentMaze.currentCell = currentMaze.grid[currentMaze.currentCell.rownumber][currentMaze.currentCell.colnumber - 1];
                currentMaze.draw();
                currentMaze.currentCell.visit();
            }
            break;
        case 38: //Up key
            if (currentMaze.currentCell.rownumber > 0 && !currentMaze.currentCell.walls.topwall){
                currentMaze.currentCell = currentMaze.grid[currentMaze.currentCell.rownumber - 1][currentMaze.currentCell.colnumber];
                currentMaze.draw();
                currentMaze.currentCell.visit();
                }
            break;
        case 39: //Right key
            if (currentMaze.currentCell.colnumber < currentMaze.cols && !currentMaze.currentCell.walls.rightwall){
                currentMaze.currentCell = currentMaze.grid[currentMaze.currentCell.rownumber][currentMaze.currentCell.colnumber + 1];
                currentMaze.draw();
                currentMaze.currentCell.visit();
            }
            break;
        case 40: //Down key
            if (currentMaze.currentCell.rownumber < currentMaze.rows && !currentMaze.currentCell.walls.bottomwall){
                currentMaze.currentCell = currentMaze.grid[currentMaze.currentCell.rownumber + 1][currentMaze.currentCell.colnumber ];
                currentMaze.draw();
                currentMaze.currentCell.visit();
            }
            break;
    }}
}

function showMessage(m){

    blockEvents = true;

    font = ctx.font;
    ctx.font = `20px Verdana`;

    ctx.fillStyle = "#00aeef";
    ctx.fillRect(20,20,660 ,660);

    ctx.strokeStyle = "white";
    ctx.fillStyle = "white";
    				var lines = m.split("\n");
            var twidth = 0;
            for (i = 0; i < lines.length; i++) {
                if (twidth < ctx.measureText(lines[i]).width)
            	    twidth = (ctx.measureText(lines[i]).width)
            }

            var theight = 0;
            for (i = 0; i < lines.length; i++) {
            	    theight += (ctx.measureText(lines[i]).actualBoundingBoxAscent)
            }

    drawString(ctx, m, 350 - twidth/2, 350 - theight, "white", 0, "ITC Lubalin Graph Std", 20);

    ctx.font = font;


    ctx.beginPath();
    ctx.moveTo(655,25);
    ctx.lineTo(675, 45);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(675,25);
    ctx.lineTo(655, 45);
    ctx.stroke();

}

function showQuestion(m, answer){

    blockEvents = true;

    font = ctx.font;
    ctx.font = `20px Verdana`;

    ctx.fillStyle = "#00aeef";
    ctx.fillRect(20,20,660 ,660);

    ctx.strokeStyle = "white";
    ctx.fillStyle = "white";
    				var lines = m.split("\n");
            var twidth = 0;
            for (i = 0; i < lines.length; i++) {
                if (twidth < ctx.measureText(lines[i]).width)
            	    twidth = (ctx.measureText(lines[i]).width)
            }

            var theight = 0;
            for (i = 0; i < lines.length; i++) {
            	    theight += (ctx.measureText(lines[i]).actualBoundingBoxAscent)
            }

    drawString(ctx, m, 350 - twidth/2, 350 - theight, "white", 0, "ITC Lubalin Graph Std", 20);

    document.getElementById('input').style.display='inline'

    expectedAnswer = answer

    ctx.font = font;


    ctx.beginPath();
    ctx.moveTo(655,25);
    ctx.lineTo(675, 45);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(675,25);
    ctx.lineTo(655, 45);
    ctx.stroke();

}

let expectedAnswer = ""



function drawString(ctx, text, posX, posY, textColor, rotation, font, fontSize) {
				var lines = text.split("\n");



				if (!rotation) rotation = 0;
				if (!textColor) textColor = '#000000';
		 		ctx.save();
		 		ctx.font = fontSize + "px " + font;
		 		ctx.fillStyle = textColor;
		 		ctx.translate(posX, posY);
		 		ctx.rotate(rotation * Math.PI / 180);
				for (i = 0; i < lines.length; i++) {
			 		ctx.fillText(lines[i],0, i*(fontSize*2));
				}
		 		ctx.restore();
		 	}