interface Source {
  name: string;
  type: string;
  path: string[];
}

export const sources: Source[] = [
  {
    name: "environmentMapTexture",
    type: "cubeTexture",
    path: [
      "/textures/environmentMaps/toyota/px.jpg",
      "/textures/environmentMaps/toyota/nx.jpg",
      "/textures/environmentMaps/toyota/py.jpg",
      "/textures/environmentMaps/toyota/ny.jpg",
      "/textures/environmentMaps/toyota/pz.jpg",
      "/textures/environmentMaps/toyota/pz.jpg",
    ],
  },
];

export type sourcesType = typeof sources;
