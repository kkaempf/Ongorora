var Tabs  = React.createClass({
  getInitialState: function() {
    return { active: null };
  },
  render: function() {
    console.log("Tabs.render active " + this.props.active)
    return <li className="active"><a href="#">Index</a></li>;
  }
});
