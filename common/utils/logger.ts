const location = (loc?: string) => `${loc ? `@ ${loc}` : ``}: `;

export const logger = {
  data: (data: any, loc?: string) =>
    console.log(`\n🟢 log-data ${location(loc)}\n${JSON.stringify(data)}`),

  error: (error: Error, loc?: string) =>
    console.log(`\n🔴 log-error ${location(loc)}\n${error}`),

  info: (info: string, loc?: string) =>
    console.log(`\n🔵 log-info ${location(loc)}${info}`),
};
