export default function createHTMLElement(img,name) {
  const imgBlock = document.createElement('div')
  imgBlock.classList.add('img-block')

  img.classList.add('img-load')
  img.id = 'img-load'

  // const progressBar = document.createElement('div')
  // progressBar.classList.add('progressbar')

  // const progressLine = document.createElement('span')
  // progressLine.id = 'progressLine'
  // progressLine.setAttribute('style', 'width: 0%')

  const imgName = document.createElement('h3')
  imgName.classList.add('img-name')
  imgName.textContent = name

  gallery.appendChild(imgBlock)
  imgBlock.appendChild(img)
  // imgBlock.appendChild(progressBar)
  // progressBar.appendChild(progressLine)
  imgBlock.appendChild(imgName)
}