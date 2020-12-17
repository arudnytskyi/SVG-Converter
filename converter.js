const selectInput = document.querySelector("#select-input")
const imageFieldChoice = document.querySelector("#image-field-choice")

selectInput.addEventListener("change", function informFile(input) {
	const imgsArray = [...this.files]
	let imgNumber = 0
	imgsArray.forEach(img => {

		const imgBlock = document.createElement("div")
		imgBlock.classList.add("img-block")

		const canvas = document.createElement("canvas")
		const context = canvas.getContext("2d")
		canvas.classList.add("img-load-block")
		canvas.id = "imgCanvas"

		const imgElement = document.createElement("img")
		imgElement.classList.add("img-load")
		imgElement.id = "img-load"

		const imgName = document.createElement("h3")
		imgName.classList.add("img-name")
		imgName.textContent = img.name

		const reader = new FileReader()

		reader.readAsDataURL(imgsArray[imgNumber])

		reader.addEventListener("load", function getImgUrl(img) {
			imgElement.src = img.target.result
			let imgUrl = imgElement.src
		})

		imageFieldChoice.appendChild(imgBlock)
		imgBlock.appendChild(canvas)
		canvas.appendChild(imgElement)
		imgBlock.appendChild(imgName)

		imgElement.addEventListener("load", (img) => {
			if (imgsArray.indexOf(imgElement) != undefined) {
				let imgWidth = imgElement.naturalWidth
				let imgHeight = imgElement.naturalHeight

				canvas.width = imgWidth
				canvas.height = imgHeight
				context.drawImage(imgElement, 0, 0, imgWidth, imgHeight)

				let imgData = context.getImageData(0, 0, imgWidth, imgHeight)
				console.log(imgData.data)
				getPixelData (imgData)

			} else {
				imgName.textContent = "An error occurred while loading the image"
			}
		})

		function getPixelData (imgData, imgWidth, imgHeight) {
			const allPixel = []
			for (let i = 0; i < imgData.data.length; i+=4) {
				const pixelData = {
					red		: +imgData.data[i],
					green	: +imgData.data[i+1],
					blue	: +imgData.data[i+2],
					alpha	: imgData.data[i+3] * 0.00392156862745098
				}
				allPixel.push(pixelData)
			}
			console.log(allPixel.length)
			return createSvgImg(imgData, imgWidth, imgHeight, allPixel)
		}

		function createSvgImg (imgData, imgWidth, imgHeight, allPixel) {
			const svgArray = []
			const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg")
			let rectSize = canvas.width / allPixel.length
			let rectSVGX = 0
			let rectSVGY = 0
			svg.setAttribute("width", canvas.width)
			svg.setAttribute("height", canvas.height)
			svg.setAttribute("viewBox", `0, 0, ${canvas.width}, ${canvas.height}`)

			imageFieldChoice.appendChild(svg)

			for(let i = 0; i < allPixel.length; i++) {
				const rectSVG = document.createElement("rect")
				rectSVG.id = "square"
				let rectLength = document.querySelectorAll("#square").length - 2
				rectSVG.setAttribute("fill", `rgba(${allPixel[i].red}, ${allPixel[i].green}, ${allPixel[i].blue}, ${allPixel[i].alpha})`)
				rectSVG.setAttribute("width", 1)
				rectSVG.setAttribute("height", 1)
				rectSVG.setAttribute("x", rectSVGX)
				rectSVG.setAttribute("y", rectSVGY)
				if (rectSVGX < canvas.width - 1) 
				{rectSVGX = rectSVGX + 1}
				else {
					rectSVGX = 0 
					rectSVGY = rectSVGY + 1
				}
				svgArray.push(rectSVG)
				svg.appendChild(rectSVG)
				if (rectSVG.getAttribute("fill") == `rgba(0, 0, 0, ${allPixel[i].alpha})`) 
					{svg.removeChild(rectSVG)}
			console.log(svgArray)
			console.log(svg)
			}
		}
		return imgNumber++
	})
})
