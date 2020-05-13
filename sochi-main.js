$(document).ready(function() { setTimeout(function() {
  const productIdStd = '1659'
  const productIdFam = '1660'
  const typeStandart = '4187142'
  const typeBusiness = '4187152'
  const typePremium = '4187154'

  let pricesEls = document.querySelectorAll('.price-from-db')
  let pricesArr = Array.prototype.slice.call(pricesEls)
  let newPrice
  
  function formatRoubleCurrency(item, style) {
    return new Intl.NumberFormat('ru-RU', {
       style: style ? style : 'currency',
      currency: 'RUB',
      minimumFractionDigits: 0
    }).format(Number(item))
   }
   
  pricesArr.forEach(function(item){
    newPrice = formatRoubleCurrency(parseInt(item.textContent), null)
    item.textContent = newPrice
  })

  let videoBtn = document.querySelector('.video-btn')
  videoBtn.addEventListener('click', delSecondVideo)

  function delSecondVideo() {
    let videoBlock = document.querySelector('.rec175178396')
    if (videoBlock) {
      videoBlock.parentNode.removeChild(videoBlock)
    }
  }

  let selectProgramm = document.querySelector('select[name = "programm"]')
  let selectRoom = document.querySelector('select[name = "room"]')
  let selectHotelroom = document.querySelector('select[name = "hotelroom"]')
  let selectAdd = document.querySelector('select[name = "add"]')
  let sumEl = document.querySelector('.sum')
  let finalSum
  let commentText
  let commentEl = document.querySelector('.comment')
  let typeEl = document.querySelector('.type')
  let productEl = document.querySelector('.product_id')

  function updateComments() {
    commentText = ''
    selectArr.forEach(function(item) {
      commentText = commentText + item.options[item.selectedIndex].text + ' '
    })
    setTimeout(function() {
      finalSum = sumEl.textContent
      commentText = commentText + 'Итого: ' + finalSum
      commentEl.value = commentText
    }, 1500) 
  }

  function changeProduct() {
    let selectedOptionText = this.options[this.selectedIndex].text

    if (selectedOptionText.split(' ')[1] != 'Семейный') {
      productEl.value = productIdStd
    }
    else {
      productEl.value = productIdFam
    }

    if (selectedOptionText.split(' ')[1] == 'Премиум') {
      typeEl.value = typePremium
    }
    else if (selectedOptionText.split(' ')[1] == 'Бизнес') {
      typeEl.value = typeBusiness
    }
    else {
      typeEl.value = typeStandart
    }
  }

  let selectArr = [selectProgramm, selectRoom, selectHotelroom, selectAdd]
  selectArr.forEach(function(item) {
    item.addEventListener('change', updateComments)
  })
  selectProgramm.addEventListener('change', changeProduct)
  


  setTimeout(function() {
    let modalContainer = document.querySelector('#modal_container')
    let modalEl = modalContainer.parentNode
    const pageEl = document.querySelector('body')
    
    function showModal() {
      let modalBtn = document.querySelector('#modal_button')
      modalContainer.classList.add('active')
      setTimeout(modalEl.classList.add('active'), 100)
      modalEl.style.display = "flex"
      pageEl.style.overflowY = "hidden"
      pageEl.style.maxHeight = "100vh"
      modalBtn.addEventListener('click', closeModal)
      modalEl.addEventListener('click', closeModal)
      modalContainer.addEventListener('click', stopAllEvents)
    }
    
    function stopAllEvents(e) {
      e.stopPropagation()
    }
    
    function closeModal() {
      modalContainer.classList.remove('active')
      modalEl.classList.remove('active')
    
      pageEl.style.overflowY = "auto"
      pageEl.style.maxHeight = "auto"
      modalEl.style.display = "none"
    }
    
    let modalFormBtn = document.querySelector('.modal__form-btn')
    modalFormBtn.addEventListener('click', showModal)
  }, 1500)

  let sochiDate = new Date("June 11 2020 00:00:00") 
  let currentDate = Date.now() 
  let days = sochiDate - currentDate 
  days /= 1000 
  days /= 60  
  days /= 60
  days /= 24 
  let daysNumEl = document.querySelector('.days-num')
  daysNumEl.textContent = Math.round(days)
  let daysTextEl = document.querySelector('.days-text')
  if (Math.round(days) % 10 == 1) {
    daysTextEl.textContent = 'день'
  }
  else if (Math.round(days) % 10 == 2 || Math.round(days) % 10 == 3 || Math.round(days) % 10 == 4) {
    daysTextEl.textContent = 'дня'
  }
  else {
    daysTextEl.textContent = 'дней'
  }
  
}, 3000)
})