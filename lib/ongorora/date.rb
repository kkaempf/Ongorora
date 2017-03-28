# ongorora/content.rb

module Ongorora
  class Date
    def self.get name
      db = ::Ongorora.database
      res = db.read(:index => 'elasticsupport', :type => 'date', :where => { 'name' => name }).first
      STDERR.puts "Date.get #{name} : #{res.inspect}"
      Time.at(res['date'].to_i / 1000)
    end
  end
end
