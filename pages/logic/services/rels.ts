import { AnySoaRecord } from "dns";
import { jsonServerApi } from "../clients/json-server";

import { rels, rel } from "../types";

export const getRels = async (context: any) => {
  const response = await jsonServerApi.get<rels>("/rels");
  return response.data;
};
export const getRel = async (context: any) => {
  const response = await jsonServerApi.get<rel>(`/rels/${context.queryKey[1]}`);
  return response.data;
};
export const postRel = async (item: rel) => {
  const response = await jsonServerApi.post<rel>("/rels", item);
  return response.data;
};
export const putRel = async (item: rel, id: number) => {
  const response = await jsonServerApi.post<rel>(`/rels/${id}`);
  return response.data;
};
export const deleteRel = async (id: number) => {
  const response = await jsonServerApi.delete<rel>(`/rels/${id}`);
  return response.data;
};
