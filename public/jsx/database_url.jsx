var setDatabaseUrl = function() {
  var value = $("input[name=url]").val();
  $.post("/database/url", { url: value });
  ReactDOM.render(
    <Tabs firstName="Index"/>,
    document.getElementById('tabs')
  );
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
