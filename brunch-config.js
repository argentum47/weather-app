module.exports = {
  files: {
    javascripts: {
      joinTo: {
        'javascripts/app.js': /(src\/|node_modules\/)/
      }
    }
  },

  paths: {
    watched: [
      "src"
    ],
    public: "public"
  },
  plugins: {
    babel: { presets: ['es2015', 'react', 'stage-2'], pattern: /\.(jsx?)$/ }
  }
}
