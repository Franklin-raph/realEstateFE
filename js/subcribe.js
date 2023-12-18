async function emailSubscription(){
    if(document.querySelector(".subscription-email").value === ""){
        document.querySelector(".email-sub-fail").style.display = "block"
        document.querySelector(".email-sub-failed-test").textContent = "Please the email field can not be empty"
        setTimeout(() =>{document.querySelector(".email-sub-fail").style.display = "none"},3000)
        return
    }
    console.log(JSON.stringify({email:document.querySelector(".subscription-email").value}));
    const response = await fetch(`https://admin.euroluxuryproperties.com/subscribe/`,{
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body: JSON.stringify({email:document.querySelector(".subscription-email").value})
    })
    const data = await response.json()
    if(response) document.querySelector(".subscription-email").value = ""
    console.log(response, data);
    if(response.ok){
        document.querySelector(".email-sub-success").style.display = "block"
    }

    if(!response.ok){
        document.querySelector(".email-sub-fail").style.display = "block"
        document.querySelector(".email-sub-failed-test").textContent = data.detail
    }

    setTimeout(() =>{document.querySelector(".email-sub-fail").style.display = "none"},3000)
    setTimeout(() =>{document.querySelector(".email-sub-success").style.display = "none"},3000)
}