// API（エンドポイント）を一言で呼べるようにする専用ファイル

import axiosClient from "./axiosClient";

const memoApi = {
  create: () => axiosClient.post("/memo"),
  getAll: () => axiosClient.get("/memo"),
  getOne: (id) => axiosClient.get(`memo/${id}`),
  update: (id, params) => axiosClient.patch(`memo/${id}`, params),
  delete: (id) => axiosClient.delete(`memo/${id}`),
};

export default memoApi;
