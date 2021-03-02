// create an array - SongObject(s) will be placed in here
let songArray = [];

// define a SongObject Constructor
let SongObject = function (pSong, pArtist, pAlbum, pGenre ,pYear, pSpotify, pYoutube) {
    this.ID = songArray.length + 1;;
    this.Song = pSong;
    this.Artist = pArtist;
    this.Album = pAlbum;
    this.Genre = pGenre;
    this.Year = pYear;
    this.YoutubeURL = pYoutube;
    this.SpotifyURL = pSpotify;
}

songArray.push(new SongObject("Dirty Deeds Done Dirt Cheap", "ACDC", "Dirty Deeds Done For Cheap", "Rock", 1976, "https://open.spotify.com/track/2d4e45fmUnguxh6yqC7gNT?si=EzQFFb_CSO2bA8DzrNM77g","https://www.youtube.com/watch?v=UIE4UjBtx-o"));

document.addEventListener("DOMContentLoaded", function () {

    createList();

    ////Button To Add Song to songArray
    document.getElementById("buttonAdd").addEventListener("click", function () {
    songArray.push(new SongObject(document.getElementById("song").value, document.getElementById("artist").value,
        document.getElementById("album").value, document.getElementById("genre").value, document.getElementById("year").value, document.getElementById("youtube").value, document.getElementById("spotify").value));
    document.location.href = "index.html#ListMusic";
    });
    //Button to clear Music Values in Input form
    document.getElementById("buttonClear").addEventListener("click", function () {
    document.getElementById("song").value = "";
    document.getElementById("artist").value = "";
    document.getElementById("album").value = "";
    document.getElementById("genre").value = "";
    document.getElementById("year").value = "";
    document.getElementById("youtube").value = "";
    document.getElementById("spotify").value = "";
    });


    //We can add something like this for the Genre if you'd like
    //my thinking is with 1000s of music genre's we might have a bit of HW to do lol.
    $(document).bind("change", "#select-genre", function (event, ui) {
        selectedGenre = $('#select-genre').val();
    });

    document.getElementById("delete").addEventListener("click", function () {
        deleteMovie(document.getElementById("IDparmHere").innerHTML);
        createList();  // recreate li list after removing one
        document.location.href = "index.html#ListMusic";  // go back to movie list 
    });

// 2 sort button event methods
    document.getElementById("buttonSortTitle").addEventListener("click", function () {
        movieArray.sort(dynamicSort("Title"));
        createList();
        document.location.href = "index.html#ListMusic";
    });

    document.getElementById("buttonSortGenre").addEventListener("click", function () {
        movieArray.sort(dynamicSort("Genre"));
        createList();
        document.location.href = "index.html#ListMusic";
    });

    // button on details page to view the youtube video
    document.getElementById("trailer").addEventListener("click", function () {
        window.open(document.getElementById("oneURL").innerHTML);
    });

    document.getElementById("buttonSubsetComedy").addEventListener("click", function () {
       
        createListSubset("Comedy");  // recreate li list after removing one
        //document.location.href = "index.html#ListSome";  // go back to movie list 
    });

    document.getElementById("buttonSubsetDrama").addEventListener("click", function () {
       
        createListSubset("Drama");  // recreate li list after removing one
        //document.location.href = "index.html#ListSome";  // go back to movie list 
    });
// end of add button events ************************************************************************

  
  
// page before show code *************************************************************************
    // page before show code *************************************************************************
    $(document).on("pagebeforeshow", "#ListMusic", function (event) {   // have to use jQuery 
        createList();
    });

    $(document).on("pagebeforeshow", "#ListSome", function (event) {   // have to use jQuery 
        // clear prior data
        var divMovieList = document.getElementById("divMovieListSubset");
        while (divMovieList.firstChild) {    // remove any old data so don't get duplicates
            divMovieList.removeChild(divMovieList.firstChild);
        };
    });

    // need one for our details page to fill in the info based on the passed in ID
    $(document).on("pagebeforeshow", "#details", function (event) {   // have to use jQuery 
        let localID = document.getElementById("IDparmHere").innerHTML;
        let arrayPointer = GetArrayPointer(localID);
        document.getElementById("oneTitle").innerHTML = "The title is: " + movieArray[arrayPointer].Title;
        document.getElementById("oneYear").innerHTML = "Year released: " + movieArray[arrayPointer].Year;
        document.getElementById("oneGenre").innerHTML = "Genre: " + movieArray[arrayPointer].Genre;
        document.getElementById("oneWoman").innerHTML = "Leading Woman: " + movieArray[arrayPointer].Woman;
        document.getElementById("oneMan").innerHTML = "Leading Man: " + movieArray[arrayPointer].Man;
        document.getElementById("oneURL").innerHTML = movieArray[arrayPointer].URL;
    });
 
// end of page before show code *************************************************************************

});  
// end of wait until document has loaded event  *************************************************************************

