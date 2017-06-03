$(document).ready(function(){

displayTasks();
$('#addTask').on('click', addTask);

});//end onReady

function displayTasks(){
  console.log('displayTasks entered');
  $.ajax({
    type: 'GET',
    url: '/allTasks',
    success:function(response){
    console.log('back from server', response);
    for (var i = 0; i < response.length; i++) {
        $('.taskList').append('<li>' + response[i].task +
        '<button type="button" name="remove" class="deleteTask" id="' +
        response[i].id + '">Delete</button></li>');
    } // end forloop
  }, //end function
  error: function(error){
    console.log('The /allTasks ajax get request failed with error: ', error);
  } // end erro
}); // end ajax call
} // end displayTasks

function addTask(){
  console.log('addTask entered');
  var objectToSend = {
    task: $('#taskInput').val(),
    completed: 'false'
  };// end object to send
  console.log('object to send', objectToSend);
  $.ajax({
    type:'POST',
    url:'/addTask',
    data: objectToSend,
    success: function(response){
      console.log('back from the server with response', response);
    }//end success
  }); // end ajax call
  $('.taskList').empty();
  displayTasks();
  $('#taskInput').val('');
} // end addTask function
