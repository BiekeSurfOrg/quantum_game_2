/**
 * DocumentsMaze
 * @type {Maze}
 */

let hardwareMaze = new Maze(700,8,8 ,"Hardware" );

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
        showQuestion("IBM is targeting superconducting quantum computers\n"+
            "This is an implementation of a compete gate-based system\n"+
            "Find out what the alternative to \ngate-based systems is (1 word)",
            ["annealing", "Annealing", "Annealer", "annealer", "Quantum Annealing"]);
        grabHardware(IBM);
        hasHardware = true;
    }
    c.addFeature(IBM);

    c = randomCell(hardwareMaze);
    let gbs = new Feature("Gate based Systems");
    gbs.visit = () => {
        showMessage("In gate based systems, \n"+
            "all quantum problems can be implemented with gates that \nare similar to \n"+
            "standard AND-OR-NOT gates in classical computerscience");
        grabHardware(gbs);
        hasHardware = true;
    }
    c.addFeature(gbs);

    c = randomCell(hardwareMaze);
    let QA = new Feature("Quantum \nAnnealing");
    QA.visit = () => {
        showMessage("Quantum Annealing are hardware systems that are \noptimized for finding \nminimal energy statusses of quantum equations.\n"+
        "If you can translate your system as a function that should find \nthe minimal energy, this could be a match\n"+
        "For more generic functionalities like Monte Carlo, \nyou need some gate-based system like IBM System 2")
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
