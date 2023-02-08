export default function createNeoChart(parentElement: string | Node, options: Record<any, any>): any;
interface Withrelationpoint {
    start: Record<any, any>;
    end: Record<any, any>;
    segments: Record<any, any>;
}
interface Neodata {
    p?: Withrelationpoint;
    n?: Record<any, any>;
}
export declare function NeoDatatoChartData(data: Array<Neodata>): {
    results: {
        data: {
            graph: {
                nodes: any;
                relationships: any;
            };
        }[];
    }[];
    errors: never[];
};
export {};
//# sourceMappingURL=neoChart.d.ts.map