// next 2 functions could be combined into 1 with a little work
// such as I could pass in a variable which said which divMovieList div it should draw
// to, and if no value is passed in to subset too, I could just include all.

function createList() {
    // clear prior data
    let divMusic = document.getElementById("divMusic");
    while (divMusic.firstChild) {    // remove any old data so don't get duplicates
        divMusic.removeChild(divMusic.firstChild);
    };

    let ul = document.createElement('ul');

    songArray.forEach(function (element,) {   // use handy array forEach method
        var li = document.createElement('li');
        // adding a class name to each one as a way of creating a collection
        li.classList.add('oneMusic'); 
        // use the html5 "data-parm" to encode the ID of this particular data object
        // that we are building an li from
        li.setAttribute("data-parm", element.ID);
        li.innerHTML = element.ID + ":  " + element.Song + "  " + element.Genre + " " + element.Album;
        ul.appendChild(li);
    });
    divMusic.appendChild(ul)

    // now we have the HTML done to display out list, 
    // next we make them active buttons
    // set up an event for each new li item, 
    var liArray = document.getElementsByClassName("oneMovie");
    Array.from(liArray).forEach(function (element) {
        element.addEventListener('click', function () {
        // get that data-parm we added for THIS particular li as we loop thru them
        var parm = this.getAttribute("data-parm");  // passing in the record.Id
        // get our hidden <p> and write THIS ID value there
        document.getElementById("IDparmHere").innerHTML = parm;
        // now jump to our page that will use that one item
        document.location.href = "index.html#details";
        });
    });

};

function deleteMovie(which) {
    console.log(which);
    let arrayPointer = GetArrayPointer(which);
    movieArray.splice(arrayPointer, 1);  // remove 1 element at index 
}

// cycles thru the array to find the array element with a matching ID
function GetArrayPointer(localID) {
    for (let i = 0; i < movieArray.length; i++) {
        if (localID === movieArray[i].ID) {
            return i;
        }
    }
}
  

function createListSubset(whichType) {
    // clear prior data
    var divMovieList = document.getElementById("divMovieListSubset");
    while (divMovieList.firstChild) {    // remove any old data so don't get duplicates
        divMovieList.removeChild(divMovieList.firstChild);
    };

    var ul = document.createElement('ul');

    songArray.forEach(function (element,) {
        
        if (element.Genre === whichType) {
            // use handy array forEach method
            var li = document.createElement('li');
            // adding a class name to each one as a way of creating a collection
            li.classList.add('oneMovie');
            // use the html5 "data-parm" to encode the ID of this particular data object
            // that we are building an li from
            li.setAttribute("data-parm", element.ID);
            li.innerHTML = element.ID + ":  " + element.Title + "  " + element.Genre;
            ul.appendChild(li);
        }
    });
    divMovieList.appendChild(ul)

    // now we have the HTML done to display out list, 
    // next we make them active buttons
    // set up an event for each new li item, 
    var liArray = document.getElementsByClassName("oneMovie");
    Array.from(liArray).forEach(function (element) {
        element.addEventListener('click', function () {
            // get that data-parm we added for THIS particular li as we loop thru them
            var parm = this.getAttribute("data-parm");  // passing in the record.Id
            // get our hidden <p> and write THIS ID value there
            document.getElementById("IDparmHere").innerHTML = parm;
            // now jump to our page that will use that one item
            document.location.href = "index.html#details";
        });
    });

};

/**
 *  https://ourcodeworld.com/articles/read/764/how-to-sort-alphabetically-an-array-of-objects-by-key-in-javascript
* Function to sort alphabetically an array of objects by some specific key.
* 
* @param {String} property Key of the object to sort.
*/
function dynamicSort(property) {
    var sortOrder = 1;

    if (property[0] === "-") {
        sortOrder = -1;
        property = property.substr(1);
    }

    return function (a, b) {
        if (sortOrder == -1) {
            return b[property].localeCompare(a[property]);
        } else {
            return a[property].localeCompare(b[property]);
        }
    }
}
