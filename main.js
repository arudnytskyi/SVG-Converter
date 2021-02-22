import createHTMLElement from './js/createHTMLElement.js'
import getPixelData from './js/data-pixel.js'
import createSVG from './js/createSVG.js'
import uploadSVG from './js/uploadSVG.js'

const dropArea = document.querySelector('#drop-area')
const selectInput = document.querySelector('#select-input')
const gallery = document.querySelector('#gallery')

dropArea.addEventListener('dragenter', highlight, false)
dropArea.addEventListener('dragover', highlight, false)
dropArea.addEventListener('dragleave', unhighlight, false)
dropArea.addEventListener('drop', unhighlight, false)
dropArea.addEventListener('drop', handleDrop, false)

function highlight(e) {
  e.stopPropagation()
  e.preventDefault()
  dropArea.classList.add('highlight')
  }

function unhighlight(e) {
  e.stopPropagation()
  e.preventDefault()
  dropArea.classList.remove('highlight')
}

function handleDrop(e) {
  let files = e.target.files || e.dataTransfer.files
  return informFile(files)
}

selectInput.addEventListener('change', (input) => {
  const files = input.target.files
  return informFile (files)
})

async function informFile(input) {
  const files = [...input]
  await Promise.all(files.map(f=>{return readAsDataURL(f)}))

  function readAsDataURL(file) {
    return new Promise((resolve, reject)=>{
      const fileReader = new FileReader()
      fileReader.addEventListener('load', () => {
        const img =	new Image()
        img.src = fileReader.result
        img.addEventListener('load', () => {
          createHTMLElement(img, file.name)
          const pixelData = getPixelData(img)
          const svg = createSVG (img, pixelData)
          const fileName = file.name.replace(/\.[^/.]+$/, "")
          return resolve(
            uploadSVG(fileName, svg)
          )
        })
      })
      fileReader.readAsDataURL(file)
    })
  }
}



// function checkProgress(allElement, completeElement) {
//     let proggress = document.querySelector('#progressLine')
//     let percentСomplet = Math.round((completeElement * 100) / allElement)
//     return proggress.style.width = `${percentСomplet}%`
//   }