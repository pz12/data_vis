/** Class implementing the map view. */
class Map {
    /**
     * Creates a Map Object
     */
    constructor() {
        this.projection = d3.geoConicConformal().scale(150).translate([400, 350]);

    }

    /**
     * Function that clears the map
     */
    clearMap() {

        // ******* TODO: PART V*******
        // Clear the map of any colors/markers; You can do this with inline styling or by
        // defining a class style in styles.css
  d3.select(".host").classed("host", false);
  d3.selectAll(".team").classed("team", false);
    d3.select(".gold").classed("gold", false);
      d3.select(".silver").classed("silver", false);

      d3.selectAll(".gold.legend-element").classed("gold",true);
        // Hint: If you followed our suggestion of using classes to style
        // the colors and markers for hosts/teams/winners, you can use
        // d3 selection and .classed to set these classes on and off here.

    }

    /**
     * Update Map with info for a specific FIFA World Cup
     * @param wordcupData the data for one specific world cup
     */
    updateMap(worldcupData) {

        //Clear any previous selections;
        this.clearMap();

        // ******* TODO: PART V *******

        // Add a marker for the winner and runner up to the map.

        // Hint: remember we have a conveniently labeled class called .winner
        // as well as a .silver. These have styling attributes for the two
        // markers.

        let projection = d3.geoConicConformal()
           .scale(172)
           .translate([500, 400])

        let winnerPos = worldcupData.win_pos;
        let silverPos = worldcupData.ru_pos;
        d3.select("#points").html("").append('circle')
        .attr("cx", function (d) {
                  return projection(winnerPos)[0];
              })
              .attr("cy", function (d) {
                  return projection(winnerPos)[1];
              })
          .classed('gold', true)
          .attr('r', "8")
        d3.select("#points").append('circle')
          .attr("cx", function (d) {
                    return projection(silverPos)[0];
                })
                .attr("cy", function (d) {
                    return projection(silverPos)[1];
                })
            .classed('silver', true)
            .attr('r', "8");
        // Select the host country and change it's color accordingly.
        let host = worldcupData.host_country_code;


        d3.select('#'+host).classed("host", true);

        let teams = worldcupData.teams_iso;


        for (let i=0; i<teams.length; i++) {
          d3.select("#"+teams[i]).classed("team", true);
        }
        // Iterate through all participating teams and change their color as well.

        // We strongly suggest using CSS classes to style the selected countries.


        // Add a marker for gold/silver medalists
    }

    /**
     * Renders the actual map
     * @param the json data with the shape of all countries
     */
    drawMap(world) {

        //(note that projection is a class member
        // updateMap() will need it to add the winner/runner_up markers.)

        // ******* TODO: PART IV *******
        //topojson.feature(world, object)
        let mapSpace = d3.select("#map");
        var countries = topojson.feature(world, world.objects.countries).features

        let projection = d3.geoConicConformal()
           .scale(172)
           .translate([500, 400])

        let path = d3.geoPath()
          .projection(projection);

        let map = mapSpace.selectAll("path")
          .data(countries)
          .enter().insert("path", ".graticule")
        .attr("id", function(d) { return d.id; })
        .classed("countries", true)
        .attr("d", path);

        let graticule = d3.geoGraticule();
             mapSpace.append('path').datum(graticule).attr('class', "grat").attr('d', path).attr('fill', 'none');

        // Draw the background (country outlines; hint: use #map)
        // Make sure and add gridlines to the map

        // Hint: assign an id to each country path to make it easier to select afterwards
        // we suggest you use the variable in the data element's .id field to set the id

        // Make sure and give your paths the appropriate class (see the .css selectors at
        // the top of the provided html file)

    }


}
