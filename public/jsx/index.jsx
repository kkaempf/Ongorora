var SupportconfigIndexEntry  = React.createClass({
  getInitialState: function() {
    console.log("SupportconfigIndexEntry getInitialState " + this.props.entry);
    return { entry: null };
  },
  componentDidMount: function() {
    $.get("/supportconfig/"+this.props.entry).done(function(data) {
      this.setState({entry: data});
    }.bind(this));
  },
  select: function() {
    console.log("select " + this.props.entry);
    ReactDOM.render(
      <Tabs active={this.props.entry}/>,
      document.getElementById('tabs')
    );
    ReactDOM.render(
      <SupportConfig/>,
      document.getElementById('body')
    );
  },
  render: function() {
    if (this.state.entry) {
      var entry = this.state.entry;
      return <div className="supportconfig_index_entry col-md-12" href="#" onClick={this.select.bind()}>
               <span className="supportconfig_index_entry_name col-md-6">
                 {entry.name}
               </span>
               <span className="supportconfig_index_entry_request col-md-3">
                 {entry.request}
               </span>
               <span className="supportconfig_index_entry_date col-md-3">
                 {entry.date}
               </span>
             </div>;
    }
    else {
      return <div className="supportconfig_index_entry col-md-12"></div>;
    }
  }
});

var SupportconfigIndex = React.createClass({
  getInitialState: function() {
    console.log("Supportconfigs getInitialState");
    $.get("/supportconfig").done(function(data) {
      console.log("/supportconfig");
      this.setState({data: data});
    }.bind(this));
    return { data: null };
  },
  render: function() {
    if (this.state.data) {
      return <div className="supportconfig_index col-md-12">
               <span className="supportconfig_index_head col-md-6">
                 Name
               </span>
               <span className="supportconfig_index_head col-md-3">
                 Request
               </span>
               <span className="supportconfig_index_head col-md-3">
                 Date
               </span>
               {this.state.data.map((entry) =>
                 <SupportconfigIndexEntry key={entry} entry={entry}/>
               )}
             </div>;        
    }
    else {
      return <span>Loading ...</span>;
    }
  }
});

var setDatabaseUrl = function() {
  var value = $("input[name=url]").val();
  console.log("value " + value);
  $.post("/database/url", { url: value });
  ReactDOM.render(
    <SupportconfigIndex/>,
    document.getElementById('body')
  );
  ReactDOM.render(
    <Tabs active="index"/>,
    document.getElementById('tabs')
  );
};

var DatabaseUrl = React.createClass({
  getInitialState: function() {
    console.log("DatabaseUrl getInitialState");
    $.get("/database/url").done(function(url) {
      console.log("/database/url");
      this.setState({url: url});
    }.bind(this));
    return { url: null };
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


ReactDOM.render(
  <DatabaseUrl/>,
  document.getElementById('database_url')
);
