/**
 * DocumentsMaze
 * @type {Maze}
 */

let hardwareMaze = new Maze(700,10,10 ,"Hardware" );

let grabHardware = (hw) =>{
    hardware.push(hw);
    hw.cell.removeFeature(hw);
    status.draw();
}

let startHardware = () => {
    let c = undefined;
    hardwareMaze.setup();
    hardwareMaze.currentCell = hardwareMaze.grid[1][1];
    hardwareMaze.currentCell.visited = true;
    hardwareMaze.createMaze();

    c = randomCell(hardwareMaze);
    let IBM = new Feature("IBM System 2");
    IBM.visit = () => {
        grabHardware(IBM);
        hasHardware = true;
    }
    c.addFeature(IBM);

    c = randomCell(hardwareMaze);
    let QA = new Feature("Quantum \nAnnealing");
    QA.visit = () => {
        grabHardware(QA);
    }
    c.addFeature(QA);


    let office = new Feature("Office");
    hardwareMaze.grid[1][0].addFeature(office);
    removeWall(hardwareMaze.grid[1][0], hardwareMaze.grid[1][1]);

    office.visit = () => {
        changeMaze(officeMaze);
    }
};
startHardware();
