var form1 = document.querySelector("#form1");

function searchMovie(event){
    event.preventDefault();

    var movie=document.querySelector("#movie-name");

    getInfoApi(movie.value,displayInfo);
}

function getInfoApi(movie,displayInfo){
    var xhr=new XMLHttpRequest();
    var api_key="6291a84a";
    var url =new URL("http://www.omdbapi.com/");
    
    var params = new URLSearchParams();
    params.set("apikey",api_key);
    params.set("s",movie);
    url.search=params.toString()
    
    xhr.open("GET",url.href);
    xhr.send();
    xhr.onload=function(){
        if(this.status == 200){
            var obj=JSON.parse(this.response);
            displayInfo(obj.Search)
        }
    }
}

function displayInfo(array){
    console.log(array[0])
    var obj=array[0];
    var container=document.querySelector("#movie-results");

    var row=document.createElement("div");
    row.classList.add("row");

    //a element to make listgroup linked
    var link=document.createElement("a");
    link.classList.add("list-group-item","list-group-item-action");

    //image column
    var image_div=document.createElement("div");
    image_div.classList.add("col-3");

    //image
    var image=document.createElement("img");
    image.setAttribute("src",obj["Poster"]);
    image.classList.add("img-fluid","img-thumbnail");

    image_div.append(image);
    row.append(image_div);
    link.append(row);
    container.append(link);

    //content 
    var content=document.createElement("div");
    content.classList.add("col-6","offset-2");

    //title of movie
    var title=document.createElement("h1");
    title.classList.add("display-4");
    title.textContent=obj["Title"];
    content.append(title);

    //type and year cards
    var type_card=document.createElement()


}

form1.addEventListener("submit",searchMovie);