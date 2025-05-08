const listElement = document.querySelector(".posts");
const postTemplate = document.getElementById("single-post");
const form = document.querySelector('#new-post form');
const fetchButton = document.querySelector('#available-posts button');



// For a get request, we only need a method and url args for the request i.e args for open(method, url).
// For a post request we also need to add a data arg that we want to create on the outgoing request of POST (handled by the .send() method).
function sendHttpRequest(method, url, data) {
  // const promise = new Promise((resolve, reject) => {
  //   const xhr = new XMLHttpRequest();

  //   xhr.open(method, url);

  //   xhr.responseType = "json";
  //   xhr.onload = function () {
  //     if(xhr.status >= 200 && xhr.status < 300) {
  //     resolve(xhr.response); // response data
  //     } else {
  //       reject(new Error(`something went wrong: , ${xhr.status}`))
  //     }
      
  //   };

  //   xhr.onerror = function() {
  //     reject(new Error('Failed to send request, Network issue'));
  //   }

  //   // this is what handles the send request, if no args, the method acts as a GET Option and if args are given then thats the content going for a POST method
  //   xhr.send(JSON.stringify(data));
  // });
  // return promise;

  // Is itself promise based.
  return fetch(url, {
    method: method,
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json"
    }
  }); // handle the response here with .then(response => response.json() OR in the async function 
}

// Getting data from the server. No body needed since its only a GET request
async function fetchPost() {
  let responseData;
  try {
    const unparsedresponseData = await sendHttpRequest("GET","https://jsonplaceholder.typicode.com/posts");
    console.log(unparsedresponseData);

    if(unparsedresponseData.ok) {
      responseData = await unparsedresponseData.json(); 
    } else {
      let errorData = null;
      try {
        errorData = await unparsedresponseData.json();
      } catch(err) {
        console.log("ERROR parsing data");
      }
      throw new Error(`ERROR: ${unparsedresponseData.status}.
        ERROR DATA: ${JSON.stringify(errorData) || 'no additional data provided'}`);
    }
    console.log(responseData);
  } catch (err) {
    console.log(err.message);
    return -1;
  }

  const listOfPosts = responseData;
  if(listElement.children.length > 0) {
    listElement.innerHTML = '';
  }

  listOfPosts.forEach((p) => {
    const postEl = document.importNode(postTemplate.content, true);
    postEl.querySelector("h2").textContent = p.title.toUpperCase();
    postEl.querySelector("p").textContent = p.body;
    postEl.children[0].id = p.id; 
    listElement.append(postEl);
  });
}

// Adding data to the server
async function createPost(title, content) {
  const userId = Number((Math.random() * (10 - 1 + 1) + 1 ).toString().replace('.',''));
  const sinlgePost = {
    title: title,
    body: content,
    userId,
  };

  sendHttpRequest("POST", "https://jsonplaceholder.typicode.com/posts", sinlgePost);
}


// DOM handling Requests
fetchButton.addEventListener('click', fetchPost);
form.addEventListener('submit', event => {
  event.preventDefault();
  const enteredTitle = event.currentTarget.querySelector('#title').value.trim();
  const enteredContent = event.currentTarget.querySelector('#content').value.trim();
  createPost(enteredTitle, enteredContent);
})


listElement.addEventListener('click', (e) => {
  console.log(e);
  if(e.target.tagName === "BUTTON") {
    console.log('cliedk on btn');
    const postID = e.target.closest('li').id;
    liToDel = e.target.closest('li');
    liToDel.remove();
    sendHttpRequest("DELETE", `https://jsonplaceholder.typicode.com/posts/${postID}`);
    console.log("deleted post with ID: ", postID);
  }
});
