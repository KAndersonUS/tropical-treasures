#Tropical Treasures
Slot Machine game designed for play in [Fish Center Live](http://fishcenterlive.com/)

## Gameplay
Tropical Treasures is a three reel, three line slot game. Spins are triggered by clicking on one of three red coins,
and the position of the coin determines the active pay line. In Fish Center, games are keyed over video of a fish
tank, allowing a level of interaction between the fish and the game. When a fish touches a red coin, it loses a point
and earns a spin.

This game doesn't actively keep track of points since this is typically done separately by Fish Center.
Each spin costs one point, and payouts are a fixed amount determined in `components/game/scoreLine.js`.

## Odds
The odds for this game were designed with help from 
[a case study](http://wizardofodds.com/play/slots/australian-reels/5-line/math/) by
 "The Wizard of Odds," Michael Shackleford, A.S.A.
 
 Because Fish Center is more about fish earning points – not losing them – the overall payout (55%) and ROI (183%)
  are initially geared to be much greater than a typical slot machine. The bulk of the payouts, however, are still
  lower-value "consolation wins."
  
 ## Adjusting Odds
 Odds depend on symbol frequency, which is set in the generateReels() function in `view/view.js`.
 
 A [spreadsheet is available here](https://docs.google.com/spreadsheets/d/1ErZBCWuksX-rJ36jA23zsAKUwKyv3DR-a8ctZ6ahg-A/edit?usp=sharing)
  to help with making adjustments to the symbol frequencies and payouts.

## Technical Notes
This game was built using Angular 1.4, starting with [angular-seed](https://github.com/angular/angular-seed).
Tests written with Jasmine and ran with Karma.

## Legal Notes
Fish Center images are copyright 2015 Adult Swim, part of Turner Broadcasting System, Inc. A Time Warner Company and used
with permission.
Audio components were sourced from [shockwave-sound.com](http://www.shockwave-sound.com/sound-effects/slot_machine_sounds.html)
Fonts were sourced from [dafont.com](http://dafont.com/) and are [Treasure Island](http://www.dafont.com/treasure-island2.font)
and [Treasure Map Deadland](http://www.dafont.com/treasure-map.font)
