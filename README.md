# Hemuppgift - frontend

## Uppgift: Skapa ett bildgalleri med bilder hämtade från flickr

Uppgiften går ut på att koda ett bildgalleri som hämtar data från Flickrs publika API och visar upp resultatet i en webbsida. Välj en bildkategori som du gillar, till exempel katter!

Vilka övriga "features" ditt galleri har lämnar vi öppet - men några förslag följer nedan.

Din _JavaScript_ ska vara skriven i [VanillaJS](http://vanilla-js.com/). Därmed är inte ramverk som t.ex. React eller Angular tillåtna. Inte heller jQuery eller liknande bibliotek. Däremot är byggsteg som till exempel hjälper dig att bundla modulär kod eller använda moderna EcmaScript-features OK att använda (tex Browserify och BabelJS).

Även för _HTML/CSS_ vill vi att du undviker stora ramverk som Bootstrap eller Foundation. Preprocessorer såsom Pug och Sass är OK.

Vi kommer titta på din kods läsbarhet och struktur. Koncis, självdokumenterande och tydlig kod är ett plus. När du är klar, zippa och skicka över till oss senast 3 dagar efter du fått uppgiften.

### Krav

Galleriet ska...

* vara responsivt från mobil och upp
* fylla hela bredden av sin container
* vara oberoende av övrigt content utanför containern
* inte påverka andra element av sidan den ligger i
* ge användaren feedback vid långsam laddning eller om api:et inte svarar
* fungera i senaste versionerna av Chrome och Firefox samt Internet Explorer 9 och upp

### Förslag på övriga features (frivilligt)

* Persistence/caching: spara API-data till en store och läs ifrån den vid upprepade requests
* Automatiserat byggsteg med lintning, konkatenering och minifiering
* Skriv automatiserade tester för en bit av din lösning
* Implementera tillgänglighetsregler för din lösning (textalternativ, ARIA, tangentbordsnavigering etc.)

### Flickrs API

* [https://www.flickr.com/services/api/](https://www.flickr.com/services/api/)

### Kodstart

I katalogen `app` finns ett enkelt skal som du kan utgå ifrån. Du kan starta en HTTP-server och serva hela katalogen på `localhost:8080` tillsammans med en livereload-instans (kräver [browserplugin](http://livereload.com/extensions/) för att fungera) genom att i din terminal köra (kräver [node.js](https://nodejs.org/en/)):


```
npm start
```

Lycka till! 🏹
