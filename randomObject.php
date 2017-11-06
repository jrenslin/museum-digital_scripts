<?PHP
error_reporting(E_ALL);
ini_set("display_errors", 1);

define ("errorMsg", "At this moment the object cannot be shown.<br>Possibly there are rights questions or the object information is updated.<br>As soon as possible the object will be displayed here again.");

// Returns false if no object could be found
function fetchObject ($version, $noOfObjects) {

    // Fetch object with an ID anywhere between 0 and the maximum
    $content = file_get_contents($version . "?t=objekt&oges=" . rand(0, $noOfObjects). "&output=json");

    // If no error was returned, return decoded contents; else run the function again
    if ($content != errorMsg) return json_decode($content, True);
    else return fetchObject ($version, $noOfObjects);

}

// Main Function
function getRandomObject ($version) {
    $noOfObjects = json_decode(file_get_contents($version . "?output=json"), True)["objects"];

    $object = fetchObject($version, $noOfObjects);
    return ($object);
}

function printTile ($object) {
    echo <<< EOD
<div>
    <img src="https://museum-digital.de/data/thue/{$object['object_images'][0]['folder']}/{$object['object_images'][0]['preview']}" />
    <h3>{$object['object_name']}</h3>
</div>
EOD;
}

echo <<< EOD
<style>
    html { background: #000; }
    body { position: absolute; left: 50%; top: 50%; transform: translate(-50%, -50%); padding: 1em; border: 2px solid #555; border-radius: 3px; text-align: center; background: #fff; }

</style>
EOD;

printTile(getRandomObject("https://www.museum-digital.de/thue/"));

?>