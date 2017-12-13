# Collection of Scripts Using the API of Museum-Digital

This is a collection of scripts for interacting with the APIs of Museum-Digital.

## Scripts

### randomObject.php

This script displays a random object from a given version of museum-digital. It first checks how many objects are available in the given version and then fetches objects of a random ID between 0 and the number of all objects. Note that IDs may range far higher than the total number of displayed objects (because of hidden objects), and this is just a very, very simplistic implementation.

### museum-digital-search-previews/

Using the example of the search function for objects from the Berlin instance of museum-digital, this script uses the API to generate previews for the first objects returned by the search API. Clicking on the preview inserts the object's ID into the field with id `object_id`.

Currently CSPs on the museum-digital server prevent this script from being used outside. Ask us to fix it, if you want to use something similar.
