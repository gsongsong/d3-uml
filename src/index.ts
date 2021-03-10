import { D3UmlRelDirected } from "./constants";
import { D3Uml } from "./d3Uml";

const d3Uml = new D3Uml();

d3Uml.addClass({ name: "User" });
d3Uml.addClass({ name: "Feature" });
d3Uml.addClass({ name: "Package" });

d3Uml.addRelationship("User", "Feature", {
  type: D3UmlRelDirected,
  name: "Owns",
});
d3Uml.addRelationship("User", "Package", {
  type: D3UmlRelDirected,
  name: "Owns",
});
d3Uml.addRelationship("Package", "Feature", {
  type: D3UmlRelDirected,
  name: "Includes",
});

d3Uml.render("body", 600, 600);
