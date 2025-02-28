// const arr = [
//     { firstname: "hunain", lastname: "asif", age: 20 },
//     { firstname: "hamad", lastname: "akram", age: 21 },
//     { firstname: "moaz", lastname: "khan", age: 23 },
//     { firstname: "irtiza", lastname: "kamran", age: 22 }
// ]

// // console.log(arr.map(x => x.toString(2)))

// // console.log(arr.map(x => x * x))

// const output = arr.reduce(function ageCounter(acc, curr) {
//     if (curr.age > 21) {
//         acc[curr.firstname] = curr.age
//     }
//     return acc
// }, {})

// console.log(output)

// const cart = ["bag", "bra", "panty"]
/*
createorder(cart).then(function (orderId) {
    console.log(orderId)
    return orderId
})
    .catch(function (err){
        console.log(err.messege)
    })



function createorder() {
    const pr = new Promise(function (resolve, reject) {
        if (!validatecart(cart)) {
            const err = Error("cart is not valid")
            reject(err)
        }

        const orderId = "69";
        if (orderId) {
            setTimeout(function () {
                resolve(orderId)
            }, 5000);
        }
    })
}
function validatecart(cart) {
    return true
}

*/
// function createOrder() {
//     return new Promise((resolve, reject) => {
//         let success = true;
//         setTimeout(() => {
//             if (success) {
//                 resolve("Order created successfully.");
//             } else {
//                 reject("Error in createOrder stage.");
//             }
//         }, 2000);

//     });
// }

// function proceedToPayment() {
//     return new Promise((resolve, reject) => {
//         let success = true;
//         if (success) {
//             resolve("Payment processed successfully.");
//         } else {
//             reject("Error in proceedToPayment stage.");
//         }
//     });
// }

// function showOrderSummary() {
//     return new Promise((resolve, reject) => {
//         let success = true;
//         if (success) {
//             resolve("Order summary displayed successfully.");
//         } else {
//             reject("Error in showOrderSummary stage.");
//         }
//     });
// }

// function updateWallet() {
//     return new Promise((resolve, reject) => {
//         let success = true;
//         if (success) {
//             resolve("Wallet updated successfully.");
//         } else {
//             reject("Error in updateWallet stage.");
//         }
//     });
// }

// createOrder()
//     .then((message) => {
//         console.log(message);
//         return proceedToPayment();
//     })
//     .then((message) => {
//         console.log(message);
//         return showOrderSummary();
//     })
//     .then((message) => {
//         console.log(message);
//         return updateWallet();
//     })
//     .then((message) => {
//         console.log(message);
//     })
//     .catch((error) => {
//         console.error(error);
//     });

// const p = new Promise((resolve , reject ) => {
//     resolve("my name is hunain")
// })

// async function getdata() {
//     const data = await p
//     console.log(data)
// }
// getdata()

// const data = getdata()
// console.log(data)

// data.then((res) => console.log(res))

// const p1 =new Promise((resolve, reject) => {
//     setTimeout(() => {
//         resolve("ok and whats you father name?")
//     }, 10000);
// })

// const p2 =new Promise((resolve, reject) => {
//     setTimeout(() => {
//         resolve("good! , nice to meet you hunain")
//     }, 15000);
// })

// async function handlePromise() {
//     console.log("hello world")

//     const val = await p1
//     console.log("my name is hunain")
//     console.log(val)

//     const val2 = await p2
//     console.log(" my father name is asif")
//     console.log(val2)
// }

// handlePromise();




// setTimeout(() => {
//   console.log("run");
// }, 3000);
