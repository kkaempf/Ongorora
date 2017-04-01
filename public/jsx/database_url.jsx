var setDatabaseUrl = function() {
  var value = $("input[name=url]").val();
  $.post("/database/url", { url: value });
  ReactDOM.render(
    <SupportconfigIndex/>,
    document.getElementById('body')
  );
  console.log("setDatabaseUrl calling setActiveTab");
  setActiveTab("");
};

var DatabaseUrl = React.createClass({
  getInitialState: function() {
    return { url: null };
  },
  componentDidMount: function() {
    $.get("/database/url").done(function(url) {
      this.setState({url: url});
    }.bind(this));
  },  
  render: function() {
    if (this.state.url) {
      return <div>
               <input className='form-control' name='url' type='text' defaultValue={this.state.url} />
               <button className='btn.btn-default' onClick={setDatabaseUrl}>Connect</button>
             </div>;
    }
    return <div/>;
  }
});
