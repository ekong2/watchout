// start slingin' some d3 here.
var gameOptions = {};
gameOptions.height = 450;
gameOptions.width = 700;
gameOptions.numEnemies = 30;

var enemies = [];

//store enemies into array
for(var i = 0; i < gameOptions.numEnemies; i++) {
  var enemy = {};
  enemy.id = i;
  enemy.x = gameOptions.width * Math.random();
  enemy.y = gameOptions.height * Math.random();
  enemies.push(enemy);
}

//Set game board
var gameBoard = d3.select('p').append("svg")
.attr('width', gameOptions.width)
.attr('height', gameOptions.height);

//initialize myself
var myself = gameBoard.selectAll('circle.myself')
  .data([{'id': 999, 'x': gameOptions.width/2, 'y': gameOptions.height/2}],
    function(d){return d.id;});

//add myself to board
myself.enter()
  .append('svg:circle')
  .attr('class', 'myself')
  .attr('cx', function(d){return d.x;})
  .attr('cy', function(d){return d.y;})
  .attr('r', 5)
  .attr('fill', 'red');

//initialize enemies
var currentEnemies = gameBoard.selectAll('circle.enemy')
  .data(enemies, function(d){return d.id;});

//add enemies to board
currentEnemies.enter()
  .append('svg:circle')
    .attr('class', 'enemy')
    .attr('cx', function(d){return d.x;})
    .attr('cy', function(d){return d.y;})
    .attr('r', 5);

//update enemies
var move = function(){
currentEnemies
  .transition()
  .duration(1000)
  .attr('cx', function(d){return Math.random() * gameOptions.width;})
  .attr('cy', function(d){return Math.random() * gameOptions.height;});
};

setInterval(function(){move()}, 1500);
