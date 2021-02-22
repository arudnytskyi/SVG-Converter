export default function createCanvas (img) {
  const imageWidth = img.naturalWidth
  const imageHeight = img.naturalHeight

  const canvas = document.createElement('canvas')
  canvas.width = imageWidth
  canvas.height = imageHeight
  const context = canvas.getContext('2d')

  context.drawImage(img, 0, 0, imageWidth, imageHeight)
  const imgData = context.getImageData(0, 0, imageWidth, imageHeight)
  return getPixelData (img , imgData.data, imageWidth)
}

function getPixelData (img, imgData, imageWidth) {
  const allPixel = []
  console.log(imageWidth)
  let x = 0
  let y = 0

  for (let i = 0; i < imgData.length; i+=4) {
    const pixelData = {
      x: x,
      y: y,
      width: 1,
      height: 1,
      red : imgData[i],
      green : imgData[i+1],
      blue : imgData[i+2],
      alpha : imgData[i+3] / 255
    }

    x < imageWidth - 1 ? x++ : (x = 0, y++)

    allPixel.push(pixelData)
  }

  let currentPixel = {}

  const px = allPixel.reduce((acc, pixel, i, arr) => {
    let nextPixel
    i < arr.length - 1 ? nextPixel = arr[i+1] : nextPixel = pixel

    if (Object.keys(currentPixel).length != 0) {

      if (Math.round(currentPixel.red / 17) == Math.round(nextPixel.red / 17) &&
         Math.round(currentPixel.green / 17) == Math.round(nextPixel.green / 17) &&
         Math.round(currentPixel.blue / 17) == Math.round(nextPixel.blue / 17) &&
         Math.round(currentPixel.alpha / 17) == Math.round(nextPixel.alpha / 17) &&
         currentPixel.width + currentPixel.x < imageWidth) {
           if (nextPixel == pixel) {
            currentPixel.width++
            acc.push(currentPixel)
          } else {
            currentPixel.width++
          }
      } else {
          acc.push(currentPixel)
          currentPixel = nextPixel
      }

    } else {
      currentPixel = pixel
    }
    return acc
  }, [])

  // const py = px.reduce((acc, pixel, i, arr) => {

  // })

  return px
}