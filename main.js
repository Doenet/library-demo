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

  let textbox = document.getElementById("textbox");
  textbox.addEventListener("input", function() {
    console.log(textbox.value);
    worksheet.state = { textbox: textbox.value, checked: checkbox.checked };
  });

  worksheet.addEventListener( 'state', function(event, state) {
    if (state.textbox)
      textbox.value = state.textbox;

    checkbox.checked = state.checked;
  });

});
