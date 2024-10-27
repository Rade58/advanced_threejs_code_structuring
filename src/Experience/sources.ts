interface Source {
  name: string;
  type: string;
  path: string[] | string;
}

export const sources: Source[] = [
  {
    name: "environmentMapTexture",
    type: "cubeTexture",
    path: [
      "/textures/environmentMaps/alley/px.png",
      "/textures/environmentMaps/alley/nx.png",
      "/textures/environmentMaps/alley/py.png",
      "/textures/environmentMaps/alley/ny.png",
      "/textures/environmentMaps/alley/pz.png",
      "/textures/environmentMaps/alley/pz.png",
    ],
  },
  {
    name: "groundAOTexture",
    type: "texture",
    // path: "/textures/pine_forest/ao.png",
    path: "/textures/ground/ao.jpg",
  },
  {
    name: "groundColorTexture",
    type: "texture",
    // path: "/textures/pine_forest/color.png",
    path: "/textures/ground/color.jpg",
  },

  {
    name: "groundMetalTexture",
    type: "texture",
    // path: "/textures/pine_forest/metal.png",
    path: "/textures/ground/metal.jpg",
  },
  {
    name: "groundNormalTexture",
    type: "texture",
    // path: "/textures/pine_forest/normal.png",
    path: "/textures/ground/normal.png",
  },
  {
    name: "groundRoughTexture",
    type: "texture",
    // path: "/textures/pine_forest/metal.png",
    path: "/textures/ground/metal.jpg",
  },
  {
    name: "groundDispTexture",
    type: "texture",
    // path: "/textures/pine_forest/height.png",
    path: "/textures/ground/height.png",
  },
  {
    name: "foxModel",
    type: "gltfModel",
    path: "/models/Fox/glTF/Fox.gltf",
  },
];

export type sourcesType = typeof sources;
