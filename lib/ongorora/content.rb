# ongorora/content.rb

module Ongorora
  class Content
    def self.names
      db = ::Ongorora.database
      res = []
      db.read(:index => 'elasticsupport', :type => 'content', :keys => 'name').each do |entry|
        STDERR.puts "Content.names entry #{entry.inspect}"
        res << entry['name']
      end
      res
    end
  end
end
