$(document).ready(function(){

displayTasks();
$('.addTask').on('click', addTask);
$('.taskList').on('click', '.deleteTask', deleteTask );
$('.taskList').on('click', '.allCheckbox', markTask);
$('.colors').on('click', swapCSS);

});//end onReady

var colorScheme = "yellow";

function displayTasks(){
  console.log('displayTasks entered');
  $.ajax({
    type: 'GET',
    url: '/task/allTasks',
    success:function(response){
    console.log('back from server', response);
    for (var i = 0; i < response.length; i++) {
      var responseBack = response[i];
      var responseStatus = response[i].completed;
      console.log('response status', responseStatus);
      var checkbox = "<input type='checkbox' class='allCheckbox' value='" + responseStatus +
      "' name='task' id='" + responseBack.id+ "'>";
      $('.taskList').prepend('<li>  '+ checkbox + '<label class="yellowLabel">' + responseBack.task + '</label>' +
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
    setCSS();
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
    task: $('.taskInput').val(),
    completed: 'false'
  };// end object to send
  console.log('object to send', objectToSend);
  $.ajax({
    type:'POST',
    url:'/task/addTask/',
    data: objectToSend,
    success: function(response){
      console.log('back from the server with response', response);
    }//end success
  }); // end ajax call
  $('.taskList').empty();
  displayTasks();
  $('.taskInput').val('');
  setCSS();
} // end addTask function


// deleting a task from a database
function deleteTask(){
  console.log('deleteTask entered');
  var intId = Number(this.id);
  var taskToDelete = {
    id: intId
  };

  if (confirm("Are you sure?")) {
      // your deletion code

  console.log('taskToDelete', taskToDelete);
  $.ajax({
    type: 'DELETE',
    url: '/task/deleteTask',
    data: taskToDelete,
    success: function(response){
      console.log('back from the server with tasktoDelete response', response);
    } // end success
  });//end ajax call
  $('.taskList').empty();
  displayTasks();
}
else{
return false;
}
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
      url: '/task/markTaskTrue',
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
      url: '/task/markTaskFalse',
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

//swapCSS when a button is clicked
function swapCSS(){
  // remove old color classes
  console.log('swapp css entered');
  $("header").removeClass(colorScheme + "Header");
  $(".taskBody").removeClass(colorScheme + "Body");
  $(".taskInput").removeClass(colorScheme + "Input");
  $("label").removeClass(colorScheme + "Label");

  // Current butt
  colorScheme = this.id;
  setCSS(colorScheme);
} // end swapCSS

function setCSS(){
  console.log('entered SET CSS');
  console.log('colorScheme', colorScheme);
  $("header").addClass(colorScheme+ "Header");
  $(".taskBody").addClass(colorScheme + "Body");
  $(".taskInput").addClass(colorScheme + "Input");
  $("label").addClass(colorScheme + "Label");
}
