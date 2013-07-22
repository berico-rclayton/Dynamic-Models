exports.config =
  watch:
      sourceDir: "assets"
      compiledDir: "../public"
      javascriptDir: "javascripts"
      exclude: [/[/\\](\.|~)[^/\\]+$/]
    template:
      output: [{
        folders: [ "templates" ]
        outputFileName: "templates"
      }]
  copy:
      extensions: ["js","css","png","jpg", "jpeg","gif","html","eot",
        "svg","ttf","woff","otf","yaml","kml","ico","htc","htm", "json"]
  minify:
      exclude:[/\.min\./, "javascripts/main.js"]
