# Collection of Scripts Using the API of Museum-Digital

This is a collection of scripts for interacting with the APIs of Museum-Digital.

## Scripts

### randomObject.php

This script displays a random object from a given version of museum-digital. It first checks how many objects are available in the given version and then fetches objects of a random ID between 0 and the number of all objects. Note that IDs may range far higher than the total number of displayed objects (because of hidden objects), and this is just a very, very simplistic implementation.
