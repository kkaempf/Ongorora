class SupportConfigKernel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      kernel: ""
    };
  }
  componentDidMount() {
    $.get("/supportconfig/kernel/" + this.props.name).done(function(kernel) {
      this.setState({
        kernel: kernel
      });
    }.bind(this));
  }
  render() {
    return(<div>kernel : {this.state.kernel}</div>);
  }
}

class SupportConfigSuseRelease extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      release: ""
    };
  }
  componentDidMount() {
    $.get("/supportconfig/suse_release/" + this.props.name).done(function(release) {
      /* {"os"=>"SUSE Linux Enterprise Server 12 (x86_64)", "sle_version"=>"12SP1", "version"=>12, "patchlevel"=>1 */
      this.setState({
        os: release["os"],
        sle_version: release["sle_version"],
        version: release["version"],
        patchlevel: release["patchlevel"]
      });
    }.bind(this));
  }
  render() {
    return(<div>SUSERelease : {this.state.os}, {this.state.sle_version}, {this.state.version}, {this.state.patchlevel}</div>);
  }
}

class SupportConfigUname extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      uname: ""
    };
  }
  componentDidMount() {
    $.get("/supportconfig/uname/" + this.props.name).done(function(uname) {
      this.setState({
        uname: uname
      });
    }.bind(this));
  }
  render() {
    return(<div>uname : {this.state.uname}</div>);
  }
}

class SupportConfigBase extends React.Component {
  render() {
    console.log("SupportConfigBase " + this.props.name);
    return(
      <div>
        <SupportConfigUname name={this.props.name}/>
        <SupportConfigSuseRelease name={this.props.name}/>
        <SupportConfigKernel name={this.props.name}/>
      </div>);
  }
}

class SupportConfigLog extends React.Component {
  render() {
    console.log("SupportConfigLog " + this.props.element);
    return(<div>{this.props.name} : {this.props.element}</div>);
  }
}

class SupportConfig extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      elements: []
    };
    this.activate = this.activate.bind(this);
  }
  componentDidMount() {
    $.get("/supportconfig/elements/" + this.props.name).done(function(elements) {
      this.setState({
        elements: elements
      });
    }.bind(this));
  }
  activate(name, setActiveTab) {
    console.log("Supportconfig.activate " + name);
    if (name == "Supportconfig") {
      ReactDOM.render(
        <SupportConfigBase name={this.props.name}/>,
        document.getElementById('supportconfig_data')
      );
    }
    else {
      ReactDOM.render(
        <SupportConfigLog name={this.props.name} element={name}/>,
        document.getElementById('supportconfig_data')
      );
    }
  }
  render() {
    console.log("SupportConfig.render name " + this.props.name);
    if (this.state.elements.length == 0) {
      return(<div>Loading {this.props.name} elements ...</div>);
    }
    else {
      console.log("SupportConfig.render " + this.state.elements.length + " elements");
      return(
        <div>
          <Tabs firstName="Supportconfig" activateTab={this.activate} allowClose={false} tabs={this.state.elements}/>
          <div id="supportconfig_data"/>
        </div>
      );
    }
  }
}
