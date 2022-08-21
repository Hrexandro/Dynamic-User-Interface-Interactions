function removeAllChildren(element) {
    let counter = element.children.length;
    for (let m = 0; m <= counter; m++) {
        if (element.children[0]) {
            element.children[0].remove();
        }
    }
}

function updateImage (imageNumber){
  let image = `images/${images[imageNumber]}`
  const frame = document.getElementById("frame")
  removeAllChildren(frame)
  let imageElement = document.createElement('img')
  imageElement.setAttribute('id', 'current-image')
  imageElement.setAttribute('src', image)
  frame.appendChild(imageElement)

  displayPreviousAndNextImage()
}

let currentlyDisplayedImage = 0
const images = ['1.png','2.png','3.png','4.png','5.png']

updateImage(currentlyDisplayedImage)

const previousButton = document.getElementById('previous')
const nextButton = document.getElementById('next')

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
    if (document.getElementById('next-image')){
        document.getElementById('next-image').remove()
    }
    if (document.getElementById('previous-image')){
        document.getElementById('previous-image').remove()
    }
    const previousImage = document.createElement('img')
    previousImage.setAttribute('id', 'previous-image')

    if (currentlyDisplayedImage === 0){//show hidden so that their position stays the same regardless of displaying
        previousImage.setAttribute('src', `images/${images[currentlyDisplayedImage]}`)
        previousImage.setAttribute('class', 'hidden')
    } else {
        previousImage.setAttribute('src', `images/${images[currentlyDisplayedImage-1]}`)
    }
    document.getElementById('images').appendChild(previousImage)
    
    const nextImage = document.createElement('img')
    nextImage.setAttribute('id', 'next-image')

    if (currentlyDisplayedImage>=images.length-1){
        console.log('runs')
        nextImage.setAttribute('src', `images/${images[currentlyDisplayedImage]}`)
        nextImage.setAttribute('class', 'hidden')
    } else {
        nextImage.setAttribute('src', `images/${images[currentlyDisplayedImage+1]}`)
    }
    document.getElementById('images').appendChild(nextImage)
}

displayPreviousAndNextImage()


