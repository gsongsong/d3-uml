import * as d3 from 'd3';
import { BaseType, Selection } from 'd3';

const [width, height] = [300, 300];
const diag = Math.sqrt(width * width + height * height);
const data = {
  nodes: [
    {
      id: "id 1",
    },
    {
      id: "id 2",
    },
    {
      id: "id 3",
    },
  ],
  links: [
    {
      source: "id 1",
      target: "id 2",
      name: "id 1 to id 2",
    },
    {
      source: "id 2",
      target: "id 3",
      name: "id 2 to id 3",
    },
    {
      source: "id 3",
      target: "id 1",
      name: "id 3 to id 1",
    },
  ],
};
const links = data.links.map((d) => Object.create(d));
const nodes = data.nodes.map((d) => Object.create(d));

const simulation = d3
  .forceSimulation(nodes)
  .force(
    "link",
    d3.forceLink(links).id((d: any /* TODO */) => d.id)
  )
  .force("charge", d3.forceManyBody().strength(-diag))
  .force("center", d3.forceCenter(width / 2, height / 2));

const scale = d3.scaleOrdinal(d3.schemeCategory10);
const color = (d: any /* TODO */) => scale(d.group);

const drag = (simulation: d3.Simulation<any, undefined>) => {
  function dragstarted(event: any /* TODO */) {
    if (!event.active) simulation.alphaTarget(0.3).restart();
    event.subject.fx = event.subject.x;
    event.subject.fy = event.subject.y;
  }

  function dragged(event: any /* TODO */) {
    event.subject.fx = event.x;
    event.subject.fy = event.y;
  }

  function dragended(event: any /* TODO */) {
    if (!event.active) simulation.alphaTarget(0);
    event.subject.fx = null;
    event.subject.fy = null;
  }

  return d3
    .drag()
    .on("start", dragstarted)
    .on("drag", dragged)
    .on("end", dragended) as unknown as (selection: Selection<BaseType | SVGCircleElement, any, SVGGElement, unknown>, ...args: any[]) => void;
};

const svg = d3
  .select("body")
  .append("svg")
  .attr("width", width)
  .attr("height", height)
  .attr("viewBox", `0 0 ${width} ${height}`);

const link = svg
  .append("g")
  .attr("stroke", "#999")
  .attr("stroke-opacity", 0.6)
  .selectAll("line")
  .data(links)
  .join("line")
  .attr("stroke-width", (d) => Math.sqrt(d.value));

const linkName = svg
  .append("g")
  .selectAll("text")
  .data(links)
  .join("text")
  .text((d) => d.name)
  .attr("text-anchor", "middle");

const node = svg
  .append("g")
  .attr("stroke", "#fff")
  .attr("stroke-width", 1.5)
  .selectAll("circle")
  .data(nodes)
  .join("circle")
  .attr("r", 5)
  .attr("fill", color)
  .call(drag(simulation));

const nodeText = svg
  .append("g")
  .selectAll("text")
  .data(nodes)
  .join("text")
  .text((d) => d.id)
  .attr("text-anchor", "middle");

simulation.on("tick", () => {
  link
    .attr("x1", (d) => d.source.x)
    .attr("y1", (d) => d.source.y)
    .attr("x2", (d) => d.target.x)
    .attr("y2", (d) => d.target.y);

  linkName.attr("transform", (d) => {
    const x = (d.source.x + d.target.x) / 2;
    const y = (d.source.y + d.target.y) / 2;
    const dx = x - width / 2;
    const dy = y - height / 2;
    const r = Math.sqrt(dx * dx + dy * dy);
    const offsetx = (5 * dx) / r;
    const offsety = (5 * dy) / r;
    return `translate(${x + offsetx},${y + offsety})`;
  });

  node.attr("transform", (d) => {
    return `translate(${d.x},${d.y})`;
  });

  nodeText.attr("transform", (d) => {
    const dx = d.x - width / 2;
    const dy = d.y - height / 2;
    const r = Math.sqrt(dx * dx + dy * dy);
    const offsetx = (25 * dx) / r;
    const offsety = (25 * dy) / r;
    return `translate(${d.x + offsetx},${d.y + offsety})`;
  });
});