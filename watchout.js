// start slingin' some d3 here.
var gameOptions = {};
gameOptions.height = 450;
gameOptions.width = 700;
gameOptions.numEnemies = 30;

var enemies = [];

for(var i = 0; i < gameOptions.numEnemies; i++) {
  var enemy = {};
  enemy.id = i;
  enemy.link = "asteroid.png";
  enemy.x = Math.floor(gameOptions.width * Math.random());
  enemy.y = Math.floor(gameOptions.height * Math.random());
  enemy.height = '20px';
  enemy.width = '20px';
  enemies.push(enemy);
}

//Set game board
d3.select('p').append("svg")
.attr('width', gameOptions.width)
.attr('height', gameOptions.height);


var onceAndForAll = function(){

  var currentEnemies = d3.select('svg').selectAll("image").data(enemies);

  //update
  currentEnemies
  // .attr('x', function(d){return d.x;})
  // .attr('y', function(d){return d.y;})
  .transition()
  .duration(1000)
  .attr('x', function(d){return Math.random() * 1000;})
  // .attr('y', function(d){return Math.random() * 1000;});

  //add
  currentEnemies
  .enter()
  .append("image")
  .attr('xlink:href', function(d){return d.link;})
  .attr('x', function(d){return d.x;})
  .attr('y', function(d){return d.y;})
  .attr('height', function(d){return d.height;})
  .attr('width', function(d){return d.width;});

  currentEnemies.transition().duration(1000);
  console.log("....");
}

var scramble = function() {
  _.each(enemies, function(item) {
    item.x = Math.floor(gameOptions.width * Math.random());
    item.y = Math.floor(gameOptions.height * Math.random());
  });
};

// update.
var updateEnemies = function() {
  console.log(enemies[1].x, enemies[1].y);
  scramble();
  console.log(enemies[1].x, enemies[1].y);
  currentEnemies.data(enemies)
    .append("image")
    .transition()
    .attr('x', function(d){return d.x;})
    .attr('y', function(d){return d.y;})
    .duration(1000);
    console.log('hey vince');
};

// add.
var addEnemies = function(enemies) {
  currentEnemies.data(enemies)
    .enter()
    .append("image")
    .attr('xlink:href', function(d){return d.link;})
    .attr('x', function(d){return d.x;})
    .attr('y', function(d){return d.y;})
    .attr('height', function(d){return d.height;})
    .attr('width', function(d){return d.width;});
};

// delete.
var exterminate = function(enemies) {
  currentEnemies.data(enemies)
  .exit()
  .remove();
};

// addEnemies(enemies);
// updateEnemies(enemies);
setInterval(function() {
  onceAndForAll();
}, 1500);

//Add enemies to board
// d3.select('svg').selectAll("image")
// .data(enemies)
// .enter()
// .append("image")
// .attr('xlink:href', function(d){return d.link;})
// .attr('x', function(d){return d.x;})
// .attr('y', function(d){return d.y;})
// .attr('height', function(d){return d.height;})
// .attr('width', function(d){return d.width;});
