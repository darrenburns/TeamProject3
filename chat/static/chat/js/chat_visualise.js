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
            var truncatedUsers = [];
            for (var index = 0; index < users.length; index++) {
                truncatedUsers.push( (users[index].length > 12)  ?  users[index].substring(0, 10) + '..'  : users[index] );
            }

            var messageCountPerUser = Object.keys(userCount).map(function (key) {
                    return userCount[key];
                });

            var messagesPerUserArray = [];
            for (var index = 0; index < users.length; index++) {
                messagesPerUserArray[index] = [users[index], messageCountPerUser[index]];
            }

            // Tooltips
            var tip = d3.tip()
                .attr("class", "d3-tip")
                .offset([-10, 0])
                .html(function(d) { return d[0] + " has sent " + d[1] + ( (d[1] == 1) ? ' message.' : ' messages.'); });

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
                .domain(truncatedUsers)
                .rangePoints([((BASE_CHART_WIDTH - BASE_PADDING_LEFT) / (2*messageCountPerUser.length)), (BASE_CHART_WIDTH - BASE_PADDING_LEFT) - ((BASE_CHART_WIDTH - BASE_PADDING_LEFT) / (2*messageCountPerUser.length))]);

            var xAxis = d3.svg.axis()
                .scale(xScale)
                .orient("bottom");


            svg.selectAll("rect")
                .data(messagesPerUserArray)
                .enter()
                .append("rect")
                .attr("x", function(valItem, idx) {
                    if (typeof valItem != 'undefined') {
                        return BASE_PADDING_LEFT + idx * ((BASE_CHART_WIDTH - BASE_PADDING_LEFT) / messageCountPerUser.length);  // ensure that the bars scale to fit the svg
                    } else {
                        return 0;
                    }
                })
                .attr("y", function(valItem) {
                    if (typeof valItem != 'undefined') {
                        return scale(valItem[1]) + BASE_PADDING_TOP;
                    } else {
                        return 0;
                    }
                })
                .attr("width", (BASE_CHART_WIDTH - BASE_PADDING_LEFT) / messageCountPerUser.length)
                .attr("height", function(valItem) {
                    if (typeof valItem != 'undefined') {
                        return BASE_CHART_HEIGHT - scale(valItem[1]);
                    } else {
                        return 0;
                    }
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