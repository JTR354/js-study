const PENDING = "pending";
const FULFILLED = "fulfilled";
const REJECTED = "rejected";

class MyPromise {
  constructor(executor) {
    const { resolve, reject } = this;
    try {
      executor(resolve, reject);
    } catch (e) {
      reject(e);
    }
  }
  status = PENDING;
  value = undefined;
  reason = undefined;
  successCallback = [];
  failedCallback = [];
  resolve = (value) => {
    if (!isPending(this.status)) return;
    this.status = FULFILLED;
    this.value = value;
    flush(this.successCallback);
  };
  reject = (reason) => {
    if (!isPending(this.status)) return;
    this.status = REJECTED;
    this.reason = reason;
    flush(this.failedCallback);
  };
  then(successCallback = (v) => v, failedCallback = (e) => e) {
    const p = new MyPromise((resolve, reject) => {
      setTimeout(() => {
        const success = () => successCallback(this.value);
        const failed = () => failedCallback(this.reason);
        if (this.status === FULFILLED) {
          handleThen(success);
        } else if (this.status === REJECTED) {
          handleThen(failed);
        } else {
          this.successCallback.push(() => handleThen(success));
          this.failedCallback.push(() => handleThen(failed));
        }
      }, 0);
      function handleThen(callback) {
        try {
          const value = callback();
          if (value === p) {
            return reject(
              new TypeError("Chaining cycle detected for promise #<Promise>")
            );
          }
          if (value instanceof MyPromise) {
            value.then(resolve, reject);
          } else {
            resolve(value);
          }
        } catch (e) {
          reject(e);
        }
      }
    });
    return p;
  }
  static all(array = []) {
    return new MyPromise((resolve, reject) => {
      const result = [];
      let index = 0;
      function addData(key, value) {
        result[key] = value;
        index++;
        // console.log(value, index);
        if (index >= array.length) {
          resolve(result);
        }
      }
      for (let i = 0; i < array.length; i++) {
        const fn = array[i];
        if (fn instanceof MyPromise) {
          fn.then((value) => addData(i, value), reject);
        } else {
          addData(i, fn);
        }
      }
    });
  }
  static resolve(value) {
    if (value instanceof MyPromise) return value;
    return new MyPromise((r) => r(value));
  }
  finally(cb) {
    return this.then(
      (value) => {
        return MyPromise.resolve(cb()).then(() => value);
      },
      (reason) => {
        return MyPromise.resolve(cb()).then(() => {
          throw reason;
        });
      }
    );
  }
  catch(failed) {
    return this.then(undefined, failed);
  }
}

function isPending(status) {
  return status === PENDING;
}

function flush(array = []) {
  while (array.length) {
    array.shift()();
  }
}

// function handleThen(p, value, resolve, reject) {
//   if (value === p) {
//     return reject(
//       new TypeError("Chaining cycle detected for promise #<Promise>")
//     );
//   }
//   if (value instanceof MyPromise) {
//     value.then(resolve, reject);
//   } else {
//     resolve(value);
//   }
// }

module.exports = MyPromise;
