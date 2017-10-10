    /**
     * Loads in the table information from fifa-matches.json
     */
d3.json('data/fifa-matches.json',function(error,data){

    /**
     * Loads in the tree information from fifa-tree.csv and calls createTree(csvData) to render the tree.
     *
     */
    d3.csv("data/fifa-tree.csv", function (error, csvData) {
      d3.csv("data/fifa-matches.csv", function(error, csvMatches) {
        csvData.forEach(function (d, i) {
            d.id = d.Team + d.Opponent + i;
        });
        console.log(csvMatches)
        console.log(data)
        let teamData = d3.nest()
          .key(function (d) {
              return d.Team;
          })
          .rollup(function (leaves) {
              let game_ranking = {"Winner":7, "Runner-Up":6, "Third Place":5, "Fourth Place":4,
                                  "Semi Finals":3, "Quarter Finals":2, "Round of Sixteen":1, "Group":0};
              var game_ranking_swapped = {};
              for(var key in game_ranking){
                game_ranking_swapped[game_ranking[key]] = key;
              }
              let gamesList = []
              leaves.forEach(function(d) {
                gamesList.push({"key": d.Opponent, "value": {
                  "Delta Goals": [],
                  "Wins": [],
                  "Losses": [],
                  "type": "game",
                  "Result": {"label": d.Result, "ranking": game_ranking[d.Result]},
                  "Opponent": d.Team,
                  "Goals Conceded": d['Goals Conceded'],
                  "Goals Made": d['Goals Made']
                }})
              });
              let highest_rank = d3.max(leaves, d => game_ranking[d.Result])
              return {
                "Losses": d3.sum(leaves, function(l){return l.Losses}),
                "Wins": d3.sum(leaves,function(l){return l.Wins}),
                "Goals Conceded": d3.sum(leaves, function(l){return l['Goals Conceded']}),
                "Goals Made": d3.sum(leaves, function(l){return l['Goals Made']}),
                "Delta Goals": d3.sum(leaves, function(l){return l['Goals Made']})-d3.sum(leaves, function(l){return l['Goals Conceded']}),
                "type": "aggregate",
                "TotalGames": leaves.length,
                "games": gamesList,
                "Result": {"label": game_ranking_swapped[highest_rank], "ranking": highest_rank}
              };
          })
          .entries(csvMatches);
          console.log(teamData)
        //Create Tree Object
        let tree = new Tree();
        tree.createTree(csvData);

        //Create Table Object and pass in reference to tree object (for hover linking)
        //let table = new Table(data,tree);
        let table = new Table(teamData,tree);

        table.createTable();
        table.updateTable();
      });
        //Create a unique "id" field for each game

    });
});



// // // ********************** HACKER VERSION ***************************
// /**
//  * Loads in fifa-matches.csv file, aggregates the data into the correct format,
//  * then calls the appropriate functions to create and populate the table.
//  *
//  */
// d3.csv("data/fifa-matches.csv", function (error, matchesCSV) {

//     /**
//      * Loads in the tree information from fifa-tree.csv and calls createTree(csvData) to render the tree.
//      *
//      */
//     d3.csv("data/fifa-tree.csv", function (error, treeCSV) {

//     // ******* TODO: PART I *******


//     });

// });
// // ********************** END HACKER VERSION ***************************
