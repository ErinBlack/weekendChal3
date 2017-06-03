$(document).ready(function(){

displayTasks();
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
    }
  },
  error: function(error){
    console.log('The /allTasks ajax get request failed with error: ', error);
  }
  });
}
