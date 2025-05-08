const btn = document.querySelector('button');

function trackUserHandler() {
    // this is offloaded to the browser and is sent to the message queue after completion, while the code execution moves on to the next task. The event loop now sees the message queue and pushed any to-do tasks to the stack once the stack is empty.
    navigator.geolocation.getCurrentPosition(
        (posData) => {
        setTimeout(() => {
            console.log(posData);
        },2000)
    }, (error) => {
        console.log(error);
    }, {
        enableHighAccuracy: true
    });
    setTimeout(() => {
        console.log('timer Done');
    }, 2000)
    console.log(' Gettting Position data....1'); // prints first,
    console.log(' Gettting Position data....2'); // prints first,
    console.log(' Gettting Position data....3'); // prints first,
}

btn.addEventListener('click', trackUserHandler);

// const greet = () => {
//     console.log('hi');
// };

// const showAlert = () => {
//     alert('Danger!!');
// };

// setTimeout(showAlert, 3000);

// greet();