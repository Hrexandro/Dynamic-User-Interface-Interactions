//make buttons inactive if animation is in progress
//make it handle drags on mobile



function removeAllChildren(element) {
    let counter = element.children.length;
    for (let m = 0; m <= counter; m++) {
        if (element.children[0]) {
            element.children[0].remove();
        }
    }
}

let direction = 'forward'
let animationInProgress = false

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

let finalTargetImage = null

function updateImage (imageNumber){   
    console.log("update image runs with "+imageNumber+ ' as imageNumber, currentlyDisplayedImage is '+currentlyDisplayedImage)
    let startingImage = currentlyDisplayedImage
    if (imageNumber < startingImage){
        console.log('animating moving backward')
        animateMovingBackward()
    } else if (imageNumber > startingImage){
        console.log('animating moving forward')
        animateMovingForward()
    }

    function animateMovingForward(){
        animationInProgress = true
        document.getElementById('next-image').classList.add('moved-next-image')
        document.getElementById('current-image').classList.add('moved-next-image')
        document.getElementById('previous-image').classList.add('moved-next-image')
        document.getElementById('outside-next-next-image').setAttribute('id', 'next-next-image')
        
        //document.getElementById('next-next-image').classList.add('moved-next-image')
    }

    function animateMovingBackward(){
        animationInProgress = true
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
        console.log('displayed image is '+displayedImageNumber)
        document.getElementById(displayedImageNumber).classList.add('current-dot')
        console.log(document.getElementById(displayedImageNumber))
        console.log('currentlyDisplayedImage is '+currentlyDisplayedImage+' and now will be '+ displayedImageNumber)
        currentlyDisplayedImage = displayedImageNumber
    }

    if (finalTargetImage !== null){
        console.log("there is a finalTargetImage, startingImage is "+startingImage)
        if (finalTargetImage > startingImage){//forward
            setTimeout(function() {
                console.log('forward timeout Starts with startingimage as' + startingImage)
                displayNewImageInFrame(startingImage+1)
                document.getElementById('next-image').classList.remove('moved-next-image')
                document.getElementById('previous-image').classList.remove('moved-previous-image')
                    setTimeout(function() {
                        updateImage(finalTargetImage)
                        }, 100);
                }, 900);
        } else if (finalTargetImage < startingImage){//backward
            setTimeout(function() {
                displayNewImageInFrame(startingImage-1)
                document.getElementById('next-image').classList.remove('moved-next-image')
                document.getElementById('previous-image').classList.remove('moved-previous-image')
                    setTimeout(function() {
                        updateImage(finalTargetImage)
                    }, 100);
                }, 900);
        }
         else {//all the moves have been done, clear finalTargetImage
            console.log('final iteration, just clear')
            setTimeout(function() {
                console.log("the timeout resetting finalTargetImage runs")

                finalTargetImage = null //reset
                animationInProgress = false
                }, 900);
        }

    } else if (currentlyDisplayedImage !== imageNumber){//moving by one position
        console.log("there is no finalTargetImage - just moving one at a time")
        finalTargetImage = null //reset after moving
            setTimeout(function() {
            displayNewImageInFrame(imageNumber)
            document.getElementById('next-image').classList.remove('moved-next-image')
            document.getElementById('previous-image').classList.remove('moved-previous-image')
            animationInProgress = false
            }, 900);
    } else {//starting state
        console.log('starting display')
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
    if (currentlyDisplayedImage>0 && !animationInProgress){
        console.log("previous image button clicked")
        updateImage(currentlyDisplayedImage-1)
    }
})
nextButton.addEventListener('click',()=>{
    if (currentlyDisplayedImage<images.length-1 && !animationInProgress){
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
        } else {
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

function createNavigationDots () {
    for (let i = 0; i < images.length; i++){
        let navigationDot = document.createElement('div')
        navigationDot.classList.add('navigation-dot')
        navigationDot.setAttribute('id', `${i}`)
        document.getElementById('navigation-dots-container').appendChild(navigationDot)
        navigationDot.addEventListener('click',()=>{
            if (!animationInProgress){
                finalTargetImage = i
                console.log('finalTargetImage is '+finalTargetImage)
                updateImage(i)
            }
        })

    }

}

createNavigationDots()
displayPreviousOrNextImage('previous', currentlyDisplayedImage)
displayPreviousOrNextImage('next', currentlyDisplayedImage)
updateImage(currentlyDisplayedImage, 0)
//startAutoView()