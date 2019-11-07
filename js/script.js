function generateEventSingle(idEvent) {
    document.querySelector('main').innerHTML = '';
    fetch(`https://gateway.marvel.com/v1/public/events/${idEvent}?ts=1&apikey=7b0a5c98a9d5970738f28606badc0c08&hash=cfc8e111a7418cc1eddd3327abbe5f29`).then((result) => {
        result.json().then((data) => {
            document.body.style.backgroundImage = "linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.8)),url('" + data.data.results[0].thumbnail.path + "." + data.data.results[0].thumbnail.extension + "')";

            // TITLE //
            let eventNameSingle = document.createElement('h1');
            eventNameSingle.innerHTML = data.data.results[0].title;
            let element = document.getElementById("navbarColor02");
            element.removeChild(element.childNodes[1]);
            document.getElementById('navbarColor02').appendChild(eventNameSingle);

            /*****/

            // DESCRIPTION
            let eventDescSingle = document.createElement('p');
            eventDescSingle.innerHTML = data.data.results[0].description;

            let rowDiSingle = document.createElement('div');
            rowDiSingle.classList.add('styleDiv');

            rowDiSingle.appendChild(eventDescSingle);
            document.querySelector('main').appendChild(rowDiSingle);

            /*****/
            fetch(`https://gateway.marvel.com/v1/public/events/${idEvent}/characters?limit=100&ts=1&apikey=7b0a5c98a9d5970738f28606badc0c08&hash=cfc8e111a7418cc1eddd3327abbe5f29`).then((response) => {
                response.json().then((characters) => {
                    let table = document.createElement('div');
                    table.classList.add('container', 'container_style');
                    document.querySelector('main').appendChild(table);

                    if (characters.data.results) {
                        characters.data.results.forEach((element, index) => {

                            let x = document.querySelectorAll('div.row');
                            let td = document.createElement('div');
                            td.classList.add('col-md-2', 'col_style');
                            let divRowName = document.createElement('h3');
                            let urlChara = document.createElement('a');
                            urlChara.href = element.urls[1].url;
                            let charImg = document.createElement('img');
                            charImg.classList.add('img_style');

                            charImg.src = (element.thumbnail.path) + '.' + (element.thumbnail.extension);
                            charImg.alt = element.name;
                            urlChara.appendChild(charImg);
                            urlChara.setAttribute("target", "blank");
                            divRowName.innerHTML = element.name;
                            urlChara.appendChild(divRowName);
                            td.appendChild(urlChara);

                            if ((index + 1) % 6 == 0 || index == 0) {
                                console.log('coucou');
                                let tr = document.createElement('div');
                                tr.classList.add('row', 'row_style');
                                table.appendChild(tr);
                                tr.appendChild(td);
                            } else {
                                x[x.length - 1].appendChild(td);
                            }
                        });
                    }
                });
            });
        });
    });
}

