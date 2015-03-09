$(function() {

    if (typeof CHAT_ID != 'undefined' && typeof PROJECT_ID != 'undefined') {

        var BASE_CHART_WIDTH = 400;
        var BASE_CHART_HEIGHT = 250;
        var BASE_PADDING_LEFT = 30;
        var BASE_PADDING_TOP = 30;
        var BASE_PADDING_BOTTOM = 80;

        // Initialise the Firebase
        var ref = new Firebase("https://teamproject3.firebaseio.com/");

        // Creating a chat object
        var projectObj = ref.child('project/' + PROJECT_ID);
        var chatObj = projectObj.child('chats/' + CHAT_ID);

        var messagesRef = chatObj.child("messages");

        // One day, this will be made to work! Maybe today?
        chatObj.once('value', function(snap) {

            // Get the messages and count who they're from.
            // TODO: There's a more elegant way to deal with these keys, to be cleaned up.
            var messages = snap.val().messages;
            var userCount = {};
            for (var messageKey in messages) {
                message = messages[messageKey];
                if (message.hasOwnProperty('user')) {
                    if (message.user in userCount) {
                        userCount[message.user]++;
                    } else {
                        userCount[message.user] = 1;
                    }
                }
            }

            var users = Object.keys(userCount);
            var messageCountPerUser = Object.keys(userCount).map(function (key) {
                    return userCount[key];
                });

            // Tooltips
            var tip = d3.tip()
                .attr("class", "d3-tip")
                .offset([-10, 0])
                .html(function(d) { return "User has sent " + d + " messages"; });

            // The svg to contain the graph!
            var svg = d3.select('#bacon').append('svg')
                .attr("width", BASE_CHART_WIDTH)
                .attr("height", BASE_CHART_HEIGHT + BASE_PADDING_BOTTOM + BASE_PADDING_TOP)
                .call(tip);

            // Create the scale
            var scale = d3.scale.linear()
                .domain([0, Math.max.apply(null, messageCountPerUser)])
                .range([BASE_CHART_HEIGHT, 0])
                .clamp(true);

            var yAxis = d3.svg.axis()
                .scale(scale)
                .orient("left")
                .ticks(4);

            // Create the scale and axis for the xAxis.
            var xScale = d3.scale.ordinal()
                .domain(users)
                .rangePoints([((BASE_CHART_WIDTH - BASE_PADDING_LEFT) / (2*messageCountPerUser.length)), (BASE_CHART_WIDTH - BASE_PADDING_LEFT) - ((BASE_CHART_WIDTH - BASE_PADDING_LEFT) / (2*messageCountPerUser.length))]);

            var xAxis = d3.svg.axis()
                .scale(xScale)
                .orient("bottom");


            svg.selectAll("rect")
                .data(messageCountPerUser)
                .enter()
                .append("rect")
                .attr("x", function(val, idx) {
                    return BASE_PADDING_LEFT + idx * ((BASE_CHART_WIDTH - BASE_PADDING_LEFT) / messageCountPerUser.length);  // ensure that the bars scale to fit the svg
                })
                .attr("y", function(val) {
                    return scale(val) + BASE_PADDING_TOP;
                })
                .attr("width", (BASE_CHART_WIDTH - BASE_PADDING_LEFT) / messageCountPerUser.length)
                .attr("height", function(val) {
                    return BASE_CHART_HEIGHT - scale(val);
                })
                .attr("fill", "lightblue")
                .on('mouseover', tip.show)
                .on('mouseout', tip.hide);

            svg.append("g")
                .attr("class", "axis")
                .attr("transform", "translate(" + BASE_PADDING_LEFT + "," + BASE_PADDING_TOP +")")
                .call(yAxis);

            svg.append("g")
                .attr("class", "x axis")
                .attr("transform", "translate(" + BASE_PADDING_LEFT + "," + (BASE_CHART_HEIGHT + BASE_PADDING_TOP) + ")")
                .call(xAxis)
                .selectAll("text")
                    .style("text-anchor", "end")
                    .attr("dx", "-.8em")
                    .attr("dy", "-.4em")
                    .attr("transform", function(d){
                       return "rotate(-65)"
                    });

            })

    }

})