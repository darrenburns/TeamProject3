var Firebase = require('firebase'),
    d3 = require('d3'),
    d3tip = require('d3-tip'),
    $ = require('jquery'),
    GLOBALS = require('./globals');

if (typeof(PROJECT_ID) != 'undefined') {

    var BASE_WIDTH = GLOBALS.GRAPHS.BASE_WIDTH;
    var BASE_HEIGHT = GLOBALS.GRAPHS.BASE_HEIGHT;
    var BASE_PADDING_LEFT = GLOBALS.GRAPHS.BASE_PADDING_LEFT;
    var BASE_PADDING_TOP = GLOBALS.GRAPHS.BASE_PADDING_TOP;
    var BASE_PADDING_BOTTOM = GLOBALS.GRAPHS.BASE_PADDING_BOTTOM;

    var ref = new Firebase("https://teamproject3.firebaseio.com/");

    var projectChats = ref.child('project/' + PROJECT_ID);

    // Get the titles of the chats we know about in our django database.
    var chatTitles = [];
    var chatTitlesTruncated = [];
    $.ajax({
        url: "/api/v1/chat/",
        data: {
            project: PROJECT_ID
        }
    }).done( function (data) {
        for (var i = 0; i < data.objects.length; i++) {
            chatTitles.push(data.objects[i].title);
            chatTitlesTruncated.push( (chatTitles[i].length>12)  ?  chatTitles[i].substring(0,10) + '..'  : chatTitles[i] );
        }
    });
    // Graph of messages per user BEGIN


    projectChats.once('value', function (snap) {
        var counter = 0; // Use this to make sure we don't retrieve chats that exist on firebase but not in django!
        var filteredChats = snap.val().chats.filter(function (elem) {
            if (elem.closed || counter++ >= chatTitles.length) { // If the chat is closed or we have too many chats, abort...
                return elem.closed == false;
            }
            return true;
        });

        var chatLengths = [];  // maps chat ids to the length of the chat
                    var actualChatLengths = [];
        for (var i in filteredChats) {
                            if (typeof(filteredChats[i].messages) != 'undefined') {
                chatLengths[i] = [Object.keys(filteredChats[i].messages).length, chatTitles[i]];
                                actualChatLengths[i] = Object.keys(filteredChats[i].messages).length;
                            }
        }

        // Tooltips
        //var tip = d3tip()
        //    .attr("class", "d3-tip")
        //    .offset([-10, 0])
        //    .html(function(d, e) { return d[1] + ' contains ' + d[0] + ( (d[0] == 1) ? ' message.' : ' messages.'); });

        // Create the SVG for the project
        var svg = d3.select("#d3-graph-one").append("svg")
            .attr("width", BASE_WIDTH)
            .attr("height", BASE_HEIGHT + BASE_PADDING_BOTTOM + BASE_PADDING_TOP)
            //.call(tip);

        // Create the scale - this defines a function which modifies the y values to the appropriate scale.
        var scale = d3.scale.linear()
            .domain([0, d3.max(actualChatLengths)+1])  // specify our domain (possible input values)
            .range([BASE_HEIGHT, 0])     // specify our range (possible output values)
            .clamp(true);                      // we want the output values to the no more than the height of the chart

        // Create an axis - literally creates the svg for an axis
        var chatLengthsYAxis = d3.svg.axis()
            .scale(scale)  // let the axis know what scale we're using (for drawing ticks etc.)
            .orient("left")
            .ticks(4);

        var titleScale = d3.scale.ordinal()
            .domain(chatTitlesTruncated)
            .rangePoints([((BASE_WIDTH - BASE_PADDING_LEFT) / (2*chatLengths.length)), (BASE_WIDTH - BASE_PADDING_LEFT) - ((BASE_WIDTH - BASE_PADDING_LEFT) / (2*chatLengths.length))]);

        var chatTitlesXAxis = d3.svg.axis()
            .scale(titleScale)
            .tickValues(chatTitlesTruncated)
            .orient("bottom");

        svg.selectAll("rect")
            .data(chatLengths)
            .enter()
            .append("rect")
            .attr("x", function (valArray, idx) {  // valArray is the value at the current idx in the array chatLengths
                                    if (typeof valArray != 'undefined') {
                                            var val = valArray[0];  // val is the chat length in valArray
                        return BASE_PADDING_LEFT + idx * ((BASE_WIDTH - BASE_PADDING_LEFT) / chatLengths.length);  // ensure that the bars scale to fit the svg
                                    } else {
                                            return 0;
                                    }
            })
            .attr("y", function (valArray) {
                                    if (typeof(valArray) != 'undefined') {
                        return scale(valArray[0]) - BASE_PADDING_TOP;  // select the correct y position (upside down coords remember)
                                    } else {
                                            return 0;
                                    }
            })
            .attr("width", (BASE_WIDTH - BASE_PADDING_LEFT) / chatLengths.length)
            .attr("height", function (valArray) {
                                    if (typeof valArray != 'undefined') {
                        return BASE_HEIGHT - scale(valArray[0]);
                                    } else {
                                            return 0;
                                    }
            })
            .attr("fill", "lightblue")
            //.on('mouseover', tip.show)
            //.on('mouseout', tip.hide);

        svg.append("g")
            .attr("class", "axis")
            .attr("transform", "translate(" + BASE_PADDING_LEFT + "," + -BASE_PADDING_TOP +")")
            .call(chatLengthsYAxis);

        svg.append("g")
            .attr("class", "x axis")
            .attr("transform", "translate(" + BASE_PADDING_LEFT + "," + (BASE_HEIGHT - BASE_PADDING_TOP) + ")")
            .call(chatTitlesXAxis)
            .selectAll("text")
                .style("text-anchor", "end")
                .attr("dx", "-.8em")
                .attr("dy", "-.4em")
                .attr("transform", function(d){
                   return "rotate(-65)"
                });

    });


    // Graph of messages per user END
    // Graph of messages per chat BEGIN

    projectChats.once('value', function (snap) {
        var counter = 0; // Use this to make sure we don't retrieve chats that exist on firebase but not in django!
        var filteredChats = snap.val().chats.filter(function (elem) {
            if (elem.closed || counter++ >= chatTitles.length) { // If the chat is closed or we have too many chats, abort...
                return elem.closed == false;
            }
            return true;
        });

        var userMessageCount = {};  // build up a count of messages users have sent.
        for (var chatIndex = 0; chatIndex < filteredChats.length; chatIndex++) {
                            if (typeof(filteredChats[chatIndex].messages) != "undefined") {
                    for (var messageIndex = 0; messageIndex < Object.keys(filteredChats[chatIndex].messages).length; messageIndex++) {
                        var message = filteredChats[chatIndex].messages[Object.keys(filteredChats[chatIndex].messages)[messageIndex]];
                        if (userMessageCount[message.user] != null) {
                            userMessageCount[message.user]++;
                        } else {
                            userMessageCount[message.user] = 1;
                        }
                    }
                            }
        }

        var users = Object.keys(userMessageCount);
        var truncatedUsers = [];
        for (var index = 0; index < users.length; index++) {
            truncatedUsers.push( (users[index].length > 12)  ?  users[index].substring(0, 10) + '..'  : users[index] );
        }

        var messageCount = [];
        for (var index in Object.keys(users)) {
            var key = users[Object.keys(users)[index]];
            if (userMessageCount.hasOwnProperty(key)){
                messageCount.push(userMessageCount[key]);
            }
        }

        // To fix tooltips:
        var userMessageCountArray = []
        for (var index = 0; index < users.length; index++) {
            userMessageCountArray[index] = [users[index], userMessageCount[users[index]]];
        }

        // Tooltips
        //var tip = d3tip()
        //    .attr("class", "d3-tip")
        //    .offset([-10, 0])
        //    .html(function(d) { return d[0] + " has sent "+ d[1] + ( (d[1] == 1) ? ' message.' : ' messages.'); });

        // Create the SVG for the project
        var svg = d3.select("#d3-graph-two").append("svg")
            .attr("width", BASE_WIDTH)
            .attr("height", BASE_HEIGHT + BASE_PADDING_BOTTOM + BASE_PADDING_TOP)
            //.call(tip);

        // Create the scale - this defines a function which modifies the y values to the appropriate scale.
        var scale = d3.scale.linear()
            .domain([0, d3.max(messageCount)+1])  // specify our domain (possible input values)
            .range([BASE_HEIGHT, 0])     // specify our range (possible output values)
            .clamp(true);                      // we want the output values to the no more than the height of the chart

        // Create an axis - literally creates the svg for an axis
        var messageCountYAxis = d3.svg.axis()
            .scale(scale)  // let the axis know what scale we're using (for drawing ticks etc.)
            .orient("left")
            .ticks(4);

        var titleScale = d3.scale.ordinal()
            .domain(truncatedUsers)
            .rangePoints([((BASE_WIDTH - BASE_PADDING_LEFT) / (2*messageCount.length)), (BASE_WIDTH - BASE_PADDING_LEFT) - ((BASE_WIDTH - BASE_PADDING_LEFT) / (2*messageCount.length))]);

        var usersXAxis = d3.svg.axis()
            .scale(titleScale)
            .orient("bottom");

        svg.selectAll("rect")
            .data(userMessageCountArray)
            .enter()
            .append("rect")
            .attr("x", function (valItem, idx) {  // val is the value at the current idx in the array messageCount
                if (typeof(valItem) != 'undefined') {
                    return BASE_PADDING_LEFT + idx * ((BASE_WIDTH - BASE_PADDING_LEFT) / messageCount.length);  // ensure that the bars scale to fit the svg
                } else {
                    return 0;
                }
            })
            .attr("y", function (valItem) {
                if (typeof valItem != 'undefined') {
                    return scale(valItem[1]) - BASE_PADDING_TOP;  // select the correct y position (upside down coords remember)
                } else {
                    return 0;
                }
            })
            .attr("width", (BASE_WIDTH - BASE_PADDING_LEFT) / messageCount.length)
            .attr("height", function (valItem) {
                if (typeof valItem != 'undefined') {
                    var val = valItem[1];
                    return BASE_HEIGHT - scale(val);
                } else {
                    return 0;
                }
            })
            .attr("fill", "lightblue")
            //.on('mouseover', tip.show)
            //.on('mouseout', tip.hide);


        svg.append("g")
            .attr("class", "axis")
            .attr("transform", "translate(" + BASE_PADDING_LEFT + "," + -BASE_PADDING_TOP +")")
            .call(messageCountYAxis);

        svg.append("g")
            .attr("class", "x axis")
            .attr("transform", "translate(" + BASE_PADDING_LEFT + "," + (BASE_HEIGHT - BASE_PADDING_TOP) + ")")
            .call(usersXAxis)
            .selectAll("text")
                .style("text-anchor", "end")
                .attr("dx", "-.8em")
                .attr("dy", "-.4em")
                .attr("transform", function(d){
                   return "rotate(-65)"
                });

    });


    // Graph of messages per chat END


}