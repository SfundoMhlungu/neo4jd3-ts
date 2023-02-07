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

### create chart 

```js

const c = createNeoChart("#select", {
  neo4jData: NeoDatatoChartData(neoDat),
    nodeRadius:25,
  minCollision: 0.5,
})
```
## Interface

```js
 createNeoChart(parentElement: string | Node, options: Record<any,any>)


 // options -  [neo4jd3.js](https://www.npmjs.com/package/neo4jd3?activeTab=readme)
```