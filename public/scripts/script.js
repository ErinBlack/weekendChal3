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
  getTasks();
} // end displayTasks

// //added a task to the database
function addTask(){
  console.log('addTask entered');
 var objectToSend = {
    task: $('.taskInput').val(),
    completed: 'false'
  };// end object to send
  postTask(objectToSend);
 } // end addTask function

//  deleting a task from a database
function deleteTask(){
  console.log('deleteTask entered');
  var intId = Number(this.id);
  console.log('DeleteTask This', this);
  var taskToDelete = {
       id: intId
     };

  if (confirm('Are you sure?')){
     // deletion code
     deleteFromServer(taskToDelete);
  }
  else{return false;}
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

/* ---AJAX CALLS --- */

function getTasks(){
  console.log('getTasks entered');
  $.get('/task/allTasks')
    .done(updateDOM)
    .fail(weHaveFailed);
    setCSS();
}

function postTask(task){
  console.log('postTask entered');
  $.post('/task/addTask', task)
    .done(getTasks)
    .fail(weHaveFailed);
}

function deleteFromServer(task){
  console.log('deleteFromServer entered');
  console.log('TASK DATA', task);
  $.ajax({
     type: 'DELETE',
     url: '/task/deleteTask',
     data: task,
     success: function(response){
       console.log('back from the server with tasktoDelete response', response);
     } // end success
   });//end ajax call
   displayTasks();
}

/* ---Update the DOM --- */

function updateDOM(tasks){
  console.log('updateDom was entered');
  $('.taskList').empty();
  tasks.forEach(function(task){
    //shorthands for task properites
    var taskStatus = task.completed;
    var taskId = task.id;
    var taskText = task.task;
    var checkbox = "<input type='checkbox' class='allCheckbox' value='" + taskStatus +
    "' name='task' id='" + taskId + "'>";
    $('.taskList').prepend('<li>  '+ checkbox + '<label class="yellowLabel">' + taskText + '</label>' +
      '<button type="button" name="remove" class="deleteTask" id="' +
    task.id + '">Delete</button></li>');

    if(taskStatus === true){
      console.log('if completed statment', taskId);
      $('#' + taskId ).prop('checked', true);
       $('ul.taskList').find('input#' + taskId).parent().appendTo('ul.taskList');
    }
    else{
        var thisIdFalse = task.id;
       $('ul.taskList').find('input#' + thisIdFalse).parent().prependTo('ul.taskList');
    }
  });
} //end function

/** ----- Utility Functions ----- **/
function weHaveFailed() {
  console.log('Boo fail');
}
