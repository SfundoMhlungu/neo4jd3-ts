# Typescript wrapper for [neo4jd3.js](https://www.npmjs.com/package/neo4jd3?activeTab=readme)

## Functionality and Tutorial, 
  consult neo4djd3 documentation(API is the same):
 [neo4jd3.js](https://www.npmjs.com/package/neo4jd3?activeTab=readme)


## getting started 

```
npm i neo4jd3-ts
```

## import 

```js
import createNeoChart, {NeoDatatoChartData} from "neo4jd3-ts"
```


### Data format 

#### Without relationships


```js
// Array of objects
// each object contains a node - represented by the "n" property
// each n must have the "elementId" property
// each "elementId" must be unique

const data = [

  {
    "n": {
      "identity": 2008,
      "labels": [
        "Mylabel"
      ],
      "properties": {
      },
      "elementId": "2008"
    }
  },
  {
    "n": {
      "identity": 2010,
      "labels": [
        "Mylabel"
      ],
      "properties": {
      },
      "elementId": "2010"
    }
  },


]

 NeoDatatoChartData(data) // returns neod3js friendly data

```

#### With relationships


```js
// Array of objects
// each object contains a node - represented by the "p" property 
// each p must have the start and end nodes 
// start and element must "elementId" as a property

const data = [
  {
    "p": {
      "start": {
        "identity": 4009,
        "labels": [
          "Label1"
        ],
        "properties": {
        },
        "elementId": "4009"
      },
      "end": {
        "identity": 2007,
        "labels": [
          "Label2"
        ],
        "properties": {
        },
        "elementId": "2007"
      },
      "segments": [
        {
          "start": {
            "identity": 4009,
            "labels": [
              "Label1"
            ],
            "properties": {
            },
            "elementId": "4009"
          },
          "relationship": {
            "identity": 2000,
            "start": 4009,
            "end": 2007,
            "type": "My_type",
            "properties": {

            },
            "elementId": "2000",
            "startNodeElementId": "4009",
            "endNodeElementId": "2007"
          },
          "end": {
            "identity": 2007,
            "labels": [
              "Label2"
            ],
            "properties": {
            },
            "elementId": "2007"
          }
        }
      ],
      "length": 1.0
    }
  },

 ]

 NeoDatatoChartData(data) // returns neod3js friendly data
```

### create chart 

```js

const c = createNeoChart("#select", {
  neo4jData: NeoDatatoChartData(data),
    nodeRadius:25,
  minCollision: 0.5,
})
```
## Interface

```js
 createNeoChart(parentElement: string | Node, options: Record<any,any>)


 // options -  [neo4jd3.js](https://www.npmjs.com/package/neo4jd3?activeTab=readme)
```
