window.addEventListener("load",function(){
    var id=localStorage.getItem("imdb-id");

    getMovieInfo(id,displayRightPage);
});

function getMovieInfo(id,callback){
    id=JSON.parse(id);
    var xhr=new XMLHttpRequest();
    var api_key="6291a84a";
    var url =new URL("http://www.omdbapi.com/");
    
    var params = new URLSearchParams();
    params.set("apikey",api_key);
    params.set("i",id);
    url.search=params.toString();
    
    xhr.open("GET",url.href);
    xhr.send();
    xhr.onload=function(){
        var obj=JSON.parse(this.response);
        console.log(obj)
        callback(obj);
    }
}

function displayRightPage(obj){

    //display Poster
    var poster=obj["Poster"];
    displayPoster(poster);

    //display genre of movie
    var genre=obj["Genre"];
    displayGenre(genre,"Genre")

    //display release date of movie
    var release_date=obj["Released"];
    displayRealeaseDate(release_date,"Released");

    //display age rate of movie
    var age_rate=obj["Rated"];
    displayAgeRating(age_rate,"Rated");

    //display runtime of movie
    var runtime=obj["Runtime"];
    displayRuntime(runtime,"Runtime");

    //display imdb rating
    var imdb_rating=obj["imdbRating"];
    displayImdb(imdb_rating,"IMDB");

    //display box office of movie
    var box_office=obj["BoxOffice"];
    displayBoxOffice(box_office,"Box Office");

    //display seasons for series
    if(obj["Type"] === "series"){
        var seasons=obj["totalSeasons"];
        displaySeasons(seasons,"Seasons")
    }

}

function displayGenre(genre,string){
    var display=document.querySelector("#genre");
    var text=string+": "+genre;
    display.textContent="";
    display.textContent=text;
}

function displayPoster(url){
    var display=document.getElementById("poster");
    display.setAttribute("src",url);
}

function displayRealeaseDate(date,string){
    var display=document.querySelector("#release");
    display.textContent=string+": "+date;
}

function displayAgeRating(rating,string){
    var display=document.querySelector("#rated");
    display.textContent=string+": "+rating
}

function displayRuntime(runtime,string){
    var display=document.querySelector("#runtime");
    display.textContent=string+": "+runtime;
}

function displayImdb(rating,string){
    var display=document.querySelector("#imdb");
    display.textContent=string+": "+rating;
}

function displayBoxOffice(numbers,string){
    var display=document.querySelector("#box-office");
    display.textContent=string+": "+numbers; 
}

function displaySeasons(seasons,string){
    var display=document.querySelector("#season");
    display.textContent=string+": "+seasons; 
}