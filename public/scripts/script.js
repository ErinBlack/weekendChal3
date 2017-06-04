$(document).ready(function(){

displayTasks();
$('#addTask').on('click', addTask);
$('.taskList').on('click', '.deleteTask', deleteTask );
$('.taskList').on('click', '.allCheckbox', markTask);

});//end onReady

function displayTasks(){
  console.log('displayTasks entered');
  $.ajax({
    type: 'GET',
    url: '/allTasks',
    success:function(response){
    console.log('back from server', response);
    for (var i = 0; i < response.length; i++) {
      var responseBack = response[i];
      var responseStatus = response[i].completed;
      console.log('response status', responseStatus);
      var checkbox = "<input type='checkbox' class='allCheckbox' value='" + responseStatus +
      "' name='task' id='" + responseBack.id+ "'>";
      $('.taskList').prepend('<li>  '+ checkbox + '<label>' + responseBack.task + '</label>' +
        '<button type="button" name="remove" class="deleteTask" id="' +
        responseBack.id + '">Delete</button></li>');

      if(response[i].completed === true){
        var thisId = response[i].id;
        console.log('if completed statment', thisId);
        $('#' + thisId ).prop('checked', true);

         $('ul.taskList').find('input#' + thisId).parent().appendTo('ul.taskList');
      }
      else{
          var thisIdFalse = response[i].id;
         $('ul.taskList').find('input#' + thisIdFalse).parent().prependTo('ul.taskList');
      }
    } // end forloop
  }, //end function
  error: function(error){
    console.log('The /allTasks ajax get request failed with error: ', error);
  } // end erro
}); // end ajax call

} // end displayTasks


//added a task to the database
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


// deleting a task from a database
function deleteTask(){
  console.log('deleteTask entered');
  var intId = Number(this.id);

  var taskToDelete = {
    id: intId
  };
  console.log('taskToDelete', taskToDelete);
  $.ajax({
    type: 'DELETE',
    url: '/deleteTask',
    data: taskToDelete,
    success: function(response){
      console.log('back from the server with tasktoDelete response', response);
    } // end success
  });//end ajax call
  $('.taskList').empty();
  displayTasks();
}// end deleteTask

// marking task as completed
function markTask(){
  console.log('mark task entered');
  var checkboxId = Number(this.id);
  var taskToMark = {
    id: checkboxId
  };

  if(this.checked ){
    $.ajax({
      type:'PUT',
      url: '/markTaskTrue',
      data: taskToMark,
      success: function(response){
        var thisId = this.data;
        console.log('back from the server with taskToMarkTrue response', response);
        $('ul.taskList').find('input#' + thisId.slice(3)).parent().appendTo('ul.taskList');

      }
    }); // end ajax

  }
  else{
    $.ajax({
      type:'PUT',
      url: '/markTaskFalse',
      data: taskToMark,
      success: function(response){
        console.log('back from the server with taskToMarkFalse response', response);
        var thisId = this.data;
          $('ul.taskList').find('input#' + thisId.slice(3)).parent().prependTo('ul.taskList');
      }
    }); // end ajax
  }// end else
}//end marking task

//change completed task coloring
