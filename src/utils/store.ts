const store = {
  set: (name: string, value: string) => {
    localStorage.setItem(name, value);
  },
  remove: (name: string) => {
    localStorage.removeItem(name);
  },
  get: (name: string) => {
    const tmp = localStorage.getItem(name);
    // const parsed = tmp ? JSON.parse(tmp) : undefined;
    return tmp;
  },
  setData: (name: string, value: any) => {
    if (value) {
      localStorage.setItem(name, JSON.stringify(value || ""));
    }
  },
  getData: (name: string) => {
    const tmp = localStorage.getItem(name);
    const parsed = tmp ? JSON.parse(tmp) : undefined;
    return parsed;
  },
};

export default store;
