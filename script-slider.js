//remove imagelack errors
//make some kind of animation for when jumping multiple images at a time


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
    console.log("update image runs")
    let startingImage = currentlyDisplayedImage
    if (imageNumber < startingImage){
        animateMovingBackward()
    } else if (imageNumber > startingImage){
        animateMovingForward()
    }

    function animateMovingForward(){
        document.getElementById('next-image').classList.add('moved-next-image')
        document.getElementById('current-image').classList.add('moved-next-image')
        document.getElementById('previous-image').classList.add('moved-next-image')
        document.getElementById('outside-next-next-image').setAttribute('id', 'next-next-image')
        
        //document.getElementById('next-next-image').classList.add('moved-next-image')
    }

    function animateMovingBackward(){
        document.getElementById('previous-image').classList.add('moved-previous-image')
        document.getElementById('current-image').classList.add('moved-previous-image')
        document.getElementById('next-image').classList.add('moved-previous-image')
        //document.getElementById('previous-previous-image').classList.add('moved-previous-image')
        document.getElementById('outside-previous-previous-image').setAttribute('id', 'previous-previous-image')

    }

    
    function displayAnotherImageFurtherDownTheListUnderTheNextOrPreviousOne (whichOne, number) {//'next' or 'previous' - the image itself will be next-next or previous-previous
        let frameOfImageToBeDisplayed = document.getElementById(`${whichOne}-image-frame`)
        if (document.getElementById(`${whichOne}-${whichOne}-image`)){
            document.getElementById(`${whichOne}-${whichOne}-image`).remove()
        } else if (document.getElementById(`outside-${whichOne}-${whichOne}-image`)){
            document.getElementById(`outside-${whichOne}-${whichOne}-image`).remove()
        }

        let imageToBeDisplayed = document.createElement('img')
        imageToBeDisplayed.setAttribute('id', `outside-${whichOne}-${whichOne}-image`)
        //imageToBeDisplayed.setAttribute('id', `${whichOne}-${whichOne}-image`)
        if (whichOne === 'previous' && number > 1){//previous-previous
                imageToBeDisplayed.setAttribute('src', `images/${images[number-2]}`)
        } else if (whichOne === 'next' && number < (images.length-2)){//next-next
            imageToBeDisplayed.setAttribute('src', `images/${images[number+2]}`)
        } else (
            imageToBeDisplayed.setAttribute('class', 'hidden')
        )
        frameOfImageToBeDisplayed.prepend(imageToBeDisplayed)

    }

    function displayNewImageInFrame (displayedImageNumber) {
        console.log('displaying image '+displayedImageNumber)
        Array.from(document.getElementsByClassName('navigation-dot')).forEach((dot)=>{
            dot.classList.remove('current-dot')
        })
        //displayPreviousAndNextImage()
        displayPreviousOrNextImage('previous', displayedImageNumber)
        displayPreviousOrNextImage('next', displayedImageNumber)
        displayAnotherImageFurtherDownTheListUnderTheNextOrPreviousOne('previous', displayedImageNumber)
        displayAnotherImageFurtherDownTheListUnderTheNextOrPreviousOne('next', displayedImageNumber)
        let image = `images/${images[displayedImageNumber]}`
        const frame = document.getElementById("frame")
        removeAllChildren(frame)
        let imageElement = document.createElement('img')
        imageElement.setAttribute('id', 'current-image')
        imageElement.setAttribute('src', image)
        frame.appendChild(imageElement)
        console.log(displayedImageNumber)
        document.getElementById(displayedImageNumber).classList.add('current-dot')

        currentlyDisplayedImage = displayedImageNumber
    }

    // displayAnotherImageFurtherDownTheListUnderTheNextOrPreviousOne ('next')//these have to appear before so there is something under when animation happens
    // displayAnotherImageFurtherDownTheListUnderTheNextOrPreviousOne ('previous')
    //let changes = Math.abs(imageNumber-currentlyDisplayedImage)

    let changes = imageNumber-currentlyDisplayedImage //going forward is positive, going backwards is negative number
    if (currentlyDisplayedImage !== imageNumber){
        console.log(currentlyDisplayedImage !== imageNumber)
        console.log('changes is'+changes)
        if (changes < -1){//backwards
            for (let k = 0; k >= changes; k--){
                    displayNewImageInFrame(startingImage-(-k))
                    document.getElementById('next-image').classList.remove('moved-next-image')
                    document.getElementById('previous-image').classList.remove('moved-previous-image')

            }

        } else if (changes > 1){//forward
            for (let k = 0; k <= changes; k++){
                    displayNewImageInFrame(startingImage+k)
                    document.getElementById('next-image').classList.remove('moved-next-image')
                    document.getElementById('previous-image').classList.remove('moved-previous-image')
            }
        } else {}
            setTimeout(function() {
            displayNewImageInFrame(imageNumber)
            document.getElementById('next-image').classList.remove('moved-next-image')
            document.getElementById('previous-image').classList.remove('moved-previous-image')

            }, 900);

    } else {//starting state
        displayNewImageInFrame(imageNumber)
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



previousButton.addEventListener('click',()=>{
    if (currentlyDisplayedImage>0){
        console.log("previous image button clicked")
        updateImage(currentlyDisplayedImage-1)
    }
})
nextButton.addEventListener('click',()=>{
    if (currentlyDisplayedImage<images.length-1){
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


