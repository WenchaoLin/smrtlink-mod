/* globals System */
System.__locate = System.locate;
System.locate = function(load) {
    var System = this; // its good to ensure exact instance-binding
    return Promise.resolve(System.__locate
        .call(this, load))
        .then(function(address) {
            return address +  "?v=3.1.1.182868";
        });
};

System.config({
    defaultJSExtensions: true,
    meta: {
        'papaparse': {
            format: 'global',
            exports: 'Papa'
        },
        d3: {
            format: 'global',
            exports: 'd3'
        },
        vega: {
            format: 'global',
            exports: 'vg',
            deps: [ 'd3' ]
        },
        uuid: {
            format: 'global',
            exports: 'uuid'
        }
    },
    map: {
        athenaeum: 'shared/athenaeum',
        papaparse: 'lib/papaparse.min.js',
        moment: 'lib/moment.js',
        d3: 'lib/d3.js',
        vega: 'lib/vega.js',
        uuid: 'lib/uuid.js',
        css: 'lib/text',
        json: 'lib/json',
        text: 'lib/text',
        xml: 'lib/text',
        csv: 'lib/text'
    }
});
