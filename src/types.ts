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

export type D3UmlClass = {
  name: string;
  attributeList?: D3UmlAttribute[];
  operationList?: D3UmlOperation[];
};

type D3UmlEndProperty = {
  multiplicity?: string;
};

export type D3UmlRelationshipProperty = {
  type: string;
  name?: string;
  sourceEndProperty?: D3UmlEndProperty;
  targetEndProperty?: D3UmlEndProperty;
};

export type D3UmlRelationship = {
  source: string;
  target: string;
  type: string;
  name?: string;
  sourceEndProperty?: D3UmlEndProperty;
  targetEndProperty?: D3UmlEndProperty;
};