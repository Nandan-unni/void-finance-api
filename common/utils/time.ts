const getDurationInMs = (startTime: [number, number]): number => {
  const SEC_TO_NANO = 1e9, // seconds to nanoseconds
    NANO_TO_MILLI = 1e6; // nanoseconds to milliseconds

  const difference: [number, number] = process.hrtime(startTime);
  return (difference[0] * SEC_TO_NANO + difference[1]) / NANO_TO_MILLI;
};

export { getDurationInMs };
