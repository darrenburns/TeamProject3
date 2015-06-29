/**
 * Created by gustavo on 28/06/15.
 */
var React = require('react');
var classNames = require('classnames');
var TicketListSort = React.createClass({

    //TODO: Check if it is correct

    clickHandler: function(event){
        var index = event.target.getAttribute('data-index');
        this.props.setActive(index);
    },

    render: function(){

        var sortingOptions = this.props.sortingOptions;
        var elementsArray = [];
        var myFunction = this.clickHandler;
        var activeSortingOptionIndex = this.props.activeSortingOptionIndex;

        sortingOptions.forEach(function(option, index){
            var classes = classNames({
                'active': activeSortingOptionIndex == index
            });
            elementsArray.push(<li className={classes}><a onClick={myFunction} data-index={index} href="#">{option.name}</a></li>);
        });

        return (
            <div>
                <button className="btn btn-default btn-xs dropdown-toggle" type="button" data-toggle="dropdown" id="btn-sort" >
                    <span className="fa fa-sort"></span> Sort
                    <span className="caret"></span>
                </button>
                <ul className="dropdown-menu dropdown-menu-right">
                    {elementsArray}
                </ul>
            </div>
        )
    }

});
module.exports=TicketListSort;