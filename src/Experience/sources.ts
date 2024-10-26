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
      "/textures/environmentMaps/field/px.png",
      "/textures/environmentMaps/field/nx.png",
      "/textures/environmentMaps/field/py.png",
      "/textures/environmentMaps/field/ny.png",
      "/textures/environmentMaps/field/pz.png",
      "/textures/environmentMaps/field/pz.png",
    ],
  },
  {
    name: "groundAOTexture",
    type: "texture",
    path: "/textures/pine_forest/ao.png",
  },
  {
    name: "groundColorTexture",
    type: "texture",
    path: "/textures/pine_forest/color.png",
  },

  {
    name: "groundMetalTexture",
    type: "texture",
    path: "/textures/pine_forest/metal.png",
  },
  {
    name: "groundNormalTexture",
    type: "texture",
    path: "/textures/pine_forest/normal.png",
  },
  {
    name: "groundRoughTexture",
    type: "texture",
    path: "/textures/pine_forest/metal.png",
  },
  {
    name: "groundDispTexture",
    type: "texture",
    path: "/textures/pine_forest/height.png",
  },
];

export type sourcesType = typeof sources;
