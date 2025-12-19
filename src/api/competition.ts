import client from "../lib/client";
const apiComps = {
    getComps: async (sportId: any) => {
        try {
            const res = await client.get(`/sports/${sportId}/competitions`);
            return { success: true, data: res?.data?.data };
        } catch (e) {
            return { success: false, e };
        }
    },
    registerComp: async (eventId: any, competitionId: any, data: any) => {
        try {
            const res = await client.post(
                `/events/${eventId}/competitions/${competitionId}/register`,
                data
            );
            return {
                success: true,
                data: res?.data?.data,
                message: res?.data?.message,
            };
        } catch (e) {
            return { success: false, e };
        }
    },
    getRegisteredList: async (eventId: any, competitionId: any) => {
        try {
            const res = await client.get(
                `/events/${eventId}/competitions/${competitionId}/entries`
            );
            return { success: true, data: res?.data?.data };
        } catch (e) {
            return { success: false, e };
        }
    },
    deleteCompEntry: async (sportId: any, competitionId: any, entryId: any) => {
        try {
            const res = await client.delete(
                `/sports/${sportId}/competitions/${competitionId}/entries/${entryId}`
            );
            return {
                success: true,
                data: res?.data?.data,
                message: res?.data?.message,
            };
        } catch (e) {
            return { success: false, e };
        }
    },
};

export default apiComps;
