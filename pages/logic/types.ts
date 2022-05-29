export type rel = {
  "id": number,
  "type": string,
  "link": string,

};

export type rels = rel[];

export type GetRelsResponse = {
  data: rels;
};