export function use(handler) {
  /*
  Use a `connect`-like `handler`.
  */
  return async function (request, next) {
    return new Promise((resolve, reject) => {
      const response = request.respond();
      let done = false;
      const result = handler(request, response, (error) => {
        done = true;
        if (error) {
          reject(error);
          return;
        }
        resolve(next(request));
      });
      if (done) {
        return;
      }
      if (result != null && typeof result.then === "function") {
        result.then(() => {
          if (!done) {
            resolve(response);
          }
        });
        return;
      }
      if (result !== undefined) {
        resolve(response);
      }
    });
  };
}
