// const menuButtonBehaviour = (function () {
//   const menuButton = document.getElementById('menu-button')
//   const linkContainer = document.getElementById('link-list')
//   menuButton.addEventListener('click', ()=>{
//     Array.from(linkContainer.children).forEach((item)=>{
//         item.classList.toggle('invisible') 

//     })
//   })
// })()

function menuButtonBehaviour (activatingButton, linkContainer){
    activatingButton.addEventListener('click', ()=>{
      Array.from(linkContainer.children).forEach((item)=>{
          item.classList.toggle('invisible') 
      })
    })
}

menuButtonBehaviour(document.getElementById('button1'), document.getElementById('list1'))
menuButtonBehaviour(document.getElementById('button2'), document.getElementById('list2'))