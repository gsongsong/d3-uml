import { D3UmlRelDirected } from "./constants";
import { D3Uml } from "./d3Uml";

const d3Uml = new D3Uml();

d3Uml.addClass({ name: "Change" });
d3Uml.addClass({ name: "Commitment" });
d3Uml.addClass({ name: "Deployment option" });
d3Uml.addClass({ name: "Duplex mode" });
d3Uml.addClass({ name: "Feature" });
d3Uml.addClass({ name: "Feature version" });
d3Uml.addClass({ name: "Network element" });
d3Uml.addClass({ name: "Operator" });
d3Uml.addClass({ name: "Package" });
d3Uml.addClass({ name: "Radio access technology" });
d3Uml.addClass({ name: "RAN sharing" });
d3Uml.addClass({ name: "Requirement" });
d3Uml.addClass({ name: "User" });

d3Uml.addRelationship("Feature version", "Feature", {
  type: D3UmlRelDirected,
  name: "Implements",
  sourceEndProperty: {
    multiplicity: "0..*",
  },
});
d3Uml.addRelationship("Feature version", "Feature version", {
  type: D3UmlRelDirected,
  name: "Forked from",
});
d3Uml.addRelationship("User", "Feature", {
  type: D3UmlRelDirected,
  name: "Owns",
  targetEndProperty: {
    multiplicity: "0..*",
  },
});
d3Uml.addRelationship("User", "Package", {
  type: D3UmlRelDirected,
  name: "Owns",
  targetEndProperty: {
    multiplicity: "0..*",
  },
});
d3Uml.addRelationship("Package", "Feature", {
  type: D3UmlRelDirected,
  name: "Includes",
  sourceEndProperty: {
    multiplicity: "0..*",
  },
  targetEndProperty: {
    multiplicity: "0..*",
  },
});

d3Uml.render("body", 600, 600);
