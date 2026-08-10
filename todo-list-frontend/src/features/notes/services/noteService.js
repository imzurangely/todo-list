import api, { unwrap } from "@/services/api.js";

export const noteService = {
  list: () => api.get("/notes").then(unwrap),
  getById: (id) => api.get(`/notes/${id}`).then(unwrap),
  create: (payload) => api.post("/notes", payload).then(unwrap),
  update: (id, payload) => api.put(`/notes/${id}`, payload).then(unwrap),
  remove: (id) => api.delete(`/notes/${id}`),
};

export default noteService;
