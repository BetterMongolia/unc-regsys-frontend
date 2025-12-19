import client from "../lib/client";
const apiEvents = {
    find: async () => {
        try {
            const res = await client.get(`/events`);
            return { success: true, data: res?.data?.data };
        } catch (e) {
            return { success: false, e };
        }
    },
    getCompetitions: async (eventId: string) => {
        try {
            const res = await client.get(`/events/${eventId}/competitions`);
            return { success: true, data: res?.data?.data };
        } catch (e) {
            return { success: false, e };
        }
    },
};

export default apiEvents;
