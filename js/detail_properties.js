const propertyId = location.hash.substr(1);
console.log(propertyId);

let title;

async function getPropertyDetails(){
    const response = await fetch(`https://admin.euroluxuryproperties.com/estates/${propertyId}/`)
    const data = await response.json()
    if(response.ok){
        console.log(data)
        title = data.title
        document.querySelector(".property-detail-text").textContent = data.title
        document.querySelector(".property-text-light").textContent = data.location
        document.querySelector(".heading-6").textContent = 
        `${
            new Intl.NumberFormat('en-US', {
              style: 'currency',
              currency: 'USD'
            }).format(data.price)
          } | ${
            new Intl.NumberFormat('en-US', {
              style: 'currency',
              currency: 'AED'
            }).format(data.price * 3.67)
          }`
        document.querySelector(".image-2").src = data.cover_photo

        data.gallery.map(data => (
            document.querySelector(".collection-list").innerHTML += `
                <div role="listitem" class="collection-item-2 w-dyn-item w-col w-col-2">
                    <a href="${data.photo}" data-lightbox="image-1" class="gallery-item w-inline-block w-lightbox">
                        <img src="${data.photo}" alt="" class="image-38">
                        <div class="image-cover"></div>
                        <script type="application/json" class="w-json">{
                        "items": [],
                        "group": "Gallery"
                    }</script>
                    </a>
                </div>
            `
        ))
        document.querySelector(".heading-5").textContent =
        `${
            new Intl.NumberFormat('en-US', {
              style: 'currency',
              currency: 'USD'
            }).format(data.price)
          } | ${
            new Intl.NumberFormat('en-US', {
              style: 'currency',
              currency: 'AED'
            }).format(data.price * 3.67)
          }`
        document.querySelector(".num-of-bed").textContent = data.no_of_beds
        document.querySelector(".num-of-showers").textContent = data.no_of_bathrooms
        document.querySelector(".size").textContent = data.room_size
        document.querySelector(".date").textContent = new Date(data.Date).getFullYear()
        document.querySelector(".w-richtext").textContent = data.description
        document.querySelector(".garage").textContent = data.num_of_room
    }
}

getPropertyDetails()


const email = document.querySelector("#Email")
const message = document.querySelector("#Message")
const name = document.querySelector("#name")
const phone_number = document.querySelector("#Phone")
const contactError = document.querySelector(".contact-form-fail")
const contactSuccess = document.querySelector(".contact-form-done")
const contactErrorText = document.querySelector(".error-text")
const contactSuccessText = document.querySelector(".success-text")

function errorHandler(msg){
    contactErrorText.textContent = msg
    setTimeout(() =>{
        contactError.style.display = "none"
    },5000)
}

function successHandler(msg){
    contactSuccessText.textContent = msg
    setTimeout(() =>{
        contactSuccess.style.display = "none"
    },5000)
}

async function handleContactForm(){
    const contactFormData = {
        email:email.value,
        message:message.value,
        name:name.value,
        phone_number:phone_number.value,
        subject:title,
    }
    console.log(contactFormData)
    if(!email.value || !message.value || !name.value){
        contactError.style.display = "block"
        errorHandler("Please fill in all fields")
    }else{
        document.querySelector(".contact-loader").style.display = "block"
        document.querySelector(".send-btn").style.display = "none"
        const contactFormData = {
            email:email.value,
            message:message.value,
            name:name.value,
            phone_number:phone_number.value,
            subject:"New Customer",
        }
        const response = await fetch("https://admin.euroluxuryproperties.com/contact/",{
            method:"POST",
            body: JSON.stringify(contactFormData),
            headers: {
                "Content-Type":"application/json"
            }
        })
        const data = await response.json()
        console.log(data);
        console.log(contactSuccess)
        if(response.ok){
            email.value = ""
            name.value = ""
            message.value = ""
            phone_number.value = ""

            contactSuccess.style.display = "block"
            successHandler("Thank you! Your submission has been received!")
            document.querySelector(".contact-loader").style.display = "none"
            document.querySelector(".send-btn").style.display = "block"
        }
    }
}


