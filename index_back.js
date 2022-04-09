const { projects } = require("./projects");

const container = document.getElementById("container");
const PROJECT_PATH = "./projects";
const SOURCE_FILE = "index.html";

function getProjectPath(name) {
  return `${PROJECT_PATH}/${name}/${SOURCE_FILE}`;
}

function setAttributes(node, attributes) {
  for ([key, value] of Object.entries(attributes)) {
    node.setAttribute(key, value);
  }

  return node;
}

function createTileNode({ id, title, description, projectPath }) {
  let tileNode = document.createElement("div");
  tileNode = setAttributes(tileNode, {
    class: "tile",
    id,
  });

  return tileNode;
}

function addAllProjectsToRoot() {
  const fragment = document.createDocumentFragment();
  projects.forEach(({ id, title, description }) => {
    const projectPath = getProjectPath(id);
    fragment.appendChild(
      createTileNode({ id, title, description, projectPath })
    );
  });
  container.appendChild(fragment);
}
