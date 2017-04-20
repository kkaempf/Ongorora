class SupportConfigElement extends React.Component {
  render() {
    console.log("SupportConfigElement " + this.props.element);
    return(<div>{this.props.element}</div>);
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
    ReactDOM.render(
      <SupportConfigElement element={name}/>,
      document.getElementById('supportconfig_data')
    );
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
          <Tabs firstName="Supportconfig" activateTab={this.activate} tabs={this.state.elements}/>
          <div id="supportconfig_data"/>
        </div>
      );
    }
  }
}
