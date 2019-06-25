# EGameInfo

EGameInfo är en app för att komma åt information om spelar i spelet League of legends.
Man se information om en spelare så som vilken karaktär de splear mest.
Man kan också se information om matchen de spelar 'just nu' så som
vilka spelare som finns med i matchen och deras lag, vilka karaktärer de spelar och vilka 'spells' de har.

Jag hämtar min data från följande APIs:
[Riot Games (LoL)](https://developer.riotgames.com/)

[Data dragon](https://developer.riotgames.com/static-data.html) (också från Riot Games)

## Code Struktur

All data som är känslig eller global så som Api keys, proxyUrl eller versioner
lagrar jag i en module 'models/Auth.js' och alla function som hämtar data från APIs
ligger i 'models/league.js'.
