require_relative 'lib/ongorora/version'

Gem::Specification.new do |s|
  s.name                    = "Ongorora"
  s.version                 = Ongorora::VERSION
  s.date                    = Time.now.strftime("%Y-%m-%d")
  s.summary                 = "To inspect carefully with a view to discover the real character or state of"
  s.description             = "To inspect carefully with a view to discover the real character or state of"
  s.authors                 = ["Klaus Kämpf"]
  s.email                   = "kkaempf@suse.de"
  s.files                   = `git ls-files`.split("\n")
  s.executables             = ["ongorora"]
  s.rubyforge_project       = "Ongorora"
  s.bindir                  = "bin"
  s.require_paths           = ["lib"]
  s.homepage                = "http://github.com/kkaempf/Ongorora"
  s.license                 = "MIT"
  s.add_dependency("trollop", ["2.1.2"])
  s.add_dependency("sinatra", ["1.4.7"])
  s.add_dependency("sinatra-assetpack", ["0.3.5"])
  s.add_dependency("sinatra-advanced-routes", ["0.5.3"])
  s.add_dependency("haml", ["4.0.7"])
  s.add_dependency("elasticsearch", ["5.2.2"])
end
