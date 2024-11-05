let meals_content=document.querySelector("#meals_content");
let search=document.querySelector("#search")
submitBtn = document.getElementById("submitBtn")



$(document).ready(()=>{
    $(".loading").fadeOut(500)
})

////// start-navbar////////////////////////////
closeNav()
$(".side-nav-menu .close-open-icon").click(()=>{
    
    
    if($(".side-nav-menu ").css("left")=="0px"){
        closeNav()

    }else{
        openNav()
    }

})
function closeNav(){
    let boxWidth=$(".side-nav-menu .nav-tab").outerWidth();
    $(".side-nav-menu ").animate({left:-boxWidth},500)
    $(".close-open-icon").addClass("fa-align-justify")
    $(".close-open-icon").removeClass("fa-x")
    
    $(".links li").animate({top:"300px"},500)
    

}
function openNav(){
    $(".side-nav-menu ").animate({left:"0px"},500)
    $(".close-open-icon").removeClass("fa-align-justify")
    $(".close-open-icon").addClass("fa-x")
    
    animOpen()
}
function animOpen(){
    for(let i=0;i<5;i++){
        $(".links li").eq(i).animate({top:0},(i+5)*150)
    }
}
////////////end-navbar///////////////

////////////////start search///////////////////////
async function searchByName(name){
    let response=await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`)
    response=await response.json()
    displayAll(response.meals)
}
function displayAll(arr){
    let content="";
    for(let i=0;i<arr.length;i++){
     content +=`<div class="col-md-3  ">
                <div onclick="getDetails(${arr[i].idMeal})" class="meal position-relative rounded-2  overflow-hidden pointer ">
                    <img class="w-100" src="${arr[i].strMealThumb}" alt="">
                    <div class="layer position-absolute d-flex align-items-center p-4 text-dark ">
                        <h3>${arr[i].strMeal}</h3>
                    </div>
                </div>
            </div>`}

        meals_content.innerHTML =content;
}
searchByName("")
///////////////////////end search/////////////////////////
/////////start category//////////////////////////

 async function categories(){
    let response=await fetch(`https://www.themealdb.com/api/json/v1/1/categories.php`)
         response=await response.json()
        
         displayCategories(response.categories)
         console.log(response.categories);
    
 }


function displayCategories(arr){
    
     search.innerHTML=" "
    let content="";
    for(let i=0;i<arr.length;i++){
     content +=`<div class="col-md-3  ">
                <div onclick="categorieMeals('${arr[i].strCategory}')"  class=" meal position-relative rounded-2  overflow-hidden pointer ">
                    <img class="w-100" src="${arr[i].strCategoryThumb}" alt="">
                    <div class="layer position-absolute text-center p-2 text-dark ">
                        <h3>${arr[i].strCategory}</h3>
                        <p>${arr[i].strCategoryDescription.split(" ").slice(0,20).join(" ")}</p>
                    </div>
                </div>
            </div>`}

        meals_content.innerHTML =content;
}
async function categorieMeals(catego){
    let response=await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${catego}`)
         response=await response.json()
        
         displayAll(response.meals.slice(0,30))
         console.log(response );
    
 }


//////////////////////////end category///////////////////////////////


/////////////////// start Area/////////////////////////////////////

async function Area(){
    let response=await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?a=list`)
         response=await response.json()
         displayArea(response.meals)
         console.log(response.meals);
         
    
    
 }
 function displayArea(arr){
     search.innerHTML=" "
    let content="";
    for(let i=0;i<arr.length;i++){
     content +=`<div class="col-md-3  ">
                <div onclick="areaMeals('${arr[i].strArea}')"  class="meal container w-25  rounded-2 text-center py-5 pointer ">
                    
                    <i class="fa-solid fa-house-laptop fa-4x"></i>
                        <h3>${arr[i].strArea}</h3>
                       
                    
                </div>
            </div>`}

        meals_content.innerHTML =content;
}
async function areaMeals(catego){
    let response=await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${catego}`)
         response=await response.json()
        
         displayAll(response.meals.slice(0,30))
         console.log(response );
    
 }


//////////////////end Area//////////////////////////////

/////////////////////////////////////////


async function ingredient(){
    let response=await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?i=list`)
         response=await response.json()
         displayIngredient(response.meals.slice(0,15))
         console.log(response.meals);
         
    
    
 }
 function displayIngredient(arr){
     search.innerHTML=" "
    let content="";
    for(let i=0;i<arr.length;i++){
     content +=`<div class="col-md-3  ">
                <div  onclick="ingredientMeals('${arr[i].strIngredient}')"  class="  rounded-2 text-center p-2 pointer ">
                    
                    
                    <i class="fa-solid fa-drumstick-bite fa-4x"></i>
                        <h3>${arr[i].strIngredient}</h3>
                         <p>${arr[i].strDescription.split(" ").slice(0,20).join(" ")}</p>
                       
                       
                    
                </div>
            </div>`}

        meals_content.innerHTML =content;
}

