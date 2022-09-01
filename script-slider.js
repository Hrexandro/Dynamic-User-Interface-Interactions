//move also central images
//add further images
//make the movement faster for jumping to farther images using navigation-dots
//^ code the above using differene between currentlyDisplayedImage and the image to be displayed, and run th function the appropriate number of times


function removeAllChildren(element) {
    let counter = element.children.length;
    for (let m = 0; m <= counter; m++) {
        if (element.children[0]) {
            element.children[0].remove();
        }
    }
}

let direction = 'forward'

function startAutoView () {
    setTimeout(function() {
        if (currentlyDisplayedImage === 0){
            direction = 'forward'
        } else if (currentlyDisplayedImage>=images.length-1) {
            direction = 'backward'
        }
        if (direction === 'forward'){
            //currentlyDisplayedImage++
            updateImage(currentlyDisplayedImage+1)
        } else if (direction === 'backward'){
            //currentlyDisplayedImage--
            updateImage(currentlyDisplayedImage-1)
        }
        startAutoView()
          }, 5000);
}

function updateImage (imageNumber){    

    function displayNewImageInFrame () {

        Array.from(document.getElementsByClassName('navigation-dot')).forEach((dot)=>{
            dot.classList.remove('current-dot')
        })
        //displayPreviousAndNextImage()
        displayPreviousOrNextImage('previous', imageNumber)
        displayPreviousOrNextImage('next', imageNumber)
        let image = `images/${images[imageNumber]}`
        const frame = document.getElementById("frame")
        removeAllChildren(frame)
        let imageElement = document.createElement('img')
        imageElement.setAttribute('id', 'current-image')
        imageElement.setAttribute('src', image)
        frame.appendChild(imageElement)
        console.log(imageNumber)
        document.getElementById(imageNumber).classList.add('current-dot')

        currentlyDisplayedImage = imageNumber
    }

    // displayAnotherImageFurtherDownTheListUnderTheNextOrPreviousOne ('next')//these have to appear before so there is something under when animation happens
    // displayAnotherImageFurtherDownTheListUnderTheNextOrPreviousOne ('previous')
    let changes = 0
    if (currentlyDisplayedImage !== imageNumber){
        changes = Math.abs(imageNumber-currentlyDisplayedImage)// make it into a loop taking into account the number of changes

        setTimeout(function() {
            displayNewImageInFrame()
            document.getElementById('next-image').classList.remove('moved-next-image')
            document.getElementById('previous-image').classList.remove('moved-previous-image')
      }, 1900);

    } else {
        displayNewImageInFrame()
    }
}

let currentlyDisplayedImage = 0
const images = ['1.png','2.png','3.png','4.png','5.png']



const previousButton = document.getElementById('previous')
const nextButton = document.getElementById('next')
const previousImageFrame = document.getElementById('previous-image-frame')
const nextImageFrame = document.getElementById('next-image-frame')
let nextImage = document.getElementById('next-image')
let previousImage = document.getElementById('previous-image')

// function crementImageAndApplyProperAnimationClass (isTheDirectionForward) {//this is not currently used
//     isTheDirectionForward
//     ? (currentlyDisplayedImage++,
//       document.getElementById('next-image').classList.add('moved-next-image'),
//       document.getElementById('previous-image').classList.add('moved-next-image'))
//     : (currentlyDisplayedImage--,
//       document.getElementById('previous-image').classList.add('moved-previous-image'),
//       document.getElementById('next-image').classList.add('moved-previous-image'))
// }

previousButton.addEventListener('click',()=>{
    if (currentlyDisplayedImage>0){
        document.getElementById('previous-image').classList.add('moved-previous-image')
        document.getElementById('next-image').classList.add('moved-previous-image')
        //currentlyDisplayedImage--
        updateImage(currentlyDisplayedImage-1)
    }
})
nextButton.addEventListener('click',()=>{
    if (currentlyDisplayedImage<images.length-1){
        document.getElementById('next-image').classList.add('moved-next-image')
        document.getElementById('previous-image').classList.add('moved-next-image')
        //currentlyDisplayedImage++
        updateImage(currentlyDisplayedImage+1)
    }
})

function displayPreviousOrNextImage (whichOne, number) {//'next' or 'previous', number of image to be displayed
    let frameOfImageToBeDisplayed = document.getElementById(`${whichOne}-image-frame`)
    if (document.getElementById(`${whichOne}-image`)){
        document.getElementById(`${whichOne}-image`).remove()
    }
    let imageToBeDisplayed = document.createElement('img')
    imageToBeDisplayed.setAttribute('id', `${whichOne}-image`)

    if (whichOne === 'previous'){
        if (number === 0){// show hidden so that their position stays the same regardless of displaying
            imageToBeDisplayed.setAttribute('class', 'hidden')
        }
        else {
            imageToBeDisplayed.setAttribute('src', `images/${images[number-1]}`)
        }
    } else {// so next
        if (number>=images.length-1){
            imageToBeDisplayed.setAttribute('class', 'hidden')
        } else {
            imageToBeDisplayed.setAttribute('src', `images/${images[number+1]}`)
        }
    }
    frameOfImageToBeDisplayed.appendChild(imageToBeDisplayed)
}

// function displayAnotherImageFurtherDownTheListUnderTheNextOrPreviousOne (whichOne) {//'next' or 'previous' - the image itself will be next-next or previous-previous
//     let frameOfImageToBeDisplayed = document.getElementById(`${whichOne}-image-frame`)
//     if (document.getElementById(`${whichOne}-${whichOne}-image`)){
//         document.getElementById(`${whichOne}-${whichOne}-image`).remove()
//     }
//     let imageToBeDisplayed = document.createElement('img')
//     imageToBeDisplayed.setAttribute('id', `${whichOne}-${whichOne}-image`)
//     if (whichOne === 'previous'){//previous-previous
//         if (currentlyDisplayedImage === 0){// show hidden so that their position stays the same regardless of displaying
//             imageToBeDisplayed.setAttribute('class', 'hidden')
//         }
//         else {
//             imageToBeDisplayed.setAttribute('src', `images/${images[currentlyDisplayedImage-2]}`)
//         }
//     } else if (whichOne === 'next'){//next-next
//         if (currentlyDisplayedImage>=images.length-2){
//             imageToBeDisplayed.setAttribute('class', 'hidden')
//         } else {
//             imageToBeDisplayed.setAttribute('src', `images/${images[currentlyDisplayedImage+2]}`)
//         }
//     }
//     frameOfImageToBeDisplayed.prepend(imageToBeDisplayed)

// }

function createNavigationDots () {
    for (let i = 0; i < images.length; i++){
        let navigationDot = document.createElement('div')
        navigationDot.classList.add('navigation-dot')
        navigationDot.setAttribute('id', `${i}`)
        document.getElementById('navigation-dots-container').appendChild(navigationDot)
        navigationDot.addEventListener('click',()=>{
            updateImage(i)
        })

    }

}

createNavigationDots()
displayPreviousOrNextImage('previous', currentlyDisplayedImage-1)
displayPreviousOrNextImage('next', currentlyDisplayedImage+1)
updateImage(currentlyDisplayedImage, 0)
// startAutoView()


