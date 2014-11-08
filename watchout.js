
// $(document).ready(function(){
  // var $enemy = $('#enemy-template').html();
//   var $arena = $('#arena');
//   $arena.append($enemy);
//   console.log($('.enemy'));
// });
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

// var randomPosition = {
//     'top' : function() {
//       return Math.random()*(arenaHeight-20) +"px";
//     },
//     'left' : function() {
//       return Math.random()*(arenaWidth -20) +"px";
//     }
//   };

// add enemies
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

var d3player = d3
  .select('#arena')
  .selectAll('.player')
  .data([0], function(d) {
    return d;
  });
d3player
  .enter()
  .append('div')
  .classed('player',true);

var playerNode = document.getElementsByClassName('player')[0];

function updatePosition() {
  d3enemies
  .data(enemyIds(), function(d) {
    return d.id;
  })
  .transition()
  .style('top', function(d) {
    // debugger;
    return d.y +'px';
  })
  .style('left', function(d) {
    return d.x +'px';
  })
  .tween('position', function(d,i) {
    //console.log("id" +i +"position after" +d.x);
    return function(t) {
      if ((Math.abs(playerNode.offsetLeft - this.offsetLeft) < 10 )&&
        (Math.abs(playerNode.offsetTop - this.offsetTop) < 10 )) {
        resetScore();
        console.log('collide');
      }
      // console.log(playerNode.offsetLeft);
      // console.log(this.offsetLeft);
    };
  });
};

// $('#arena').mousemove(function(event) {
//   // debugger;
//   console.log(event.offsetY);
//   $('.player').css({top: event.offsetY, left: event.offsetX});
// });
$('.player').draggable({ drag: function(event, ui) {
}
});



setInterval(updatePosition, 3000);

  // //.style('top', function() {
  //   return Math.random()*500 +"px";
  // })
  // .style('left', function() {
  //   return Math.
  // });

