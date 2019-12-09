window.addEventListener('DOMContentLoaded', (event) => {
  console.log('DOM loaded.');
  let worksheet = new window.doenet.Worksheet();

  window.worksheet = worksheet;
  
  worksheet.addEventListener( 'progress', function(e, progress) {
    console.log("new progress", progress);
  });
  
  document.getElementById("progress").addEventListener("click", function() {
    const p = Math.random();
    console.log("setting progress to",p);
    worksheet.progress = p;
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
  
  document.getElementById("statement").addEventListener("click", function() {
    let stmt = new window.doenet.xAPI.Statement(
      window.doenet.xAPI.actor.me, 
      window.doenet.xAPI.verb.checkedIn,
      worksheet
    );

    worksheet.recordStatement( stmt );
  });

});
