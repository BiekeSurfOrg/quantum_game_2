/**
 * setup people
 */

let peopleMaze = new Maze(700,10,10 ,"People" );
peopleMaze.setup();
peopleMaze.currentCell = peopleMaze.grid[1][1];
peopleMaze.currentCell.visited = true;
peopleMaze.createMaze();

let iso = new Person(randomCell(peopleMaze), "Business \nExpert");
iso.message = "Hello, I can teach you \nhow our business is handling current logic \nI'dd be happy to assist you on your quantum journey"
peopleMaze.persons.push(iso);

let biso = new Person(randomCell(peopleMaze), "Delivery \nManager");
biso.message = "Hello, I'll free some time in the team for you,\nAs you know all these changes also consume time"
peopleMaze.persons.push(biso);

let ta = new Person(randomCell(peopleMaze), "Sponsor");
ta.message = "How nice you let me join, \nI am very happy to be part of this as a sponsor"
peopleMaze.persons.push(ta);

let sa = new Person(randomCell(peopleMaze), "Business \nExpert");
sa.message = "Hello, I can teach you \nhow our business is handling current logic \nI'dd be happy to assist you on your quantum journey"
peopleMaze.persons.push(sa);

let ba = new Person(randomCell(peopleMaze), "Business \nExpert");
ba.message = "Hello, I can teach you \nhow our business is handling current logic \nI'dd be happy to assist you on your quantum journey"
peopleMaze.persons.push(ba);

let ea = new Person(randomCell(peopleMaze), "Business \nExpert");
ea.message = "Hello, I can teach you \nhow our business is handling current logic \nI'dd be happy to assist you on your quantum journey"
peopleMaze.persons.push(ea);

let lorm = new Person(randomCell(peopleMaze), "Sponsor");
lorm.message = "How nice you let me join, \nI am very happy to be part of this as a sponsor"
peopleMaze.persons.push(lorm);

let corm = new Person(randomCell(peopleMaze), "Delivery \nManager");
corm.message = "Hello, I'll free some time in the team for you,\nAs you know all these changes also consume time"
peopleMaze.persons.push(corm);


let office = new Feature("Office");
peopleMaze.grid[1][0].addFeature(office);
removeWall(peopleMaze.grid[1][0], peopleMaze.grid[1][1]);

office.visit = () => {
    changeMaze(officeMaze);
}

peopleMaze.walk();