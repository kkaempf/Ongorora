class SupportConfigIndexEntry extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      entry: null
    };
    this.select = this.select.bind(this);
  }
  componentDidMount() {
    $.get("/supportconfig/index/" + this.props.name).done(function(data) {
      this.setState({entry: data});
    }.bind(this));
  }
  select() {
    this.props.setActiveTab(this.props.name);
  }
  render() {
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
}

class SupportConfigIndex extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null
    }
    console.log("SupportConfigIndex.props.setActiveTab " + this.props.setActiveTab);
  }
  componentDidMount() {
    $.get("/supportconfig").done(function(data) {
      this.setState({data: data});
    }.bind(this));
  }
  render() {
    let supportconfigs = this.state.data;
    if (supportconfigs) {
      console.log("Have supportconfigs >" + supportconfigs + "<");
      if (supportconfigs.length && supportconfigs.length > 0) {
        console.log("State.data is full >" + supportconfigs.length + "<");
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
               {supportconfigs.map((entry) =>
                 <SupportConfigIndexEntry
                   key={entry}
                   name={entry}
                   setActiveTab={this.props.setActiveTab}
                 />
               )}
             </div>;
      }
      else {
        console.log("supportconfigs is empty " + supportconfigs.length);
        return <span>No supportconfigs found. Is Elasticsearch running ?</span>;
      }
    }
    else {
      return <span>Loading ...</span>;
    }
  }
}