async function ingredientMeals(catego){
    let response=await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${catego}`)
         response=await response.json()
        
         displayAll(response.meals.slice(0,30))
         console.log(response );
    
 }




/////////////////////////////////////
////////////////////////////////////////
async function getDetails(mealId){
    let response=await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`)
         response=await response.json()
        
         displayDetails (response.meals[0])
         console.log(response.meals[0] );
    
 }

function displayDetails(meals){
    search.innerHTML=" "
    
    let content =`<div class=" py-3 d-flex ">
            <div class="col-md-4 me-5 py-2">
                <img class="w-100 rounded-2" src="${meals.strMealThumb}" alt="">
                <h2>${meals.strMeal}</h2>
            </div>
            <div class="col-md-8 ">
                <h2>Instructions</h2>
                <p>${meals.strInstructions}</p>
                <h3><span class="fw-bold">Area :</span>${meals.strArea}</h3>
                <h3><span class="fw-bold">Category : </span>${meals.strCategory}</h3>
                <h3 class="fw-bold">Recipes :</h3>
                <div class="container w-75 ms-0">
                    <div class="row">
                        <div class="col-md-3">
                            <p class="alert alert-info p-1 ">${meals.strIngredient1}</p>
                        </div>
                        <div class="col-md-3">
                            <p class="alert alert-info p-1 ">${meals.strIngredient2}</p>
                        </div>
                        <div class="col-md-3">
                            <p class="alert alert-info p-1 ">${meals.strIngredient3}</p>
                        </div>
                        <div class="col-md-3">
                            <p class="alert alert-info p-1 ">${meals.strIngredient4}</p>
                        </div>
                        <div class="col-md-3">
                            <p class="alert alert-info p-1 ">${meals.strIngredient5}</p>
                        </div>
                        <div class="col-md-3">
                            <p class="alert alert-info p-1 ">${meals.strIngredient6}</p>
                        </div>
                        <div class="col-md-3">
                            <p class="alert alert-info p-1 ">${meals.strIngredient7}</p>
                        </div>
                    </div>
                    
                </div>
                <h3 class="fw-bold">Tags :</h3>
                <a href="${meals.strSource}" class="btn btn-danger">Source</a>
                <a href="${meals.strYoutube}" class="btn btn-success">Youtube</a>
            </div>
           </div>`

        meals_content.innerHTML =content;

}











///////////////////////////////////////////



///////////////////////////////////////
function serch(){
    search.innerHTML=`
    <div class="row py-5">
                <div class="col-md-6">
                    <input onkeyup="getSerchName(this.value)" class="search w-100 px-2 text-white" type="text" placeholder="Search By Name">
                </div>
                <div class="col-md-6">
                    <input onkeyup="getSerchLetter(this.value)" maxlength="1" class="search w-100 px-2 text-white" type="text" placeholder="Search By First Litter">
                </div>
            </div>

    `
    meals_content.innerHTML ='';
}
async function getSerchName(name){
    let response=await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`)
         response=await response.json()
        
         response.meals ? displayAll (response.meals):displayAll ([ ])
         console.log(response.meals );
    
 }
async function getSerchLetter(letter){
    let response=await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${letter}`)
         response=await response.json()
        
         response.meals ? displayAll (response.meals):displayAll ([ ])
         console.log(response.meals );
    
 }



///////////////////////////////////////

//////////////////////////////////


function contact(){
    search.innerHTML=" "
    
    let content =`
    <div class="contact min-vh-100 d-flex align-items-center justify-content-center">
    <div id="nameAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Special characters and numbers not allowed
                </div>
    <div class="container w-75 text-center ">
        <div class="row  g-4 my-2">
            <div class="col-md-6 "><input id="nameInput" onkeyup="inputsValidation()" class="form-control" type="text"placeholder="Enter Your name" >
            </div>
            <div class="col-md-6 "><input id="emailInput" onkeyup="inputsValidation()" class="form-control" type="email"placeholder="Enter Your Email" >
             <div id="emailAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Email not valid *exemple@yyy.zzz
                </div>
            </div>
            <div class="col-md-6 "><input id="phoneInput" onkeyup="inputsValidation()" class="form-control" type="text"placeholder="Enter Your Phone" >
            <div id="phoneAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Enter valid Phone Number
                </div>
            </div>
            <div class="col-md-6 "><input id="ageInput" onkeyup="inputsValidation()" class="form-control" type="number"placeholder="Enter Your Age"  >
             <div id="ageAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Enter valid age
                </div>
            </div>
            <div class="col-md-6 "><input id="passwordInput" onkeyup="inputsValidation()" class="form-control" type="password"placeholder="Enter Your Password">
            <div id="passwordAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Enter valid password *Minimum eight characters, at least one letter and one number:*
                </div>
            </div>
            <div  class="col-md-6 "><input id="repasswordInput" onkeyup="inputsValidation()" class="form-control" type="password"placeholder="Repassword" >
            <div id="repasswordAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Enter valid repassword 
                </div>
            </div>
            
        </div>
        <button disabled class="btn btn-outline-danger " id="submitBtn">submit</button>
       </div>
   </div> 
    
    `

        meals_content.innerHTML =content;

        submitBtn = document.getElementById("submitBtn")


document.getElementById("nameInput").addEventListener("focus", () => {
    nameInputTouched = true
})

document.getElementById("emailInput").addEventListener("focus", () => {
    emailInputTouched = true
})

document.getElementById("phoneInput").addEventListener("focus", () => {
    phoneInputTouched = true
})

document.getElementById("ageInput").addEventListener("focus", () => {
    ageInputTouched = true
})

document.getElementById("passwordInput").addEventListener("focus", () => {
    passwordInputTouched = true
})

document.getElementById("repasswordInput").addEventListener("focus", () => {
    repasswordInputTouched = true
})

}




