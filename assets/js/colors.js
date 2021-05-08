var setTheme = localStorage.getItem('theme')
var setThemea = localStorage.getItem('themea')
var setIcons = localStorage.getItem('icons')
var setIcon = localStorage.getItem('icon')
var setIcona = localStorage.getItem('icona')
var setIconas = localStorage.getItem('iconas')

console.log('theme:', setTheme)
console.log('themea:', setThemea)
console.log('icons:', setIcons)
console.log('icon:', setIcon)
console.log('icona:', setIcona)
console.log('iconas:', setIconas)

setTimeout(function() {
    if ( setThemea == null){
  swapStyle('css/main.css')
  swapStylea('css/room.css')
  swapStylea('css/icons.css')
  swapIcon('images/group.png')
  swapIcona('images/list.png')
  swapIconas('images/chat.png')
}else {
   swapStylea(setThemea)
   swapStyle(setTheme)
   swapIcons(setIcons)
   swapIcon(setIcon)
   swapIcona(setIcona)
   swapIconas(setIconas)
 

}
   
}, 100);


function swapStyle(sheet){
  document.getElementById('mystylesheet').href = sheet
  localStorage.setItem('theme', sheet)
}

function swapStylea(sheeta){
    document.getElementById('mystylesheeta').href = sheeta
    localStorage.setItem('themea', sheeta)
  }

  function swapIcons(sheetaa){
    document.getElementById('mystylesheetaa').href = sheetaa
    localStorage.setItem('icons', sheetaa)
  }

  function swapIcon(sheete){
    document.getElementById('iconi').src = sheete
    localStorage.setItem('icon', sheete)
  }

  function swapIcona(sheetes){
    document.getElementById('iconis').src = sheetes
    localStorage.setItem('icona', sheetes)
  }

  function swapIconas(sheetese){
    document.getElementById('iconisi').src = sheetese
    localStorage.setItem('iconas', sheetese)
  }





