import client from "../lib/client";
const apiTeams = {
  create: async (name: any) => {
    try {
      const res = await client.post(`/teams`, { name });
      return { success: true, data: res?.data?.data };
    } catch (e) {
      return { success: false, e };
    }
  },
  rename: async (name: any, teamId: any) => {
    try {
      const res = await client.patch(`/teams/${teamId}`, { name });
      return {
        success: true,
        data: res?.data?.data,
        message: res?.data?.message,
      };
    } catch (e) {
      return { success: false, e };
    }
  },
  deleteTeam: async (teamId: any) => {
    try {
      const res = await client.delete(`/teams/${teamId}`);
      return {
        success: true,
        data: res?.data?.data,
        message: res?.data?.message,
      };
    } catch (e) {
      return { success: false, e };
    }
  },
  getList: async () => {
    try {
      const res = await client.get(`/teams`);
      return { success: true, data: res?.data?.data };
    } catch (e) {
      return { success: false, e };
    }
  },
  getMembers: async (teamId: any) => {
    try {
      const res = await client.get(`/teams/${teamId}/members`);
      return { success: true, data: res?.data?.data };
    } catch (e) {
      return { success: false, e };
    }
  },
  addAthletes: async (teamId: any, athletes: any) => {
    try {
      const res = await client.post(`/teams/${teamId}/members`, {
        userIds: athletes,
      });
      return {
        success: true,
        data: res?.data?.data,
        message: res?.data?.message,
      };
    } catch (e) {
      return { success: false, e };
    }
  },
  updateAthletes: async (teamId: any, athletes: any) => {
    try {
      const res = await client.patch(`/teams/${teamId}`, {
        members: athletes,
      });
      return {
        success: true,
        data: res?.data?.data,
        message: res?.data?.message,
      };
    } catch (e) {
      return { success: false, e };
    }
  },
  removeAthlete: async (teamId: any, athleteId: any) => {
    try {
      const res = await client.delete(`/teams/${teamId}/members/${athleteId}`);
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

export default apiTeams;
