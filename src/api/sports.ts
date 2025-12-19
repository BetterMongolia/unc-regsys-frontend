import client from "../lib/client";
const apiSports = {
  sports: async () => {
    try {
      const res = await client.get(`/sports`);
      return { success: true, data: res?.data?.data };
    } catch (e) {
      return { success: false, e };
    }
  },
  getSportById: async (sportId: string) => {
    try {
      const res = await client.get(`/sports/${sportId}`);
      return { success: true, data: res?.data?.data };
    } catch (e) {
      return { success: false, e };
    }
  },
  getAvailableCategory: async (
    eventId: any,
    competitionId: any,
    athleteId: any
  ) => {
    try {
      const res = await client.get(
        `/events/${eventId}/competitions/${competitionId}/categories?${athleteId}`
      );
      return { success: true, data: res?.data?.data };
    } catch (e) {
      return { success: false, e };
    }
  },
};

export default apiSports;
