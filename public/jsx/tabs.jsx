class TabAnchor extends React.Component {
  render() {
    if (this.props.delete) {
      return(
        <a className="tab_entry" data-toggle="tab" href={this.props.href} onClick={this.props.select}>{this.props.name}
          <span className="glyphicon glyphicon-remove-circle close-tab" aria-hidden="true" onClick={this.props.delete}></span>
        </a>
      );
    }
    else {
      return(
        <a className="tab_entry" data-toggle="tab" href={this.props.href} onClick={this.props.select}>{this.props.name}</a>
      );
    }
  }
}

class TabFirstEntry extends React.Component {
  render() {
    return(
      <TabAnchor href={"#"+this.props.name} select={this.props.select} name={this.props.name} />
    );
  }
}

class TabNormalEntry extends React.Component {
  render() {
    return(
      <TabAnchor href={this.props.href} select={this.props.select} delete={this.props.delete} name={this.props.name}/>
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
    this.delete = this.delete.bind(this);
  }
  select() {
    console.log("TabEntry.select " + this.props.name);
    this.props.setActiveTab(this.props.name);
  }
  delete(e) {
    console.log("TabEntry.delete " + this.props.name);
    if (!e) {
      e = window.event;
    }
    if (e.stopPropagation) {
      e.stopPropagation();
    }
    //IE8 and Lower
    else {
      e.cancelBubble = true;
    }
    this.props.closeActiveTab(this.props.name);
  }
  render() {
    if (this.props.isFirst) {
      var entry = <TabFirstEntry select={this.select} name={this.props.name}/>;
    }
    else if (this.props.allowClose) {
      var entry = <TabNormalEntry select={this.select} delete={this.delete} name={this.props.name}/>;
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
      active: props.firstName,
      tabs: [props.firstName].concat(props.tabs)
    };
    this.setActiveTab = this.setActiveTab.bind(this);
    this.addTab = this.addTab.bind(this);
    this.removeTab = this.removeTab.bind(this);
    this.closeActiveTab = this.closeActiveTab.bind(this);
  }
  componentDidMount() {
    this.setActiveTab(this.state.active);
  }
  addTab(name) {
    console.log("Tabs.addTab " + name);
    let tabs = this.state.tabs;
    if (tabs.indexOf(name) == -1) { /* prevent duplicates */
      tabs.push(name);
      this.setState({
        tabs: tabs
      });
    }
  }
  removeTab(name) {
    console.log("Tabs.removeTab " + name);
    let new_tabs = this.state.tabs.filter(function(value) {
      return value != name;
    });
    this.setState({
      tabs: new_tabs
    });
  }
  setActiveTab(name) {
    console.log("Tabs.setActiveTab " + name);
    this.addTab(name);
    this.setState({
      active: name,
    });
    this.props.activateTab(name, this.setActiveTab);
  }
  closeActiveTab(name) {
    console.log("Tabs.closeActiveTab >" + name + "<");
    this.removeTab(name);
    this.setActiveTab(this.props.firstName);
  }
  render() {
    return(<ul className="nav nav-tabs">
             {this.state.tabs.map((tab) => {
               return(
                 <TabEntry
                   name={tab}
                   isActive={tab == this.state.active}
                   isFirst={tab == this.props.firstName}
                   setActiveTab={this.setActiveTab}
                   closeActiveTab={this.closeActiveTab}
                   allowClose={this.props.allowClose}
                   key={tab}
                 />
               );
             }
             )}
           </ul>);
  }
}
Tabs.defaultProps = {
  firstName: "",
  tabs: []
};
