/** Class representing a Tree. */
class Tree {
	/**
	 * Creates a Tree Object
	 * parentNode, children, parentName,level,position
	 * @param {json[]} json - array of json object with name and parent fields
	 */
	constructor(json) {
		this.node_list = []
		for (var i=0; i<json.length; i++){
			this.node_list.push(new Node(json[i].name,json[i].parent));

			var parIndex = json.findIndex(item => item.name==json[i].parent);

			if (parIndex != -1) {
				this.node_list[i].parentNode = new Node(json[i].parent, json[parIndex].parent);
			}

		}

	}

	/**
	 * Function that builds a tree from a list of nodes with parent refs
	 */
	buildTree() {

			for (var i=0; i<this.node_list.length; i++) {
				//alert(this.node_list[i].parentName)
				var parent_index = this.node_list.findIndex(item => item.name==this.node_list[i].parentName);
				if(parent_index != -1) {
					this.node_list[parent_index].addChild(this.node_list[i]);
				}
				else {
					var root_index = i;
				}
			}

		//Assign Positions and Levels by making calls to assignPosition() and assignLevel()
		var root = this.node_list[root_index];
		this.assignPosition(root, 0);

		this.assignLevel(root, 0);
	
		//assignPosition(curr_node, )
		return;
	}

	/**
	 * Recursive function that assign positions to each node
	 */
	 //This function iw working for about 50% of the positions
	assignPosition(node, position) {

		if (node.parentName == "root") {
			node.position = 0;
			node.parentNode = new Node("root", "N/A");
			node.parentNode.position = 0;
		}
		else {
				node.parentNode.position = position;


		}
		if(node.children.length==0) {
			return;
		}
		for(var i=0; i<node.children.length; i++) {

			position += i;

			node.children[i].position = position;

			if(i==0) {
				this.assignPosition(node.children[i], position);
			}

			else {
				var past_children = 0;
				for(var j=0; j<i; j++) {
					past_children += node.children[j].children.length;
				}

				position += past_children-1;
				this.assignPosition(node.children[i], position);
			}

		}
	}

	/**
	 * Recursive function that assign levels to each node
	 */
	assignLevel(node, level) {

			node.level = level;
			if (node.parentName =="root") {
				node.parentNode.level = 0;
			}
			else {
				node.parentNode.level = level-1;
			}


		for(var i=0; i<node.children.length; i++) {
			this.assignLevel(node.children[i], level+1)
		}

	}

	/**
	 * Function that renders the tree
	 */
	renderTree() {
		//alert(JSON.stringify(this.node_list))

		let svg = d3.select('body').append('svg')
		.attr("height",1200).attr("width",1200);
		svg.selectAll("line")
		.data(this.node_list)
		.enter()
		.append("line")
		.attr("x1", function(d) { return d.parentNode.level*100+50;})
		.attr("y1", function(d) { return d.parentNode.position*100+55; })
		.attr("x2", function(d,i) { return d.level*100+50; })
		.attr("y2", function(d,i) { return d.position*100+55; })
		var g = svg.append("g")
		.attr("class", "nodes")
		.selectAll("circle")
     .data(this.node_list)
     .enter()
     .append("g")
		 g.append("circle")
		 .attr("cx", function(d){return d.level*100+50;})
		 .attr("cy", function(d){return d.position*100+50;})
       .attr("r", 35);
		g.append("text")
		.attr("class", "label")
		.attr("x", function(d){return d.level*100+50;})
		.attr("y", function(d){return d.position*100+55;})
	  .text(function(d) { return d.name; });



		// svg.selectAll("circle")
		// 	.data(this.node_list)
		// 	.enter()
		// 	.append("circle")
		// 	.attr("r",15)
		// 	.attr("cx", function(d){
		// 		return d.level*50+50;})
		// 	.attr("cy", function(d){return d.position*50+50;})
		// 	svg.append("svg:text")
		// 	.text(function(d) {return d.name})
		// 	.attr("x", function(d) {return d.x;})
  	// 	.attr("y", function(d) {return d.y;});


	}

}
