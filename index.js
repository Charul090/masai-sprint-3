var form1 = document.querySelector("#form1");

function searchMovie(event){
    event.preventDefault();

    var movie=document.querySelector("#movie-name");

    getInfoApi(movie.value,displayInfo,1);
}

function getInfoApi(movie,displayInfo,page){
    var xhr=new XMLHttpRequest();
    var api_key="6291a84a";
    var url =new URL("http://www.omdbapi.com/");
    
    var params = new URLSearchParams();
    params.set("apikey",api_key);
    params.set("s",movie);
    params.set("page",page);
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
    var container=document.querySelector("#movie-results");
    container.innerHTML="";
    for(var i=0;i<array.length;i++){

        var obj=array[i];
    
        var row=document.createElement("div");
        row.classList.add("row");

        var id=obj["imdbID"];

        var id_display=document.createElement("span");
        id_display.textContent=id;

        id_display.classList.add("d-none");
        id_display.setAttribute("id","imdb_id");

    
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
    
        //content 
        var content=document.createElement("div");
        content.classList.add("col-8","offset-1","d-flex","justify-content-between");
    
        //title of movie
        var title_div=document.createElement("div");
        var title=document.createElement("h1");
        title.classList.add("display-4");
        title.textContent=obj["Title"];
        title_div.append(id_display,title);
    
        //type cards
        var type_card=document.createElement("small");
        type_card.classList.add("p-1","text-white","mr-1");
        var type = obj["Type"];
    
        if(type === "movie"){
            type_card.textContent="Movie";
            type_card.classList.add("badge","badge-success");
        }
        else{
            type_card.textContent="Series";
            type_card.classList.add("badge","badge-warning");
        }
    
        title_div.append(type_card);
    
        //Year Cards
    
        var year_card=document.createElement("small");
        year_card.classList.add("p-1","text-white","badge","badge-danger");
        year_card.textContent=obj["Year"];
    
        title_div.append(year_card);
        content.append(title_div);
    
        //Infor div
        var info_div=document.createElement("div");
        info_div.classList.add("align-self-end");
        var btn2=document.createElement("button");
        btn2.textContent="INFO";
        btn2.classList.add("btn","btn-sm","btn-info");
        info_div.append(btn2);
        content.append(info_div);
    
        //Append all columns of a movie into row 
        row.append(image_div,content);
    
        //Append row into link-group
        link.append(row);
        container.append(link);

    }
}

function openInfoPage(event){
    var imdb_id=event.parentNode.parentNode.firstChild.childNodes[0];
    addIdtoLocalStorage(imdb_id.textContent);
    window.location.assign("info.html");    
}

function addIdtoLocalStorage(id){
    localStorage.setItem("imdb-id",JSON.stringify(id))
}

var container=document.querySelector("#movie-results");

container.addEventListener("click",function(){
    if(event.target.nodeName === "BUTTON"){
        openInfoPage(event.target);
    }
})
form1.addEventListener("submit",searchMovie);