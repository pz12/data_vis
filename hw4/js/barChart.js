/** Class implementing the bar chart view. */

//https://github.com/dataviscourse/2017-dataviscourse-homework/tree/master/hw4

class BarChart {

    /**
     * Create a bar chart instance and pass the other views in.
     * @param worldMap
     * @param infoPanel
     * @param allData
     */
    constructor(worldMap, infoPanel, allData) {
        this.worldMap = worldMap;
        this.infoPanel = infoPanel;
        this.allData = allData;
    }



    /**
     * Render and update the bar chart based on the selection of the data type in the drop-down box
     */
    updateBarChart(selectedDimension) {

        // ******* TODO: PART I *******

        let data = this.allData;


        // Create the x and y scales; make
        // sure to leave room for the axes
        let xScale = d3.scaleLinear() //This is the problem
            .domain([0, data.length])
            .range([0, 400])
            .nice();
        let yScale = d3.scaleLinear()
            .domain([0, d3.max(data, d => d[selectedDimension])])
            .range([0, 250])
            .nice();
        let yAxisScale = d3.scaleLinear()
            .domain([0, d3.max(data, d => d[selectedDimension])])
            .range([250, 0])
            .nice();
        let years = []
        for(let i=0; i<data.length; i++) {
          years.push(data[i].year);
        }
        let range = []
        for(let i=0; i<data.length; i++) {
          range.push(i*19.5);
        }
        years = years.sort();
        let xAxisScale = d3.scaleLinear()
            .domain(years)
            .range(range)
            .nice();
        // Create colorScale
        let colorScale = d3.scaleLinear()
          .domain([0, d3.max(data, d => d[selectedDimension])])
          .range(["rgb(133, 167, 235)","rgb(7, 37, 96)"]);
        // Create the axes (hint: use #xAxis and #yAxis)
        let xAxis = d3.axisBottom().tickFormat(d3.format("d"));;
       // assign the scale to the axis
        xAxis.scale(xAxisScale);
        let yAxis = d3.axisLeft();
        yAxis.scale(yAxisScale);
        // Create the bars (hint: use #bars)
        let bars = d3.select('#bars')
                      .attr("transform","translate(80, 50) scale(1,1) rotate(90 150 160) rotate(90 150 80)" )
                      .selectAll('rect')
                      .data(data);
                    bars.exit()
                      .transition()
                      .duration(1000)
                      .remove();
              bars = bars.enter()
                      .append('rect')
                      .on('click', function() {
                        d3.select(".selected").classed("selected", false);
                        d3.select(this).classed("selected", true);
                      })
                      .merge(bars);
                    bars.transition()
                      .duration(1000)
                      .attr('fill', function(d,i) {
                        return colorScale(d[selectedDimension]);})
                      .attr('width', "18px")
                      .attr("x", function(d,i) {
                        return xScale(i)})
                      .attr("y", 0)
                      .attr("height", function(d,i) {
                        return yScale(d[selectedDimension]);})

        d3.select('#xAxis')
          .attr("transform", "translate(60, 291) ")
          .call(xAxis)
          .selectAll("text")
            .style("text-anchor", "end")
            .attr("transform", function(d) {
                return "rotate(-90)" 
                });;
        d3.select('#yAxis')
          .attr("transform", "translate(60, 38)")
          .call(yAxis);


        // ******* TODO: PART II *******

        // Implement how the bars respond to click events
        // Color the selected bar to indicate is has been selected.
        // Make sure only the selected bar has this new color.

        // Call the necessary update functions for when a user clicks on a bar.
        // Note: think about what you want to update when a different bar is selected.



    }

    /**
     *  Check the drop-down box for the currently selected data type and update the bar chart accordingly.
     *
     *  There are 4 attributes that can be selected:
     *  goals, matches, attendance and teams.
     */
    chooseData() {
        // ******* TODO: PART I *******
        //Changed the selected data when a user selects a different
        // menu item from the drop down.

    }


}
