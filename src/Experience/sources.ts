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
];

export type sourcesType = typeof sources;
