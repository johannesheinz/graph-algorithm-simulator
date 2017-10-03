'use strict';

require('font-awesome/css/font-awesome.css');
require('./index.html');
require('./style.css');
var vis = require('vis')

var Elm = require('./Main.elm');
var mountNode = document.getElementById('main');

var app = Elm.Main.embed(mountNode);

var container = document.getElementById('network');

app.ports.drawGraph.subscribe(graph => {
    var nodes = new vis.DataSet(graph.nodes.map((node, index) => {
        return {
            id: node.id,
            label: node.id
        };
    }));

    var edges = new vis.DataSet(graph.edges.map((edge, index) => {
        return {
            from: edge.from,
            to: edge.to,
            arrows: 'to'
        };
    }));

    var data = {
        nodes: nodes,
        edges: edges
    };
    var options = {};

    var network = new vis.Network(container, data, options);
});