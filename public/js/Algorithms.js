/**
 * BoardsMaze
 * @type {Maze}
 */

let algoMaze = new Maze(700,10,10 ,"Algorithms" );

let visitalgo = (algo) => {
    if (algo.requirements)
    for (let i = 0; i < algo.requirements.length; i++) {
        if (!algo.requirements[i].valid()) {
            algo.requirements[i].showWhy();
            return;
        }
    }
    if (algo.finalMessage){
        showMessage(algo.finalMessage)
    }
    algos.push(algo.name);
    algo.cell.removeFeature(algo);
    status.draw();
    if (algo.name == "QMCS") algorithm = true;
}


let startAlgos = () => {
    let c = undefined;
    algoMaze.setup();
    algoMaze.currentCell = algoMaze.grid[1][1];
    algoMaze.currentCell.visited = true;
    algoMaze.createMaze();

    c = algoMaze.grid[2][7]
    let QMCS = new Feature("QMCS");
    QMCS.requirements = [];
    QMCS.requirements.push(new Requirement(()=> {return hasAlgo("QPE")},
        "The Quantum Monte Carlo Algorithm consists of 3 major parts. \n- Distribution loading \n- Payoff calculation \n- Quantum Phase estimation (QPE).\n\n"+
        "You get the distribution and payoff for free \nbecause of what your colleagues investigated last year. \nPlease research the QPE before mastering the QMCS"))
    QMCS.visit = ()=> {visitalgo(QMCS);}
    c.addFeature(QMCS);

    c = algoMaze.grid[7][2]
    let QPE = new Feature("QPE");
        QPE.requirements = [];
        QPE.requirements.push(new Requirement(()=> {return hasAlgo("SuperPosition")},
            "The Quantum Phase Estimation is based on the \n3 main concepts of Quantum Computing.\n- Superposition \n- Entanglement \n- Interference.\n\n"+
            "Research all 3"))
        QPE.requirements.push(new Requirement(()=> {return hasAlgo("Entanglement")},
            "The Quantum Phase Estimation is based on the \n3 main concepts of Quantum Computing.\n- Superposition \n- Entanglement \n- Interference.\n\n"+
            "Research all 3"))
        QPE.requirements.push(new Requirement(()=> {return hasAlgo("Interference")},
            "The Quantum Phase Estimation is based on the \n3 main concepts of Quantum Computing.\n- Superposition \n- Entanglement \n- Interference.\n\n"+
            "Research all 3"))
        QPE.finalMessage = "test"

    QPE.visit = ()=> {visitalgo(QPE);}
    c.addFeature(QPE);

    c = randomCell(algoMaze)
    let QAOA = new Feature("QAOA");
    QAOA.visit = ()=> {
        showQuestion("You are losing time investigating algorithms \nthat are not needed for this project! \n"+
            "Your project therefore got a 6 month delay. \n"+
            "(To simulate this, you need to find the answer to the question:\n"+
            "What is the full name of QAOA? )", ["Quantum Approximate Optimization Algorithm"])
        visitalgo(QAOA);}
    c.addFeature(QAOA);

    c = randomCell(algoMaze)
    let HLL = new Feature("HLL");
    HLL.visit = ()=> {
            showQuestion("You are losing time investigating algorithms \nthat are not needed for this project! \n"+
            "Your project therefore got a 6 month delay. \n"+
            "(To simulate this, you need to find the answer to the question:\n"+
            "give one of the three persons that created the algorithm? )", ["Harrow","Hassidim","Lloyd"])
            visitalgo(HLL);}
    c.addFeature(HLL);

    c = randomCell(algoMaze)
    let SuperPosition = new Feature("SuperPosition");
    SuperPosition.visit = ()=> {
        const sleep = ms => new Promise(r => setTimeout(r, ms));
        showQuestion("Superposition\n\n"+
                                 "Superposition is the ability of a quantum object \nto be in two states ate the same time.\n"+
                                 "A quantumbit can be 0 and 1 at the same time\n"+
                                 "When measuring, one of the states will be found\nwith a certain probability"+
                                 "\nWhat standard gate is used to perform \nan equal superposition of basis states?",
                     ["Hadamard", "H", "hadamard", "Hadamard gate", "hadamard gate"]);
        visitalgo(SuperPosition);
        }
    c.addFeature(SuperPosition);

    c = randomCell(algoMaze)
    let Entanglement = new Feature("Entanglement");
    Entanglement.visit = ()=> {
            showQuestion("Entanglement\n\n"+
                "Entanglement is a quantum state of more then one \nquantum object.\n"+
                "Acting on one of the entangled bits has an \nimmediate effect on the others\n"+
                "Because this is going faster then the speed of light,\n"+
                "Einstein called this: 'Spooky action at a distance'\n"+
                "How many qubits do you need at least \nto create entanglement?",
            ["2", "two"]);

            visitalgo(Entanglement);}
    c.addFeature(Entanglement);

    c = randomCell(algoMaze)
    let Interference = new Feature("Interference");
    Interference.visit = ()=> {
                showMessage("Interference\n\n"+
                    "Interference is the effect on quantum objects\n"+
                    "that they can enhance or reduce their phase by \ncombining their waveforms\n"+
                    "It is comparable by actions going on in waterwaves");

            visitalgo(Interference);}
    c.addFeature(Interference);


    let office = new Feature("Office");
    algoMaze.grid[1][0].addFeature(office);
    removeWall(algoMaze.grid[1][0], algoMaze.grid[1][1]);

    office.visit = () => {
        changeMaze(officeMaze);
    }
};
startAlgos();
