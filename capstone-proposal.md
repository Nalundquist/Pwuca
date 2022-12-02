### Independent Capstone Project Proposal for Epicodus

-----------------------

## Student Name: Noah Lundquist

## Project Name:

# Pwuca

### Project Goal: Create a variation on the group/parlor word game "Ghost" that is playable online.  Pwuca will be a variation on the vanilla Ghost ruleset involving letters placeable at different parts of a word/ability to flip a word based upon useable tokens/points gained at the start of each round.  The vibe will be mischevious, adverserial, and fun.

#### MVP:

* At very least user should be able to access the Pwuca app and play with other users on the same computer/locally.
* Pwuca will ask for (prospectively) 2-5 players
* Players will take turns playing letters trying not to be the one to complete an english word above three letters; if they do they will receive a "P", "W", "U", "C", or "A" (said penalizing points referred to as PWUCAs from here on out)in sequence, dropping out of the game when they receive all five.  The last player standing is the winner.
* Pwuca will take player names and choose a player randomly to start and give a turn order to other players.
* The first player will choose a letter from the english alphabet and then subsequent players will choose a letter to add to either the beginning or end of this string *so long as* said string is a fragment of an English word (non-proper) above three letters long.
* If any player is convinced that the most recently played letter created a fragment that *is not* a part of any existing word, any individual player can challenge the player who played the last letter and that player will be prompted to input a word that includes said fragment.  If said word *is* a word according to the (Free Dictionary API)[http://dictionaryapi.dev], the player who challenged will receive a PWUCA.  If it *is not*, the player who last played a letter will receive a PWUCA instead.  In both cases, the current fragment will be cleared and the next round will begin.
* Once the fragment reaches four or more letters any fragment will be automatically searched on the dictionary api; if a word with a definintion comes back the player who played the word-completing letter gains a PWUCA, the word is cleared and the next round begins.

