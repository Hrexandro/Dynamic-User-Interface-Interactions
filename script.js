function menuButtonBehaviour (activatingButton, linkContainer){
    activatingButton.addEventListener('click', ()=>{
      Array.from(linkContainer.children).forEach((item)=>{
          item.classList.toggle('invisible') 
      })
    })
}

menuButtonBehaviour(document.getElementById('button1'), document.getElementById('list1'))