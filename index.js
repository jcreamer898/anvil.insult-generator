var request = require('request'),
    jsdom = require('jsdom');

var pluginFactory = function(_, anvil) {
    return anvil.plugin({
        // Name your plugin
        name: "anvil.insult-generator",
        // Activity list: "identify", "pull", "combine", "pre-process","compile", "post-process", "push", "test"
        activity: "post-process",
        // Command all the things [ "-s, --somecommand", "Run this plugin for awesomesauce" ]
        commander: [],
        // Configure all the things...
        configure: function(config, command, done) {
            done();
        },
        // Run all the things...
        run: function(done) {
            request({
                uri: 'http://www.insult-generator.org/'
            }, function(error, response, body) {
                if (error && response.statusCode !== 200) {
                    console.log('Error when contacting http://www.insult-generator.org/');
                }

                jsdom.env({
                    html: body,
                    scripts: ['http://code.jquery.com/jquery-1.5.min.js']
                }, function(err, window) {
                    var $ = window.jQuery;

                    // jQuery is now loaded on the jsdom window created from 'agent.body'
                    anvil.log.complete( "Build completed you " + $('#insult .text').html() + ".");
                });
            });
            done();
        }
    });
};

module.exports = pluginFactory;