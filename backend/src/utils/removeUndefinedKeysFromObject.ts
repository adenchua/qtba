const removeUndefinedKeysFromObject = (obj: any): Object => {
  const result = Object.assign(obj, {});

  Object.keys(result).forEach((key: string) => result[key] === undefined && delete result[key]);
  return result;
};

export default removeUndefinedKeysFromObject;
