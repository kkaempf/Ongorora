var SupportconfigIndexEntry  = React.createClass({
  getInitialState: function() {
    return { entry: null };
  },
  componentDidMount: function() {
    $.get("/supportconfig/index/" + this.props.entry).done(function(data) {
      this.setState({entry: data});
    }.bind(this));
  },
  select: function() {
    console.log("SupportconfigIndexEntry.select " + this.props.entry);
  },
  render: function() {
    if (this.state.entry) {
      var entry = this.state.entry;
      return <div className="supportconfig_index_entry col-md-12" href="#" onClick={this.select}>
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
    $.get("/supportconfig").done(function(data) {
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
