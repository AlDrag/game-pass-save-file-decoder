# Microsoft Game Pass Save File Decoder

Games that run in Microsoft Game Pass's Xbox app on Windows write save files in a non-human readable format. They are encoded in some manner that makes it unreadable and incompatible with other platforms such as Steam.

The first steps is finding a way to decode the save files and then creating an application that can provide auto backups, conversion to steam etc.

Motivation for this came about when my friend and I wanted to share save files everyday in order to be able to share unlocks when playing in CO-OP in Snowrunner.

## Research Progress

> So far I've identified the save files contents are saved in hex format and I just need to convert from hex to GUID.

- I'm using Snow Runner as the basis for my development and research.
- The save files had some form of a UUID as a name.
- I discovered the `container.x` file that I couldn't fully read, even after trying lots of different encodings.
- I found [this website](https://www.save-editor.com/tools/wse_save_file_name_check_for_microsoft_store.html) that takes in a `container.x` file and returns the name of a file and their corresponding UUID so you can rename them yourself. Although it doesn't give you the perfect name as you still have to add a suffix in some cases for duplicate file names.
- I thought I could automate this for users through a program. Automatically re-write the file names etc in 1 click.
- I tried researching what this file type is. I came across some site <find the site> that lists all file encoding types and how they are identified through the beginning bytes in the file. Apparently the `container.x` file was identified as a `INFO2` windows file. Used for referencing files in the Recycling bin.
- I had no luck finding a reader that was easy to run to read this file as they all seemed to be tailored to work with the Recycling bin.
- I decided to try read this file using a program called HxD. It allowed me to read the file in hexcode. I could see the names of the files, but couldn't identify the UUID.
- When clicking around on different hex values in HxD I noticed there was a changing `GUID` value. When I selected the invalid characters it showed a correct GUID that I was looking for!
- I then verified my findings by finding a site online to convert a hex sequence to a GUID, and it worked!
- I now needed to find a method to programmatically convert a UUID to a GUID. They are produced differently to UUID v4.
- The site I was using to test GUID conversion had a comment section at the bottom https://toolslick.com/conversion/data/guid. An awesome guy posted a code method (possibly C#) that converts GUID to Hex! I just needed to reverse the logic to convert a HEX to a GUID.