class ScSelector extends React.Component {
  constructor(props) {
    super(props);
    this.activate = this.activate.bind(this);
  }
  activate(name) {
    console.log("ScSelector.activate " + name);
  }
  render() {
    return <Tabs firstName="Index" activateTab={this.activate}/>;
  }
}
