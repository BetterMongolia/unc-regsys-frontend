const submitDataFilters = (prevData: any, currentData: any) => {
  let preSubmitData: any = {};
  for (const [key, value] of Object.entries(prevData)) {
    let tmpValue = value;

    if ((key === "email" || key === "mobile") && (value as any).value) {
      tmpValue = (value as any).value;
    }
    if (prevData["gender"] !== currentData["gender"]) {
      preSubmitData["gender"] = currentData["gender"];
    }
    if (
      (tmpValue !== null || tmpValue !== undefined) &&
      currentData[key] &&
      currentData[key] !== tmpValue &&
      tmpValue !== ""
    ) {
      preSubmitData[key] = currentData[key];
    }
  }

  return preSubmitData;
};

export default submitDataFilters;
