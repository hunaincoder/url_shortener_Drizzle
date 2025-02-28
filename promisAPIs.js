const p1 = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve("p1 resolved")
    }, 2000);
})
const p2 = new Promise((resolve, reject) => {
    setTimeout(() => {
        //resolve("p3 resolved")
        reject("p2 rejected")
    }, 4000);
})
const p3 = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve("p3 resolved")
    }, 2000);
})

Promise.all([p1,p2,p3]).then(res => console.log(res)).catch(err =>console.error(err))
// Promise.allSettled([p1,p2,p3]).then(res => console.log(res)).catch(err =>console.error(err))
// Promise.race([p1, p2, p3]).then(res => console.log(res)).catch(err => console.error(err))
// Promise.any([p1, p2, p3]).then(res => console.log(res)).catch(err => console.error(err))