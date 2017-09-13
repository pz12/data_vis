/**
 * Makes the first bar chart appear as a staircase.
 *
 * Note: use only the DOM API, not D3!
 */
function staircase() {
    // ****** TODO: PART II ******
    let chart = document.getElementById('firstBarChart');
    for(var i=0; i<chart.childElementCount; i++) {
      let rect = chart.children[i];
      rect.setAttribute("height", i*10+10);
    }
}

/**
 * Render the visualizations
 * @param error
 * @param data
 */
function update(error, data) {
    if (error !== null) {
        alert('Could not load the dataset!');
    } else {
        // D3 loads all CSV data as strings;
        // while Javascript is pretty smart
        // about interpreting strings as
        // numbers when you do things like
        // multiplication, it will still
        // treat them as strings where it makes
        // sense (e.g. adding strings will
        // concatenate them, not add the values
        // together, or comparing strings
        // will do string comparison, not
        // numeric comparison).

        // We need to explicitly convert values
        // to numbers so that comparisons work
        // when we call d3.max()

        for (let d of data) {
            d.a = +d.a;
            d.b = +d.b;
        }
    }

    // Set up the scales
    let aScale = d3.scaleLinear()
        .domain([0, d3.max(data, d => d.a)])
        .range([0, 150]);
    let bScale = d3.scaleLinear()
        .domain([0, d3.max(data, d => d.b)])
        .range([0, 150]);
    let iScale = d3.scaleLinear()
        .domain([0, data.length])
        .range([0, 110]);


    // ****** TODO: PART III (you will also edit in PART V) ******

    // TODO: Select and update the 'a' bar chart bars

    let selecta = d3.select('#firstBarChart');
    let achart = selecta.selectAll("rect")
     .data(data);
     achart.exit().style("opacity", 1)
                .transition()
                .duration(1000)
                .style("opacity", 0).remove()
    achart = achart.enter().append("rect").classed("barChart", true)
      .merge(achart);
    achart
    .transition()
    .duration(1000)
    .attr("height", function(d,i) {
         return aScale(d.a);
       })
       .attr("width", "10px")
       .attr("x", function(d,i) {
         return i*10;
       })
       .attr("y", 0)


    // TODO: Select and update the 'b' bar chart bars
    let selectb = d3.select('#secondBarChart');
    let bchart = selectb.selectAll("rect")
     .data(data);
     bchart.exit().style("opacity", 1)
                .transition()
                .duration(1000)
                .style("opacity", 0).remove()
    bchart = bchart.enter().append("rect").classed("barChart", true).merge(bchart);

    bchart.transition()
    .duration(1000)
    .attr("height", function(d,i) {
         return aScale(d.b);
       })
       .attr("width", "10px")
       .attr("x", function(d,i) {
         return i*10;
       })
       .attr("y", 0)
    // TODO: Select and update the 'a' line chart path using this line generator

    let aLineGenerator = d3.line()
        .x((d, i) => iScale(i))
        .y((d) => aScale(d.a));

    let aline = d3.select('#firstLine').select("path");
    aline.transition()
    .duration(1000)
    .attr("d", aLineGenerator(data));

    // TODO: Select and update the 'b' line chart path (create your own generator)
    let bLineGenerator = d3.line()
        .x((d, i) => iScale(i))
        .y((d) => aScale(d.b));

    let bline = d3.select('#secondLine').select("path");
    bline.transition()
    .duration(1000)
    .attr("d", bLineGenerator(data));

    // TODO: Select and update the 'a' area chart path using this area generator
    let aAreaGenerator = d3.area()
        .x((d, i) => iScale(i))
        .y0(0)
        .y1(d => aScale(d.a));
    let aArea = d3.select('#firstArea').select("path");
    aArea.transition()
    .duration(1000)
    .attr("d", aAreaGenerator(data));
    // TODO: Select and update the 'b' area chart path (create your own generator)
    let bAreaGenerator = d3.area()
        .x((d, i) => iScale(i))
        .y0(0)
        .y1(d => aScale(d.b));

    let bArea = d3.select('#secondArea').select("path");
    bArea.transition()
    .duration(1000)
    .attr("d", bAreaGenerator(data));

    // TODO: Select and update the scatterplot points
  let scatter = d3.select('#scatter').selectAll("circle")
  .data(data)
  scatter.exit().style("opacity", 1)
             .transition()
             .duration(1000)
             .style("opacity", 0).remove()
  scatter = scatter.enter().append("circle").merge(scatter);
  scatter.transition()
  .duration(1000).attr("cx", function(d,i) {
    return aScale(d.a);
  })
  .attr("cy", function(d,i) {
    return bScale(d.b);
  })
  .attr("r", 5);
    // ****** TODO: PART IV ******
    //Hover code from: https://stackoverflow.com/questions/23703089/d3-js-change-color-and-size-on-line-graph-dot-on-mouseover
    d3.select("#firstBarChart").selectAll('rect').on("mouseover", function(d) {
      d3.select(this).style("fill", "red");
    });
    d3.select("#firstBarChart").selectAll('rect').on("mouseout", function(d) {
      d3.select(this).style("fill", "steelblue");
    });
    d3.select("#secondBarChart").selectAll('rect').on("mouseover", function(d) {
      d3.select(this).style("fill", "red");
    });
    d3.select("#secondBarChart").selectAll('rect').on("mouseout", function(d) {
      d3.select(this).style("fill", "steelblue");
    });
    var div = d3.select("body").append("div")
        .style("opacity", 0);

    //Tooltip help here: http://bl.ocks.org/d3noob/a22c42db65eb00d4e369
    d3.selectAll('circle').on("mouseover", function(d) {
      d3.select(this).style("cursor", "pointer");
      div.html(this.__data__.a+", "+this.__data__.b)
      .style("left", (d3.event.pageX-70) + "px")
                .style("top", (d3.event.pageY-80) + "px")
                .style("position", "absolute")
                .style("background-color", "white")
                .style("opacity",1)
                .style("border-radius", "3px")
    });
    d3.selectAll('circle').on("mouseout", function(d) {
      div.style("opacity", 0);
    })
    d3.selectAll('circle').on("click", function(d) {
      d3.select(this).style("cursor", "pointer");
      console.log("x: "+this.__data__.a);
      console.log("y: "+this.__data__.b);
    })
}

/**
 * Load the file indicated by the select menu
 */
function changeData() {

    let dataFile = document.getElementById('dataset').value;
    if (document.getElementById('random').checked) {
        randomSubset();
    }
    else {
        d3.csv('data/' + dataFile + '.csv', function(error,data) {update(error, data);});

    }
}

/**
 *   Load the file indicated by the select menu, and then slice out a random chunk before passing the data to update()
 */
function randomSubset() {
    let dataFile = document.getElementById('dataset').value;
    if (document.getElementById('random').checked) {
        d3.csv('data/' + dataFile + '.csv', function (error, data) {
            let subset = [];
            for (let d of data) {
                if (Math.random() > 0.5) {
                    subset.push(d);
                }
            }
            update(error, subset);
        });
    }
    else {
        changeData();
    }
}
