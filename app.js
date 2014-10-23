var randomList = function(){
  window.location.hash = '#/'+Math.random().toString(36).substring(7);
}

$(function(){
  var messages = new Firebase('https://flickering-inferno-3391.firebaseio.com/messages')
  ,   room
  ;

  $(window).on('hashchange', function(){
    var hash = window.location.hash.slice(1)
    ,   href = window.location.href
    ;

    if (hash == '') {
      randomList();
      return;
    }

    room = messages.child(hash);

    $('#email-to-friend').attr(
      'href',
      'mailto:?subject='
      + encodeURI('Collaborate on my doto list!')
      + '&body='
      + encodeURI(window.location.href)
    );

    $('#todos').empty();

    room.on('child_added', function(snapshot) {
      var todo = snapshot.val();
      displayTodo(todo.todo, todo.active);
    });

  }).trigger('hashchange');


  $('#todo').keypress(function (e) {
    if (e.keyCode == 13) {
      var todo = $('#todo').val();
      room.push({todo: todo, active: true});
      $('#todo').val('');
    }
  });

  function displayTodo(todo, active) {
    $('#todos').append($('<li/>').text(todo));
  };
});
