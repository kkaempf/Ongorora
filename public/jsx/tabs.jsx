var TabEntry = React.createClass({
  getInitialState: function() {
    return { name: null, is_active: false };
  },
  select: function() {
    console.log("TabEntry.select " + this.props.name);
    this.props.setActiveTab(this.props.name);
  },
  render: function() {
    var cn = "";
    if (this.props.isActive) {
      cn = "active";
    }
    return(
      <li className={cn}>
        <a className="tab_entry" data-toggle="tab" href={"#"+this.props.name} onClick={this.select}>{this.props.name}</a>
      </li>
    );
  }
});

class Tabs extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      active: "Index",
      tabs: ["Index", "A", "FooFooBar", "ganz lang und äöü doof"]
    };
    this.setActiveTab = this.setActiveTab.bind(this);
  }
  setActiveTab(name) {
    console.log("Tabs.setActiveTab " + name);
    this.setState({
      active: name
    });
  }
  closeActiveTab(name) {
    console.log("Tabs.closeActiveTab " + name);
    var new_tabs = tabs.filter(function(value) {
      return value != name;
    })
    this.setState({
      tabs: new_tabs
    });
  }
  render() {
    console.log("Tabs.render");
    return(<ul className="nav nav-tabs">
             {this.state.tabs.map((tab) => {
               var is_active = false;
               if (tab == this.state.active) {
                 is_active = true;
               }
               console.log("Tabs.render: " + tab + ", active " + is_active);
               return(
                 <TabEntry name={tab} isActive={is_active} setActiveTab={this.setActiveTab} key={tab}/>
               );
             }
             )}
           </ul>);
  }
}
