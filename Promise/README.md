### Tasking

- [x] Promise 是一个类，接受一个执行器，在实例化时立刻执行
- [x] Promise 有三种状态 pending, fulfilled, rejected; 状态一旦确定就不可更改
- [x] resolve, reject 函数是用来改变状态的； resolve: pending -> fulfilled , reject: pending -> rejected
- [x] then 方法根据状态来调用对应的回调函数，并且其回调函有对应的参数返回
- [x] 处理异步情况，then 方法中如果是 pending 状态，则存储回调函数，在 resolve 或 reject 中执行
- [x] then 方法多次调用的情况，数组
- [x] then 方法实现链式调用，
  - [x] 实现链式调用
  - [x] 返回上一个 then 的返回值
  - [x] then 返回值为 Promise 类型，则调用 then; 否则调用 resolve
  - [x] then 返回值不能是自身的 promise
- [x] 捕获错误
- [x] then 方法不传递方法
- [x] Promise.all 解决并发的问题，根据定义的顺序得到结果，如果有一个失败则返回失败
- [x] Promise.resolve 实现
- [x] Promise.finally 实现，可链式 then,异步
- [x] Promise.catch 实现
