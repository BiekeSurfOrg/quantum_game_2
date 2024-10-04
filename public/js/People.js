/**
 * setup people
 */

let peopleMaze = new Maze(700,10,10 ,"People" );
peopleMaze.setup();
peopleMaze.currentCell = peopleMaze.grid[1][1];
peopleMaze.currentCell.visited = true;
peopleMaze.createMaze();

let iso = new Person(randomCell(peopleMaze), "Business \nExpert");
peopleMaze.persons.push(iso);

let biso = new Person(randomCell(peopleMaze), "Delivery \nManager");
peopleMaze.persons.push(biso);

let ta = new Person(randomCell(peopleMaze), "Sponsor");
peopleMaze.persons.push(ta);

let sa = new Person(randomCell(peopleMaze), "Business \nExpert");
peopleMaze.persons.push(sa);

let ba = new Person(randomCell(peopleMaze), "Business \nExpert");
peopleMaze.persons.push(ba);

let ea = new Person(randomCell(peopleMaze), "Business \nExpert");
peopleMaze.persons.push(ea);

let lorm = new Person(randomCell(peopleMaze), "Sponsor");
peopleMaze.persons.push(lorm);

let corm = new Person(randomCell(peopleMaze), "Delivery \nManager");
peopleMaze.persons.push(corm);


let office = new Feature("Office");
peopleMaze.grid[1][0].addFeature(office);
removeWall(peopleMaze.grid[1][0], peopleMaze.grid[1][1]);

office.visit = () => {
    changeMaze(officeMaze);
}

peopleMaze.walk();