/** Class implementing the tree view. */
class Tree {
  /**
   * Creates a Tree Object
   */
  constructor() {

  }

  /**
   * Creates a node/edge structure and renders a tree layout based on the input data
   *
   * @param treeData an array of objects that contain parent/child information.
   */
  createTree(treeData) {

    // ******* TODO: PART VI *******
    let duration = 1000;
    //Create a tree and give it a size() of 800 by 300.
    let g = d3.select("#tree")

    let treemap = d3.tree().size([800, 300]);

    //       //Create a root for the tree using d3.stratify();
    let root = d3.stratify()
      .id(function(d, i) {
        return i;
      })
      .parentId(function(d) {
        return d.ParentGame;
      })
      (treeData);

    let tree = treemap(root);
    let nodes = tree.descendants();

    let links = tree.descendants().slice(1);

    //
    //   // Normalize for fixed-depth.
    nodes.forEach(function(d) {
      d.y = d.depth * 80
    });
    //
    //   // ****************** Nodes section ***************************
    //
    //   // Update the nodes...
    let node = g.selectAll('g.node')
      .data(nodes, function(d) {
        return d.id || (d.id = ++i);
      });


    //       // Enter any new nodes at the parent's previous position.
    let nodeEnter = node.enter().append('g')
      .attr('class', 'node')
        .attr("transform", function(d) {
          return "translate(" + root.y+10 + "," + root.x + ")";
      })
      nodeEnter.append('circle')
      .attr('class', 'node')
      .attr('r', 5)
      .style("fill", function(d) {
        if(d.data['Losses']==0) {
          return "blue"
        }
        else {
          return "red"
        }
      })
      .attr("transform", "translate(75,0)")
    //  function(d) {
    //     return d._children ? "lightsteelblue" : "#fff";
    // });
    // Add labels for the nodes
    nodeEnter.append('text')
    .attr("transform", "translate(75,0)")
      .attr("dy", ".35em")
      .attr("x", function(d) {

        return d.children || d._children ? -13 : 13;
      })

      .attr("text-anchor", function(d) {

        return d.children || d._children ? "end" : "start";
      })
      .text(function(d) {
        return d.data['Team'];
      })
      .attr("class",function(d){return "treeText "+d.data['Team']})
    let nodeUpdate = nodeEnter.merge(node);

    // Transition to the proper position for the node
    nodeUpdate.attr("transform", function(d) {

      return "translate(" + d.y + "," + d.x + ")";
    });

    // Update the node attributes and style
    nodeUpdate.select('circle.node')
      .attr('r', 5)
      // .style("fill", function(d) {
      //     return d._children ? "lightsteelblue" : "#fff";
      // })
      .attr('cursor', 'pointer');


    // Remove any exiting nodes
    let nodeExit = node.exit()
      .attr("transform", function(d) {
        return "translate(" + root.y + "," + root.x + ")";
      })
      .remove();

    // On exit reduce the node circles size to 0
    nodeExit.select('circle')
      .attr('r', 1e-6);

    // On exit reduce the opacity of text labels
    nodeExit.select('text')
      .style('fill-opacity', 1e-6);


    //Add nodes and links to the tree.
    let link = g.selectAll('path.link')
      .data(links, function(d) {
        return d.id;
      });

    // Enter any new links at the parent's previous position.
    let linkEnter = link.enter().insert('path', "g")
      .attr("class", function(d){
        //console.log(d)
        return "link l_" + d.data['Team'];
      })
      .attr("transform", "translate(75,0)")
      .attr('d', (d) => {

        let o = {
          x: root.x,
          y: root.y
        }
        return this.diagonal(o, o)
      });

    // UPDATE
    let linkUpdate = linkEnter.merge(link);



    // Transition back to the parent element position

    linkUpdate.attr('d', (d) => {
      return this.diagonal(d, d.parent)
    });

    // Remove any exiting links
    let linkExit = link.exit()
      .attr('d', (d) => {
        let o = {
          x: source.x,
          y: source.y
        }
        return this.diagonal(o, o)
      })
      .remove();
  }

  diagonal(s, d) {

    let path = `M ${s.y} ${s.x}
              C ${(s.y + d.y) / 2} ${s.x},
                ${(s.y + d.y) / 2} ${d.x},
                ${d.y} ${d.x}`

    return path
  }
  /**
   * Updates the highlighting in the tree based on the selected team.
   * Highlights the appropriate team nodes and labels.
   * Use class adding and removing
   * @param row a string specifying which team was selected in the table.
   */
  updateTree(row) {
    // ******* TODO: PART VII *******
    let text = d3.selectAll(".treeText."+row.key)
    text.attr("fill", "red")
    let links = d3.selectAll(".link.l_"+row.key)
    links.style("stroke", "red")
    console.log(".link.l_"+row.key)
  }

  /**
   * Removes all highlighting from the tree.
   */
  clearTree() {
    // ******* TODO: PART VII *******
    d3.selectAll(".link").style("stroke", "#555")
    d3.selectAll(".treeText").attr("fill", "black")
    // You only need two lines of code for this! No loops!
  }
}
