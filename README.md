# EGameInfo

EGameInfo är en app för att komma åt information om spelar i spelet League of legends.
Man se information om en spelare så som vilken karaktär de splear mest.
Man kan också se information om matchen de spelar 'just nu' så som
vilka spelare som finns med i matchen och deras lag, vilka karaktärer de spelar och vilka 'spells' de har.

Appen stöder också vilka karaktärer som är gratis för alla i nuvarande vecka och
vilka som är gratis för nya spelare.

Jag hämtar min data från följande **APIs**:
[Riot Games (LoL)](https://developer.riotgames.com/)

[Data dragon](https://developer.riotgames.com/static-data.html) (också från Riot Games)

## Code struktur

### JS

All data som är känslig eller global så som Api keys, proxyUrl eller versioner
lagrar jag i en module _models/_**Auth.js** och alla function som hämtar data från APIs
ligger i _models/_**league.js**.

Varje sida har sin egen view file i _views/_. För sidor med inputs (där man söker)
har en view som slutar med **\_search.js** och sidan med information för vad man
sökte efter slutar med **\_info.js**, så filerna för sökning efter aktuella matcher
kan vara _views/_**leauge_live_search.js** som sen redirects till _views/_**league_live_info.js**.

### CSS

Scss filer heter samma som deras **.js**. Sök sidorna behöver bara css från **base.scss** och **input.scss**. All scss för league sidorna ligger i league mappen.

Media queries ligger i respektive fil tillsammans med dess default scss.

### Icon/Splash screen

Filerna (img) för Ikoner och splash screens ligger i _res/_ och sedan typ av bilder och respektive enhet som tex. _res/_**screen/android**.

### Other

Filer som nästan aldrig rörs (kod från andra kodare) som t.ex. **proxy.php** från 'Emil Folino' ligger i mappen _static/_.
