window.addEventListener("load",function(){
    var id=localStorage.getItem("imdb-id");

    getMovieInfo(id,displayRightPage,displayLeftPage);
});

function getMovieInfo(id,callback1,callback2){
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
        callback1(obj);
        callback2(obj);
    }
}

function displayLeftPage(obj){

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

function displayRightPage(obj){
    //display title of movie/series
    var title_name=obj["Title"];
    displayTitle(title_name);

    //display plot of movie/series
    var plot=obj["Plot"];
    displayPlot(plot);

    //display credits of movie/season
    var actors=obj["Actors"];
    displayList(actors,"Actors");

    //display director of movie/season
    var director=obj["Director"];
    displayList(director,"Director");

    //display writers
    var writers=obj["Director"];
    displayList(writers,"Writer/s");

    //display language
    var language=obj["Language"];
    displayList(language,"Language");

    //display country/countries
    var country=obj["Country"];
    displayList(country,"Countries");

    //display production company
    var production=obj["Production"];
    displayList(production,"Production");
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
    if(numbers !== undefined){        
        display.textContent=string+": "+numbers; 
    }
    else{
        display.classList.add("d-none");
    }
}

function displaySeasons(seasons,string){
    var display=document.querySelector("#season");
    if(seasons!== undefined){
        display.parentNode.classList.remove("d-none")
        display.textContent=string+": "+seasons; 
    }
}

function displayTitle(string){
    var display=document.querySelector("#title-name");
    display.textContent=string
}

function displayPlot(plot){
    var display=document.querySelector("#plot");
    display.textContent=plot;
}

function displayList(names,string){
    var display=document.createElement("li");
    display.textContent=string+": "+names+".";
    var list=document.querySelector("#credits");
    list.append(display);
}

