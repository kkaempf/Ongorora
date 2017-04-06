# ongorora/content.rb

module Ongorora
  class Content
    def self.names
      db = ::Ongorora.database
      res = []
      begin
        db.read(:index => 'elasticsupport', :type => 'content', :keys => 'name').each do |entry|
          STDERR.puts "Content.names entry #{entry.inspect}"
          res << entry['name']
        end
      rescue
      end
      res
    end
  end
end
