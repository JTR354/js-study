const Promise = require("./MyPromise");

const p = new Promise((resolve, reject) => {
  // reject(99)
  // resolve("resolve");
  setTimeout(() => {
    resolve("resolve ...");
  }, 2e3);
});

// p.then(res => {
//   console.log(res)
// }, reason => {
//   console.log(reason)
// })

// p.then(r => {
//   console.log(1)
//   console.log(r)
// })
// p.then(r => {
//   console.log(2)
//   console.log(r)
// })

// const p2 = p.then(
//   (r) => {
//     console.log(r, 1);
//     // return new Promise((r) => r(989));
//     return p2;
//   },
//   (reason) => console.log(reason)
// );
// p2.then(
//   (r) => {
//     console.log(r, 2);
//   },
//   (err) => console.log(err.message, "2 rejected")
// );

// p.then()
//   .then()
//   .then((r) => console.log(r));

function f1() {
  return new Promise((r) => setTimeout(() => r("f1"), 2000));
}

function f2() {
  return new Promise((r) => r("f2"));
}

Promise.all(["a", "b", f1(), f2(), "c"]).then((r) => console.log(r));

Promise.resolve(100).then((r) => console.log(r));
Promise.resolve(f1()).then((r) => console.log(r, "p.r"));

p.finally(() => {
  console.log("finally");
  return f1();
}).then((r) => {
  console.log(r, 9e9);
});
