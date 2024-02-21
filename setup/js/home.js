// ? ===========> Global ============>
let gamesData= [];
const loading = document.querySelector('.loading')
let btnN = document.getElementById("btnN");
getGames('mmorpg');
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

// * ==============> Events ===========>

document.querySelectorAll('.menu a').forEach(function (link) {
    link.addEventListener('click' , function(){
        document.querySelector('.menu .active').classList.remove("active");
        this.classList.add("active")
        const category = this.dataset.category;
        console.log(category); //log data
        getGames(category);  //connect api
    })
})
btnN.addEventListener("click" , function(){
  localStorage.removeItem("uToken");
  location.href = `./login.html`;
})

mode.addEventListener("click", function () {
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
// ! ==============> Functions =============>
async function getGames(categoryName) {
  loading.classList.remove('d-none'); //show loading
  const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '5af869a474msh3cea804dd0625f2p1a8444jsnfadb16d57b61',
            'X-RapidAPI-Host': 'free-to-play-games-database.p.rapidapi.com'
        }
  };
   
  const apiResponse = await fetch(`https://free-to-play-games-database.p.rapidapi.com/api/games?category=${categoryName}` , options)
  const data = await apiResponse.json();
  console.log(data); //log data API
  displayData(data);
  loading.classList.add('d-none'); //hide loading
}

function displayData(gamesData) {
  let gamesBox= ''
    for (let i = 0; i < gamesData.length; i++) {
       let videoPath = gamesData[i].thumbnail.replace('thumbnail.jpg', 'videoplayback.webm' )
        gamesBox += `
        <div class="col">
         <div onmouseenter="startVideo(event)" onmouseleave="stopVideo(event)" onclick="showDetails(${gamesData[i].id})" class="card h-100 bg-transparent" role="button" >
           <div class="card-body">

              <figure class="position-relative">
                <img class="card-img-top object-fit-cover" src="${gamesData[i].thumbnail}" />

                <video muted="true"  preload="none" loop   class="w-100 d-none h-100 position-absolute top-0 start-0 z-3">
                  <source src="${videoPath}">
                </video>

              </figure>

              <figcaption>

                <div class="hstack justify-content-between">
                  <h3 class="h6 small">${gamesData[i].title}</h3>
                  <span class="badge text-bg-primary p-2">Free</span>
                </div>

                <p class="card-text small text-center opacity-50">
                  ${gamesData[i].short_description}
                </p>

              </figcaption>
            </div>
           <footer class="card-footer small hstack justify-content-between">
             <span class="badge badge-color">${gamesData[i].genre}</span>
             <span class="badge badge-color">${gamesData[i].platform}</span>
           </footer>
          </div>
       </div>
      `;
      document.getElementById('gameData').innerHTML=gamesBox;
        
    }
}

function startVideo(event) {
  const videoEL = event.target.querySelector("video");
  videoEL.classList.remove("d-none");
  videoEL.muted = true
  videoEL.play();
}
function stopVideo(event) {
  const videoEL = event.target.querySelector("video");
  videoEL.classList.add("d-none");
  videoEL.muted = true
  videoEL.pause();
}
function showDetails(id) {
  location.href = `./details.html?id=${id}`;
}
//  ================> Validation =============>
 