const request = function () {
    // VARIABLES INSTANTIATION
    const apiUrl = 'https://gateway.marvel.com:443/v1/public/events?orderBy=startDate&limit=100&ts=1';
    const params = [
        // WISSEM
        // https://gateway.marvel.com:443/v1/public/events?orderBy=startDate&limit=100&ts=1&apikey=d5b0ab032c96bf018aabe59d6e2b0f9d&hash=f856807381477e356ae1d97b3ae195b6
        {apiKey: 'd5b0ab032c96bf018aabe59d6e2b0f9d', apiHash: 'f856807381477e356ae1d97b3ae195b6'},
        // OLIVIER
        // https://gateway.marvel.com:443/v1/public/events?orderBy=startDate&limit=100&ts=1&apikey=4bdfdf1daf83fb5e39498f4a0e4f0ed6&hash=eea4994fb1017cfc514478e53bc5c0b1
        {apiKey: '4bdfdf1daf83fb5e39498f4a0e4f0ed6', apiHash: 'eea4994fb1017cfc514478e53bc5c0b1'}
        // FAKE
        // https://gateway.marvel.com:443/v1/public/events?orderBy=startDate&limit=100&ts=1&apikey=74bdfdf1daf83fb5e39498f4a0e4f0ed6&hash=eea4994fb1017cfc514478e53bc5c0b1
        // {apiKey: '74bdfdf1daf83fb5e39498f4a0e4f0ed6', apiHash: 'eea4994fb1017cfc514478e53bc5c0b1'}

    ];
    const dateObj = new Date();
    const month = dateObj.getUTCMonth() + 1; //months from 1-12
    const day = dateObj.getUTCDate();
    const year = dateObj.getUTCFullYear();
    const today = `${day}/${month}/${year}`;

    if (!(localStorage.getItem('today'))) {
        localStorage.setItem('today', today);
    }

    // FIRST REQUEST + RESET IF NEW DAY
    if (!(localStorage.getItem('apiKey')) || !(localStorage.getItem('apiHash')) || today !== localStorage.getItem('today')) {
        localStorage.setItem('today', today);
        localStorage.setItem('apiKey', params[0].apiKey);
        localStorage.setItem('apiHash', params[0].apiHash);
    }

    // DEBUG
    // localStorage.setItem('apiKey', params[0].apiKey);
    // localStorage.setItem('apiHash', params[0].apiHash);
    ////

    let apiKey = localStorage.getItem('apiKey');
    let apiHash = localStorage.getItem('apiHash');

    let fullEventsRequest = `${apiUrl}&apikey=${apiKey}&hash=${apiHash}`;

    fetch(fullEventsRequest)
        .then(response => {
            document.querySelector("#errorCode").setAttribute('value', response.status.toString());
            if ([200, 429].includes(response.status)) {
                if (response.status === 200) {
                    console.log(`%c status 200 with apikey = ${apiKey}`, 'background: green; color: white; display: block;');
                    response.json()
                        .then(response => {

                            let toUpdate = false;

                            // CHECK IF WE NEED TO STORE NEW DATA BECAUSE: some data modified, more events in the api response, not stored yet
                            response = response.data.results;

                            if (JSON.parse(localStorage.getItem('storedEventsResponse'))) {
                                const storedResponse = JSON.parse(localStorage.getItem('storedEventsResponse'));

                                // DETECT CHANGES BETWEEN API RESPONSE AND LOCALSTORAGE DATA
                                for (let i = 0; i < response.length; i++) {
                                    if (response[i].modified !== storedResponse[i].modified || response.length !== storedResponse.length) {
                                        toUpdate = true; // CAN'T DO CHANGES THERE BECAUSE OF THE LOOP (WAIT THE LOOP TO END BEFORE TO UPDATE DATA)
                                        break; // EXIT THE LOOP A THE FIRST CHANGE ENCOUNTERED
                                    }
                                }
                            } else {
                                toUpdate = true;
                            }

                            // DEBUG
                            toUpdate = true;

                            // UPDATE IF CHANGES
                            if (toUpdate) {
                                // Put the object into storage
                                console.log('stored event update');
                                localStorage.setItem('storedEventsResponse', JSON.stringify(response)); // EVENTS UPDATE
                            }

                            const eventsList = JSON.parse(localStorage.getItem('storedEventsResponse'));
                            console.log(eventsList);
                            for (let i = 0; i < eventsList.length; i++) {

                                let eventName = document.createElement('h4');
                                eventName.setAttribute('id', eventsList[i].id);
                                eventName.classList.add('collapsible');
                                eventName.innerHTML = eventsList[i].title;

                                let eventDate = document.createElement('p');
                                eventDate.innerHTML = eventsList[i].start;

                                let eventDesc = document.createElement('p');
                                eventDesc.innerHTML = eventsList[i].description;

                                let eventCharacters = document.createElement('div');
                                eventCharacters.setAttribute('class', 'character-list');


                                if (eventsList[i].characters.items.length > 0) {
                                    for (let j = 0; j < eventsList[i].characters.items.length; j++) {
                                        let eventCharList = document.createElement('p');

                                        let eventCharListText = document.createTextNode(eventsList[i].characters.items[j].name);
                                        eventCharList.appendChild(eventCharListText);

                                        let charLink = document.createElement('a');
                                        charLink.setAttribute('href', '#');
                                        charLink.appendChild(eventCharList);

                                        let separators = document.createTextNode('\ -\ ');

                                        // if (j !== 0) {
                                        //     eventCharacters.appendChild(separators);
                                        //     eventCharacters.appendChild(charLink);
                                        // } else {
                                        eventCharacters.appendChild(charLink);
                                        // }
                                    }
                                } else {
                                    let eventCharList = document.createElement('p');
                                    let unknown = document.createTextNode("Unknown characters");
                                    eventCharList.appendChild(unknown);
                                    eventCharacters.appendChild(eventCharList);
                                }

                                let buttonMore = document.createElement('button');
                                buttonMore.setAttribute('onclick', `generateEventSingle(${eventsList[i].id})`);
                                let buttonText = document.createTextNode('Voir plus');
                                buttonMore.appendChild(buttonText);

                                // INSTANCIATE CONTENT DIV
                                let contentDiv = document.createElement('div');
                                contentDiv.classList.add('content');
                                contentDiv.appendChild(eventDate);
                                contentDiv.appendChild(eventDesc);
                                contentDiv.appendChild(eventCharacters);
                                contentDiv.appendChild(buttonMore);

                                let leftCol = document.createElement('div');
                                leftCol.classList.add('col-sm-4');
                                let rightCol = document.createElement('div');
                                rightCol.classList.add('col-sm-4', 'col-sm-offset-4');

                                // INSERT A,B,A,B
                                if (i % 2) {
                                    rightCol.appendChild(eventName);
                                    rightCol.appendChild(contentDiv);
                                } else {
                                    leftCol.appendChild(eventName);
                                    leftCol.appendChild(contentDiv);
                                }

                                let rowDiv = document.createElement('div');
                                rowDiv.classList.add('row');

                                rowDiv.appendChild(leftCol);
                                rowDiv.appendChild(rightCol);

                                document.querySelector('main').appendChild(rowDiv);
                            }

                            let coll = document.getElementsByClassName("collapsible");
                            let i;

                            for (i = 0; i < coll.length; i++) {
                                coll[i].addEventListener("click", function () {
                                    this.classList.toggle("active");
                                    let content = this.nextElementSibling;
                                    if (content.style.maxHeight) {
                                        content.style.maxHeight = null;
                                    } else {
                                        content.style.maxHeight = content.scrollHeight + "px";
                                    }
                                });
                            }

                        })

                } else if (response.status === 429) {
                    console.warn(`status 429 with apikey = ${apiKey}`);
                    for (let i = 0; i < params.length; i++) {
                        console.log(apiKey);
                        console.log(params[i].apiKey);
                        console.log(apiHash);
                        console.log(params[i].apiHash);
                        if (apiKey === params[i].apiKey || apiHash === params[i].apiHash) {
                            console.log('i =' + i);
                            console.log(params.length);
                            console.log(params[i].apiKey + ' OK');
                            if (i + 1 !== params.length) {
                                localStorage.setItem('apiKey', params[i + 1].apiKey);
                                localStorage.setItem('apiHash', params[i + 1].apiHash);
                                request();
                            }

                        }
                    }
                }
            } else {
                window.location = '/pages/404.php';
            }
        });
};

