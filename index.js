// import axios from "axios";
import * as Carousel from "./Carousel.js";
// import axios from "axios";

// The breed selection input element.
const breedSelected = document.getElementById("breedSelected");
// The information section div element.
const infoDump = document.getElementById("infoDump");
// The progress bar div element.
const progressBar = document.getElementById("progressBar");
// The get favourites button element.
const getFavouritesBtn = document.getElementById("getFavouritesBtn");

// Step 0: Store your API key here for reference and easy access
const url = `https://api.thecatapi.com/v1/breeds`;
const API_KEY = "live_EGbzb0OYYbgmBwH76vL1d92AMdqXGhvYplVPMOLhzP4jaoL5kl9jEeCT9ySCxAOs"

/**
 * 1. Create an async function "initialLoad" that does the following:
 * - Retrieve a list of breeds from the cat API using fetch().
 * - Create new <options> for each of these breeds, and append them to breedSelect.
 *  - Each option should have a value attribute equal to the id of the breed.
 *  - Each option should display text equal to the name of the breed.
 * This function should execute immediately.
 */

// async function initialLoad() {

//   const response = await fetch(url, {
//     headers: {
//       'x-api-key': API_KEY 
//     }
//   })
//   const catBreed = await response.json();
//   // console.log(catBreed)

//   for (let i = 0; i < catBreed.length; i++) {
//     const breedId = catBreed[i].id
//     const breedName = catBreed[i].name
//     const options = document.createElement('option')
//     options.setAttribute("value", breedId)
//     options.textContent = breedName
//     breedSelect.appendChild(options)
//   }
// }
// initialLoad()

/**
 * 2. Create an event handler for breedSelect that does the following:
 * - Retrieve information on the selected breed from the cat API using fetch().
 *  - Make sure your request is receiving multiple array items!
 *  - Check the API documentation if you're only getting a single object.
 * - For each object in the response array, create a new element for the carousel.
 *  - Append each of these new elements to the carousel.
 * - Use the other data you have been given to create an informational section within the infoDump element.
 *  - Be creative with how you create DOM elements and HTML.
 *  - Feel free to edit index.html and styles.css to suit your needs, but be careful!
 *  - Remember that functionality comes first, but user experience and design are important.
 * - Each new selection should clear, re-populate, and restart the Carousel.
 * - Add a call to this function to the end of your initialLoad function above to create the initial carousel.
 */

//  breedSelect.addEventListener("change", selectedBreed)

// async function selectedBreed(e) {
//     Carousel.clear()

//     const selectElement = e.target;
//     // console.log(`breed target: ${e.target}`)
//     const selectedValue = selectElement.value;
//     // console.log(selectedValue);

//     const response = await fetch(url, {
//         headers: {
//             'x-api-key': API_KEY
//         }
//     })
//     const catBreed = await response.json();
//     // console.log(catBreed)

//     for (let i = 0; i < catBreed.length; i++) {
//         const breedId = catBreed[i].id
//         if (breedId == selectedValue) {
//             const imgSrc = catBreed[i].image.url
//             const imgAlt = catBreed[i].name
//             const imgId = catBreed[i].image.id
//             const element = Carousel.createCarouselItem(imgSrc, imgAlt, imgId)
//             Carousel.appendCarousel(element)
//             infoDump.innerHTML = catBreed[i].description
//         }

//     }
//     Carousel.start()
// }

/**
 * 3. Fork your own sandbox, creating a new one named "JavaScript Axios Lab."
 */
/**
 * 4. Change all of your fetch() functions to axios!
 * - axios has already been imported for you within index.js.
 * - If you've done everything correctly up to this point, this should be simple.
 * - If it is not simple, take a moment to re-evaluate your original code.
 * - Hint: Axios has the ability to set default headers. Use this to your advantage
 *   by setting a default header with your API key so that you do not have to
 *   send it manually with all of your requests! You can also set a default base URL!
 */
async function initialLoadAxios() {

  const response = await axios.get(url, {
    headers: {
      'x-api-key': API_KEY
    }
  })
  const catBreed = response.data;
  // console.log(catBreed)

  for (let i = 0; i < catBreed.length; i++) {
    const breedId = catBreed[i].id
    const breedName = catBreed[i].name
    const options = document.createElement('option')
    options.setAttribute("value", breedId)
    options.textContent = breedName
    breedSelected.appendChild(options)
  }
}
initialLoadAxios()


breedSelected.addEventListener("change", selectedBreedAxios)

async function selectedBreedAxios(e) {
  Carousel.clear()

  const selectElement = e.target;
  // console.log(`breed target: ${e.target}`)
  const selectedValue = selectElement.value;
  // console.log(selectedValue);

  const response = await axios.get(url, {
    headers: {
      'x-api-key': API_KEY
    }
  })
  const catBreed = response.data;
  // console.log(catBreed)

  for (let i = 0; i < catBreed.length; i++) {
    const breedId = catBreed[i].id
    if (breedId == selectedValue) {
      const imgSrc = catBreed[i].image.url
      const imgAlt = catBreed[i].name
      const imgId = catBreed[i].image.id
      const element = Carousel.createCarouselItem(imgSrc, imgAlt, imgId)
      Carousel.appendCarousel(element)
      infoDump.innerHTML = catBreed[i].description
    }

  }
  Carousel.start()
}



