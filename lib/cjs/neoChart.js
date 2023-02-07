"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NeoDatatoChartData = void 0;
//@ts-ignore
const Neo4jd3 = __importStar(require("neo4jd3/src/main/index"));
const d = (nodes, relationships) => ({
    "results": [
        {
            //   "columns": ["user", "entity"],
            "data": [
                {
                    "graph": {
                        "nodes": nodes,
                        "relationships": relationships
                    }
                }
            ]
        }
    ],
    "errors": []
});
function createNeoChart(parentElement, options) {
    if (!parentElement)
        throw new Error("chart needs a parent element to mount on");
    //@ts-ignore
    return new Neo4jd3(parentElement, options);
}
exports.default = createNeoChart;
const parsed = {
    nodes: [],
    relationships: []
};
const table = {};
function NeoDatatoChartData(data) {
    parsed.nodes = [];
    parsed.relationships = [];
    // console.log(data)
    //    console.log(data[0].p.segments[0])
    // table pass 
    let allNodes = [];
    data.forEach((point, idx) => {
        const { start, relationship, end } = point.p.segments[0];
        allNodes.push(start, end);
    });
    allNodes.forEach((node, idx) => {
        table[node.elementId] = idx;
    });
    // console.log(index)
    //    console.log(table)
    const unique = {};
    data.forEach((point, idx) => {
        const { start, relationship, end } = point.p.segments[0];
        //  console.log(relationship)
        const sNeo = Object.assign({ id: start.elementId }, start);
        const eNeo = Object.assign({ id: end.elementId }, end);
        const s = {
            label: start.labels[0] + "  " + start.identity
        };
        const e = {
            label: end.properties.made + "  " + end.identity
        };
        // console.log(unique)
        // if( unique[e.label]){
        //   console.log("exist")
        //   return
        // }else{
        //   // unique[s.label] = s
        //   unique[e.label] = e
        // }
        // console.log(relationship.endNodeElementId)
        //  const edge = {
        //         source: table[relationship.startNodeElementId],
        //         target: table[relationship.endNodeElementId]
        //  }
        // { source: nodes_[0], target: nodes_[1] },
        if (relationship) {
            let b = Object.assign({ id: relationship.elementId, startNode: relationship.startNodeElementId, endNode: relationship.endNodeElementId }, relationship);
            parsed.relationships.push(b);
        }
        // delete b.elementId
        // delete s.elementId
        // delete b.startNodeElementId
        // delete b.endNodeElementId
        // delete b.elementId
        // delete b.start
        // delete b.end
        // delete b.identity
        // delete s.identity
        parsed.nodes.push(sNeo);
        parsed.nodes.push(eNeo);
    });
    return d(parsed.nodes, parsed.relationships);
}
exports.NeoDatatoChartData = NeoDatatoChartData;
//# sourceMappingURL=neoChart.js.map