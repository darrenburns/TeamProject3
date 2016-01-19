/**
 * Created by LeoLinhares on 24/06/2015.
 */

var React = require('react');

var ListItemWrapper = React.createClass({
    render: function() {
        var divStyle = {
            backgroundColor: this.props.data.colour,
            marginRight: 5
        };
        return (<span style={divStyle} className="label pull-right">{this.props.data.title}</span>);
    }
});

var LabelTags = React.createClass({

    render: function () {

        var tagList = this.props.tagList;
        if(tagList != null){
            return(
                <span>
                    {
                        tagList.map(function(result) {
                            return <ListItemWrapper key={result.id} data={result}/>;
                        })
                    }
                </span>
            )
        }else{
            return(null)

        }
    }

});

module.exports = LabelTags;