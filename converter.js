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
  informFile(files)
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
          const imgData = createCanvas(img)
          const allPixel = getPixelData (imgData)
          const svg = createSvgImg (img, allPixel)
          const URLsvg = svgDataURL(svg)
          const fileName = file.name.replace(/\.[^/.]+$/, "")
          return resolve(
            saveAsFile(fileName, URLsvg)
          )
        })
      })
      fileReader.readAsDataURL(file)
    })
  }

  function createHTMLElement(img,name) {
    const imgBlock = document.createElement('div')
    imgBlock.classList.add('img-block')

    img.classList.add('img-load')
    img.id = 'img-load'

    const progressBar = document.createElement('div')
    progressBar.classList.add('progressbar')

    const progressLine = document.createElement('span')
    progressLine.id = 'progressLine'
    progressLine.setAttribute('style', 'width: 0%')

    const imgName = document.createElement('h3')
    imgName.classList.add('img-name')
    imgName.textContent = name

    gallery.appendChild(imgBlock)
    imgBlock.appendChild(img)
    imgBlock.appendChild(progressBar)
    progressBar.appendChild(progressLine)
    imgBlock.appendChild(imgName)
  }

  function createCanvas (img) {
    const canvas = document.createElement('canvas')
    const context = canvas.getContext('2d')

    context.drawImage(img, 0, 0, img.naturalWidth, img.naturalHeight)
    return imgData = context.getImageData(0, 0, img.naturalWidth, img.naturalHeight)
  }

  function getPixelData (imgData) {
    const allPixel = []
    for (let i = 0; i < imgData.data.length; i+=4) {
      const pixelData = {
        red		: +imgData.data[i],
        green	: +imgData.data[i+1],
        blue	: +imgData.data[i+2],
        alpha	: imgData.data[i+3] * 0.003
      }
      allPixel.push(pixelData)
    }
    return allPixel
  }

  function createSvgImg (img, allPixel) {
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
    let rectX = 0
    let rectY = 0
    svg.setAttribute('width', img.naturalWidth)
    svg.setAttribute('height', img.naturalHeight)
    svg.setAttribute('viewBox', `0, 0, ${img.naturalWidth}, ${img.naturalHeight}`)
    
    const frag = document.createDocumentFragment()

    for(let i = 0; i < allPixel.length; i++) {
      const rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect')
      rect.id = 'square'
      rect.setAttribute('fill', `rgba(${allPixel[i].red}, ${allPixel[i].green}, ${allPixel[i].blue}, ${allPixel[i].alpha})`)
      rect.setAttribute('width', 1)
      rect.setAttribute('height', 1)
      rect.setAttribute('x', rectX)
      rect.setAttribute('y', rectY)

      if (rectX < img.naturalWidth - 1) {
        rectX = rectX + 1
      } else {
        rectX = 0
        rectY = rectY + 1
      }
      
      if (rect.getAttribute('fill') != 'rgba(0, 0, 0, 0)') {
        frag.appendChild(rect)
      }
    }
    svg.appendChild(frag)
    gallery.appendChild(svg)
  }
  
  function svgDataURL(svg) {
    const svgAsXML = (new XMLSerializer).serializeToString(svg)
    return encodeURIComponent(svgAsXML)
  }

  function saveAsFile(fileName, data = '', postfix = (+(new Date)).toString()) {
    const lnk = document.createElement('a')
    lnk.href = `data:image/svg+xml;content-disposition=attachment;filename=${fileName},${data}`
    lnk.download = fileName
    lnk.target = '_blank'
    lnk.style.display = 'none'
    lnk.id = `downloadlnk-${postfix}`
    document.querySelector('.img-block').appendChild(lnk)
    lnk.click()
    document.querySelector('.img-block').removeChild(lnk)
  }
}
