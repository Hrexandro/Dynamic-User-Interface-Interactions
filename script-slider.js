function removeAllChildren(element) {
    let counter = element.children.length;
    for (let m = 0; m <= counter; m++) {
        if (element.children[0]) {
            element.children[0].remove();
        }
    }
}

let firstTime = true

function updateImage (imageNumber){
    //document.getElementById('next-image').setAttribute('class', 'moved-next-image')

    function displayNewImageInFrame () {
        displayPreviousAndNextImage()
        let image = `images/${images[imageNumber]}`
        const frame = document.getElementById("frame")
        removeAllChildren(frame)
        let imageElement = document.createElement('img')
        imageElement.setAttribute('id', 'current-image')
        imageElement.setAttribute('src', image)
        frame.appendChild(imageElement)
    }

    // if (firstTime){
         displayNewImageInFrame()
    // } else {
    //     setTimeout(function() {
    //         displayNewImageInFrame ()
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

function displayPreviousAndNextImage () {
    let previousImageFrame = document.getElementById('previous-image-frame')
    let nextImageFrame = document.getElementById('next-image-frame')
    if (document.getElementById('next-image')){
        document.getElementById('next-image').remove()
    }
    if (document.getElementById('previous-image')){
        document.getElementById('previous-image').remove()
    }
    const previousImage = document.createElement('img')
    previousImage.setAttribute('id', 'previous-image')

    if (currentlyDisplayedImage === 0){//show hidden so that their position stays the same regardless of displaying
        previousImage.setAttribute('class', 'hidden')
        previousImage.setAttribute('src', `images/${images[currentlyDisplayedImage]}`)
    } else {
        previousImage.setAttribute('src', `images/${images[currentlyDisplayedImage-1]}`)
    }
    previousImageFrame.appendChild(previousImage)
    
    const nextImage = document.createElement('img')
    nextImage.setAttribute('id', 'next-image')

    if (currentlyDisplayedImage>=images.length-1){
        console.log('runs')
        nextImage.setAttribute('class', 'hidden')
        nextImage.setAttribute('src', `images/${images[currentlyDisplayedImage]}`)
    } else {
        nextImage.setAttribute('src', `images/${images[currentlyDisplayedImage+1]}`)
    }
    nextImageFrame.appendChild(nextImage)


}

// function applyAnimation () {
//     setTimeout(function() {
//         nextImage.setAttribute('class', 'moved-next-image')
//         nextImage.setAttribute('class', 'moved-next-image')
//     }, 900);
// }

displayPreviousAndNextImage()
updateImage(currentlyDisplayedImage)


