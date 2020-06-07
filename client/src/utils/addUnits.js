
const addDataSizeUnit = (size) => {
  const multiplier = 1024;
  if (typeof(size) !== 'number') {
    throw new TypeError(`Got type: ${typeof(size)}. Expected: 'number'`);
  }
  if (size < multiplier) {
    return `${size} Byte`;
  } else if (size < multiplier ** 2) {
    return `${(size / multiplier).toFixed(2)} KB`;
  } else if (size < multiplier ** 3) {
    return `${(size / multiplier ** 2).toFixed(2)} MB`;
  } else if (size < multiplier ** 4) {
    return `${(size/ multiplier ** 3).toFixed(2)} GB`;
  } else {
    // Display size as-is, if the number is too large.
    return `${size} Byte`;
  }
}

export default addDataSizeUnit;