class ScSelector extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: "Index"
    }
    this.activate = this.activate.bind(this);
  }
  activate(name, setActiveTab) {
    console.log("ScSelector.activate " + name);
    if (name == this.state.firstName) {
      ReactDOM.render(
        <SupportConfigIndex setActiveTab={setActiveTab}/>,
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
  render() {
    return <Tabs firstName={this.state.firstName} activateTab={this.activate}/>;
  }
}
