import api, { unwrap } from "@/services/api.js";

export const folderService = {
  list: () => api.get("/folders").then(unwrap),
  getById: (id) => api.get(`/folders/${id}`).then(unwrap),
  create: (payload) => api.post("/folders", payload).then(unwrap),
  update: (id, payload) => api.put(`/folders/${id}`, payload).then(unwrap),
  remove: (id) => api.delete(`/folders/${id}`),
};

export default folderService;
