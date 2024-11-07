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
            showMessage("Qiskit, or Quantum Information Science Kit\n"+
            "is the most widely adopted tool to program \nquantum algorithms\n"+
            "It is created by IBM, but turned into \nan open source software platform");
        grabTool(Qiskit);
        ide = true;
    }
    c.addFeature(Qiskit);

    c = randomCell(toolsMaze);
    let Cirq = new Feature("Cirq");
    Cirq.visit = () => {
            showMessage("Cirq is an python based quantum language \n"+
            "created by Google. \n"+
            "At KBC we are following up on it\n"+
            "But we opted not to work with this implementation");
        grabTool(Cirq);
    }
    c.addFeature(Cirq);

    c = randomCell(toolsMaze);
    let Bracket = new Feature("Braket");
    Bracket.visit = () => {
            showQuestion("Braket is an alternative of a large cloud provider\n"+
            "At KBC we are following up on it\n"+
            "But we opted not to work with this implementation\n"+
            "What company offers 'Braket'", ["aws", "amazon"]);
        grabTool(Bracket);
    }
    c.addFeature(Bracket);

    c = randomCell(toolsMaze);
    let qsh = new Feature("Q#");
    qsh.visit = () => {
            showQuestion("Q# is an alternative of a large cloud provider\n"+
            "At KBC we are following up on it\n"+
            "But we opted not to work with this implementation\n"+
            "What company offers 'Q#'", ["azure", "microsoft"]);
        grabTool(qsh);
    }
    c.addFeature(qsh);


    c = randomCell(toolsMaze);
    let qasm = new Feature("qasm");
    qasm.visit = () => {
            showMessage("Qasm is a general purpose machine level \nQuantum programming language.\n"+
            "As it is very low level,\n"+
            "we opted not to work with this implementation");
        grabTool(qasm);
    }
    c.addFeature(qasm);

    let office = new Feature("Office");
    toolsMaze.grid[1][0].addFeature(office);
    removeWall(toolsMaze.grid[1][0], toolsMaze.grid[1][1]);

    office.visit = () => {
        changeMaze(officeMaze);
    }
};
startTools();
