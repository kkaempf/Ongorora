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
    #
    # CRUD basics
    #
    def index
      search Hash.new
    end
    def search hash
      puts "search #{hash.inspect}"
      query = ""
      hash.each do |k,v|
        query << " and " unless query.empty?
        query << "#{k}:#{v}"
      end
      query = { match_all: {} } if query.empty?
      puts "Query #{query.inspect}"
      begin
        obj = @client.search index: @index, q: query
        puts "@client.search #{obj.inspect}"
        hits = obj["hits"]
        total = hits["total"] rescue 0
        if total > 0
          res = hits["hits"].map do |hit|
            hit["_id"]
          end
        else
          res = []
        end
#        puts "Search: #{res.inspect}"
        res
      rescue Exception => e
        Logger.error "Elasticsearch.search(#{hash.inspect}) failed: #{e}"
        raise
      end
    end
    def read id
      begin
        obj = @client.get index: @index, type: TYPE, id: id
#        puts "Read: #{obj.inspect}"
        obj['_source']
      rescue Elasticsearch::Transport::Transport::Errors::NotFound
        nil
      end
    end
  end
end
