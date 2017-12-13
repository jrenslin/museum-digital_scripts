/* ==================
|  Script 
|= ================== */

(function () {

    // Removes all contents from a given element
    function emptyElement (id) {
        var element = document.getElementById(id);
        while (element.firstChild) {
            element.removeChild(element.firstChild);
        }
    }

    // Creates necessary output elements
    function setEnvironment () {
        var resultDiv = document.createElement("div");
        var resultList = document.createElement("ul");
        resultList.id = "listMDpreviews";

        resultDiv.appendChild(resultList);
        document.getElementsByTagName("body")[0].appendChild(resultDiv);
    }

    function addObjectToList (object) {

        var resultEntry = document.createElement("li");

        var resultImg = document.createElement("img");
        resultImg.src = "https://museum-digital.de/data/berlin/" + object['object_images'][0]['folder'] + "/" + object['object_images'][0]['preview'];
        resultEntry.appendChild(resultImg);

        var resultTitle = document.createElement("h3");
        resultTitle.textContent = object['object_name'];
        resultEntry.appendChild(resultTitle);

        var resultInstitution = document.createElement("span");
        resultInstitution.textContent = object['object_institution']['institution_name'];
        resultEntry.appendChild(resultInstitution);

        var resultList = document.getElementById("listMDpreviews");
        resultList.appendChild(resultEntry);

        resultEntry.addEventListener('click', function () {
            document.getElementById("object_id").value = object['object_id'];
            emptyElement ("listMDpreviews");
        });

    }

    function fetchObject (input) {

        console.log(input["objekt_id"]);

        var searchURL    = "https://www.museum-digital.de/berlin/index.php?t=objekt&output=json&oges=";
        var requestURL  = searchURL + input["objekt_id"];

        var request     = new XMLHttpRequest();
        request.open('GET', requestURL);
        request.setRequestHeader("Cache-Control", "no-cache");
        request.responseType = 'htm';
        request.send();
        var localelements;
        request.onload = function() {
            var object = JSON.parse(request.response);
            // console.log(elements);
            addObjectToList (object);
        };

    }

    function run () {

        emptyElement ("listMDpreviews");

        var objectNumber = "3";
        var searchURL    = "https://www.museum-digital.de/berlin/index.php?gbreitenat=" + objectNumber + "&output=json&ftext=1&sv=";
        var searchTerm   = document.getElementById("object_id").value;
        var requestURL  = searchURL + searchTerm;

        var request     = new XMLHttpRequest();
        request.open('GET', requestURL);
        request.setRequestHeader("Cache-Control", "no-cache");
        request.responseType = 'htm';
        request.send();
        var localelements;
        request.onload = function() {
            var elements = JSON.parse(request.response);
            // console.log(elements);
            elements.forEach(fetchObject);
        };

    }

    // ========
    // Run functions
    // ========

    console.log();

    if (document.getElementById("listMDpreviews") == null) {
        setEnvironment();
    }
    document.getElementById("object_id").addEventListener('keydown', run);

})();
