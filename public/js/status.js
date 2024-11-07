let status = undefined;

let approvals = [];
let tools = [];
let hardware = [];
let persons = [];

let businessLogic = false;
let ide = false;
let algorithm = false;
let hasHardware = false;

let projectCompletion = false;
let algos = [];

let piece = document.getElementById("piece");
let puzzle = document.getElementById("puzzle");

let hasAlgo = (algo) => {
    for (let i = 0; i < algos.length; i++) {
        if (algos[i] === algo) return true;
    }return false;
}


let hasApproval = (approval) => {
    for (let i = 0; i < approvals.length; i++) {
        if (approvals[i] === approval) return true;
    }return false;
}

let hasTool = (tool) => {
    for (let i = 0; i < tools.length; i++) {
        if (tools[i].name === tool) return true;
    }return false;
}


let hasPerson = (person) => {
    for (let i = 0; i < persons.length; i++) {
        if (persons[i].name === person) return true;
    }return false;
}



class Grid{

    constructor(sizex, sizey, rows, cols, pane, context) {
        this.sizex = sizex;
        this.sizey = sizey;
        this.rows = rows;
        this.cols = cols;
        this.grid = [];
        this.pane = pane;
        this.context = context;
    }

    setup(){
        this.pane.width = this.sizex;
        this.pane.height = this.sizey;
        this.pane.style.background = "grey";

        for (let r = 0; r < this.rows; r++){
            let row = [];
            for (let c = 0; c < this.cols; c++){
                let cell = new GridCell(r,c, this);
                row.push (cell);
            }
            this.grid.push (row);
        }
        this.currentCell = this.grid[0][0];
    }

    draw(){
        this.context.clearRect(0, 0, this.pane.width, this.pane.height);

        this.pane.style.background = "grey";
        // drawPersonRow
        for (let c = 0; c < this.cols; c++){
            this.grid[0][c].show(this.rows, this.cols, this.context);
            if (persons[c] !== undefined) {
                this.context.strokeStyle = "white";
                this.context.fillStyle = "white";
                let text = persons[c].name;

                        var lines = text.split("\n");
                        var twidth = 0;
                        for (i = 0; i < lines.length; i++) {
                            if (twidth < ctx.measureText(lines[i]).width)
                        	    twidth = (ctx.measureText(lines[i]).width)
                        }

                        var theight = 0;
                        for (i = 0; i < lines.length; i++) {
                        	    theight += (ctx.measureText(lines[i]).actualBoundingBoxAscent)
                        }

                        drawString(this.context, text,
                        (this.grid[0][c].colnumber + 0.5) * this.sizex / this.cols - (twidth/2),
                        (this.grid[0][c].rownumber ) * this.sizey / this.rows + (theight), "white", 0, "Verdana", 10);

//                this.context.fillText(text,
//                    (this.grid[0][c].colnumber + 0.5) * this.sizex / this.cols - (this.context.measureText(text).width / 2),
//                    (this.grid[0][c].rownumber + 0.5) * this.sizey / this.rows + (this.context.measureText(text).actualBoundingBoxAscent / 2));
            }
        }
        for (let c = 0; c < this.cols; c++){
            this.grid[1][c].show(this.rows, this.cols, this.context);
            if (tools[c] !== undefined) {
                this.context.strokeStyle = "white";
                this.context.fillStyle = "white";
                let text = tools[c].name;
                this.context.fillText(text,
                    (this.grid[1][c].colnumber + 0.5) * this.sizex / this.cols - (this.context.measureText(text).width / 2),
                    (this.grid[1][c].rownumber + 0.5) * this.sizey / this.rows + (this.context.measureText(text).actualBoundingBoxAscent / 2));
            }
        }
        for (let c = 0; c < this.cols; c++){
            this.grid[2][c].show(this.rows, this.cols, this.context);
            if (algos[c] !== undefined) {
                this.context.strokeStyle = "white";
                this.context.fillStyle = "white";
                let text = algos[c];
                this.context.fillText(text,
                    (this.grid[2][c].colnumber + 0.5) * this.sizex / this.cols - (this.context.measureText(text).width / 2),
                    (this.grid[2][c].rownumber + 0.5) * this.sizey / this.rows + (this.context.measureText(text).actualBoundingBoxAscent / 2));
            }
        }
        // drawDocumentRow

    }

}

