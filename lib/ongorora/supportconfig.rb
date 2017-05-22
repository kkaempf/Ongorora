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
    # return uname
    def self.uname name
      db = ::Ongorora.database
      begin
        res = db.read(:index => "elasticsupport", :type => "uname", :where => { :name => name }).first
        STDERR.puts "Supportconfig.uname #{name.inspect} => #{res.inspect}"
        res["uname"]
      end
    end
    # return suse release
    def self.suse_release name
      db = ::Ongorora.database
      begin
        res = db.read(:index => "elasticsupport", :type => "suse_release", :where => { :name => name }).first
        STDERR.puts "Supportconfig.suse_release #{name.inspect} => #{res.inspect}"
        # {"os"=>"SUSE Linux Enterprise Server 12 (x86_64)", "sle_version"=>"12SP1", "version"=>12, "patchlevel"=>1 ...}
        res
      end
    end
    # return running kernel
    def self.kernel name
      db = ::Ongorora.database
      begin
        res = db.read(:index => "elasticsupport", :type => "running_kernel", :where => { :name => name }).first
        STDERR.puts "Supportconfig.kernel #{name.inspect} => #{res.inspect}"
        res["kernel"]
      end
    end
    # return log
    def self.log log, name, scroll
      db = ::Ongorora.database
      begin
        res = db.read :index => name.downcase, :type => log.tr(".","_"), :body => {
          :from => scroll, :size => 100
        }
        STDERR.puts "Supportconfig.log #{name.inspect} => #{res.inspect}"
        res.collect { |r| r["message"] }
      end
    end
  end
end