/**
 * 5. Add axios interceptors to log the time between request and response to the console.
 * - Hint: you already have access to code that does this!
 * - Add a console.log statement to indicate when requests begin.
 * - As an added challenge, try to do this on your own without referencing the lesson material.
 */

axios.interceptors.request.use(req => {
  req.meta = req.meta || {}
  req.meta.requestStartedAt = new Date().getTime();
  console.log(req)
  progressBar.style.width = '0%';
  document.body.style.cursor = 'progress';
  return req;
});




/**
 * 6. Next, we'll create a progress bar to indicate the request is in progress.
 * - The progressBar element has already been created for you.
 *  - You need only to modify its "width" style property to align with the request progress.
 * - In your request interceptor, set the width of the progressBar element to 0%.
 *  - This is to reset the progress with each request.
 * - Research the axios onDownloadProgress config option.
 * - Create a function "updateProgress" that receives a ProgressEvent object.
 *  - Pass this function to the axios onDownloadProgress config option in your event handler.
 * - console.log your ProgressEvent object within updateProgess, and familiarize yourself with its structure.
 *  - Update the progress of the request using the properties you are given.
 * - Note that we are not downloading a lot of data, so onDownloadProgress will likely only fire
 *   once or twice per request to this API. This is still a concept worth familiarizing yourself
 *   with for future projects.
 */

function updateProgress(e) {
  console.log(e);

  if (e.lengthComputable) {
    const progress = e.loaded / e.total
    progressBar.style.width = progress + '%';
  }
}

axios.get(url, {
  headers: {
    'x-api-key': API_KEY
  },
  onDownloadProgress: updateProgress
})



/**
 * 7. As a final element of progress indication, add the following to your axios interceptors:
 * - In your request interceptor, set the body element's cursor style to "progress."
 * - In your response interceptor, remove the progress cursor style from the body element.
 */

axios.interceptors.response.use(response => {

  document.body.style.cursor = '';
  return response;
})
/**
 * 8. To practice posting data, we'll create a system to "favourite" certain images.
 * - The skeleton of this function has already been created for you.
 * - This function is used within Carousel.js to add the event listener as items are created.
 *  - This is why we use the export keyword for this function.
 * - Post to the cat API's favourites endpoint with the given ID.
 * - The API documentation gives examples of this functionality using fetch(); use Axios!
 * - Add additional logic to this function such that if the image is already favourited,
 *   you delete that favourite using the API, giving this function "toggle" functionality.
 * - You can call this function by clicking on the heart at the top right of any image.
 */

// const API_URL = `https://api.thecatapi.com/v1/votes/`;
const API_URL = 'https://api.thecatapi.com/v1/favourites/';

export async function isFavourited(catId) { 
  const response = await axios.get(API_URL, {
    headers: {
      'x-api-key': API_KEY
    }
  });

  const getFavourites = response.data;
  // console.log(getFavourites)

    const favourite = getFavourites.find(({ image_id }) => image_id === catId);
    return favourite ? favourite.id : null;
  
}
// const favouriteId = await isFavourited('hBXicehMA');
// console.log(favouriteId)

export async function favourite(imgId) {
  // your code here

  try {
      const favouriteId = await isFavourited(imgId);
      console.log(favouriteId)
      const ChangeColorFavouriteButton = document.querySelector('.favourite-button svg')
      

       if (favouriteId) {
        // If already favourited delete the favourite
        await axios.delete(`${API_URL}${favouriteId}`, { 
          headers: {
            'x-api-key': API_KEY
          }
        });
     
        ChangeColorFavouriteButton.setAttribute('fill', 'lightpink');
      } else {
    // If not favourited, add to favourites
    await axios.post(`${API_URL}`, {
      image_id: imgId
    }, {
      headers: {
        'x-api-key': API_KEY,
        'Content-Type': 'application/json'
      }
    });
  
    ChangeColorFavouriteButton.setAttribute('fill', 'red');   
  }
  } catch (err) {
    console.error('Error adding to favourites:', err);
   }

  // console.log(`Image ${imgId} marked as favourite.`);
}

/**
 * 9. Test your favourite() function by creating a getFavourites() function.
 * - Use Axios to get all of your favourites from the cat API.
 * - Clear the carousel and display your favourites when the button is clicked.
 *  - You will have to bind this event listener to getFavouritesBtn yourself.
 *  - Hint: you already have all of the logic built for building a carousel.
 *    If that isn't in its own function, maybe it should be so you don't have to
 *    repeat yourself in this section.
 */

 getFavouritesBtn.addEventListener('click', getFavourites)
async function getFavourites(){

  // const favouriteId = await isFavourited(imgId);
  Carousel.clear()
  
  const response = await axios.get(API_URL, {
    headers: {
      'x-api-key': API_KEY
    }
  })
  const getFavourites = response.data;
  // console.log(getFavourites) 
  
  for (let i = 0; i < getFavourites.length; i++) {
      const imgSrc = getFavourites[i].image.url
      const imgAlt = ''
      const imgId = getFavourites[i].image.id
      const element = Carousel.createCarouselItem(imgSrc, imgAlt, imgId)
      Carousel.appendCarousel(element)
    
}

}

/**
 * 10. Test your site, thoroughly!
 * - What happens when you try to load the Malayan breed?
 *  - If this is working, good job! If not, look for the reason why and fix it!
 * - Test other breeds as well. Not every breed has the same data available, so
 *   your code should account for this.
 */
