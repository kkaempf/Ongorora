var SupportConfig = React.createClass({
  getInitialState: function() {
    return { name: null };
  },
  render: function() {
    console.log("SupportConfig.render name " + this.props.name)
    return <div>{this.props.name}</div>;
  }
});
