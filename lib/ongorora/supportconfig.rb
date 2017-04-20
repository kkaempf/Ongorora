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
    # return array of elements
    def self.elements name
#      curl -XGET "http://localhost:9200/nts_zbm-sl-muc-0024_170314_1037/_search" -d'
#      {
#        "aggs": {
#          "typesAgg": {
#            "terms": {
#              "field": "_type",
#              "size": 200
#           }
#          }
#        },
#        "size": 0
#      }'

      db = ::Ongorora.database
      begin
        STDERR.puts "Supportconfig.elements #{name.inspect}"
        res = db.read :index => name.downcase, :type => "", :body => {
          "aggs": {
            "typesAgg": {
              "terms": {
                "field": "_type",
                "size": 200
              }
            }
          },
          "size": 0
        }
        STDERR.puts "Supportconfig.elements res #{res.inspect}"
#      {"took":15, "timed_out":false, "_shards":{
#         "total":5, "successful":5, "failed":0
#       },
#       "hits":{
#         "total":12250, "max_score":0.0, "hits":[]
#       },
#       "aggregations":{
#         "typesAgg":{
#           "doc_count_error_upper_bound":0, "sum_other_doc_count":0,
#           "buckets":[
#             { "key":"rhn_web_api","doc_count":6323},
#             { "key":"access_log","doc_count":5486},
#             { "key":"error_log","doc_count":396},
#             { "key":"osa-dispatcher","doc_count":45}
#           ]
#         }
#       }
#     }
        res["aggregations"]["typesAgg"]["buckets"].map do |bucket|
          bucket["key"]
        end
      rescue Exception => e
        STDERR.puts "Type aggregation failed with #{e}"
        []
      end
    end
    # return array of elements
    def self.uname name
      db = ::Ongorora.database
      begin
        STDERR.puts "Supportconfig.uname #{name.inspect}"
        res = db.read(:index => "elasticsupport", :type => "uname", :where => { :name => name }).first
        res["uname"]
      end
    end
  end
end
