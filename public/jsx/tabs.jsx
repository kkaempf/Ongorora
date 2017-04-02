class TabAnchor extends React.Component {
  render() {
    if (this.props.isIndex) {
      return(
        <a className="tab_entry" data-toggle="tab" href={this.props.href} onClick={this.props.select}>{this.props.name}</a>
      );
    }
    else {
      return(
        <a className="tab_entry" data-toggle="tab" href={this.props.href} onClick={this.props.select}>{this.props.name}
          <span className="glyphicon glyphicon-remove-circle close-tab" aria-hidden="true"></span>
        </a>
      );
    }
  }
}

class TabIndexEntry extends React.Component {
  render() {
    return(
      <TabAnchor href="#Index" select={this.props.select} name="Index" isIndex={true} />
    );
  }
}

class TabNormalEntry extends React.Component {
  render() {
    return(
      <TabAnchor href={this.props.href} select={this.props.select} name={this.props.name}/>
    );
  }
}

class TabEntry extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: null,
      is_active: false
    };
    this.select = this.select.bind(this);
  }
  select() {
    console.log("TabEntry.select " + this.props.name);
    this.props.setActiveTab(this.props.name);
  }
  componentDidUpdate() {
    ReactDOM.render(
      <SupportConfigIndex/>,
      document.getElementById('body')
    );
  }
  render() {
    if (this.props.isIndex) {
      var entry = <TabIndexEntry select={this.select}/>;
    }
    else {
      var entry = <TabNormalEntry select={this.select} name={this.props.name}/>;
    }
    if (this.props.isActive) {
      return(
        <li className="active">
          {entry}
        </li>
      );
    }
    else {
      return(
        <li>
          {entry}
        </li>
      );
    }
  }
}

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
               var is_index = false;
               if (tab == "Index") {
                 is_index = true;
               }
               console.log("Tabs.render: " + tab + ", active " + is_active);
               return(
                 <TabEntry
                   name={tab}
                   isActive={is_active}
                   isIndex={is_index}
                   setActiveTab={this.setActiveTab}
                   key={tab}
                 />
               );
             }
             )}
           </ul>);
  }
}
