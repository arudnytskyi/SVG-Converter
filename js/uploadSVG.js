export default function svgDataURL(fileName, svg) {
  const svgAsXML = (new XMLSerializer()).serializeToString(svg)
  const URLsvg  = encodeURIComponent(svgAsXML)
  return saveAsFile (fileName, URLsvg)
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