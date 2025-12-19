import client from "../lib/client";
const apiUpload = {
  avatar: async (image: any) => {
    try {
      const formData = new FormData();
      formData.append("image", image);
      const res = await client.post(`/upload/avatars`, formData);
      return { success: true, data: res?.data?.data };
    } catch (e) {
      return { success: false, e };
    }
  },
};

export default apiUpload;
