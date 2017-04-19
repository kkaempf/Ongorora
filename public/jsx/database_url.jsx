class DatabaseUrl extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      url: null
    };
    this.connect = this.connect.bind(this);
  }
  connect() {
    console.log("DatabaseUrl.connect");
    var value = $("input[name=url]").val();
    $.post("/database/url", { url: value });
    this.props.connect();
  }
  componentDidMount() {
    $.get("/database/url").done(function(url) {
      this.setState({url: url});
    }.bind(this));
  }
  render() {
    if (this.state.url) {
      return <div>
               <input className='form-control' name='url' type='text' defaultValue={this.state.url} />
               <button className='btn.btn-default' onClick={this.connect}>Connect</button>
             </div>;
    }
    return <div/>;
  }
}