class GridCell{
    constructor(rownumber, colnumber, parentgrid){
        this.rownumber = rownumber;
        this.colnumber = colnumber;
        this.parentgrid = parentgrid;
        this.walls = {
            topwall : true,
            bottomwall : true,
            rightwall : true,
            leftwall : true
        }
        this.features = [];
    }

    drawTopWall(x,y,sizex, sizey,cols, rows, ctx){
        ctx.beginPath();
        ctx.moveTo(x,y);
        ctx.lineTo(x+sizex/cols, y);
        ctx.stroke();
    }
    drawBottomWall(x,y,sizex, sizey,cols, rows, ctx){
        ctx.beginPath();
        ctx.moveTo(x,y + sizey/rows);
        ctx.lineTo(x+sizex/cols, y + sizey/rows);
        ctx.stroke();
    }
    drawLeftWall(x,y,sizex, sizey,cols, rows, ctx){
        ctx.beginPath();
        ctx.moveTo(x,y);
        ctx.lineTo(x, y + sizey/rows);
        ctx.stroke();
    }
    drawRightWall(x,y,sizex, sizey,cols, rows, ctx){
        ctx.beginPath();
        ctx.moveTo(x+sizex/cols,y);
        ctx.lineTo(x+sizex/cols, y + sizey/rows);
        ctx.stroke();
    }


