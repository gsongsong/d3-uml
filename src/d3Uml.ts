import * as d3 from "d3";
import { BaseType, Selection } from "d3-selection";

type D3UmlAttribute = {
  name: string;
  type: string;
};

type D3UmlParameter = {
  name: string;
  type: string;
};

type D3UmlOperation = {
  name: string;
  parameterList: D3UmlParameter[];
  returnType: string;
};

type D3UmlClass = {
  name: string;
  attributeList?: D3UmlAttribute[];
  operationList?: D3UmlOperation[];
};

type D3UmlEndProperty = {
  multiplicity?: string;
};

type D3UmlRelationshipProperty = {
  type: string;
  name?: string;
  sourceEndProperty?: D3UmlEndProperty;
  targetEndProperty?: D3UmlEndProperty;
};

type D3UmlRelationship = {
  source: string;
  target: string;
  type: string;
  name?: string;
  sourceEndProperty?: D3UmlEndProperty;
  targetEndProperty?: D3UmlEndProperty;
};

export class D3Uml {
  private classList: D3UmlClass[];
  private relationshipList: D3UmlRelationship[];

  constructor() {
    this.classList = [];
    this.relationshipList = [];
  }

  addClass(d3UmlClass: D3UmlClass) {
    const classFound = this.classList.find((d) => d.name === d3UmlClass.name);
    if (classFound) {
      return;
    }
    this.classList.push(d3UmlClass);
  }

  addRelationship(
    source: string,
    target: string,
    relationshipProperty: D3UmlRelationshipProperty
  ) {
    const sourceFound = this.classList.find(
      (d3UmlClass) => d3UmlClass.name === source
    );
    if (!sourceFound) {
      return;
    }
    const targetFound = this.classList.find(
      (d3UmlClass) => d3UmlClass.name === target
    );
    if (!targetFound) {
      return;
    }
    const relationshipFound = this.relationshipList.find((relationship) => {
      const { type, name } = relationshipProperty;
      return (
        relationship.source === source &&
        relationship.target === target &&
        relationship.type === type &&
        relationship.name === name
      );
    });
    if (relationshipFound) {
      return;
    }
    this.relationshipList.push({
      source,
      target,
      ...relationshipProperty,
    });
  }

  render(selector: string, width: number, height: number) {
    const diag = Math.sqrt(width * width + height * height);
    const nodes = this.classList.map((d) => Object.create(d));
    const links = this.relationshipList.map((d) => Object.create(d));

    const simulation = d3
      .forceSimulation(nodes)
      .force(
        "link",
        d3.forceLink(links).id((d: any /* TODO */) => d.name)
      )
      .force("charge", d3.forceManyBody().strength(-diag))
      .force("x", d3.forceX())
      .force("y", d3.forceY());

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

      return (d3
        .drag()
        .on("start", dragstarted)
        .on("drag", dragged)
        .on("end", dragended) as unknown) as (
        selection: Selection<
          BaseType | SVGCircleElement,
          any,
          SVGGElement,
          unknown
        >,
        ...args: any[]
      ) => void;
    };

    const svg = d3
      .select(selector)
      .append("svg")
      .attr("width", width)
      .attr("height", height)
      .attr("viewBox", `${-width / 2} ${-height / 2} ${width} ${height}`);

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
      .call(drag(simulation));

    const nodeText = svg
      .append("g")
      .selectAll("text")
      .data(nodes)
      .join("text")
      .text((d) => d.name)
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
        const dx = x;
        const dy = y;
        const r = Math.sqrt(dx * dx + dy * dy);
        const offsetx = (5 * dx) / r;
        const offsety = (5 * dy) / r;
        return `translate(${x + offsetx},${y + offsety})`;
      });

      node.attr("transform", (d) => {
        return `translate(${d.x},${d.y})`;
      });

      nodeText.attr("transform", (d) => {
        const dx = d.x;
        const dy = d.y;
        const r = Math.sqrt(dx * dx + dy * dy);
        const offsetx = (25 * dx) / r;
        const offsety = (25 * dy) / r;
        return `translate(${d.x + offsetx},${d.y + offsety})`;
      });
    });
  }
}
