var SupportConfig = React.createClass({
  getInitialState: function() {
    return { name: null, overview: null };
  },
  componentDidMount: function() {
    $.get("/supportconfig/overview/"+this.props.name).done(function(data) {
      console.log("/supportconfig/overview/" + this.props.name);
      this.setState({overview: data});
    }.bind(this));
  },
  render: function() {
    console.log("SupportConfig.render name " + this.props.name);
    if (this.state.overview) {
      return <div>Overview: {this.state.overview.name}</div>;
    }
    else {
      return <div>Name: {this.props.name}</div>;
    }
  }
});
