/** Class implementing the table. */
class Table {
    /**
     * Creates a Table Object
     */
    constructor(teamData, treeObject) {

        //Maintain reference to the tree Object;
        this.tree = treeObject;

        // Create list of all elements that will populate the table
        // Initially, the tableElements will be identical to the teamData
        this.tableElements = teamData; //

        ///** Store all match data for the 2014 Fifa cup */
        this.teamData = teamData;

        //Default values for the Table Headers
        this.tableHeaders = ["Delta Goals", "Result", "Wins", "Losses", "TotalGames"];

        /** To be used when sizing the svgs in the table cells.*/
        this.cell = {
            "width": 70,
            "height": 20,
            "buffer": 15
        };

        this.bar = {
            "height": 20
        };

        /** Set variables for commonly accessed data columns*/
        this.goalsMadeHeader = 'Goals Made';
        this.goalsConcededHeader = 'Goals Conceded';

        /** Setup the scales*/
        this.goalScale = null;

        /** Used for games/wins/losses*/
        this.gameScale = null;

        /**Color scales*/
        /**For aggregate columns  Use colors '#ece2f0', '#016450' for the range.*/
        this.aggregateColorScale = null;

        /**For goal Column. Use colors '#cb181d', '#034e7b'  for the range.*/
        this.goalColorScale = null;
    }


    /**
     * Creates a table skeleton including headers that when clicked allow you to sort the table by the chosen attribute.
     * Also calculates aggregate values of goals, wins, losses and total games as a function of country.
     *
     */
    createTable() {
//Hint: break up your "chains" often
        // ******* TODO: PART II *******
        let data = this.teamData;
        console.log(data)
        //Update Scale Domains
        this.goalScale = d3.scaleLinear()
                          .domain([d3.min(data, d => d.value['Goals Made']), d3.max(data, d => d.value['Goals Made'])])
                          .range([0,2*this.cell.width])
                          .nice();
        this.gameScale = d3.scaleLinear()
                          .domain([0, d3.max(data, d => d.value['TotalGames'])])
                          .range([0,this.cell.width]);
        this.aggregateColorScale = d3.scaleLinear()
                          .domain([0, d3.max(data, d => d.value['TotalGames'])])
                          .range(["#ece2f0","#016450"])

        //Create the x axes for the goalScale.
        let goalAxis = d3.axisTop();
        goalAxis.scale(this.goalScale);
        //add GoalAxis to header of col 1.

        d3.select("#goalHeader").append('svg')
          .attr('width', 2*this.cell.width+2*this.cell.buffer)
          .attr('height', this.cell.height)
          .append('g')
          .attr("transform", "translate(10,16)")
          .call(goalAxis)

          //
        // ******* TODO: PART V *******

        // Set sorting callback for clicking on headers

        // Clicking on headers should also trigger collapseList() and updateTable().


    }


