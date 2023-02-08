//@ts-ignore
import * as Neo4jd3 from "./neo4jd3.js";


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
       // console.log(typeof Neo4jd3)

       if(Neo4jd3.default){
        //@ts-ignore
          return Neo4jd3.default(parentElement, options) 
       }else if(typeof Neo4jd3 === "function"){
            //@ts-ignore
      return Neo4jd3(parentElement, options) 
       }       
   


 }

interface Withrelationpoint{
    start: Record<any, any>,
    end: Record<any, any>
    segments: Record<any, any>
}

interface Withoutrelationpoint{
  identity: string | number,
  labels: Array<any>,
  properties: Record<any, any>,
  elementId: string | number 
}

interface Neodata {
    p?: Withrelationpoint,
    n?: Record<any, any>
}

const parsed: {nodes: Array<any>, relationships: Array<any>} = {
    nodes: [],
    relationships: []
}

// {
//   "n": {
//     "identity": 2008,
//     "labels": [
//       "Claims"
//     ],
//     "properties": {
//       "property_claim": 13020,
//       "vehicle_claim": 52080,
//       "total_claim_amount": 71610,
//       "injury_claim": 6510
//     },
//     "elementId": "2008"
//   }

const table:Record<any, any> = {}
 export function NeoDatatoChartData(data: Array<Neodata>){


    parsed.nodes = []
    parsed.relationships = []
    // console.log(data)
    //    console.log(data[0].p.segments[0])
 
     // table pass 
   let allNodes:Array<any> = []
   if(data[0].p){
    data.forEach((point, idx)=> {
      const {start, relationship, end} = point.p!.segments[0]
      allNodes.push(start, end)
    })
   }
   
 
   allNodes.forEach((node, idx)=> {
     table[node.elementId] = idx
   })
 
     // console.log(index)
//    console.log(table)
  //  const unique = {}
  if(data[0].p){
     data.forEach((point, idx)=> {
        
    
        const {start, relationship, end} = point.p!.segments[0]
        //  console.log(relationship)
        const sNeo = {
          id: start.elementId,
          ...start
        }
        const eNeo = {
           id: end.elementId,
           ...end
        }
        if(relationship){

          let b = {
              id: relationship.elementId,
              startNode: relationship.startNodeElementId,
              endNode: relationship.endNodeElementId,
              ...relationship
  
          }
          parsed.relationships.push(b)
        }

        parsed.nodes.push(sNeo)
        parsed.nodes.push(eNeo)
      })

      }else if(data[0].n){
             data.forEach((point, idx)=> {
                  let n = { id:point.n?.elementId, ...point.n}
                  parsed.nodes.push(n)
             })
      }else{
        console.warn("Unhandled case")
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
     
       
         // delete b.elementId
         // delete s.elementId
         // delete b.startNodeElementId
         // delete b.endNodeElementId
         // delete b.elementId
         // delete b.start
         // delete b.end
         // delete b.identity
         // delete s.identity
       
        
   
 
     
     return d(parsed.nodes, parsed.relationships)

 }
