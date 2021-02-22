export default function createSvgImg (img, arrPixels) {
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
  svg.setAttribute('width', img.naturalWidth)
  svg.setAttribute('height', img.naturalHeight)
  svg.setAttribute('viewBox', `0, 0, ${img.naturalWidth}, ${img.naturalHeight}`)

  const frag = document.createDocumentFragment()

  for(let i = 0; i < arrPixels.length; i++) {
    const rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect')
    rect.id = 'square'
    rect.setAttribute('fill', `rgba(${arrPixels[i].red}, ${arrPixels[i].green}, ${arrPixels[i].blue}, ${arrPixels[i].alpha})`)
    rect.setAttribute('width', arrPixels[i].width)
    rect.setAttribute('height', arrPixels[i].height)
    rect.setAttribute('x', arrPixels[i].x)
    rect.setAttribute('y', arrPixels[i].y)
    frag.appendChild(rect)
  }
    
  svg.appendChild(frag)
  return svg
}


  // ;(function loop(i, arrPixels) {
  // 	if (i >= arrPixels.length) return; // end condition
  // 	const rect = document.createElement('rect')
  // 	rect.id = 'square'
  // 	rect.setAttribute('fill', `rgba(${arrPixels[i].red}, ${arrPixels[i].green}, ${arrPixels[i].blue}, ${arrPixels[i].alpha})`)
  // 	rect.setAttribute('width', 1)
  // 	rect.setAttribute('height', 1)
  // 	rect.setAttribute('x', rectX)
  // 	rect.setAttribute('y', rectY)

  // 	gallery.appendChild(svg)

  // 	if (rectX < img.naturalWidth - 1) {
  // 		rectX = rectX + 1
  // 	} else {
  // 		rectX = 0
  // 		rectY = rectY + 1
  // 	}
    
  // 	if (rect.getAttribute('fill') != 'rgba(0, 0, 0, 0)') {
  // 		svg.appendChild(rect)
  // 	}

  // 	if (i % 1000 == 0 && i != 0 ) {
  // 		checkProgress(arrPixels.length, i)
  // 	}	
  // 	setTimeout(loop.bind(undefined, i+1, arrPixels), 0)
  // })(0, arrPixels)
// if (rect.getAttribute('fill') != 'rgba(0, 0, 0, 0)') {
    //   frag.appendChild(rect)
    // }

    // if (i % 1000 == 0 && i != 0 ) {
    //   ((allElement, completeElement) => {
    //     let proggress = document.querySelector('#progressLine')
    //     let percentСomplet = Math.round((completeElement * 100) / allElement)
    //     return proggress.style.width = `${percentСomplet}%`
    //   })(arrPixels.length, i)
    // }	