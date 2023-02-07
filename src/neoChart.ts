//@ts-ignore
import * as Neo4jd3 from "neo4jd3/src/main/index"


const d = (nodes:any, relationships:any) => ({
    "results": [
        {
          //   "columns": ["user", "entity"],
            "data": [
                {
                    "graph": {
                        "nodes":nodes,
                        "relationships": relationships
                    }
                }
            ]
        }
    ],
    "errors": []
  })
  

export default function createNeoChart(parentElement: string | Node, options: Record<any,any>){
    if(!parentElement) 
       throw new Error("chart needs a parent element to mount on")
       //@ts-ignore
      return new Neo4jd3(parentElement, options) 


 }

interface singlePoint{
    start: Record<any, any>,
    end: Record<any, any>
    segments: Record<any, any>
}

interface Neodata {
    p: singlePoint
}

const parsed: {nodes: Array<any>, relationships: Array<any>} = {
    nodes: [],
    relationships: []
}

const table:Record<any, any> = {}
 export function NeoDatatoChartData(data: Array<Neodata>){


    parsed.nodes = []
    parsed.relationships = []
    // console.log(data)
    //    console.log(data[0].p.segments[0])
 
     // table pass 
   let allNodes:Array<any> = []
     data.forEach((point, idx)=> {
       const {start, relationship, end} = point.p.segments[0]
       allNodes.push(start, end)
     })
 
   allNodes.forEach((node, idx)=> {
     table[node.elementId] = idx
   })
 
     // console.log(index)
//    console.log(table)
   const unique = {}
     data.forEach((point, idx)=> {
        const {start, relationship, end} = point.p.segments[0]
         //  console.log(relationship)
         const sNeo = {
           id: start.elementId,
           ...start
         }
         const eNeo = {
            id: end.elementId,
            ...end
         }
         const s = {
             label: start.labels[0] + "  " + start.identity
         }
         const e = { 
           label: end.properties.made + "  " + end.identity
         }
 
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
      if(relationship){

        let b = {
            id: relationship.elementId,
            startNode: relationship.startNodeElementId,
            endNode: relationship.endNodeElementId,
            ...relationship

        }
        parsed.relationships.push(b)
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
         parsed.nodes.push(sNeo)
         parsed.nodes.push(eNeo)
        
     })
 
     
     return d(parsed.nodes, parsed.relationships)

 }