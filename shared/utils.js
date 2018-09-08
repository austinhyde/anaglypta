
module.exports.asyncify = (f, ...args) =>
  new Promise((res, rej) =>
    f(...args, (err, d) => err ? rej(err) : res(d)
    )
  );