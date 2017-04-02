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
          <span className="glyphicon glyphicon-remove-circle close-tab" aria-hidden="true" onClick={this.props.delete}></span>
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
    if (this.props.isIndex) {
      var entry = <TabIndexEntry select={this.select}/>;
    }
    else {
      var entry = <TabNormalEntry select={this.select} delete={this.delete} name={this.props.name}/>;
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
      tabs: ["Index"]
    };
    this.setActiveTab = this.setActiveTab.bind(this);
    this.closeActiveTab = this.closeActiveTab.bind(this);
  }
  componentDidMount() {
    this.setActiveTab(this.state.active);
  }
  setActiveTab(name) {
    console.log("Tabs.setActiveTab " + name);
    var tabs = this.state.tabs;
    if (tabs.indexOf(name) == -1) {
      tabs.push(name);
      this.setState({
        tabs: tabs
      });
    }
    this.setState({
      active: name,
    });
    if (name == "Index") {
      ReactDOM.render(
        <SupportConfigIndex setActiveTab={this.setActiveTab}/>,
        document.getElementById('body')
      );
    }
    else {
      ReactDOM.render(
        <SupportConfig name={name}/>,
        document.getElementById('body')
      );
    }
  }
  closeActiveTab(name) {
    console.log("Tabs.closeActiveTab >" + name + "<");
    var tabs = this.state.tabs.filter(function(value) {
      return value != name;
    })
    this.setState({
      tabs: tabs
    });
    this.setActiveTab("Index");
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
               return(
                 <TabEntry
                   name={tab}
                   isActive={is_active}
                   isIndex={is_index}
                   setActiveTab={this.setActiveTab}
                   closeActiveTab={this.closeActiveTab}
                   key={tab}
                 />
               );
             }
             )}
           </ul>);
  }
}
