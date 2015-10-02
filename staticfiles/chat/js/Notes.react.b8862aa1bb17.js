/**
 * Created by LeoLinhares on 23/06/2015.
 */

var React = require('react');
var $ = require('jquery');

var Notes = React.createClass({

    getInitialState : function() {
        return {
            initialNotes: '',
            currentNotes: ''
        };
    },

    componentWillReceiveProps: function(next) {
        if(next.notes){
            this.setState({
                initialNotes: next.notes,
                currentNotes: next.notes
            })
        }
    },

    handleChange: function(e) {
        var notes = e.target.value;
        this.setState({currentNotes: notes});
    },

    handleClick: function() {
        this.props.setNotes(this.state.currentNotes);
    },

    render: function() {
        var disabled = this.state.disabled ? 'disabled' : '';


        return (
            <div className="col-xs-12">
                <div className="panel panel-default panel-information">
                    <div className="panel-heading"><strong>Notes</strong></div>
                    <div className="panel-body">
                        <div className="form-group">
                            <textarea className="form-control" rows="5" id="comment" value={this.state.currentNotes} onChange={this.handleChange}></textarea>
                            <button className="btn btn-default" type="button" disabled={this.state.currentNotes == this.state.initialNotes} onClick={this.handleClick}>Save</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
});
module.exports = Notes;