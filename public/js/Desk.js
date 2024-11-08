/**
 * setup surfstudio
 * @type {Maze}
 */

let officeMaze = new Maze(700,8,8 , "Office" )
let prd = undefined;

class Requirement {
    constructor(validation, reason){
        this.reason = reason;
        this.validation = validation;
    }

    valid(){
        return this.validation();
    }

    showWhy(){
        showMessage(this.reason);
    }
}

start = () => {

    officeMaze.setup();
    officeMaze.currentCell = officeMaze.grid[1][1];
    officeMaze.currentCell.visited = true;
    officeMaze.createMaze();

    let c = officeMaze.grid[Math.floor(officeMaze.rows/2)][Math.floor(officeMaze.rows/2)];
    let desk = new Desk(officeMaze, c);
    desk.visit = async () => {

        if (!businessLogic){
            showMessage(
            "You have been assigned to create quantumadvantage \nin the field of Quantum Montecarlo Simulations.\n"+
            "Find a businessparty to help you out to \nfigure out the businessneeds. \n\n"+
            "Convince at least \n- 2 business experts\n- 1 sponsor for your project\n\n");
        }

        else if (!algorithm){
            showMessage("Business is supporting your case, \nnow you need to construct the actual algorithm. \n"+
            "Find the Algorithm 'QMCS' and add it to your project\n\n"
            +"'QMCS' stands for Quantum Monte Carlo Simulations\n"
            +"It gives a quandratic speedup to this class of resource \nconsuming algorithms");
        }

        else if (!ide){
            showMessage("Quantum computers require a different tool.\n"
            +"Your algorithm needs to be implemented for a quantum computer\nThis means you need to master a \nprogramming language for quantum computers.\n"+
            "At KBC we use Qiskit from IBM\n\nDo some research on this Python model");
        }

        else if (!hasHardware){
            showMessage("Now execute everything on the available hardware.\n`Learn about this hardware and bring it to production");
        }

        else {
            showMessage("You have your project, now run of to production!");
            projectCompletion = true;
        }
    }
    c.addFeature(desk);

    c = randomWallCell(officeMaze)
    let people = new Feature("People");
    people.visit = () => {
        changeMaze(peopleMaze)
    }
    c.addFeature(people);
    removeWall(c, c.getInnerNeighbour())


    c = randomWallCell(officeMaze)
    let Algorithms = new Feature("Algorithms");
    Algorithms.visit = () => {
        changeMaze(algoMaze)
    }
    c.addFeature(Algorithms);
    removeWall(c, c.getInnerNeighbour())

    c = randomWallCell(officeMaze)
    let Hardware = new Feature("Hardware");
    c.addFeature(Hardware);
    Hardware.visit = () => {
        changeMaze(hardwareMaze);
    }
    removeWall(c, c.getInnerNeighbour())

    c = randomWallCell(officeMaze)
    let Tools = new Feature("Tools");
    Tools.visit = () => {
        changeMaze(toolsMaze);
    }

    c.addFeature(Tools);
    removeWall(c, c.getInnerNeighbour())

    c = randomWallCell(officeMaze)
    prd = new Feature("production");
    prd.requirements = [];
    prd.visit = async () => {
        if (projectCompletion){
            // you win!!!
            showMessage("you win!");
            window.location.href = "rebus.png";
        }
    }
    c.addFeature(prd);
    removeWall(c, c.getInnerNeighbour())



    currentMaze = officeMaze;
    currentMaze.draw();

    showMessage(
        "Welcome to the quantum challenge. \nAs an quantum expert, \nyou need to deliver quantum advantage for KBC. \nPlease create the quantum programme at your desk,\nand deliver it to production");
};
start();