let nameInputTouched = false;
let emailInputTouched = false;
let phoneInputTouched = false;
let ageInputTouched = false;
let passwordInputTouched = false;
let repasswordInputTouched = false;




function inputsValidation() {
    if (nameInputTouched) {
        if (nameValidation()) {
            document.getElementById("nameAlert").classList.replace("d-block", "d-none")

        } else {
            document.getElementById("nameAlert").classList.replace("d-none", "d-block")

        }
    }
    if (emailInputTouched) {

        if (emailValidation()) {
            document.getElementById("emailAlert").classList.replace("d-block", "d-none")
        } else {
            document.getElementById("emailAlert").classList.replace("d-none", "d-block")

        }
    }

    if (phoneInputTouched) {
        if (phoneValidation()) {
            document.getElementById("phoneAlert").classList.replace("d-block", "d-none")
        } else {
            document.getElementById("phoneAlert").classList.replace("d-none", "d-block")

        }
    }

    if (ageInputTouched) {
        if (ageValidation()) {
            document.getElementById("ageAlert").classList.replace("d-block", "d-none")
        } else {
            document.getElementById("ageAlert").classList.replace("d-none", "d-block")

        }
    }

    if (passwordInputTouched) {
        if (passwordValidation()) {
            document.getElementById("passwordAlert").classList.replace("d-block", "d-none")
        } else {
            document.getElementById("passwordAlert").classList.replace("d-none", "d-block")

        }
    }
    if (repasswordInputTouched) {
        if (repasswordValidation()) {
            document.getElementById("repasswordAlert").classList.replace("d-block", "d-none")
        } else {
            document.getElementById("repasswordAlert").classList.replace("d-none", "d-block")

        }
    }


    if (nameValidation() &&
        emailValidation() &&
        phoneValidation() &&
        ageValidation() &&
        passwordValidation() &&
        repasswordValidation()) {
        submitBtn.removeAttribute("disabled")
    } else {
        submitBtn.setAttribute("disabled", true)
    }
}

function nameValidation() {
    return (/^[a-zA-Z ]+$/.test(document.getElementById("nameInput").value))
}

function emailValidation() {
    return (/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(document.getElementById("emailInput").value))
}

function phoneValidation() {
    return (/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/.test(document.getElementById("phoneInput").value))
}

function ageValidation() {
    return (/^(0?[1-9]|[1-9][0-9]|[1][1-9][1-9]|200)$/.test(document.getElementById("ageInput").value))
}

function passwordValidation() {
    return (/^(?=.*\d)(?=.*[a-z])[0-9a-zA-Z]{8,}$/.test(document.getElementById("passwordInput").value))
}

function repasswordValidation() {
    return document.getElementById("repasswordInput").value == document.getElementById("passwordInput").value
}









/////////////////////////////////






// async function categories(){
//     let response=await fetch(`https://www.themealdb.com/api/json/v1/1/categories.php`)
//     response=await response.json()
    
// }
// async function categoriesMeals(catego){
//     let response=await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${catego}`)
//     response=await response.json()
//     console.log("hello");
//     displayAll(response.meals)
    
// }
// function displayCategories(arr){
//     let content="";
//     for(let i=0;i<arr.length;i++){
//      content +=`<div class="col-md-3  ">
//                 <div onclick="categoriesMeals('${arr[i].strCategory}')" class="meal position-relative rounded-2  overflow-hidden ">
//                     <img class="w-100" src="${arr[i].strCategoryThumb}" alt="">
//                     <div class="layer position-absolute d-flex align-items-center p-4 text-dark ">
//                         <h3>${arr[i].strCategory}</h3>
//                         <p>${arr[i].strCategoryDescription.split("").slice(0,20).join(" ")}</p>
//                     </div>
//                 </div>
//             </div>`}

//         meals_content.innerHTML =content;
// }