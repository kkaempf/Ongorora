var connect = function() {
  console.log("Main.connect");
  ReactDOM.render(
    <ScSelector/>,
    document.getElementById('supportconfig_selector')
  );
}

ReactDOM.render(
  <DatabaseUrl connect={connect}/>,
  document.getElementById('database_url')
);