if (document.querySelector('main#home')) {
    request();
} else if (document.querySelector('main').id.startsWith('event')) {
    showEventPage();
}



/////////////// LES ABYSSES ////////////////


/*.then(response => {
                      let toUpdate = false;

                      // CHECK IF WE NEED TO STORE NEW DATA BECAUSE: some data modified, more events in the api response, not stored yet
                      response = response.data.results;

                      if (JSON.parse(localStorage.getItem('storedEventsResponse'))) {
                          const storedResponse = JSON.parse(localStorage.getItem('storedEventsResponse'));

                          // DETECT CHANGES BETWEEN API RESPONSE AND LOCALSTORAGE DATA
                          for (let i = 0; i < response.length; i++) {
                              if (response[i].modified !== storedResponse[i].modified || response.length !== storedResponse.length || !localStorage.getItem(`storedEvent${response[i].id}Char`)) {
                                  toUpdate = true; // CAN'T DO CHANGES THERE BECAUSE OF THE LOOP (WAIT THE LOOP TO END BEFORE TO UPDATE DATA)
                                  break; // EXIT THE LOOP A THE FIRST CHANGE ENCOUNTERED
                              }
                          }
                      } else {
                          toUpdate = true;
                      }

                      // DEBUG
                      toUpdate = true;

                      // UPDATE IF CHANGES
                      if (toUpdate) {
                          // Put the object into storage
                          localStorage.setItem('storedEventsResponse', JSON.stringify(response)); // EVENTS UPDATE

                          for (let i = 0; i < response.length; i++) {
                              let eventId = response[i].id;
                              let apiCharactersUrl = `https://gateway.marvel.com:443/v1/public/events/${eventId}/characters?limit=10&orderBy=name&ts=1`;
                              let fullCharactersRequest = `${apiCharactersUrl}&apikey=${apiKey}&hash=${apiHash}`;

                              fetch(fullCharactersRequest)
                                  .then(response => {
                                      response.json()
                                          .then(characters => {
                                              characters = characters.data.results; // response jsonized

                                              // Put the object into storage
                                              localStorage.setItem(`storedEvent${eventId}Char`, JSON.stringify(characters))
                                          });
                                  });
                          }
                          showPage();
                      } else {
                          showPage();
                      }
                  });*/

