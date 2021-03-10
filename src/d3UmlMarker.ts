import { Selection } from "d3-selection";
import {
  D3UmlRelAggregation,
  D3UmlRelComposition,
  D3UmlRelDependency,
  D3UmlRelDirected,
  D3UmlRelGeneralization,
} from "./constants";

function markerCommon(
  defs: Selection<SVGDefsElement, unknown, HTMLElement, any>
) {
  return defs
    .append("marker")
    .attr("viewBox", "0 -5 10 10")
    .attr("refX", 15)
    .attr("refY", -0.5)
    .attr("markerWidth", 6)
    .attr("markerHeight", 6)
    .attr("orient", "auto");
}

function markerArrow(
  marker: Selection<SVGMarkerElement, unknown, HTMLElement, any>
) {
  return marker.append("polyline").attr("points", "0,-5 10,0 0,5");
}

function markerDiamond(
  marker: Selection<SVGMarkerElement, unknown, HTMLElement, any>
) {
  return marker.append("polyline").attr("points", "5,-5 10,0 5,5 0,0 5,-5");
}

function markerTriangle(
  marker: Selection<SVGMarkerElement, unknown, HTMLElement, any>
) {
  return marker.append("polyline").attr("points", "0,-5 10,0 0,5 0,-5");
}

export function addMarkers(
  svg: d3.Selection<SVGSVGElement, unknown, HTMLElement, any>
) {
  const defs = svg.append("defs");
  markerArrow(markerCommon(defs).attr("id", D3UmlRelDirected))
    .attr("fill", "none")
    .attr("stroke", "black");
  markerDiamond(markerCommon(defs).attr("id", D3UmlRelAggregation))
    .attr("fill", "none")
    .attr("stroke", "black");
  markerDiamond(markerCommon(defs).attr("id", D3UmlRelComposition))
    .attr("fill", "black")
    .attr("stroke", "black");
  markerArrow(markerCommon(defs).attr("id", D3UmlRelDependency))
    .attr("fill", "none")
    .attr("stroke", "black");
  markerTriangle(markerCommon(defs).attr("id", D3UmlRelGeneralization))
    .attr("fill", "none")
    .attr("stroke", "black");
  markerTriangle(markerCommon(defs).attr("id", D3UmlRelGeneralization))
    .attr("fill", "none")
    .attr("stroke", "black");
}
