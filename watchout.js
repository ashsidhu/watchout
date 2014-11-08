// SETUP CODE
var arenaWidth = 500;
var arenaHeight = 500;
var enemyCount = 10;
var enemyIds = function() {
  return Array.apply(null, new Array(enemyCount)).map(function(val, i) {
    return {
      id: i,
      x: Math.random()*(arenaHeight-20),
      y: Math.random()*(arenaHeight-20)
    }
  });
};

// SCORE CODE
var gameStats = {
  currentScore: 0,
  highScore: 0
};
var currentScoreSpan = document.getElementsByClassName('current')[0].children[0];
var highScoreSpan = document.getElementsByClassName('high')[0].children[0];

setInterval (function () {
  gameStats.currentScore++;
  currentScoreSpan.textContent = (''+gameStats.currentScore);
}, 50);

function resetScore () {
  if (gameStats.currentScore > gameStats.highScore) {
    gameStats.highScore = gameStats.currentScore;
    // update high score span
    highScoreSpan.textContent = ('' + gameStats.highScore);
  }
  gameStats.currentScore = 0;
}

// ENEMY CODE
var d3enemies = d3
  .select('#arena')
  .selectAll('.enemy')
  .data(enemyIds(), function(d) {
    return d.id;
  });

d3enemies
  .enter()
  .append('div')
  .classed('enemy', true)
  .style('top', function(d) {
    return d.y +'px';
  })
  .style('left', function(d) {
    return d.x +'px';
  });


// PLAYER CODE
var playerDrag = d3.behavior.drag()
  .on('drag', function (data) {
    var y = (d3.event.y > 480) ? 480 : (d3.event.y < 0 ? 0 : d3.event.y);
    var x = (d3.event.x > 480) ? 480 : (d3.event.x < 0 ? 0 : d3.event.x);
    d3player
      .style('top', (y + 'px'))
      .style('left', (x + 'px'));


  });

var d3player = d3
  .select('#arena')
  .selectAll('.player')
  .data([0], function(d) {
    return d;
  });

d3player
  .enter()
  .append('div')
  .classed('player',true)
  .call(playerDrag);

var playerNode = document.getElementsByClassName('player')[0];

// TURN CODE
function updatePosition() {
  d3enemies
  .data(enemyIds(), function(d) {
    return d.id;
  })
  .transition()
  .style('top', function(d) {
    return d.y +'px';
  })
  .style('left', function(d) {
    return d.x +'px';
  })
  .tween('position', function(d,i) {
    return function(t) {
      if ((Math.abs(playerNode.offsetLeft - this.offsetLeft) < 10 )&&
        (Math.abs(playerNode.offsetTop - this.offsetTop) < 10 )) {
        resetScore();
        console.log('collide');
      }
    };
  });
};

setInterval(updatePosition, 3000);
