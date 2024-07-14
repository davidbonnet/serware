export function pipe(...streams) {
  if (streams.length < 2) {
    return Promise.resolve(streams[0]);
  }
  return new Promise((resolve, reject) => {
    const { length } = streams;
    const lastIndex = length - 1;
    let stream = streams[0];
    for (let i = 1; i < lastIndex; i++) {
      stream.on("error", reject);
      stream = stream.pipe(streams[i]);
    }
    stream.pipe(streams[lastIndex], { end: false });
    stream.on("end", resolve);
    stream.on("error", reject);
  });
}
