var onceAndForAll = function(){

  var currentEnemies = d3.select('svg').selectAll("circle").data(enemies);

  //update
  currentEnemies
  .attr('cx', function(d){return d.x;})
  .attr('cy', function(d){return d.y;})
  .transition()
  .duration(1000);

  //add
  currentEnemies
  .enter()
  .append("image")
  .attr('xlink:href', function(d){return d.link;})
  .attr('cx', function(d){return d.cx;})
  .attr('y', function(d){return d.y;})
  .attr('height', function(d){return d.height;})
  .attr('width', function(d){return d.width;});

  currentEnemies.transition().duration(1000);
  console.log("....");
}

var scramble = function() {
  _.each(enemies, function(item) {
    item.cx = Math.floor(gameOptions.width * Math.random());
    item.y = Math.floor(gameOptions.height * Math.random());
  });
};

// update.
var updateEnemies = function() {
  console.log(enemies[1].cx, enemies[1].y);
  scramble();
  console.log(enemies[1].cx, enemies[1].y);
  currentEnemies.data(enemies)
    .append("image")
    .transition()
    .attr('cx', function(d){return d.cx;})
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
    .attr('cx', function(d){return d.cx;})
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
