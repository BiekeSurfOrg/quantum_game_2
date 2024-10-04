/**
 * BoardsMaze
 * @type {Maze}
 */

let boardsMaze = new Maze(700,10,10 ,"Boards" );

let visitboard = (board) => {
    for (let i = 0; i < board.requirements.length; i++) {
        if (!board.requirements[i].valid()) {
            board.requirements[i].showWhy();
            return;
        }
    }
    approvals.push(board.name);
    board.cell.removeFeature(board);
    status.draw();
}


let start = () => {
    let c = undefined;
    boardsMaze.setup();
    boardsMaze.currentCell = boardsMaze.grid[1][1];
    boardsMaze.currentCell.visited = true;
    boardsMaze.createMaze();

    c = randomWallCell(boardsMaze)
    let NAPP = new Feature("NAPP");
    NAPP.requirements = [];
    NAPP.requirements.push(new Requirement(()=> {return hasDocument("bia")}, "you need a BIA before entering the NAPP, try to find a BIA"))
    NAPP.requirements.push(new Requirement(()=> {return hasApproval("cef")}, "you need a CEF approval, go to CEF and ask for approval!"))
    NAPP.visit = ()=> {visitboard(NAPP);}

    c.addFeature(NAPP);
    removeWall(c, c.getInnerNeighbour())

    c = randomWallCell(boardsMaze)
    let Jiraf = new Feature("Jiraf");
    c.addFeature(Jiraf);
    removeWall(c, c.getInnerNeighbour())

    c = randomWallCell(boardsMaze)
    let cef = new Feature("cef");
    cef.requirements = [];
    cef.requirements.push(new Requirement(()=> {return hasPerson("ea")}, "you need an architect to defend you on CEF"))
    cef.visit = () =>{visitboard(cef);}

    c.addFeature(cef);
    removeWall(c, c.getInnerNeighbour())

    c = randomWallCell(boardsMaze)
    let fea = new Feature("fea");
    c.addFeature(fea);
    removeWall(c, c.getInnerNeighbour())

    c = randomWallCell(boardsMaze)
    let cedb = new Feature("cedb");
    c.addFeature(cedb);
    removeWall(c, c.getInnerNeighbour())

    c = randomWallCell(boardsMaze)
    let isro = new Feature("isro");
    c.addFeature(isro);
    removeWall(c, c.getInnerNeighbour())


    c = randomWallCell(boardsMaze)
    let rfro = new Feature("rfro");
    c.addFeature(rfro);
    removeWall(c, c.getInnerNeighbour())

    c = randomWallCell(boardsMaze)
    let innoboard = new Feature("innoboard");
    innoboard.visit = async () => {
        // going to lovanium always increases the motivation!
        status.adjustTime(100);
    }
    c.addFeature(innoboard);
    removeWall(c, c.getInnerNeighbour())

    let surfStudio = new Feature("Office");
    boardsMaze.grid[1][0].addFeature(surfStudio);
    removeWall(boardsMaze.grid[1][0], boardsMaze.grid[1][1]);

    surfStudio.visit = () => {
        changeMaze(office);
    }
};
start();
