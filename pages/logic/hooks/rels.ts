import { useQuery, useMutation } from "react-query";
import { getRels, postRel, putRel, deleteRel } from "../services/rels";
import { rels, rel } from "../types";

export function useRels() {
  return useQuery<rels, Error>(["rels"], getRels);
}
// export function useRel(id: number) {
//   return useQuery<rel, Error>(["rel", id], getRel);
// }
export function useCreateRel() {
  return useMutation((rel: rel) => postRel(rel));
}
export function useUpdateRel(id: number) {
  return useMutation((rel: rel) => putRel(rel, id));
}
export function useDeleteRel(id: number | undefined) {
  return useMutation(() => deleteRel(id));
}
