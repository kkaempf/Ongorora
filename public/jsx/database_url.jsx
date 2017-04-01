var setDatabaseUrl = function() {
  var value = $("input[name=url]").val();
  console.log("value " + value);
  $.post("/database/url", { url: value });
  ReactDOM.render(
    <SupportconfigIndex/>,
    document.getElementById('body')
  );
  setActiveTab("");
};

var DatabaseUrl = React.createClass({
  getInitialState: function() {
    console.log("DatabaseUrl getInitialState");
    return { url: null };
  },
  componentDidMount: function() {
    $.get("/database/url").done(function(url) {
      console.log("/database/url");
      this.setState({url: url});
    }.bind(this));
  },  
  render: function() {
    console.log("DatabaseUrl render");
    if (this.state.url) {
      console.log("Url: " + this.state.url);
      return <div>
               <input className='form-control' name='url' type='text' defaultValue={this.state.url} />
               <button className='btn.btn-default' onClick={setDatabaseUrl}>Connect</button>
             </div>;
    }
    return <div/>;
  }
});
