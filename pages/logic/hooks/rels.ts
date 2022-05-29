import { useQuery, useMutation } from "react-query";
import { getRels, postRel, getRel, putRel, deleteRel } from "../services/rels";
import { rels, rel } from "../types";

export function useRels() {
  return useQuery<rels, any>(["rels"], getRels);
}
export function useRel(id: number) {
  return useQuery<rel, any>(["rel", id], getRel);
}
export function useCreateRel(id: number) {
  return useMutation((rel: rel)=>postRel(rel));
}
export function useUpdateRel(id: number) {
  return useMutation((rel: rel) => putRel(rel, id));
}
export function useDelteRel(id: number) {
  return useMutation((rel: rel) => deleteRel(id));
}
