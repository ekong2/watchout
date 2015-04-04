//Initialize game options
var gameOptions = {};
gameOptions.height = 450;
gameOptions.width = 700;
gameOptions.numEnemies = 30;
gameOptions.highScore = 0;
gameOptions.score = 0;
gameOptions.collisions = 0;

//initialize myself obj
var myself = {};
myself.id = 999;
myself.x = gameOptions.width * .5;
myself.y = gameOptions.height * .5;
myself.r = 5;

var highScoreSelection = d3.select('.high').select('span');
var currentScore = d3.select('.current').select('span');
var collisions = d3.select('.collisions').select('span');

//create drag property
var drag = d3.behavior.drag()
    .on("drag", function(d) {
        d.x += d3.event.dx;
        d.y += d3.event.dy;
        d3.select(this).attr("transform", function(d,i){
            return "translate(" + [ d.x,d.y ] + ")";
        });
    });

//initialize enemies array
var enemies = [];

for(var i = 0; i < gameOptions.numEnemies; i++) {
  var enemy = {};
  enemy.id = i;
  enemy.x = gameOptions.width * Math.random();
  enemy.y = gameOptions.height * Math.random();
  enemy.r = 10;
  enemies.push(enemy);
}

//Set game board
var gameBoard = d3.select('p').append("svg")
.attr('width', gameOptions.width)
.attr('height', gameOptions.height);

//initialize myself selection
var self = gameBoard.selectAll('circle.myself')
  .data([myself],
    function(d){return d.id;});

//add self to board
self.enter()
  .append('svg:circle')
  .attr('class', 'myself')
  .attr("transform", function(d) { return "translate(" + [d.x,d.y] + ")"})
  .attr('r', 5)
  .attr('fill', 'red')
  .call(drag);

//initialize enemies selection
var currentEnemies = gameBoard.selectAll('circle.enemy')
  .data(enemies, function(d){return d.id;});

//add enemies to board
currentEnemies.enter()
  .append('svg:image')
    .attr('class', 'enemy')
    // .attr('cx', function(d){return d.x;})
    // .attr('cy', function(d){return d.y;})
    .attr('r', function(d){return d.r;})
    // .append('svg:image')
    .attr('width', function(d){return d.r*2;})
    .attr('height', function(d){return d.r*2;})
    .attr('x', function(d){return d.x;})
    .attr('y', function(d){return d.y;})
    .attr('xlink:href', 'shuriken.png');

//create checkCollisions
var checkCollisions = function(enemy, updateScore) {
  var radiusSum = enemy.attr('r') + myself.r;
  var xDiff = enemy.attr('x') - myself.x;
  var yDiff = enemy.attr('y') - myself.y;

  var separation = Math.sqrt(Math.pow(xDiff, 2) + Math.pow(yDiff,2));
  if (separation < radiusSum){
    updateScore();
  }
};

var tweenWithCollisions = function(){
  var enemy = d3.select(this);
  return (checkCollisions(enemy, updateScore));
};

//create updateScore
var updateScore = function() {
  if(gameOptions.highScore < gameOptions.score){
    gameOptions.highScore = gameOptions.score;
    highScoreSelection.text(gameOptions.highScore);
  }
  gameOptions.score = 0;
  gameOptions.collisions++;
  currentScore.text(gameOptions.score);
  collisions.text(gameOptions.collisions);
};

//update enemies
var move = function(){
currentEnemies
  .transition()
  .duration(2000)
  .tween('custom', tweenWithCollisions)
  .attr('x', function(d){return Math.random() * gameOptions.width;})
  .attr('y', function(d){return Math.random() * gameOptions.height;});
};


setInterval(function(){move();}, 2000);
setInterval(function() {
  gameOptions.score++;
  currentScore.text(gameOptions.score);
}, 50);
