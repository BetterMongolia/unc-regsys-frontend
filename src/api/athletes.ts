import client from "../lib/client";
const apiAthletes = {
  find: async () => {
    try {
      const res = await client.get(`/person`);
      return { success: true, data: res?.data?.data };
    } catch (e) {
      return { success: false, e };
    }
  },
  getList: async () => {
    try {
      const res = await client.get(`/person`);
      return { success: true, data: res?.data?.data };
    } catch (e) {
      return { success: false, e };
    }
  },
  getSelectedList: async (query : any) => {
    try {
      const res = await client.get(`/person/select/${query}`);
      return { success: true, data: res?.data?.data };
    } catch (e) {
      return { success: false, e };
    }
  },
  addAthlete: async (values: any) => {
    try {
      const res = await client.post(`/person`, values);
      return {
        success: true,
        data: res?.data?.data,
        message: res?.data?.message,
      };
    } catch (e) {
      return { success: false, e };
    }
  },
  removeAthlete: async (athleteId: any) => {
    try {
      const res = await client.delete(`/person/${athleteId}`);
      return {
        success: true,
        data: res?.data?.data,
        message: res?.data?.message,
      };
    } catch (e) {
      return { success: false, e };
    }
  },
  updateAthlete: async (values: any, athleteId: any) =>
    client
      .patch(`/person/${athleteId}`, values)
      .then((res) => {
        if (res && res.data?.status === "error") {
          return { success: true, message: res.data?.message, data: null };
        }
        return {
          success: true,
          data: res?.data?.data,
          message: res?.data?.message,
        };
      })
      .catch((e) => {
        if (
          e.response.data?.message ===
          'Validation failed. "email" must be a valid email'
        ) {
          return {
            success: true,
            message: "И-мэйл хаяг буруу!",
            data: null,
          };
        }
        return {
          success: true,
          message: e.response.data?.message,
          data: null,
        };
      }),

  // const res = await client.patch(`/person/${athleteId}`, values);
};

export default apiAthletes;
