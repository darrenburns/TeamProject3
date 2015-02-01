$(function() {

    if (typeof PROJECT_ID != 'undefined') {

        var BASE_CHART_WIDTH = 400;
        var BASE_CHART_HEIGHT = 200;
        var BASE_BAR_PADDING = 1;
        var BASE_PADDING_LEFT = 30;
        var BASE_PADDING_TOP = 8;

        var ref = new Firebase("https://torid-fire-4899.firebaseio.com/");

        var projectChats = ref.child('project/' + PROJECT_ID);

        projectChats.once('value', function (snap) {
            var filteredChats = snap.val().chats.filter(function (elem) {
                if (elem.closed) {
                    return elem.closed == false;
                }
                return true;
            });

            var chatLengths = [];  // maps chat ids to the length of the chat
            for (var i in filteredChats) {
                chatLengths[i] = Object.keys(filteredChats[i].messages).length;
            }

            var svg = d3.select("#d3-graph-one").append("svg");
            svg.attr("width", BASE_CHART_WIDTH);
            svg.attr("height", BASE_CHART_HEIGHT);

            // Create the scale - this defines a function which modifies the y values to the appropriate scale.
            var scale = d3.scale.linear()
            	.domain([0, d3.max(chatLengths)])  // specify our domain (possible input values)
            	.range([BASE_CHART_HEIGHT, 0])     // specify our range (possible output values)
				.clamp(true);                      // we want the output values to the no more than the height of the chart

            // Create an axis - literally creates the svg for an axis
            var chatLengthsYAxis = d3.svg.axis()
                .scale(scale)  // let the axis know what scale we're using (for drawing ticks etc.)
                .orient("left")
				.ticks(5);

            svg.selectAll("rect")
                .data(chatLengths)
                .enter()
                .append("rect")
                .attr("x", function (val, idx) {  // val is the value at the current idx in the array chatLengths
                    return BASE_PADDING_LEFT + idx * ((BASE_CHART_WIDTH - BASE_PADDING_LEFT) / chatLengths.length);  // ensure that the bars scale to fit the svg
                })
                .attr("y", function (val) {
                    return scale(val) - BASE_PADDING_TOP;  // select the correct y position (upside down coords remember)
                })
                .attr("width", (BASE_CHART_WIDTH - BASE_PADDING_LEFT) / chatLengths.length)
                .attr("height", function (val) {
                    return BASE_CHART_HEIGHT - scale(val);
                })
                .attr("fill", "lightblue");

            svg.append("g")
                .attr("class", "axis")
                .attr("transform", "translate(" + BASE_PADDING_LEFT + "," + (BASE_PADDING_TOP*-1) +")")
                .call(chatLengthsYAxis);

        });

    }

});
