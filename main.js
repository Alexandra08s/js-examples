//всплывашка для QA
let packetQAEls = document.querySelectorAll('.packets__text-before')
let packetMentorEls = document.querySelectorAll('.packets__mentor')
let packetQAArr = Array.prototype.slice.call(packetQAEls)
let packetMentorArr = Array.prototype.slice.call(packetMentorEls)
let hintArr = packetQAArr.concat(packetMentorArr);
const SCREEN_WIDTH = document.documentElement.clientWidth

if (SCREEN_WIDTH > 768) {
  packetQAArr.forEach(function(item) {
    item.addEventListener('mouseover', showHint)
    item.addEventListener('mouseout', showHint)
  })
}
else {
  packetQAArr.forEach(function(item) {
    item.addEventListener('click', showHint)
  })
}

function showHint() {
  this.classList.toggle('show')
}

function getOtoExpDate() {
  let otoExpDate = null
  let localStorageDate = localStorage.getItem('otoExpireDate' + window.location.pathname)
  if (Boolean(localStorageDate)) {
      otoExpDate = new Date(localStorage.getItem('otoExpireDate' + window.location.pathname))
  } else {
    otoExpDate = new Date()
    otoExpDate.setMinutes(otoExpDate.getMinutes() + 60)
    localStorage.setItem('otoExpireDate' + window.location.pathname, otoExpDate)
  }
  return otoExpDate
}

setInterval(function() {
  let currentDate = new Date()
    console.log('otoExpDate', getOtoExpDate())
    if (+getOtoExpDate() < +currentDate) {
    delSaleOption()
  } else {
    delNormalOption()
  }
}, 2000)

function delSaleOption() {
  let saleOption = document.querySelector('[data-product="1654"]')
  let normalOption = document.querySelector('[data-product="1652"]')

  if (saleOption) {
    saleOption.parentNode.removeChild(saleOption);
  }
  normalOption.removeAttribute('disabled')
}

function delNormalOption() {
  let normalOption = document.querySelector('[data-product="1652"]')
  normalOption.disabled = 'disabled'
  if (normal1lectureOption && (locationUrl != '/lectures-anticrisis-oto')) {
    normal1lectureOption.disabled = 'disabled'
  }
}