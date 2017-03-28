# ongorora/supportconfig.rb

module Ongorora
  class Supportconfig
    def self.all
      Content.names
    end
    # return date, time, request
    def self.get name
      db = ::Ongorora.database
      entry = db.read(:index => 'elasticsupport', :type => 'supportconfig', :where => { :name => name }).first
      STDERR.puts "Supportconfig.get #{name}: entry #{entry.inspect}"
      entry
    end
  end
end
