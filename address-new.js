/* global axios */
//address
function initDropdown(citiesArray) {
  let addressWrapperEl = document.createDocumentFragment()
  let dropdownBlock = document.querySelector('.address__block-dropdown')
  let dropdownList = document.querySelector('.address__block-dropdown-list')
  let addressPlaceEl = document.querySelector('.address__block-place')
  let phonePlaceEl = document.querySelector('.address__inform-phone')
  let organizerPlaceEl = document.querySelector('.address__inform-org')
  
  function setCurrentCity(city, address) {
    addressPlaceEl.textContent = city + ', ' + address
  }
  
  function toggleDropdownHandler() {
    dropdownList.classList.toggle('address__block-dropdown-list-active')
  }

  function inputHandler() {
    dropdownBlock.value = this.textContent
  }
  
  function getCurrentCity() {
    let address = citiesInfo[this.textContent].address
    let city = this.textContent
    setCurrentCity(city, address || 'уточняется')
  }

  function stopAllEvents(e) {
    e.stopPropagation()
  }

  function closeDropdown() {
    dropdownList.classList.remove('address__block-dropdown-list-active')
  }

  document.addEventListener('click', e => {
    if (e.target != dropdownBlock) {
      closeDropdown()
    }
  })

  dropdownBlock.addEventListener('click', toggleDropdownHandler)
  dropdownBlock.addEventListener('click', function() {dropdownBlock.value = ''})

  let citiesInfo = {}

  citiesArray
    .sort((a, b) => {
      return a.title > b.title ? 1 : -1
    })
    .forEach(item => {
      let cityEl = document.createElement('li')

      for (let i=0; i<item.dates.length; i++) {
        let currentCityValue = citiesInfo[item.title]
        let existingDaysOfWeek = currentCityValue && currentCityValue.daysOfWeek
        let currentDaysOfWeek = existingDaysOfWeek
          ? currentCityValue.daysOfWeek.concat([item.dates[i].day_of_week])
          : [item.dates[i].day_of_week]
        let existingRegistration = currentCityValue && currentCityValue.registration
        let currentRegistration = existingRegistration
          ? currentCityValue.registration.concat([item.dates[i].registration])
          : [item.dates[i].registration]
        let existingStart = currentCityValue && currentCityValue.start
        let currentStart = existingStart
          ? currentCityValue.start.concat([item.dates[i].start])
          : [item.dates[i].start]
        let existingEnd = currentCityValue && currentCityValue.end
        let currentEnd = existingEnd
          ? currentCityValue.end.concat([item.dates[i].end])
          : [item.dates[i].end]
        let existingDate = currentCityValue && currentCityValue.date
        let currentDate = existingDate
          ? currentCityValue.date.concat([item.dates[i].date])
          : [item.dates[i].date]

        if (item.title === 'Рязань') {
          const some = citiesInfo[item.title]
          const newValues = {
            daysOfWeek: currentDaysOfWeek,
            registration: currentRegistration,
            start: currentStart,
            end: currentEnd,
            date: currentDate
          }
        }
          
        citiesInfo[item.title] = currentCityValue
          ? Object.assign(currentCityValue, {
            daysOfWeek: currentDaysOfWeek,
            registration: currentRegistration,
            start: currentStart,
            end: currentEnd,
            date: currentDate
          })
          : {
            daysOfWeek: currentDaysOfWeek,
            registration: currentRegistration,
            start: currentStart,
            end: currentEnd,
            date: currentDate
          }
        citiesInfo[item.title]['address'] = item.address
        citiesInfo[item.title]['organizer'] = item.organizer
      }
      cityEl.textContent = item.title
      cityEl.className = 'address__block-dropdown-item' 
      addressWrapperEl.appendChild(cityEl)
    })
  dropdownList.textContent = ''
  dropdownList.appendChild(addressWrapperEl)

  let moscowRegExp = new RegExp('Москва', 'i')
  let moscowAddressItem = citiesArray.find(item =>
    item.title.match(moscowRegExp)
  )

  if (moscowAddressItem) {
    setCurrentCity(moscowAddressItem.title, moscowAddressItem.address)
    dropdownBlock.value = 'Москва'
    setDates.call({textContent: 'Москва'})
  }

  let dropdownItems = document.querySelectorAll('.address__block-dropdown-item')

  for (let i = 0; i < dropdownItems.length; i++) {
    let currentItem = dropdownItems[i]

    currentItem.addEventListener('click', inputHandler)
    currentItem.addEventListener('click', getOrganizer)
    currentItem.addEventListener('click', toggleDropdownHandler)
    currentItem.addEventListener('click', getCurrentCity)
    currentItem.addEventListener('click', setDates)
    currentItem.addEventListener('click', stopAllEvents)
  }

  function getOrganizer() {
    let organizerFullStr = citiesInfo[this.textContent].organizer
    let phoneRegex = /(\+?\d\s?(\-|\()?\d*(\-|\))?(\s)?\d*(\s|\-|)?\d*(\s|\-|)?\d*)/g
    let commaRegex = /,/
    let phone = organizerFullStr.match(phoneRegex)[0] || ''
    let organizer = organizerFullStr.replace(phoneRegex, '')

    organizer = organizer.replace(commaRegex, '')
    setOrganizer(phone, organizer || '')
  }

  function setOrganizer(phone, organizer) {
    phonePlaceEl.textContent = phone
    organizerPlaceEl.textContent = organizer
  }

  function setDates() {
    let dateCells = document.querySelectorAll('.address-date')
    let weekDayCells = document.querySelectorAll('.address__table-weekday')
    let registrationCells = document.querySelectorAll('.address-registration')
    let startCells = document.querySelectorAll('.address-start')
    let endCells = document.querySelectorAll('.address-end')
    let tableEl = document.querySelector('.address__table')

    tableEl.classList.add('active')
    for (let i = 0; i < 5; i++) {
      for (let j = 0; j < 3; j++) {
        dateCells[j].textContent = citiesInfo[this.textContent].date[j] || '' 
        weekDayCells[j].textContent = citiesInfo[this.textContent].daysOfWeek[j] || ''
        registrationCells[j].textContent = citiesInfo[this.textContent].registration[j] || ''
        startCells[j].textContent = citiesInfo[this.textContent].start[j] || ''
        endCells[j].textContent = citiesInfo[this.textContent].end[j] || ''
      }
    }
  }


  function isMatching(full, chunk) {
    let cityRegExp = new RegExp(chunk, 'i')

    return cityRegExp.test(full)  
  }

  dropdownBlock.addEventListener('keyup', function() {
    if (dropdownBlock.value) {
      let citiesSearchResultObj = citiesArray.filter(item => isMatching(item.title, dropdownBlock.value))
      let citiesSearchResult = citiesSearchResultObj.map(item => item.title)
      dropdownList.innerHTML = ''
      citiesSearchResult.forEach(function(item) {
        let cityEl = document.createElement('li')
        cityEl.textContent = item
        cityEl.className = 'address__block-dropdown-item' 
        addressWrapperEl.appendChild(cityEl)
      })     
      dropdownList.textContent = ''
      dropdownList.appendChild(addressWrapperEl)
    }
  })
}

let url = location.pathname.slice(9, location.pathname.length)
console.log(url)

axios.get(`./?product=${url}&source=${landing}`)
  .then(function (response) {
    let addresses = response.data.data
    if (Array.isArray(addresses) && addresses.length) {
      initDropdown(addresses)
    }
  })
  .catch(function (error) {
    console.log(error)
  })
