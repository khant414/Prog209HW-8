// create an array - SongObject(s) will be placed in here
let songArray = [];
let param = null;

// define a SongObject Constructor
const SongObject = function (
    pSong,
    pArtist,
    pAlbum,
    pGenre,
    pYear,
    pSpotify,
    pYoutube
) {
    this.ID = songArray.length + 1;
    this.Song = pSong;
    this.Artist = pArtist;
    this.Album = pAlbum;
    this.Genre = pGenre;
    this.Year = pYear;
    this.YoutubeURL = pYoutube;
    this.SpotifyURL = pSpotify;
};

songArray.push(
    new SongObject(
        "Dirty Deeds Done Dirt Cheap",
        "ACDC",
        "Dirty Deeds",
        "Rock",
        1976,
        "https://www.youtube.com/watch?v=UIE4UjBtx-o",
        "https://open.spotify.com/track/2d4e45fmUnguxh6yqC7gNT?si=EzQFFb_CSO2bA8DzrNM77g"
    )
);

songArray.push(
    new SongObject(
        "Solitude",
        "Black Sabath",
        "Masters Of Reality",
        "Rock",
        1971,
        "https://www.youtube.com/watch?v=vmV8niW5GXs",
        "https://open.spotify.com/track/0wjptUxT1jhKZ3Xm4lX8OF?si=jH-n0eCQTIWUBVPfcuEFTw"
    )
);
songArray.push(
    new SongObject(
        "Straight Through The Heart",
        "Dio",
        "Holy Diver",
        "Rock",
        1983,
        "https://www.youtube.com/watch?v=4vDjoLOAA6k",
        "https://open.spotify.com/track/1dlBMzm6CqwQIUQ8PbT3NP?si=DzMnM4TkSySgcwIiJSxxsw"
    )
);
songArray.push(
    new SongObject(
        "Tribute",
        "Tenacious D",
        "Tenacious D",
        "Rock",
        2001,
        "https://www.youtube.com/watch?v=_lK4cX5xGiQ",
        "https://open.spotify.com/track/6crBy2sODw2HS53xquM6us?si=rEPTfIqIQlqbygcxgyFZVA"
    )
);
songArray.push(
    new SongObject(
        "Slow Dancing in the Dark",
        "Joji",
        "BALLADS 1",
        "Hip Hop",
        2018,
        "https://www.youtube.com/watch?v=K3Qzzggn--s",
        "https://open.spotify.com/track/0rKtyWc8bvkriBthvHKY8d?si=sK2Qf_F0QoKcyVfF5P2MFA"
    )
);
songArray.push(
    new SongObject(
        "Dean Town",
        "Vulfpeck",
        "The Beautiful Game",
        "Funk",
        2016,
        "https://www.youtube.com/watch?v=le0BLAEO93g",
        "https://open.spotify.com/track/1oOD1pV43cV9sHg97aBdLs?si=wEqbmvbET1WNxu6FEmXHXA"
    )
);

songArray.push(
    new SongObject(
        "Whiskey River",
        "Willie Nelson",
        "Heroes",
        "Country",
        2018,
        "https://www.youtube.com/watch?v=oVI4dzbYXMc",
        "https://open.spotify.com/track/6gS6XQ4OqMddkgzHNz40E5?si=Abqs74dtTqWuLVerRdvfwA"
    )
);

document.addEventListener("DOMContentLoaded", function (e) {
    createList();

    ////Button To Add Song to songArray
    document.getElementById("buttonAdd").addEventListener("click", function () {
        songArray.push(
            new SongObject(
                document.getElementById("song").value,
                document.getElementById("artist").value,
                document.getElementById("album").value,
                document.getElementById("genre").value,
                document.getElementById("year").value,
                document.getElementById("youtube").value,
                document.getElementById("spotify").value
            )
        );
        document.location.href = "index.html#ListMusic";
    });
    //Button to clear Music Values in Input form
    document
        .getElementById("buttonClear")
        .addEventListener("click", function () {
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
        selectedGenre = $("#select-genre").val();
    });

    document.getElementById("delete").addEventListener("click", function () {
        removeSong(document.getElementById("IDparmHere").innerHTML);
        createList(); // recreate li list after removing one
        document.location.href = "index.html#ListMusic"; // back to musicList
    });

    // 2 sort button event methods
    document
        .getElementById("buttonSortTitle")
        .addEventListener("click", function () {
            songArray.sort(dynamicSort("Song"));
            createList();
            document.location.href = "index.html#ListMusic";
        });

    document
        .getElementById("buttonSortGenre")
        .addEventListener("click", function () {
            songArray.sort(dynamicSort("Genre"));
            createList();
            document.location.href = "index.html#ListMusic";
        });

    // button on details page to view the youtube video
    document
        .getElementById("openYoutube")
        .addEventListener("click", function () {
            window.open(document.getElementById("oneYoutube").innerHTML);
        });

    document
        .getElementById("openSpotify")
        .addEventListener("click", function () {
            window.open(document.getElementById("oneSpotify").innerHTML);
        });
    // end of add button events ************************************************************************

    
    // page before show code *************************************************************************
    $(document).on("pagebeforeshow", "#ListMusic", function (event) {
        // have to use jQuery
        createList();
    });

    $(document).on("pagebeforeshow", "#ListSome", function (event) {
        // have to use jQuery
        // clear prior data
        var divMovieList = document.getElementById("divMovieListSubset");
        while (divMovieList.firstChild) {
            // remove any old data so don't get duplicates
            divMovieList.removeChild(divMovieList.firstChild);
        }
    });

    // need one for our details page to fill in the info based on the passed in ID
    $(document).on("pagebeforeshow", "#details", function (event) {
        // have to use jQuery
        let localID = localStorage.getItem("ID");
        console.log(localID);
        let idx = GetArrayPointer(localID);

        document.getElementById("oneTitle").innerHTML = songArray[idx].Song;
        document.getElementById("oneArtist").innerHTML = songArray[idx].Artist;
        document.getElementById("oneAlbum").innerHTML = songArray[idx].Album;
        document.getElementById("oneGenre").innerHTML = songArray[idx].Genre;
        document.getElementById("oneYear").innerHTML = songArray[idx].Year;
        document.getElementById("oneYoutube").innerHTML =
            songArray[idx].YoutubeURL;
        document.getElementById("oneSpotify").innerHTML =
            songArray[idx].SpotifyURL;
    });

    // end of page before show code *************************************************************************
});
// end of DOMContentLoaded

