
import React from "react";
import Heatmap from "./Heatmap";
import { data } from "./data";

const data2 = [
  { x: 'A', y: 'A', value: 12 },
  { x: 'B', y: 'A', value: 2 },
  { x: 'C', y: 'A', value: 9 }
];

export default function VisualizationBigData() {

  return (
    <React.Fragment>

      <Heatmap data={data} width={500} height={500}></Heatmap>

    </React.Fragment>
  )
}
