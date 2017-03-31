var Tabs = React.createClass({
  getInitialState: function() {
    return { active: null, tabs: [] };
  },
  makeActive: function(name) {
    $.ajax({
      url: "/tabs/active",
      type: "PUT",
      data: { tab: this.props.active},
      success: function(data) {
                 console.log("/tabs/active success");
                 this.setState({active: this.props.active, tabs: data});
               }.bind(this)
    });
  },
  render: function() {
    console.log("Tabs.render active " + this.props.active);
    return(<ul className="nav nav-tabs">
             {this.state.tabs.map((tab) => {
               if (tab == this.state.active) {
                 var cn = "active";
               }
               else {
                 var cn = "";
               };
               return(
                 <li className={cn} key={tab}>
                   <a href="#">{tab}</a>
                 </li>
               );
             }
             )}
           </ul>);
  }
});

var tabs = <Tabs active=""/>;