function createList() {
    // clear prior data
    let divMusic = document.getElementById("divMusic");
    while (divMusic.firstChild) {
        // remove any old data so don't get duplicates
        divMusic.removeChild(divMusic.firstChild);
    }

    let ul = document.createElement("ul");

    songArray.forEach(function (element) {
        // use handy array forEach method
        var li = document.createElement("li");
        // adding a class name to each one as a way of creating a collection
        li.classList.add("oneMusic");
        // use the html5 "data-parm" to encode the ID of this particular data object
        // that we are building an li from
        li.setAttribute("data-parm", element.ID);
        li.innerHTML =
            element.ID +
            ":  " +
            " Title: " +
            element.Song +
            ",  " +
            " Genre: " +
            element.Genre +
            ", " +
            " Album: " +
            element.Album;
        ul.appendChild(li);
    });
    divMusic.appendChild(ul);

    // now we have the HTML done to display out list,
    // next we make them active buttons
    // set up an event for each new li item,
    let liArray = Array.from(document.getElementsByClassName("oneMusic"));
    liArray.forEach(function (element) {
        element.addEventListener("click", function () {
            // get that data-parm we added for THIS particular li as we loop thru them
            var parm = this.getAttribute("data-parm"); // passing in the record.Id
            // get our hidden <p> and write THIS ID value there
            document.getElementById("IDparmHere").innerHTML = parm;
            param = parseInt(parm);

            localStorage.setItem("ID", param);

            // now jump to our page that will use that one item
            document.location.href = "index.html#details";
        });
    });
}

function removeSong(which) {
    console.log(which);
    let arrayPointer = GetArrayPointer(which);
    songArray.splice(arrayPointer, 1); // remove 1 element at index
}

// cycles thru the array to find the array element with a matching ID
function GetArrayPointer(localID) {
    console.log("LocalID #2: " + localID);
    for (let i = 0; i < songArray.length; i++) {
        console.log("songarray[i].ID: " + songArray[i].ID);
        if (localID == songArray[i].ID) {
            return i;
        }
    }
}

function createListSubset(whichType) {
    // clear prior data
    var divMovieList = document.getElementById("divMovieListSubset");
    while (divMovieList.firstChild) {
        // remove any old data so don't get duplicates
        divMovieList.removeChild(divMovieList.firstChild);
    }

    var ul = document.createElement("ul");

    songArray.forEach(function (element) {
        if (element.Genre === whichType) {
            // use handy array forEach method
            var li = document.createElement("li");
            // adding a class name to each one as a way of creating a collection
            li.classList.add("oneMovie");
            // use the html5 "data-parm" to encode the ID of this particular data object
            // that we are building an li from
            li.setAttribute("data-parm", element.ID);
            li.innerHTML =
                element.ID + ":  " + element.Title + "  " + element.Genre;
            ul.appendChild(li);
        }
    });
    divMovieList.appendChild(ul);

    // now we have the HTML done to display out list,
    // next we make them active buttons
    // set up an event for each new li item,
    var liArray = document.getElementsByClassName("oneMovie");
    Array.from(liArray).forEach(function (element) {
        element.addEventListener("click", function () {
            // get that data-parm we added for THIS particular li as we loop thru them
            var parm = this.getAttribute("data-parm"); // passing in the record.Id
            // get our hidden <p> and write THIS ID value there
            document.getElementById("IDparmHere").innerHTML = parm;
            // now jump to our page that will use that one item
            document.location.href = "index.html#details";
        });
    });
}

/**
 *  https://ourcodeworld.com/articles/read/764/how-to-sort-alphabetically-an-array-of-objects-by-key-in-javascript
 * Function to sort alphabetically an array of objects by some specific key.
 *
 * @param {String} property Key of the object to sort.
 */
function dynamicSort(property) {
    console.log(property);
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
    };
}
