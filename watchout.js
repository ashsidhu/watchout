// start slingin' some d3 here.

// $(document).ready(function(){
  // var $enemy = $('#enemy-template').html();
//   var $arena = $('#arena');
//   $arena.append($enemy);
//   console.log($('.enemy'));
// });
var arenaWidth = 500;
var arenaHeight = 500;
var enemyCount = 10;
var enemyIds = Array.apply(null, new Array(enemyCount)).map(function(val, i){return i;});
var randomPosition = {
    'top' : function() {
      return Math.random()*(arenaHeight-20) +"px";
    },
    'left' : function() {
      return Math.random()*(arenaWidth -20) +"px";
    }
  };

// add enemies
var d3enemies = d3
  .select('#arena')
  .selectAll('.enemy')
  .data(enemyIds, function(d) {
    return d;
  });
d3enemies
  .enter()
  .append('div')
  .classed('enemy', true)
  .style(randomPosition);

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

function updatePosition() {
  d3enemies
  .transition()
  .duration(1000)
  .style(randomPosition);
};

// $('#arena').mousemove(function(event) {
//   // debugger;
//   console.log(event.offsetY);
//   $('.player').css({top: event.offsetY, left: event.offsetX});
// });
$('.player').draggable({ drag: function(event, ui) {
  console.log(event);
}
});



setInterval(updatePosition, 5000);

  // //.style('top', function() {
  //   return Math.random()*500 +"px";
  // })
  // .style('left', function() {
  //   return Math.
  // });

