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
      STDERR.puts "Elasticsearch.search options #{opt.inspect}"
      begin
        obj = @client.search opt
        STDERR.puts "Elasticsearch.search object #{obj.inspect}"
      rescue Exception => e
        STDERR.puts "Elasticsearch.search failed with #{e}"
        return nil
      end
      if opt[:type]
        obj['hits']['hits'].map do |h|
          # STDERR.puts "h #{h.inspect}"
          h['_source']
        end
      else
        obj
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
      if options[:type]
        unless options[:type].empty?
          opt[:type] = options[:type]
        end
      else
        options[:type] = TYPE
      end
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
        elsif options[:body]
          opt[:body] = options[:body]
          res = _search opt
          STDERR.puts "Elasticsearch.read.body #{res.inspect}"
          res
        else
          _search opt
        end
      rescue Elasticsearch::Transport::Transport::Errors::NotFound
        nil
      end
    end
  end
end
