/**
 * Created by LeoLinhares on 23/06/2015.
 */

var React = require('react');
var $ = require('jquery');

var Cost = React.createClass({

    getInitialState : function() {
        return {
            initialCost: '',
            currentCost: ''
        };
    },

    componentWillReceiveProps: function(next) {
        if(next.cost){
            this.setState({
                initialCost: next.cost,
                currentCost: next.cost
            })
        }
    },

    handleChange: function(e) {
        var cost = e.target.value;
        this.setState({currentCost: cost});
    },

    handleClick: function() {
        this.props.setCost(this.state.currentCost);
    },

    render: function() {
        var disabled = this.state.disabled ? 'disabled' : '';

        return (
            <div className="col-xs-4">
                <div className="panel panel-default panel-information">
                    <div className="panel-heading"><strong>Cost</strong></div>
                    <div className="panel-body">
                        <div className="input-group">
                            <input name="cost" type="text" className="form-control" value={this.state.currentCost} onChange={this.handleChange}/>
                              <span className="input-group-btn">
                                <button className="btn btn-default" disabled={this.state.currentCost == this.state.initialCost} type="button" onClick={this.handleClick} >Save</button>
                              </span>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
});
module.exports = Cost;