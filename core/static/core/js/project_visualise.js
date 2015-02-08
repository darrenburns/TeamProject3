$(function() {

    if (typeof PROJECT_ID != 'undefined') {

        var BASE_CHART_WIDTH = 400;
        var BASE_CHART_HEIGHT = 200;
        var BASE_BAR_PADDING = 1;
        var BASE_PADDING_LEFT = 30;
        var BASE_PADDING_TOP = 8;
        var BASE_PADDING_BOTTOM = 30;

        var ref = new Firebase("https://torid-fire-4899.firebaseio.com/");

        var projectChats = ref.child('project/' + PROJECT_ID);

        // Get the titles of the chats we know about in our django database.
        var chatTitles = [];
        $.ajax({
            url: "/api/v1/chat/",
            data: {
                project: PROJECT_ID
            }
        }).done( function (data) {
            for (i = 0; i < data.objects.length; i++) {
                chatTitles.push(data.objects[i].title);
            }
        });

        projectChats.once('value', function (snap) {
            var counter = 0; // Use this ti make sure we don't retreive chats that exist on firebase but not in django!
            var filteredChats = snap.val().chats.filter(function (elem) {
                if (elem.closed | counter++ >= chatTitles.length) { // If the chat is closed or we have too many chats, abort...
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
            svg.attr("height", BASE_CHART_HEIGHT + BASE_PADDING_BOTTOM + BASE_PADDING_TOP);

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

            var titleScale = d3.scale.ordinal()
                .domain(chatTitles)
                .rangePoints([((BASE_CHART_WIDTH - BASE_PADDING_LEFT) / (2*chatLengths.length)), (BASE_CHART_WIDTH - BASE_PADDING_LEFT) - ((BASE_CHART_WIDTH - BASE_PADDING_LEFT) / (2*chatLengths.length))]);

            var chatTitlesXAxis = d3.svg.axis()
                .scale(titleScale)
                .orient("bottom");

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
                .attr("transform", "translate(" + BASE_PADDING_LEFT + "," + -BASE_PADDING_TOP +")")
                .call(chatLengthsYAxis);

            svg.append("g")
                .attr("class", "xaxis")
                .attr("transform", "translate(" + BASE_PADDING_LEFT + "," + (BASE_CHART_HEIGHT - BASE_PADDING_TOP) + ")")
                .call(chatTitlesXAxis);

        });

    }

});