    /**
     * Updates the table contents with a row for each element in the global variable tableElements.
     */
    updateTable() {
        // ******* TODO: PART III *******
        let gameScale = this.gameScale;
        let goalScale = this.goalScale;
        let aggregateColorScale = this.aggregateColorScale;
        let updateList = this.updateList;
        let tableElements = this.tableElements;
        let updateTable = this.updateTable;
        console.log(this.tableElements)
        let tr = d3.select('#matchTable tbody')
                    .selectAll('tr')
                    .data(tableElements)
                  tr.exit()
                    .remove()
              tr = tr.enter()
                    .append('tr')
                    .on('click', (d,i) => {

                      this.updateList(i);
                      this.updateTable();
                    })
                    .merge(tr)

        //Append th elements for the Team Names
        let th = tr.selectAll("th")
                    .data(function(d) { return[{'type': d.value['type'], 'vis': 'text', 'value': d.key}] })//return [{'type': d.value['type'], 'vis': 'bars', 'value': 25}]}})
                  th.exit()
                    .remove()
            th = th.enter()

                    .append('th')
                    .merge(th);
        //Append td elements for the remaining columns.
        let td = tr.selectAll("td")
                    .data(function(d) {


                      return[{'type': d.value['type'], 'vis': 'goals', 'value': {'goalsMade':d.value['Goals Made'], 'goalsConceded':d.value['Goals Conceded']}},
                                              {'type': d.value['type'], 'vis': 'text', 'value': d.value['Result']},
                                              {'type': d.value['type'], 'vis': 'bar', 'value': d.value['Wins']},
                                              {'type': d.value['type'], 'vis': 'bar', 'value': d.value['Losses']},
                                              {'type': d.value['type'], 'vis': 'bar', 'value': d.value['TotalGames']}
                                              ] })
                  td.exit()
                    .remove()
                td = td.enter()
                    .append('td')
                    .merge(td);

        //Data for each cell is of the type: {'type':<'game' or 'aggregate'>, 'value':<[array of 1 or two elements]>}
        //th.select('svg').remove()
        th.text(function(d) {

          if(d.type == 'aggregate') {
            return d.value
          }
          else {
            return "x"+d.value;
          }
        })
        .style('color', function(d) {
            if(d.type=='aggregate') {
              return "black";
            }
            else {
              return "gray";
            }
        });

        //Populate cells (do one type of cell at a time )
        let goalsColumn = td.filter(function(d) { return d.vis == 'goals'});
        let barColumns = td.filter(function(d) {return d.vis == 'bar'});
        let textColumn = td.filter(function(d) { return d.vis == 'text'});

        goalsColumn.select('svg').remove();
        let goalsBody = goalsColumn.append('svg').attr("width", this.cell.width*2+this.cell.buffer).attr("height", this.cell.height);
        goalsBody.append('rect')
          .classed('goalBar',true)
          .attr('fill', function(d) {
            if (d.value['goalsMade'] > d.value['goalsConceded']) { return 'blue';}
            else { return 'red'; }
          })
          .attr('width', function(d) {

            return Math.abs(goalScale(d.value['goalsMade'] - d.value['goalsConceded']));
          })
          .attr('height', function(d) {
            if(d.type=='aggregate') {
              return 10;
            }
            else {
              return 5;
            }
          })
          .attr('x', function(d) {

            if (d.value['goalsMade'] > d.value['goalsConceded']) {
              return goalScale(d.value['goalsConceded'])+6;
            }
            else { return goalScale(d.value['goalsMade'])+6; }
          })
          .attr('y', function(d) {
            if(d.type=='aggregate') {
              return 10;
            }
            else {
              return 12.5;
            }
          })
        goalsBody.append('circle')
          .classed("goalCircle", true)
          .attr('fill', function(d) {
            if(d.type=='aggregate') {
              return "blue";
            }
            else {
              return "none";
            }
          })
          .attr('stroke', function(d) {

              if(d.type=='aggregate') {
                return "none";
              }
              else {
                if(d.value['goalsConceded']==d.value['goalsMade']) {
                  return "gray"
                }
                return "blue";
              }
            }
          )
          .attr('cy', 15)
          .attr('cx', function(d) { return goalScale(d.value['goalsMade'])+6})
          .attr('r',5);
        goalsBody.append('circle')
          .classed("goalCircle", true)
          .attr('fill', function(d) {
            if(d.type=='aggregate') {
              return "red";
            }
            else {
              return "none";
            }
          })
          .attr('stroke', function(d) {
              if(d.type=='aggregate') {
                return "none";
              }
              else {
                if(d.value['goalsConceded']==d.value['goalsMade']) {
                  return "gray"
                }
                return "red";
              }
            }
          )
          .attr('cy', 15)
          .attr('cx', function(d) { return goalScale(d.value['goalsConceded'])+6})
          .attr('r',5);


        barColumns.select('svg').remove();
        let barBody = barColumns.append('svg').attr("width", this.cell.width).attr("height", this.cell.height)
          barBody.append('rect')
            .attr('width', function(d) { return gameScale(d.value)})
            .attr('height', this.bar.height*2+15)
            //
            .attr('x', 0)
            // .attr('y', this.cell.height/2)
            .attr('fill', function(d,i) {
                return aggregateColorScale(d.value);})
          barBody.append('text')
            .text(function(d) {return d.value})
            .classed("label", true)
            .attr("x", function(d) { return gameScale(d.value)-10})
            .attr("y",15)
            
        textColumn.text(function(d) {
            return d.value['label']
        });
        //Create diagrams in the goals column

        //Set the color of all games that tied to light gray
//hint: don't append an svg every time, only when you creat them
    };

    /**
     * Updates the global tableElements variable, with a row for each row to be rendered in the table.
     *
     */
    updateList(i) {
        // ******* TODO: PART IV *******
        let teamList = this.tableElements[i].value.games;
        if(this.tableElements[i+1].value['type']=='aggregate') {
          for (let j=0; j<teamList.length; j++) {
            this.tableElements.splice(j+i+1, 0, teamList[j])
          }
        }
        else {


            this.tableElements.splice(i+1, teamList.length)

            console.log(this.tableElements)

        }

    }

    /**
     * Collapses all expanded countries, leaving only rows for aggregate values per country.
     *
     */
    collapseList() {

        // ******* TODO: PART IV *******
		//this.tableElements.splice()
    }


}