async function getSimilarListings(){
    const response = await fetch(`https://admin.euroluxuryproperties.com/estates/`)
    const datas = await response.json()
    console.log(datas)
    if(response.ok){
        // document.querySelector(".property-detail-text").textContent = data.title
        // document.querySelector(".property-text-light").textContent = data.location
        // document.querySelector(".heading-6").textContent = `$${data.price} | ${data.price * 3.67} د.إ AED`
        // document.querySelector(".image-2").src = data.cover_photo

        datas.splice(0, 3).map(data => (
            document.querySelector(".property-list").innerHTML += `
            <div role="listitem" style="font-style: normal;" class="collection-item w-dyn-item w-col w-col-4">
            <a href="./detail_properties.html#${data.id}" onclick="getSimilarListingProperty(${data.id})" class="property-card w-inline-block">
              <div class="property-image-wrap"><img alt="" src="${data.cover_photo}" class="property-image"></div>
              <div class="property-content">
                <div class="div-block-61">
                  <h6 class="heading-4">
                  ${
                    new Intl.NumberFormat('en-US', {
                      style: 'currency',
                      currency: 'USD'
                    }).format(data.price)
                  }
                  </h6>
                </div>
                <h5>${data.title}</h5>
                <div>${data.location}</div>
              </div>
              <div class="w-layout-grid room-feature-grid">
                <div class="feature"><img src="images/Bed.svg" alt="" class="feature-icon">
                  <div>${data.no_of_beds}</div>
                </div>
                <div class="feature centre-lines"><img src="images/Shower.svg" alt="" class="feature-icon">
                  <div>${data.no_of_bathrooms}</div>
                </div>
                <div class="feature"><img src="images/Size.svg" alt="" class="feature-icon">
                  <div>${data.room_size}</div>
                </div>
              </div>
            </a>
          </div>
        `
        ))
        // document.querySelector(".heading-5").textContent = `$${data.price} | ${data.price * 3.67} د.إ AED`
        // document.querySelector(".num-of-bed").textContent = data.no_of_beds
        // document.querySelector(".num-of-showers").textContent = data.no_of_bathrooms
        // document.querySelector(".size").textContent = data.room_size
        // document.querySelector(".date").textContent = data.Date
        // document.querySelector(".w-richtext").textContent = data.description
    }
}

getSimilarListings()


async function getSimilarListingProperty(id){
    const response = await fetch(`https://admin.euroluxuryproperties.com/estates/${id}/`)
    const data = await response.json()
    if(response.ok){
        console.log(data)
        document.querySelector(".collection-list").innerHTML = ""
        window.scrollTo(0, 0)
        title = data.title
        document.querySelector(".property-detail-text").textContent = data.title
        document.querySelector(".property-text-light").textContent = data.location
        document.querySelector(".heading-6").textContent = 
        `${
            new Intl.NumberFormat('en-US', {
              style: 'currency',
              currency: 'USD'
            }).format(data.price)
          } | ${
            new Intl.NumberFormat('en-US', {
              style: 'currency',
              currency: 'AED'
            }).format(data.price * 3.67)
          }`
        document.querySelector(".image-2").src = data.cover_photo

        data.gallery.map(data => (
            document.querySelector(".collection-list").innerHTML += `
                <div role="listitem" class="collection-item-2 w-dyn-item w-col w-col-2">
                    <a href="${data.photo}" data-lightbox="image-1" class="gallery-item w-inline-block w-lightbox">
                        <img src="${data.photo}" alt="" class="image-38">
                        <div class="image-cover"></div>
                        <script type="application/json" class="w-json">{
                        "items": [],
                        "group": "Gallery"
                    }</script>
                    </a>
                </div>
            `
        ))
        document.querySelector(".heading-5").textContent =
        `${
            new Intl.NumberFormat('en-US', {
              style: 'currency',
              currency: 'USD'
            }).format(data.price)
          } | ${
            new Intl.NumberFormat('en-US', {
              style: 'currency',
              currency: 'AED'
            }).format(data.price * 3.67)
          }`
        document.querySelector(".num-of-bed").textContent = data.no_of_beds
        document.querySelector(".num-of-showers").textContent = data.no_of_bathrooms
        document.querySelector(".size").textContent = data.room_size
        document.querySelector(".date").textContent = new Date(data.Date).getFullYear()
        document.querySelector(".w-richtext").textContent = data.description
        document.querySelector(".garage").textContent = data.num_of_room
    }
}