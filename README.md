# Pwuca

### Created by Noah Lundquist in December of 2022

## Links

* [Repository](https://github.com/nalundquist/pwuca)

## Description

![Pwuca Diagram](./src/img/pwuca-diagram-0.1.png)
A word game derived from the classic game [Ghost](https://en.wikipedia.org/wiki/Ghost_(game)).  Base MVP as of this writing is to make it playable on a local machine with players taking turns at the keyboard and words checked against an API, end goal is to have online play and lobbies.  This game which gave teen me such pedantic delight will finally be able to take its mischief onto the internet.

#### Rules

* 2-5 (?) Players
* Players input names and are given a turn order at random.
* Players take turns playing letters, building a word fragment
* Said fragment must always be a part of a word of four or more letters, i.e. if a player played an "A" at the beginning of "STE" they would make "ASTE" which could become "HASTE", "ASTER", "FASTEN", etc, and as such would be an eligible fragment.
* When any player completes a word of four or more letters they are given a letter "P", "W, "U", "C", or "A", which is not good.
* Once any player gets all five PWUCAs, they drop from the game.
* The last player standing wins.
* Turn Order:

	* First player plays a letter
	* After this, each subsequent player adds a letter to the beginning or end of the existing fragment with the condition this fragment *must always be a part of a non-proper English word with more than three letters* (Specifically, something that comes up as a result when querying the [Free Dictionary API](https://dictionaryapi.dev/)).
	* If any player completes a word of four letters they receive a PWUCA, the letter board is reset, and the next round begins.
	* If any player is convinced that the current fragment on the board *is not* part of a word they can challenge the fragment.  If the player who last input a letter can input an eligible word that includes the current word fragment (unbroken) as a part the player who challenged will receive a PWUCA.  If not, the player who played the last letter will instead receive a PWUCA.  In either case, the board will be reset and the next round will begin.
	* Play will continue with players begin eliminated one-by-one until one remains.

* Some say that one who wins will receive a boon from a Pwuca at some point as a result and those who lose will instead be harried by their mischief.  I don't believe in such things, however...

## Features

* Utilizes React and state to track multiple players and their actions.
* Allows users to manipulate a growing word fragment
* Ruins interpersonal relationships


## Technologies Used

* Built in VS Code (v.1.70.1) using the following languages:
	* Javascript
	* React
	* CSS
	* JSX
	* HTML

Tested in Latest Google Chrome build

## Installation


* Download [Git Bash](https://git-scm.com/downloads)
* Input the following into Git Bash to clone this repository onto your computer:

		>git clone https://github.com/nalundquist/pwuca

* Enter the cloned project folder "pwuca-dev" and type:

		>npm install

* After such you can type:

		>npm run start

* To host the site on your machine at localhost:3000.

## Known Bugs

## License

Licensed under [GNU GPL 3.0](https://www.gnu.org/licenses/gpl-3.0.en.html)