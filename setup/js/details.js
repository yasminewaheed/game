// ? ===========> Global ============>
const searchParams = location.search
const params = new URLSearchParams(searchParams);

const id = params.get("id");
let containerDetails = {};
const mode = document.getElementById("mode");
// ! ===========> When Start =============>


if (localStorage.getItem("theme") != null) {
   const themeData = localStorage.getItem("theme"); // light Or dark

   if (themeData === "light") {
      mode.classList.replace("fa-sun", "fa-moon"); // sun to moon
   } else {
      mode.classList.replace("fa-moon", "fa-sun"); // moon to sun
   }

   document.querySelector("html").setAttribute("data-theme", themeData); // light Or dark
}

// ! ==============> Functions =============>
mode.addEventListener("click", function (e) {
   if (mode.classList.contains("fa-sun")) {
      document.querySelector("html").setAttribute("data-theme", "light");
      mode.classList.replace("fa-sun", "fa-moon"); // change icon -->moon

      localStorage.setItem("theme", "light");
   } else {
      mode.classList.replace("fa-moon", "fa-sun"); //change icon -->sun
      document.querySelector("html").setAttribute("data-theme", "dark");
      localStorage.setItem("theme", "dark");
   }
});


(async function() {

    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '5af869a474msh3cea804dd0625f2p1a8444jsnfadb16d57b61',
            'X-RapidAPI-Host': 'free-to-play-games-database.p.rapidapi.com'
        },
    };
    const api = await fetch(`https://free-to-play-games-database.p.rapidapi.com/api/game?id=${id}`, options)
    const responseData = await api.json();
    containerDetails = responseData;
    displayData();
    console.log(responseData);
})();


function displayData() {
    const detailsBox = `
   
    <div class="col-md-4">
    <figure>
       <img src="${containerDetails.thumbnail}" class="w-100" alt="details image" />
    </figure>
 </div>
 <div class="col-md-8">
 
    <div>
       <nav aria-label="breadcrumb">
          <ol class="breadcrumb" class="text-light">
             <li class="breadcrumb-item text-reset"><a href="./home.html">Home</a></li>
             <li class="breadcrumb-item text-info" aria-current="page">${containerDetails.title}</li>
          </ol>
       </nav>
 
       <h1>${containerDetails.title}</h1>
 
       <h3>About ${containerDetails.title}</h3>
       <p>${containerDetails.description}</p>
 
       
    </div>
 </div>
 
    `;

    document.getElementById('detailsData').innerHTML = detailsBox;

    const backgroundImage = containerDetails.thumbnail.replace('thumbnail' , 'background')
    document.body.style.cssText = `
    background-image:url('${backgroundImage}');
     background-size:cover; 
     background-postion:center; `;
}
 