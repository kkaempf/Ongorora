require 'yaml'

unless defined?(TOPLEVEL)
  TOPLEVEL = File.expand_path("..", File.dirname(__FILE__))
end

require_relative "ongorora/config"
require_relative "ongorora/content"
require_relative "ongorora/database"
require_relative "ongorora/date"
require_relative "ongorora/logger"
require_relative "ongorora/supportconfig"
require_relative "ongorora/version"

module Ongorora

  extend self

  def logger
    @@logger ||= Logger.new
  end

  def database
    begin
      @@database ||= Database.new
    rescue Faraday::ConnectionFailed
      Logger.error "Can't connect to database"
      raise "Database not running"
    end
  end

  def get_colors
    conf = File.join(TOPLEVEL,"config","colors.yml")
    YAML.load_file(conf)
  end

  class Ongorora
  end

end
