// start slingin' some d3 here.

$(document).ready(function() {
  $(function() {
    $( '.player' ).draggable();
  });

  var arena = d3.select('.arena');
  //$('.player').draggable();
  var enemyList = [];
  for (var i = 1; i <= 30; i++) {
    enemyList.push(i);
  }

  var updatePosition = function() {

    arena.selectAll('img.enemy').data(enemyList).enter().append('img').attr('src', 'enemy.svg').attr('class','enemy').style('top', function() {
      return parseInt(Math.random()*500)+54 +"px";
    }).style('left', function() {
      return parseInt(Math.random()*1000)-10 +"px";
    }).transition().duration(1500);


    arena.selectAll('img.enemy').data(enemyList, function(d) {
      return d;
    }).transition().duration(1000).style('top', function() {
      return Math.random()*(500)+54 +"px";
    }).style('left', function() {
      return Math.random()*(1000)-10 +"px";
    });
   // console.log('updated');
  };
  $('.player').on('dragstart', function() {
    console.log($(this).position());
  });

  $('.player').on('drag',function() {
    var position = $(this).position();


  });

  // $('.player').on('dragend', function() {
  //   console.log($(this).position());
  // });





  updatePosition();
  setInterval(function() {
          updatePosition();
        }, 2000);
});


// function allowDrop(ev) {
//         ev.preventDefault();
//     }
//     function drag_start(event) {
//         var style = window.getComputedStyle(event.target, null);
//         event.dataTransfer.setData("text/plain",
//         (parseInt(style.getPropertyValue("left"),10) - event.clientX) + ',' + (parseInt(style.getPropertyValue("top"),10) - event.clientY));
//     }

//     function drag(ev) {
//         ev.dataTransfer.setData("text", ev.target.id);
//     }
//     function drag_over(event) {
//         event.preventDefault();
//         return false;
//     }

//     function drop(event) {
//         var offset = event.dataTransfer.getData("text/plain").split(',');
//         var dm = document.getElementById('dragme');
//         dm.style.left = (event.clientX + parseInt(offset[0],10)) + 'px';
//         dm.style.top = (event.clientY + parseInt(offset[1],10)) + 'px';
//         event.preventDefault();
//         return false;
//     }

//     var dm = document.getElementById('dragme');
//     dm.addEventListener('dragstart',drag_start,false);
//     document.body.addEventListener('dragover',drag_over,false);
//     document.body.addEventListener('drop',drop,false);
