function removeAllChildren(element) {
    let counter = element.children.length;
    for (let m = 0; m <= counter; m++) {
        if (element.children[0]) {
            element.children[0].remove();
        }
    }
}

let firstTime = true
let direction = 'forward'


function startAutoView () {
    setTimeout(function() {
        if (currentlyDisplayedImage === 0){
            direction = 'forward'
        } else if (currentlyDisplayedImage>=images.length-1) {
            direction = 'backward'
        }
        if (direction === 'forward'){
            currentlyDisplayedImage++
            updateImage(currentlyDisplayedImage)
        } else if (direction === 'backward'){
            currentlyDisplayedImage--
            updateImage(currentlyDisplayedImage)
        }
        startAutoView()
          }, 5000);
}

function updateImage (imageNumber){    
    function displayNewImageInFrame () {
        //displayPreviousAndNextImage()
        displayPreviousOrNextImage('previous')
        displayPreviousOrNextImage('next')
        let image = `images/${images[imageNumber]}`
        const frame = document.getElementById("frame")
        removeAllChildren(frame)
        let imageElement = document.createElement('img')
        imageElement.setAttribute('id', 'current-image')
        imageElement.setAttribute('src', image)
        frame.appendChild(imageElement)
    }

    displayAnotherImageFurtherDownTheListUnderTheNextOrPreviousOne ('next')//these have to appear before so there is something under when animation happens
    displayAnotherImageFurtherDownTheListUnderTheNextOrPreviousOne ('previous')

    // if (firstTime){
         displayNewImageInFrame()
    // } else {
    //     setTimeout(function() {
    //         displayNewImageInFrame()
    //   }, 900);
    // }
    // firstTime = false
}

let currentlyDisplayedImage = 0
const images = ['1.png','2.png','3.png','4.png','5.png']



const previousButton = document.getElementById('previous')
const nextButton = document.getElementById('next')
const previousImageFrame = document.getElementById('previous-image-frame')
const nextImageFrame = document.getElementById('next-image-frame')
let nextImage = document.getElementById('next-image')
let previousImage = document.getElementById('previous-image')

previousButton.addEventListener('click',()=>{
    if (currentlyDisplayedImage>0){
        currentlyDisplayedImage--
        updateImage(currentlyDisplayedImage)
    }
})
nextButton.addEventListener('click',()=>{
    if (currentlyDisplayedImage<images.length-1){
        currentlyDisplayedImage++
        updateImage(currentlyDisplayedImage)
    }
})

function displayPreviousOrNextImage (whichOne) {//'next' or 'previous'
    let frameOfImageToBeDisplayed = document.getElementById(`${whichOne}-image-frame`)
    if (document.getElementById(`${whichOne}-image`)){
        document.getElementById(`${whichOne}-image`).remove()
    }
    let imageToBeDisplayed = document.createElement('img')
    imageToBeDisplayed.setAttribute('id', `${whichOne}-image`)

    if (whichOne === 'previous'){
        if (currentlyDisplayedImage === 0){// show hidden so that their position stays the same regardless of displaying
            imageToBeDisplayed.setAttribute('class', 'hidden')
        }
        else {
            imageToBeDisplayed.setAttribute('src', `images/${images[currentlyDisplayedImage-1]}`)
        }
    } else {// so next
        if (currentlyDisplayedImage>=images.length-1){
            imageToBeDisplayed.setAttribute('class', 'hidden')
        } else {
            imageToBeDisplayed.setAttribute('src', `images/${images[currentlyDisplayedImage+1]}`)
        }
    }
    frameOfImageToBeDisplayed.appendChild(imageToBeDisplayed)
}

function displayAnotherImageFurtherDownTheListUnderTheNextOrPreviousOne (whichOne) {//'next' or 'previous' - the image itself will be next-next or previous-previous
    let frameOfImageToBeDisplayed = document.getElementById(`${whichOne}-image-frame`)
    if (document.getElementById(`${whichOne}-${whichOne}-image`)){
        document.getElementById(`${whichOne}-${whichOne}-image`).remove()
    }
    let imageToBeDisplayed = document.createElement('img')
    imageToBeDisplayed.setAttribute('id', `${whichOne}-${whichOne}-image`)
    if (whichOne === 'previous'){//previous-previous
        if (currentlyDisplayedImage === 0){// show hidden so that their position stays the same regardless of displaying
            imageToBeDisplayed.setAttribute('class', 'hidden')
        }
        else {
            imageToBeDisplayed.setAttribute('src', `images/${images[currentlyDisplayedImage-2]}`)
        }
    } else if (whichOne === 'next'){//next-next
        if (currentlyDisplayedImage>=images.length-2){
            imageToBeDisplayed.setAttribute('class', 'hidden')
        } else {
            imageToBeDisplayed.setAttribute('src', `images/${images[currentlyDisplayedImage+2]}`)
        }
    }
    frameOfImageToBeDisplayed.prepend(imageToBeDisplayed)

}

displayPreviousOrNextImage('previous')
displayPreviousOrNextImage('next')
updateImage(currentlyDisplayedImage)
startAutoView()


