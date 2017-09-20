/** Class implementing the infoPanel view. */
class InfoPanel {
    /**
     * Creates a infoPanel Object
     */
    constructor() {
    }

    /**
     * Update the info panel to show info about the currently selected world cup
     * @param oneWorldCup the currently selected world cup
     */
    updateInfo(oneWorldCup) {

        // ******* TODO: PART III *******

        // Update the text elements in the infoBox to reflect:
        // World Cup Title, host, winner, runner_up, and all participating teams that year
      document.getElementById("host").innerHTML = oneWorldCup.host;
        document.getElementById("winner").innerHTML = oneWorldCup.winner;
        document.getElementById("silver").innerHTML = oneWorldCup.runner_up;
        let teams = oneWorldCup.teams_names;
        let teamSpace = document.getElementById("teams");
        teamSpace.innerHTML = "";
        teamSpace.innerHTML += "<ul>";
        for(let i=0; i < teams.length; i++) {
          teamSpace.innerHTML += "<li>"+teams[i]+"</li>";
        }
        teamSpace.innerHTML += "</ul>";

        //console.log(yest);
        // Hint: For the list of teams, you can create an list element for each team.
        // Hint: Select the appropriate ids to update the text content.

        //Set Labels

    }

}
