class LogLine extends React.Component {
  render() {
    return <div>{this.props.line}</div>;
  }
}

class LogView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      start: 0,
      length: 0,
      data: null
    };
  }
  componentDidMount() {
    console.log("LogView.componentDidMount")
    $.get("/supportconfig/log/" + this.props.element + "/" + this.props.name + "/" + this.state.start).done(function(log) {
      this.setState({
        start: this.state.start + log.length,
        length: log.length,
        data: log
      });
    }.bind(this));
  }
  map(value, index, array) {
    var start = this.state.start;
    return <LogLine
              key={"I" + (start + index)}
              line={value} />;
  }
  render() {
    if (this.state.data) {
      var l = this.state.scroll;
      return(<div className='log'>
          {this.state.data.map(this.map.bind(this))}
        }</div>);
    }
    else {
      return <span>Loading ...</span>;
    }
  }
}
