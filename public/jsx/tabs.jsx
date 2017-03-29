var Tabs = React.createClass({
  getInitialState: function() {
    return { tabs: [], active: null };
  },
  render: function() {
    console.log("Tabs.render active " + this.props.active);
    return <li className="active"><a href="#">{this.props.active}</a></li>;
  }
});
