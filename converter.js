const selectInput = document.querySelector("#select-input")
const imageFieldChoice = document.querySelector("#image-field-choice")

selectInput.addEventListener("change", function informFile(input) {
	const imgs = [...this.files]

	imgs.map(img => {
		console.log(img.name)
		console.log(img.type)
		console.log(img.size)

		function createBlock () {
			const imgBlock = document.createElement("div")
			imgBlock.classList.add("img-block")

			const imgLoadBlock = document.createElement("div")
			imgLoadBlock.classList.add("img-load-block")

			const imgElement = document.createElement("img")
			imgElement.classList.add("img-load")
			imgElement.id = "img-load"

			const imgLoad = document.querySelector("#img-load")
			imgElement.src = readURL()

			const imgName = document.createElement("h3")
			imgName.classList.add("img-name")
			imgName.textContent = img.name

			imageFieldChoice.appendChild(imgBlock)
			imgBlock.appendChild(imgLoadBlock)
			imgLoadBlock.appendChild(imgElement)
			imgBlock.appendChild(imgName)

			function readURL(img) {
				const reader = new FileReader()

				reader.readAsDataURL(imgs[0])

				reader.addEventListener("load", (img) => {
					imgElement.src = img.target.result
				})
			}
		}
		createBlock ()
	})
})