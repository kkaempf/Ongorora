# test database api
describe 'Database' do
  include Rack::Test::Methods

  def delete_index
    begin
      @client.indices.delete index: @index
    rescue Elasticsearch::Transport::Transport::Errors::NotFound
    end
  end

  before(:all) do 
    unless Ongorora::Config.database == 'elasticsearch'
      fail "Only Elasticsearch supported, sorry"
    end
    begin
      @db = Ongorora::Database.new
    rescue Faraday::ConnectionFailed
      fail "Elasticsearch not running"
    end
    @client = @db.client
    @index = Ongorora::Config.elasticsearch['index']
    delete_index
  end
  after(:all) do
    delete_index
  end

end
