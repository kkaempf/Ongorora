var setActiveTab = function(name) {
  console.log("setActiveTab >" + name + "<");
  $.ajax({
    url: "/tabs/active",
    type: "PUT",
    data: { tab: name },
    success: function(tabs) {
      console.log("/tabs/active success name >" + name + "<");
      ReactDOM.render(
        <Tabs active={name} tabs={tabs}/>,
        document.getElementById('tabs')
      );
    }
  });
};

var TabEntry = React.createClass({
  getInitialState: function() {
    console.log("TabEntry.getInitialState");
    return { name: null, active: null };
  },
  select: function() {
    console.log("TabEntry select " + this.props.name);
    $.ajax({
      url: "/tabs/active",
      type: "PUT",
      data: { tab: this.props.name },
      success: function(tabs) {
        console.log("TabEntry select /tabs/active success name >" + name + "<");
        ReactDOM.render(
          <Tabs active={name}/>,
          document.getElementById('tabs')
        );
      }.bind(this)
    });
  },
  render: function() {
    console.log("TabEntry.render name >" + this.props.name + "<, active >" + this.props.active + "<");
    return(
      <li className={this.props.active}>
        <a className="tab_entry" data-toggle="tab" href={"#"+this.props.name} onClick={this.select}>{this.props.name}</a>
      </li>
    );
  }
});

var Tabs = React.createClass({
  getInitialState: function() {
    console.log("Tabs.getInitialState");
    return { active: null, tabs: [] };
  },
  componentDidMount: function() {
    console.log("Tabs.componentDidMount");
    $.ajax({
      url: "/tabs/active",
      type: "PUT",
      data: { tab: this.props.active },
      success: function(tabs) {
        console.log("Tabs.componentDidMount /tabs/active success");
        this.setState({active: this.props.active, tabs: tabs});
      }.bind(this)
    });
  },
  render: function() {
    console.log("Tabs.render props.active >" + this.props.active + "<, state.active >" + this.state.active + "<");
    return(<ul className="nav nav-tabs">
             {this.state.tabs.map((tab) => {
               console.log("Tabs.render tab " + tab);
               if (tab == this.state.active) {
                 var active = "active";
               }
               else {
                 var active = "";
               };
               return(
                 <TabEntry name={tab} active={active} key={tab}/>
               );
             }
             )}
           </ul>);
  }
});
