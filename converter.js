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

		imgElement.addEventListener("load", (img) => {
			if (imgsArray.indexOf(imgElement) != undefined) {
				var imgWidth = imgElement.naturalWidth
				var imgHeight = imgElement.naturalHeight

				canvas.width = imgWidth
				canvas.height = imgHeight
				context.drawImage(imgElement, 0, 0, imgWidth, imgHeight)

				getImgData(img, imgWidth, imgHeight)
			} else {
				imgName.textContent = "An error occurred while loading the image"
			}
		})

		imageFieldChoice.appendChild(imgBlock)
		imgBlock.appendChild(canvas)
		canvas.appendChild(imgElement)
		imgBlock.appendChild(imgName)

		function getImgData (img, imgWidth, imgHeight) {
			const allPixelData = []
			const pixelData = {
				red		: imgData.data[i]
				green	: imgData.data[i+1]
				blue	: imgData.data[i+2]
				alpha	: imgData.data[i+3]
			}
			let imgData = context.getImageData(imgElement, 0, 0, 200, 200)
			for (let i = 0; i < allPixelData.length; i += 4) {
				let red = imgData.data[i]
				let green = imgData.data[i+1]
				let blue = imgData.data[i+2]
				let alpha = imgData.data[i+3]
				pixelData.push(red, green, blue, alpha)
			}
			allPixelData.push(pixelData)
		}
		return imgNumber++
	})
})



// const selectInput = document.querySelector("#select-input")
// const imageFieldChoice = document.querySelector("#image-field-choice")

// selectInput.addEventListener("change", function informFile(input) {
// 	const imgsArray = [...this.files]

// 	imgs.map(img => {
// 		console.log(img.name)
// 		console.log(img.type)
// 		console.log(img.size)

// 		function createBlock () {
// 			const imgBlock = document.createElement("div")
// 			imgBlock.classList.add("img-block")

// 			const imgLoadBlock = document.createElement("div")
// 			imgLoadBlock.classList.add("img-load-block")

// 			const imgElement = document.createElement("img")
// 			imgElement.classList.add("img-load")
// 			imgElement.id = "img-load"

// 			const imgLoad = document.querySelector("#img-load")
// 			imgElement.src = readURL()

// 			const imgName = document.createElement("h3")
// 			imgName.classList.add("img-name")
// 			imgName.textContent = img.name

// 			imageFieldChoice.appendChild(imgBlock)
// 			imgBlock.appendChild(imgLoadBlock)
// 			imgLoadBlock.appendChild(imgElement)
// 			imgBlock.appendChild(imgName)

// 			function readURL(img) {
// 				const reader = new FileReader()

// 				reader.readAsDataURL(imgs[0])

// 				reader.addEventListener("load", (img) => {
// 					imgElement.src = img.target.result
// 				})
// 			}
// 		}
// 		createBlock ()
// 	})
// })
