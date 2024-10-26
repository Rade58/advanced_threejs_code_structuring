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
      "/textures/environmentMaps/toyota/px.png",
      "/textures/environmentMaps/toyota/nx.png",
      "/textures/environmentMaps/toyota/py.png",
      "/textures/environmentMaps/toyota/ny.png",
      "/textures/environmentMaps/toyota/pz.png",
      "/textures/environmentMaps/toyota/pz.png",
    ],
  },
  {
    name: "groundColorTexture",
    type: "texture",
    path: "/textures/ground/arm.jpg",
  },
  {
    name: "groundNormalTexture",
    type: "texture",
    path: "/textures/ground/nor_gl.png",
  },
  {
    name: "groundDiffTexture",
    type: "texture",
    path: "/textures/ground/diff.jpg",
  },
  {
    name: "groundRoughTexture",
    type: "texture",
    path: "/textures/ground/rough.jpg",
  },
];

export type sourcesType = typeof sources;
