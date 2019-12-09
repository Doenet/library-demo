window.addEventListener('DOMContentLoaded', (event) => {
  let worksheet = new window.doenet.Worksheet();

  window.worksheet = worksheet;
  
  worksheet.addEventListener( 'progress', function(e, progress) {
    console.log("new progress", progress);
  });

  console.log( document.getElementById("increase") );
  
  document.getElementById("increase").addEventListener("click", function() {
    let p = 0;
    if (worksheet.progress > 0.0)
      p = worksheet.progress;

    worksheet.progress = (1 + p)/2.0;
  });
  
  let checkbox = document.getElementById("checkbox");
  checkbox.addEventListener("input", function() {
    worksheet.state.checked = checkbox.checked;
  });  

  let story = document.getElementById("story");
  story.addEventListener("input", function() {
    console.log(story.value);
    worksheet.state = { story: story.value, checked: checkbox.checked };
  });

  worksheet.addEventListener( 'state', function(e, state) {
    console.log("Copying server state to page state...");
    if (state.story)
      story.value = state.story;

    checkbox.checked = state.checked;
  });

});