// fetch(`https://gateway.marvel.com:443/v1/public/events/${events.data.results[i].id}/characters?limit=100&orderBy=name&ts=1&apikey=d5b0ab032c96bf018aabe59d6e2b0f9d&hash=f856807381477e356ae1d97b3ae195b6`)
//                             .then(response => {
//                                 response.json()
//                                     .then(characters => {
//                                         setInterval(() => {
//                                             for (let j = 0; j < characters.data.results.length; j++) {
//                                                 setTimeout(() => {
//
//                                                     let eventChar = document.createElement('li');
//                                                     eventChar.innerHTML = characters.data.results[j].name;
//                                                     eventCharList.replaceChild(eventChar,);
//                                                     let charImg = document.createElement('img');
//
//                                                     charImg.src = (characters.data.results[j].thumbnail.path) + '.' + (characters.data.results[j].thumbnail.extension);
//                                                     charImg.alt = characters.data.results[j].name;
//                                                     eventCharList.appendChild(charImg);
//                                                 }, 5000)
//
//                                             }
//                                         }, 0);
//                                     });
//                             });

// }
// ;

//
// function generateEvents() {
//     fetch('https://gateway.marvel.com:443/v1/public/events?orderBy=startDate&limit=100&ts=1&apikey=d5b0ab032c96bf018aabe59d6e2b0f9d&hash=f856807381477e356ae1d97b3ae195b6')
//         .then(response => {
//
//             response.json()
//                 .then(events => {
//
//                     // for(i = 0; i < data.data.results.length; i++){
//                     // console.log(`id = ${data.data.results[i].id}; date = ${data.data.results[i].start}; name = ${data.data.results[i].title}`);
//                     // }
//                     // BOUCLE EVENTS
//                     for (let i = 0; i < events.data.results.length; i++) {
//
//                         // INSTANCIATE CONTENT
//                         let eventName = document.createElement('h4');
//                         eventName.classList.add('collapsible');
//                         eventName.innerHTML = events.data.results[i].title;
//                         let eventDesc = document.createElement('p');
//                         eventDesc.innerHTML = events.data.results[i].description;
//                         let eventCharList = document.createElement('ul');
//                         // BOUCLE CHAR
//                         console.log(events.data.results[i].id);
//                         fetch(`https://gateway.marvel.com:443/v1/public/events/${events.data.results[i].id}/characters?limit=100&orderBy=name&ts=1&apikey=d5b0ab032c96bf018aabe59d6e2b0f9d&hash=f856807381477e356ae1d97b3ae195b6`)
//                             .then(response => {
//                                 response.json()
//                                     .then(characters => {
//                                         setInterval(() => {
//                                             for (let j = 0; j < characters.data.results.length; j++) {
//                                                 setTimeout(() => {
//
//                                                     let eventChar = document.createElement('li');
//                                                     eventChar.innerHTML = characters.data.results[j].name;
//                                                     eventCharList.replaceChild(eventChar,);
//                                                     let charImg = document.createElement('img');
//
//                                                     charImg.src = (characters.data.results[j].thumbnail.path) + '.' + (characters.data.results[j].thumbnail.extension);
//                                                     charImg.alt = characters.data.results[j].name;
//                                                     eventCharList.appendChild(charImg);
//                                                 }, 5000)
//
//                                             }
//                                         }, 0);
//                                     });
//                             });
//
//                         // INSTANCIATE CONTENT DIV
//                         let contentDiv = document.createElement('div');
//                         contentDiv.classList.add('content');
//                         contentDiv.appendChild(eventDesc);
//                         contentDiv.appendChild(eventCharList);
//
//                         let leftCol = document.createElement('div');
//                         leftCol.classList.add('col-sm-4');
//                         let rightCol = document.createElement('div');
//                         rightCol.classList.add('col-sm-4', 'col-sm-offset-4');
//
//                         // INSERT A,B,A,B
//                         if (i % 2) {
//                             rightCol.appendChild(eventName);
//                             rightCol.appendChild(contentDiv);
//                         } else {
//                             leftCol.appendChild(eventName);
//                             leftCol.appendChild(contentDiv);
//                         }
//
//                         let rowDiv = document.createElement('div');
//                         rowDiv.classList.add('row');
//
//                         rowDiv.appendChild(leftCol);
//                         rowDiv.appendChild(rightCol);
//
//                         document.querySelector('main').appendChild(rowDiv);
//                     }
//
//                     let coll = document.getElementsByClassName("collapsible");
//                     let i;
//
//                     for (i = 0; i < coll.length; i++) {
//                         coll[i].addEventListener("click", function () {
//                             this.classList.toggle("active");
//                             let content = this.nextElementSibling;
//                             if (content.style.maxHeight) {
//                                 content.style.maxHeight = null;
//                             } else {
//                                 content.style.maxHeight = content.scrollHeight + "px";
//                             }
//                         });
//                     }
//
//                 })
//         });
//
// }

