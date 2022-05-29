export const getNow =
  process.env.NODE_ENV === "test"
    ? function () {
        return 451447200000;
      }
    : function () {
        return Date.now();
      };
