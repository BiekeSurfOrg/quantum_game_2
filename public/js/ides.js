/**
 * DocumentsMaze
 * @type {Maze}
 */

let toolsMaze = new Maze(700,10,10 ,"Tools" );

let grabTool = (tool) =>{
    tools.push(tool);
    tool.cell.removeFeature(tool);
    status.draw();
}

let startTools = () => {
    let c = undefined;
    toolsMaze.setup();
    toolsMaze.currentCell = toolsMaze.grid[1][1];
    toolsMaze.currentCell.visited = true;
    toolsMaze.createMaze();

    c = randomCell(toolsMaze);
    let Qiskit = new Feature("Qiskit");
    Qiskit.visit = () => {
        grabTool(Qiskit);
        ide = true;
    }
    c.addFeature(Qiskit);

    c = randomCell(toolsMaze);
    let Cirq = new Feature("Cirq");
    Cirq.visit = () => {
        grabTool(Cirq);
    }
    c.addFeature(Cirq);

    c = randomCell(toolsMaze);
    let Bracket = new Feature("Bracket");
    Bracket.visit = () => {
        grabTool(Bracket);
    }
    c.addFeature(Bracket);

    let office = new Feature("Office");
    toolsMaze.grid[1][0].addFeature(office);
    removeWall(toolsMaze.grid[1][0], toolsMaze.grid[1][1]);

    office.visit = () => {
        changeMaze(officeMaze);
    }
};
startTools();
