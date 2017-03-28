#
# Ongorora/database/elasticsearch
#
# Elasticsearch database backend for Ongorora

require "elasticsearch"

module Ongorora
  TYPE = "ongorora"
  class Database
    def initialize
      @url = Config.elasticsearch['database']['url'] rescue nil
      options = {}
      options[:url] = @url if @url
      # options[:log] = true
      @client = Elasticsearch::Client.new options
      @index = Config.elasticsearch['index']
#      puts "Elasticsearch index #{@index.inspect}"
    end
    def client
      @client
    end
    def _search opt
      obj = @client.search opt
      # STDERR.puts "obj #{obj.inspect}"
      obj['hits']['hits'].map do |h|
        # STDERR.puts "h #{h.inspect}"
        h['_source']
      end
    end
    #
    # read/search
    #   :index
    #   :type
    #   :id
    def read options = {}
      opt = {}
      opt[:index] = options[:index] || @index
      opt[:type] = options[:type] || TYPE
      begin
        if options[:id]
          opt[:id] = options[:id]
          obj = @client.get opt
          #        puts "Read: #{obj.inspect}"
          obj['_source']
        elsif options[:where]
          k, v = options[:where].first
          opt[:q] = "#{k}:#{v}"
          _search opt
        else
          _search opt
        end
      rescue Elasticsearch::Transport::Transport::Errors::NotFound
        nil
      end
    end
  end
end
