
describe 'Ongorora Config' do
  include Rack::Test::Methods

  def app
    App.new
  end

  it "redefines TOPLEVEL" do 
    expect(TOPLEVEL).to be == File.dirname(__FILE__)
  end

  it "uses the test index" do
    expect(Ongorora::Config.elasticsearch['index']).to be == "ongorora_test"
  end
end