// generateEvents();

//////////////////////////////////////////////////// REQUETE PKMN

/*
* @param {string} param The string
*/
//
//
// document.querySelector('#getPkmnButton').addEventListener('click', () => {
//     const param = document.querySelector("#pkmnName").value.toLowerCase().trim();
//     fetch(`https://pokeapi.co/api/v2/pokemon/${param}`)
//         .then((response) => {
//             response.json()
//                 .then((data) => {
//
//                     if (document.querySelector('table')) {
//                         document.querySelector('table').remove();
//                     }
//
//                     let thNameElement = document.createElement('th');
//                     thNameElement.innerHTML = 'Nom';
//                     let thType1Element = document.createElement('th');
//                     thType1Element.innerHTML = 'Type 1';
//                     let thType2Element = document.createElement('th');
//                     thType2Element.innerHTML = 'Type 2';
//                     let trElement = document.createElement('tr');
//                     trElement.appendChild(thNameElement);
//                     trElement.appendChild(thType1Element);
//                     trElement.appendChild(thType2Element);
//                     let tableElement = document.createElement('table');
//                     tableElement.appendChild(trElement);
//
//                     let tdNameElement = document.createElement('td');
//                     tdNameElement.innerHTML = data.name;
//                     let trInfosElement = document.createElement('tr');
//                     trInfosElement.append(tdNameElement);
//                     if (data.types.length < 2) {
//                         let tdTypeElement = document.createElement('td');
//                         tdTypeElement.innerHTML = data.types[0].type.name;
//                         trInfosElement.appendChild(tdTypeElement);
//                         let tdType2Element = document.createElement('td');
//                         tdType2Element.innerHTML = '';
//                         trInfosElement.appendChild(tdType2Element);
//                         tableElement.appendChild(trInfosElement);
//                     } else {
//                         for (let i = 0; i < data.types.length; i++) {
//                             let value = data.types[i].type.name;
//                             let tdTypeElement = document.createElement('td');
//                             tdTypeElement.innerHTML = value;
//
//                             trInfosElement.appendChild(tdTypeElement);
//                             tableElement.appendChild(trInfosElement);
//                         }
//                     }
//                     document.querySelector('main').appendChild(tableElement)
//                 });
//         });
// });


