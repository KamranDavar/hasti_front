export type rel = {
  "id"?: number,
  "type"?: string,
  "link"?: string,

};

export type rels = rel[];

export type GetRelsResponse = {
  data: rels;
};
export type formType = {
  mode: "create" | "update";
  id?: number;
  updateList: () => void;
  initialExpand?: boolean;
  item?: rel;
  items: rels;
};