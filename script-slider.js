function removeAllChildren(element) {
    let counter = element.children.length;
    for (let m = 0; m <= counter; m++) {
        if (element.children[0]) {
            element.children[0].remove();
        }
    }
}

function putImageInFrame (imageNumber){
  let image = `images/${images[imageNumber]}`
  const frame = document.getElementById("frame")
  removeAllChildren(frame)
  let imageElement = document.createElement('img')
  imageElement.setAttribute('id', 'current-image')
  imageElement.setAttribute('src', image)
  frame.appendChild(imageElement)
}

let currentlyDisplayedImage = 0
const images = ['1.png','2.png','3.png','4.png','5.png']

putImageInFrame(currentlyDisplayedImage)

const previousButton = document.getElementById('previous')
const nextButton = document.getElementById('next')

function changeImage (newImage){
    putImageInFrame (newImage)
}

previousButton.addEventListener('click',()=>{
    if (currentlyDisplayedImage>0){
        currentlyDisplayedImage--
        putImageInFrame(currentlyDisplayedImage)
    }
})
nextButton.addEventListener('click',()=>{
    if (currentlyDisplayedImage<images.length-1){
        currentlyDisplayedImage++
        putImageInFrame(currentlyDisplayedImage)
    }
})


