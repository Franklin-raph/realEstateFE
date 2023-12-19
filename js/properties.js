const loader = document.querySelector(".loader")

let estatesArray = []

async function getProperties(){
  loader.style.display = "block"
    const response = await fetch("https://admin.euroluxuryproperties.com/estates/")
    const datas = await response.json()
    if(response.ok){
      estatesArray = datas
      loader.style.display = "none"
      console.log(estatesArray)
    }
    templateFunction(estatesArray)
}

getProperties()

document.querySelectorAll(".clear").forEach(btn => {
  btn.addEventListener("click", ()=>{
    location.reload()
  })
})

let locationArray = ["Dubai", "Brazil", "England", "Italy", "Las Vegas"]

// Initialize the filterLocation array
let filterLocation = [];

locationArray.map(location => {
  const container = document.querySelector(".location");
  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.id = `checkbox-${location}`;
  checkbox.style.marginRight = "7px";

  const label = document.createElement("label");
  label.appendChild(checkbox);
  label.innerHTML += `<span class="w-form-label" for="${checkbox.id}">${location}</span>`;
  label.onclick = () => addItemToFilter(location);

  container.appendChild(label);
});

function addItemToFilter(location) {
  const checkbox = document.getElementById(`checkbox-${location}`);
  console.log(checkbox);

  if (checkbox.checked) {
    // If checkbox is checked, add location to filterLocation array if not already present
    if (!filterLocation.includes(location)) {
      filterLocation.push(location);
    }
  } else {
    // If checkbox is unchecked, remove location from filterLocation array if present
    const index = filterLocation.indexOf(location);
    if (index !== -1) {
      filterLocation.splice(index, 1);
    }
  }
}


// Location Filter API
document.querySelector(".locationFilter").addEventListener("click", async (e)=>{

  e.target.parentElement.parentElement.parentElement.classList.remove("w--open")
  e.target.parentElement.parentElement.parentElement.parentElement.classList.remove("w--open");
  document.querySelector(".w-dyn-items").innerHTML = ""
  document.querySelector(".w-dyn-empty").style.display = "none"
  loader.style.display = "block"


  if(filterLocation.length === 0){
    getProperties()
    return
  }

  document.querySelector(".w-dyn-items").innerHTML = ""
  document.querySelector(".w-dyn-empty").style.display = "none"
  loader.style.display = "block"
  const response = await fetch(`https://admin.euroluxuryproperties.com/filter-estates/`,{
    method:"PUT",
    headers:{
      "Content-Type":"application/json"
    },
    body: JSON.stringify({
      "filter_params_key":"location",
      "filter_params_value":filterLocation
    })
  })
  const data = await response.json()
  console.log(response);
  if(response.ok){
    templateFunction(data)
    loader.style.display = "none"
    console.log(data);
  }

  console.log(filterLocation);
})



const propertyTypeArray = ["Apartments", "Penthouse", "Tenthouses", "Villas"]
let filterProperty = []

propertyTypeArray.map(property => {
  const container = document.querySelector(".property-type");
  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.id = `checkbox-${property}`;
  checkbox.style.marginRight = "7px";

  const label = document.createElement("label");
  label.appendChild(checkbox);
  label.innerHTML += `<span class="w-form-label" for="${checkbox.id}">${property}</span>`;
  label.onclick = () => addPropertyToFilter(property);

  container.appendChild(label);
});


function addPropertyToFilter(property) {
  const checkbox = document.getElementById(`checkbox-${property}`);

  
  if (checkbox.checked) {
    // If checkbox is checked, add location to filterProperty array if not already present
    if (!filterProperty.includes(property)) {
      filterProperty.push(property);
    }
  } else {
    // If checkbox is unchecked, remove location from filterProperty array if present
    const index = filterProperty.indexOf(property);
    if (index !== -1) {
      filterProperty.splice(index, 1);
    }
  }
}