    show(rows, cols, ctx){
        let x = this.colnumber * this.parentgrid.sizex /cols
        let y = this.rownumber * this.parentgrid.sizey /rows
        ctx.strokeStyle = "white";
        ctx.fillStyle = "black";
        ctx.lineWidth = 2;
        if (this.walls.topwall) this.drawTopWall(x,y,this.parentgrid.sizex, this.parentgrid.sizey,cols, rows, ctx);
        if (this.walls.bottomwall) this.drawBottomWall(x,y,this.parentgrid.sizex, this.parentgrid.sizey,cols, rows, ctx);
        if (this.walls.leftwall) this.drawLeftWall(x,y,this.parentgrid.sizex, this.parentgrid.sizey,cols, rows, ctx);
        if (this.walls.rightwall) this.drawRightWall(x,y,this.parentgrid.sizex, this.parentgrid.sizey,cols, rows, ctx);

        for (let f = 0; f < this.features.length; f++){
            this.features[f].draw(this);
        }
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

}




startStatus =() => {
    let statusPane = document.querySelector(".status")
    let ctx = statusPane.getContext("2d")

    let capturedPane = document.querySelector(".captured")
    let capturedCtx = capturedPane.getContext("2d")

    class Status {

        constructor(motivation, project, time) {
            this.motivation = motivation;
            this.project = project;
            this.projectApproved = 0;
            this.time = time;

            statusPane.width = 200;
            statusPane.height = 700;
            statusPane.style.background = "grey";


            this.capturedMaze = new Grid(600, 120, 3, 15, capturedPane, capturedCtx);
            this.capturedMaze.setup();


        }

        draw() {
            this.capturedMaze.draw();
            ctx.clearRect(0, 0, statusPane.width, statusPane.height);
            statusPane.style.background = "grey";

            this.drawProjectBucket();
            this.drawTimeBucket();







        }

        drawProjectBucket(){


            ctx.strokeStyle = "black";
            ctx.fillStyle = "black";
            ctx.lineWidth = 2;

            ctx.beginPath();
            ctx.moveTo(30,30);
            ctx.lineTo(30, 170);
            ctx.lineTo(170, 170);
            ctx.lineTo(170, 30);
            ctx.stroke();

            ctx.drawImage(puzzle, 30, 30, 140,140);



            if (!businessLogic){
                ctx.beginPath();
                ctx.fillStyle = "gray";
                ctx.fillRect(30 , 30, 70, 70);
                ctx.stroke();
//                ctx.drawImage(piece, 30, 30, 70,70);
            }

            if (!hasHardware){
                ctx.beginPath();
                ctx.fillStyle = "gray";
                ctx.fillRect(100 , 30, 70, 70);
                ctx.stroke();
            }

            if (!ide){
                ctx.beginPath();
                ctx.fillStyle = "gray";
                ctx.fillRect(30 , 100, 70, 70);
                ctx.stroke();
            }

            if (!algorithm){
                ctx.beginPath();
                ctx.fillStyle = "gray";
                ctx.fillRect(100 , 100, 70, 70);
                ctx.stroke();
            }

            ctx.strokeStyle = "white";
            ctx.fillStyle = "white";
            let text = "Project";
            ctx.fillText(text,
                100 - (ctx.measureText(this.name).width/2),
                180 + (ctx.measureText(this.name).actualBoundingBoxAscent/2));

            ctx.beginPath();
            ctx.fillStyle = "Blue";
            ctx.fillRect(31 , 31 + (10-this.project) * 118 / 10, 138, this.project * 118 / 10);
            ctx.stroke();
            ctx.beginPath();
            ctx.fillStyle = "Green";
            ctx.fillRect(31 , 31 + (10-this.projectApproved) * 118 / 10, 138, this.projectApproved * 118 / 10);
            ctx.stroke();

        }

        drawMotivationBucket(){


            ctx.strokeStyle = "black";
            ctx.fillStyle = "black";
            ctx.lineWidth = 2;

            ctx.beginPath();
            ctx.moveTo(30,230);
            ctx.lineTo(30, 350);
            ctx.lineTo(170, 350);
            ctx.lineTo(170, 230);
            ctx.stroke();

            ctx.strokeStyle = "white";
            ctx.fillStyle = "white";
            let text = "Motivation";
            ctx.fillText(text,
                100 - (ctx.measureText(this.name).width/2),
                380 + (ctx.measureText(this.name).actualBoundingBoxAscent/2));

            ctx.beginPath();
            ctx.fillStyle = "yellow";
            ctx.fillRect(31 , 231 + (10-this.motivation) * 118 / 10, 138, this.motivation * 118 / 10);
            ctx.stroke();
        }

        drawTimeBucket(){


            ctx.strokeStyle = "black";
            ctx.fillStyle = "black";
            ctx.lineWidth = 2;

            ctx.beginPath();
            ctx.moveTo(30,430);
            ctx.lineTo(30, 550);
            ctx.lineTo(170, 550);
            ctx.lineTo(170, 430);
            ctx.stroke();

            ctx.strokeStyle = "white";
            ctx.fillStyle = "white";
            let text = "Time";
            ctx.fillText(text,
                100 - (ctx.measureText(this.name).width/2),
                580 + (ctx.measureText(this.name).actualBoundingBoxAscent/2));

            ctx.beginPath();
            ctx.fillStyle = "white";
            ctx.fillRect(31 , 431 + (100-this.time) * 118 / 100, 138, this.time * 118 / 100);
            ctx.stroke();

        }

        adjustMotivation(x){
            this.motivation = this.motivation + x;
            if (this.motivation < 0) this.motivation = 0;
            if (this.motivation > 10) this.motivation = 10;
            this.draw();
        }

        adjustProject(x){
            this.project = this.project + x;
            if (this.projectApproved > this.project) this.projectApproved = this.project;
            if (this.project < 0) this.project = 0;
            if (this.project > 10) this.project = 10;
            this.draw();
        }

        approveProject(){
            this.projectApproved = this.project;
            this.draw();
        }

        adjustTime(x){
            this.time = this.time + x;
            if (this.time < 0) {
                this.time = -1;
                showMessage("You lost this game, \nbetter luck next time!")
            }
            if (this.time > 100) this.time = 100;
            this.draw();
        }

        async run(){
            this.adjustTime(-1);
            await new Promise(r => setTimeout(r, 9000));
            window.requestAnimationFrame( () => {this.run();});

        }
    }

    status = new Status(5, 0, 100);
    status.run();
};
startStatus();

