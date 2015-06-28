/**
 * Created by gustavo on 28/06/15.
 */
var React = require('react');

var TicketListSort = React.createClass({

    render: function(){
        var sortingOptions = this.props.sortingOptions;
        return (
            <div>
                <button className="btn btn-default btn-xs dropdown-toggle" type="button" data-toggle="dropdown" id="btn-sort" >
                    <span className="fa fa-sort"></span> Sort
                    <span className="caret"></span>
                </button>
                <ul className="dropdown-menu dropdown-menu-right">
                    <li><a href="#">Teste</a></li>
                    {
                        sortingOptions.forEach((option, index) => {
                            console.log(index + " - " + option);
                            return (
                                <li key={index}><a href="#">{index} - {option}</a></li>
                            );
                        })
                    }
                </ul>
            </div>
        )
    }

});
module.exports=TicketListSort;