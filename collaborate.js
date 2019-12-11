window.addEventListener('DOMContentLoaded', (event) => {
  let worksheet = new window.doenet.Worksheet();
  window.worksheet = worksheet;

  let player1 = document.getElementById("player1");
  let player2 = document.getElementById("player2");
  
  function update(globalState) {
    // Remove children of #players
    let node = document.getElementById("players");
    let cNode = node.cloneNode(false);
    node.parentNode.replaceChild(cNode, node);

    // Display a list of all players
    for( const player of globalState.players ) {
      let li = document.createElement("li");
      if (player === worksheet.userId) {
        li.appendChild( document.createTextNode(player + " (you!)" ) );
      } else {
        li.appendChild( document.createTextNode(player) );
      }
      cNode.appendChild( li );
    }

    // Display the sum of the two boxes
    document.getElementById("sum").innerHTML =
      (parseInt(player1.value) + parseInt(player2.value)).toString();

    // The userId only gets populated after the browser fingerprint is computed
    if (worksheet.userId) {
      if (globalState.players.indexOf( worksheet.userId ) === -1) {
        globalState.players.push( worksheet.userId );
      }

      var n = globalState.players.indexOf( worksheet.userId );

      // Disable the input boxes depending on who the player is
      player1.disabled = true;
      player2.disabled = true;      
      
      if (n == 0) {
        player1.disabled = false;
      }

      if (n == 1) {
        player2.disabled = false;
      }      
    }
  }

  // Clear all the players
  document.getElementById("reset").addEventListener("click", function() {
    worksheet.globalState.players = [];
    update(worksheet.globalState);
  });

  // Edit the Player 1 box
  player1.addEventListener("input", function() {
    worksheet.globalState.player1 = player1.value;
    update(worksheet.globalState);    
  });

  // Edit the Player 2 box
  player2.addEventListener("input", function() {
    worksheet.globalState.player2 = player2.value;
    update(worksheet.globalState);        
  });    

  worksheet.addEventListener( 'globalState', function(e, state) {
    if (worksheet.globalState.players === undefined)
      worksheet.globalState.players = [];

    if (worksheet.globalState.player1)
      player1.value = worksheet.globalState.player1;

    if (worksheet.globalState.player2)
      player2.value = worksheet.globalState.player2;

    update(state);
  });  
});