// Property Filter API
document.querySelector(".propertyApply").addEventListener("click", async (e) => {

  e.target.parentElement.parentElement.parentElement.classList.remove("w--open")
  e.target.parentElement.parentElement.parentElement.parentElement.classList.remove("w--open");
  document.querySelector(".w-dyn-items").innerHTML = ""
  document.querySelector(".w-dyn-empty").style.display = "none"
  loader.style.display = "block"

  if(filterProperty.length === 0){
    getProperties()
    return
  }
  
  console.log(JSON.stringify({
    "filter_params_key":"property_type",
    "filter_params_value":filterProperty
  }));
  const response = await fetch(`https://admin.euroluxuryproperties.com/filter-estates/`,{
    method:"PUT",
    headers:{
      "Content-Type":"application/json"
    },
    body: JSON.stringify({
      "filter_params_key":"property_type",
      "filter_params_value":filterProperty
    })
  })
  const data = await response.json()
  if(response.ok){
    templateFunction(data)
    loader.style.display = "none"
    console.log(data);
  }
  console.log(filterProperty);
})


// Price filter
document.querySelector(".priceApplyFilter").addEventListener("click", async(e) => {
  
  if(document.querySelector(".price").value === ""){
    getProperties()
    return
  }

  e.target.parentElement.parentElement.parentElement.classList.remove("w--open")
  e.target.parentElement.parentElement.parentElement.parentElement.classList.remove("w--open");
  document.querySelector(".w-dyn-items").innerHTML = ""
  document.querySelector(".w-dyn-empty").style.display = "none"
  loader.style.display = "block"

  const response = await fetch(`https://admin.euroluxuryproperties.com/filter-estates/`,{
    method:"PUT",
    headers:{
      "Content-Type":"application/json"
    },
    body: JSON.stringify({
      "filter_params_key":"price",
      "filter_params_value":2000000,
      "max_price":document.querySelector(".price").value
    })
  })
  const data = await response.json()
  console.log(response, data);
  if(response.ok){
    templateFunction(data)
    loader.style.display = "none"
    console.log(data);
  }
  console.log(filterProperty);
})



// Looking for filter
document.querySelector(".lookingForFilter").addEventListener("click", async (e) => {

  if(document.querySelector("input[type='radio'][name=property]:checked") === null){
    getProperties()
    return
  }

  e.target.parentElement.parentElement.parentElement.classList.remove("w--open")
  e.target.parentElement.parentElement.parentElement.parentElement.classList.remove("w--open");
  document.querySelector(".w-dyn-items").innerHTML = ""
  document.querySelector(".w-dyn-empty").style.display = "none"
  loader.style.display = "block"

  console.log(document.querySelector("input[type='radio'][name=property]:checked").value);
  const response = await fetch(`https://admin.euroluxuryproperties.com/filter-estates/`,{
    method:"PUT",
    headers:{
      "Content-Type":"application/json"
    },
    body: JSON.stringify({
      "filter_params_key":"looking_for",
      "filter_params_value":document.querySelector("input[type='radio'][name=property]:checked").value,
    })
  })
  const data = await response.json()
  console.log(response, data);
  if(response.ok){
    templateFunction(data)
    loader.style.display = "none"
    console.log(data);
  }
})


let templateFunction = (estatesArray) => {
  if(estatesArray.length === 0){
    document.querySelector(".w-dyn-empty").style.display = "block"
  }
  
  estatesArray.map(data => (
    document.querySelector(".w-dyn-items").innerHTML += `
    <div role="listitem" class="collection-item w-dyn-item w-col w-col-4">
        <a href="./detail_properties.html#${data.id}" class="property-card w-inline-block">
          <div class="property-image-wrap">
            <img alt="" src="${data.cover_photo}" class="property-image">
          </div>
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
}

// function displayDropDown(){
//   document.querySelector(".dropdown-list").classList.remove("w--open");
//   console.log(document.querySelector(".dropdown-list").classList);
// }