window.addEventListener('DOMContentLoaded', (event) => {
  let worksheet = new window.doenet.Worksheet();
  window.worksheet = worksheet;
    
  document.getElementById("reset").addEventListener("click", function() {
    worksheet.globalState.players = [];
  });

  let player1 = document.getElementById("player1");
  let player2 = document.getElementById("player2");

  player1.addEventListener("input", function() {
    worksheet.globalState.player1 = player1.value;
    document.getElementById("sum").innerHTML =
      (parseInt(player1.value) + parseInt(player2.value)).toString();
  });

  player2.addEventListener("input", function() {
    worksheet.globalState.player2 = player2.value;
    document.getElementById("sum").innerHTML =
      (parseInt(player1.value) + parseInt(player2.value)).toString();
  });    
  
  worksheet.addEventListener( 'globalState', function(e, state) {
    if (worksheet.globalState.players === undefined)
      worksheet.globalState.players = [];

    if (worksheet.globalState.player1)
      player1.value = worksheet.globalState.player1;

    if (worksheet.globalState.player2)
      player2.value = worksheet.globalState.player2;

    document.getElementById("sum").innerHTML =
      (parseInt(player1.value) + parseInt(player2.value)).toString();

    // The userId only gets populated after the browser fingerprint is computed
    if (worksheet.userId) {
      if (worksheet.globalState.players.indexOf( worksheet.userId ) === -1) {
        worksheet.globalState.players.push( worksheet.userId );
      }

      var n = worksheet.globalState.players.indexOf( worksheet.userId );

      player1.disabled = true;
      player2.disabled = true;      
      
      if (n == 0) {
        player1.disabled = false;
      }

      if (n == 1) {
        player2.disabled = false;
      }      
    }

      
    let node = document.getElementById("players");
    let cNode = node.cloneNode(false);
    node.parentNode.replaceChild(cNode, node);
    
    for( const player of worksheet.globalState.players ) {
      let li = document.createElement("li");
      if (player === worksheet.userId) {
        li.appendChild( document.createTextNode(player + " (you!)" ) );
      } else {
        li.appendChild( document.createTextNode(player) );
      }
      cNode.appendChild( li );
    }
  });  

});
