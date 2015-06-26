"use strict";
/**
 * Created by LeoLinhares on 23/06/2015.
 */

var React = require('react');
var $ = require('jquery');

var Tags = React.createClass({

    getInitialStatus: function(){
        return {
            chatTagList: []
        }
    },

    componentWillReceiveProps: function(next){
        this.setState({
            chatTagList: next.chatTagList
        });
    },

    handleTagSelected: function(event){
        var tag = JSON.parse(event.target.getAttribute('data-item'));
        var currentTagList = this.state.chatTagList;
        var checked = event.target.checked;

        if(checked){
            currentTagList.push(tag);
        } else {
            for(var i = 0; i < currentTagList.length; i++){
                if(currentTagList[i].id == tag.id){
                    currentTagList.splice(i, 1);
                }
            }
        }

        this.setState({
            chatTagList : currentTagList
        });

        this.props.setChatTagList(currentTagList);

    },

    render: function() {
        var results = this.props.allTags;
        var chatTagList = [];
        if(this.state){
            chatTagList = this.state.chatTagList;
        }
        var myFunction = this.handleTagSelected;

        return (
            <div className="col-xs-4">
                <div className="panel panel-default panel-information">
                    <div className="panel-heading"><strong>Tags</strong></div>
                    <div className="panel-body">
                        {
                            results.map(function(result){

                                var checked = false;
                                for (var i = 0; i < chatTagList.length; i++){
                                    if(chatTagList[i].id == result.id){
                                        checked = true;
                                        break;
                                    }
                                }
                                return(
                                    <div className="checkbox" key={result.id}>
                                        <label>
                                            <input
                                                type="checkbox"
                                                checked={checked}
                                                data-item={JSON.stringify(result)}
                                                value={result.id}
                                                onChange={myFunction}
                                                /> {result.title}
                                        </label>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </div>
        )
    }
});
module.exports = Tags;
