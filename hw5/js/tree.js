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

        //Create a tree and give it a size() of 800 by 300.
        let g = d3.select("#tree");
        let treemap = d3.tree().size([800, 300]);

          //       //Create a root for the tree using d3.stratify();
        let root = d3.stratify()
          .id(function(d,i) {  return i; })
          .parentId(function(d) { return d.ParentGame; })
          (treeData);

          let tree = treemap(root);
          let nodes = tree.descendants();

          let links = tree.descendants().slice(1);

  //
  //   // Normalize for fixed-depth.
    nodes.forEach(function(d){ d.y = d.depth * 180});
  //
  //   // ****************** Nodes section ***************************
  //
  //   // Update the nodes...
    let node = g.selectAll('g.node')
        .data(nodes, function(d) {return d.id || (d.id = ++i); });


  //       // Enter any new modes at the parent's previous position.
  let nodeEnter = node.enter().append('g')
      .attr('class', 'node')
      .attr("transform", function(d) {
        return "translate(" + d.y + "," + d.x+ ")";
    })
        .append('circle')
              .attr('class', 'node')
              .attr('r', 5)
              .style("fill", "black");
              //  function(d) {
              //     return d._children ? "lightsteelblue" : "#fff";
              // });

        //Add nodes and links to the tree.


    };

    /**
     * Updates the highlighting in the tree based on the selected team.
     * Highlights the appropriate team nodes and labels.
     * Use class adding and removing
     * @param row a string specifying which team was selected in the table.
     */
    updateTree(row) {
        // ******* TODO: PART VII *******

    }

    /**
     * Removes all highlighting from the tree.
     */
    clearTree() {
        // ******* TODO: PART VII *******

        // You only need two lines of code for this! No loops!
    }
}
