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
  }
  componentDidMount() {
    $.get("/supportconfig/elements/" + this.props.name).done(function(elements) {
      this.setState({
        elements: elements
      });
    }.bind(this));
  }
  dummy() {
    this.state.elements.map((element) => {
      <SupportConfigElement element={element} key={element}/>
    });
  }
  render() {
    console.log("SupportConfig.render name " + this.props.name);
    if (this.state.elements.length == 0) {
      return(<div>Loading {this.props.name} elements ...</div>);
    }
    else {
      console.log("SupportConfig.render " + this.state.elements.length + " elements");
      return(
        <Tabs firstName="Supportconfig"/>
      );
    }
  }
}
