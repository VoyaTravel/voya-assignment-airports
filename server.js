'use strict';

const Hapi = require('hapi');
const Boom = require('boom');
const _ = require('lodash');
const airports = require('./airports.json');

const dummyValidToken = '0123456789';

// Create a server with a host and port
const server = new Hapi.Server();
server.connection({
    host: 'localhost',
    port: 8000
});

// Add the route
server.route({
    method: 'POST',
    path:'/api/login',
    handler: function (request, reply) {
        var payload = request.payload;

        if(payload && payload.username == 'test' && payload.password == 'test'){
            var tokenResp = {
                token: dummyValidToken
            };

            return reply(tokenResp);
        } else {
            reply(Boom.unauthorized());
        }

    }
});

// Add the route
server.route({
    method: 'GET',
    path:'/api/airports',
    handler: function (request, reply) {
        var query = request.query;

        if(request.headers["x-auth-token"] != dummyValidToken){
            reply(Boom.forbidden());
        }

        var searchValue = _.lowerCase(query.search || '');
        var size = parseInt(query.size) || 10;
        var page = parseInt(query.page) || 1;
        var totalCount = airports.length;

        var results = _.filter(airports, function(airport) {
            var searchStrings = _.map(_.values(airport), _.lowerCase);
            return _.some(searchStrings, _.method('includes', searchValue));
        })

        var dropCount = (page - 1) * size;
        var paginatedResults = _.take(_.drop(results, dropCount), size);

        return reply(paginatedResults)
            .header('x-pagination-size', size)
            .header('x-pagination-page', page)
            .header('x-pagination-total', totalCount);
    }
});

// Start the server
server.start((err) => {

    if (err) {
        throw err;
    }
    console.log('Server running at:', server.info.uri);
});