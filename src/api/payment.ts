import client from "../lib/client";
const apiPayment = {
  createInvoice: async (sportId: any, competitionId: any, data: any) => {
    try {
      const res = await client.post(
        `/sports/${sportId}/competitions/${competitionId}/invoices`,
        data
      );
      return { success: true, data: res?.data?.data };
    } catch (e) {
      return { success: false, e };
    }
  },
  getAccessToken: async () => {
    try {
      const res = await client.get(`/users/me/payment/accessToken`);
      return { success: true, data: res?.data?.data };
    } catch (e) {
      return { success: false, e };
    }
  },
  isPayable: async (sportId: any, competitionId: any, entryId: any) => {
    try {
      const res =
        await client.get(`/sports/${sportId}/competitions/${competitionId}/entries/${entryId}/isPayable
      `);
      return { success: true, data: res?.data?.data };
    } catch (e) {
      return { success: false, e };
    }
  },
  calcPayment: async (sportId: any, competitionId: any, entries: any) => {
    try {
      const res = await client.post(
        `/sports/${sportId}/competitions/${competitionId}/calculateAmount
      `,
        { entries: entries }
      );
      return { success: true, data: res?.data?.data };
    } catch (e) {
      return { success: false, e };
    }
  },
};

export default apiPayment;
