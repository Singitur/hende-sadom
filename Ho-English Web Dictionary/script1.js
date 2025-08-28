 const searchT = document.getElementById('searchTerm').value;

 fetch('https://singitur.github.io/hende-sadom/Ho-English%20Web%20Dictionary/hoc-eng.json')
     .then(response => response.json())
     .then(data => {


         function getRandomInclusive(min, max) {
             min = Math.ceil(min); // Round min up to the nearest integer
             max = Math.floor(max); // Round max down to the nearest integer
             return Math.floor(Math.random() * (max - min + 1)) + min;
         }


         function noMage(number, data) {
             const word = data[number].word;
             mageArray = ['dapú', 'duir', 'duꝑuir', 'het́', 'heꝑet́', 'loć', 'ruji', 'rut́chaṅ', 'rut́jaṅ', 'sunḍuć', 'tanḍa', 'dakuć', 'dapuṛu', 'dee', 'doh', 'doꝑoh', 'aꝑanḍia', 'haꝑar', 'angir', 'ia', 'tae', 'suna', 'jagar', 'guchu', 'kaji']
             if (mageArray.includes(word)) {
                 number += 1;
                 return number;
             } else {
                 return number;
             }
         }

         const randomMax = data.length - 1;
         let randomNumber = getRandomInclusive(0, randomMax);
         const randomWord = data[noMage(randomNumber, data)];
         const randomWordContainer = document.getElementById("random");

         randomWordContainer.innerHTML =
             `<p style="text-align: center"><i>Random Word:</i></p>
         <h3>${randomWord.word}</h3><button class="flag-btn" onclick="flagError(this)">⚑</button>
         <p>${randomWord.definition}</p>
        `
     })

 function flagError(button) {
     let entry = button.parentElement.innerText.replace("⚑", "").replace("▲", "").replace("▼", "").trim();
     saveToGoogleSheet()

     function saveToGoogleSheet(entryText) {
         const url = 'https://script.google.com/macros/s/AKfycbx2JYZBGOxkD6txgrVFkjCPSta7KMobHBApVPQ19PNJUUJCLbwgxtX43x4r4-mwsYCUew/exec'; // Replace with your Apps Script URL
         console.log("HERE IS THE CONTENT", entry)
         fetch(url, {
                 method: "POST",
                 mode: "no-cors",
                 headers: {
                     "Content-Type": "application/json"
                 },
                 body: JSON.stringify({
                     entry: entry
                 })
             })
             .then(data => {
                 console.log('Success:', data);
             })
             .then(() => {
                 button.innerText = ""; // Change button text
                 button.disabled = true; // Disable button
                 alert("Nen Word nahḱ Review lagiť flag eana.");
             })
             .catch(err => console.error(err))
     }
 }




 const inputToFone = {

     'Ã́|Á|Ã|À|Ā|A̱': 'A',
     'Ẽ́|É|Ê|Ẽ|È|Ē': 'E',
     'Ĩ́|Í|Ĩ|Ì|Ī': 'I',
     'Ó|Ô|Õ|Ò|Ṍ|Ō': 'O',
     'Ú|Ũ|Ù|Ṹ|Ū|Ü': 'U',

     'RT́': 'R',
     'LT́': 'L',
     'Ḱ|Ć': '',
     'T́|Ṭ': 'T',
     'Ḍ|Ṛ': 'D',
     'Ṕ': 'P',

     'Ṉ|Ṉ': 'N',
     'M̱': 'M',
     'S̱': 'S',
     'Ṯ': 'T',
     'P̱|Ꝑ': 'P',
     'CH': 'C',

     'NG|NJ|Ṅ|Ń': 'N',
 };


 function hoFone(inputText) {

     let outputFone = '';
     for (const pattern in inputToFone) {
         inputText = inputText.replace(new RegExp(pattern, 'g'), inputToFone[pattern])
     };

     for (let i = 0; i < inputText.length; i++) {
         const currentChar = inputText[i];
         //const nextChar = devaText[i + 1] || '';
         const prevChar = inputText[i - 1] || '';
         if (currentChar === 'W') {
             if (i !== 0) {
                 outputFone += '';
             } else {
                 outputFone += 'W';
             }
         } else if ('AEIOU4'.includes(currentChar)) {
             if (currentChar === prevChar || (prevChar === '4' && currentChar === 'A') || (prevChar === '4' && currentChar === 'E') || (prevChar === '4' && currentChar === '4')) {
                 outputFone += '';
             } else if (i > 2 && ((currentChar === 'A') || (currentChar === 'E'))) {
                 outputFone += 'Q';
             } else {
                 outputFone += currentChar;
             }
         } else if (currentChar === 'X') {
             outputFone += '';
         } else if (currentChar === 'H') {
             if (i == 0) {
                 outputFone += 'H';
             } else {
                 outputFone += '';
             }
         } else if (currentChar === 'B') {
             if (i !== 0 && i === inputText.length - 1) {
                 outputFone += 'P';
             } else {
                 outputFone += currentChar;
             }
         } else if (i !== 0 && currentChar === 'D') {
             if (i === inputText.length - 1) {
                 outputFone += 'T';
             } else {
                 outputFone += 'D';
             }
         } else {
             outputFone += currentChar;
         }
         if (i === inputText.length - 1) {
             outputFone += '\n'
         }
     }

     for (const pattern in inputToFone) {
         outputFone = outputFone.replace(new RegExp(pattern, 'g'), inputToFone[pattern])
     };

     return outputFone;
 }

 const userInput = document.getElementById('searchTerm');
 const finalFone = '';

 const commentContainer = document.getElementById("commentContainer");
 commentContainer.innerHTML = "";

 document.getElementById('searchTerm').addEventListener('input', () => {
     if (userInput.value.length > 0) {
         const inputText = userInput.value.replace(/[^A-Z, ^a-z, ^áéíóúâêôãẽĩõũàèìòùã́ẽ́ĩ́ṍṹḱćṕṭḍṛṅń\u0301]/g, '');
         const outputFone = hoFone(inputText.toUpperCase());
         console.log("OUTPUT FONE: ", outputFone)
         console.log("USER INPUT: ", userInput.value)
         getData(inputText.replace(/[\^\$\#]/g, '@'), outputFone.replace(/[^A-Z, ^0-9]/g, ''))
             //console.log("FINAL FONE: ", outputFone.replace(/[^A-Z, ^0-9]/g, ''))
     } else {
         commentContainer.innerHTML = "";
         resultsContainer.innerHTML = "";
     }
 });



 async function getData(exactTerm, theFone) {
     const data = await fetch('https://singitur.github.io/hende-sadom/Ho-English%20Web%20Dictionary/hoc-eng.json').then(res => res.json());

     function searchValues(jsonArray, searchKey, searchTerm) {
         return jsonArray.reduce((indices, element, index) => {
             if (element[searchKey] === searchTerm) {
                 indices.push(element); // Add the index to the result array
             }
             return indices;
         }, []);
     };


     function searchValues2(jsonArray, searchKey, searchTerm) {
         const regex = new RegExp(`\\b${searchTerm}\\b`, 'i');
         return jsonArray.reduce((indices, element, index) => {
             if (regex.test(element[searchKey])) {

                 indices.push(element); // Add the index to the result array
             }
             return indices;
         }, []);
     };



     const searchKey = "word"; // Key to search in
     const searchTerm = exactTerm; // Term to search for
     console.log("EXACT TERM INSIDE FN: ", exactTerm)
     console.log("FONE INSIDE FN: ", theFone)
     let hocResultArray = searchValues(data, searchKey, searchTerm);
     let searchStatus = "001"
         //console.log(resultIndices);
     console.log("SEARCH STATUS: 1")
     if (hocResultArray.length < 2 && exactTerm.length >= 1) {
         console.log("SEARCH STATUS: 2")
         const searchKey = "fone"; // Key to search in
         const searchTerm = exactTerm.toUpperCase(); // Term to search for
         hocResultArray = searchValues2(data, searchKey, searchTerm);
         searchStatus = "2"
         if (hocResultArray.length < 2 && exactTerm.length >= 2) {
             console.log("SEARCH STATUS: 3")
             const searchKey = "fone"; // Key to search in
             const searchTerm = theFone; // Term to search for
             hocResultArray = searchValues2(data, searchKey, searchTerm);
             searchStatus = "3"
             if (hocResultArray.length < 1 && exactTerm.length >= 3) {
                 console.log("SEARCH STATUS: 4")
                 const searchKey = "definition"; // Key to search in
                 const searchTerm = exactTerm; // Term to search for
                 hocResultArray = searchValues2(data, searchKey, searchTerm);
                 searchStatus = "4"
             }
         }
     };



     const satActive = document.getElementById("sat-checkbox").checked;
     if (satActive) {
         const satDict = await fetch('https://singitur.github.io/hende-sadom/Ho-English%20Web%20Dictionary/POB.json').then(res => res.json());

         function satSearchValues(jsonArray, searchKey, searchTerm) {
             const regex = new RegExp(`\\b${searchTerm}\\b`, 'i');
             return jsonArray.reduce((satResultArray, element, index) => {
                 if (regex.test(element[searchKey])) {
                     satResultArray.push(element); // Add the index to the result array
                 }
                 return satResultArray;
             }, []);
         };


         const satSearchKey = "definition"; // Key to search in
         const satSearchTerm = exactTerm; // Term to search for
         satResultArray = satSearchValues(satDict, satSearchKey, satSearchTerm);
         console.log("SAT INDICES:", satResultArray)
        }

        console.log("SAT INDICES OUTSIDE:", satResultArray)



        let finalArray = [];
        function arrayOrdered(hocResultArray, satResultArray) {
            finalArray = hocResultArray.concat(satResultArray)
        }

        arrayOrdered(hocResultArray, satResultArray)
        console.log("FINAL ARRAY:", finalArray)


     const resultsContainer = document.getElementById("resultsContainer");
     resultsContainer.innerHTML = ""; // Clear previous results

     if (finalArray.length > 0) {
         console.log("FINAL ARRAY INSIDE:", finalArray)
         commentContainer.innerHTML = "";

         let j = 1;
         let k = 1;

         finalArray.forEach(element => {
             const numberOfKeys = Object.keys(element).length;
             //console.log("NUM OF KEYS", numberOfKeys)

             if (numberOfKeys === 6) {
                 // Create a new div for each result

                 const resultItem = document.createElement("div");
                 resultItem.className = "result-item";
                 resultItem.id = "special-result-item-".concat(j)

                 resultsContainer.appendChild(resultItem)

                 const headwordContainer = document.createElement("div");
                 headwordContainer.className = "headword-container";

                 resultItem.appendChild(headwordContainer);

                 headwordContainer.innerHTML = `
                        <h3 class="headword">${element.word}</h3><button class="flag-btn" onclick="flagError(this)">⚑</button>
                        <p class="definition"><i>kajiòṅ</i>: <a class="link" href="https://en.wikipedia.org/wiki/International_Phonetic_Alphabet"  target="_blank">${element.kajion}</a></p>
                        <p class="definition">${element.definition.replace('¶', '\n')}</p>
                        <p class="definition"><i>ety.</i>: ${element.ety}</p>
                        `

                 const expandButton = document.createElement("div")
                 expandButton.className = "expand-button"
                 expandButton.id = "expand-button-".concat(j)

                 expandButton.innerHTML = "▼"

                 headwordContainer.appendChild(expandButton);

                 console.log("RESULT ITEM CONTAINS SUBWORDS");
                 const subwordsContainer = document.createElement("div")
                 subwordsContainer.className = "subwords-container"
                 subwordsContainer.id = "subwords-container-".concat(j)

                 resultItem.appendChild(subwordsContainer);

                 const subwordsArray = element.subwords

                 for (i = 0; i < subwordsArray.length; i++) {
                     let subElement = subwordsArray[i]
                         //console.log("subelement: ", subElement)
                     const subwordItem = document.createElement("div")
                     subwordItem.className = "subword-item"
                     subwordItem.id = "subword-".concat(i + 1)
                     subwordItem.innerHTML = `
                            <h4>${subElement.subword.replace('*', '')}</h4><button class="flag-btn" onclick="flagError(this)">⚑</button>
                            <p>${subElement.sub_definition}</p>`
                     subwordsContainer.appendChild(subwordItem)
                 }


                 const searchString = exactTerm;
                 const contentElement = document.getElementById("special-result-item-".concat(j));
                 const content = contentElement.innerHTML;

                 if (searchString.length > 2 && searchStatus === "4") {
                     //console.log("REACHED")
                     commentContainer.innerHTML = `<p class="no-results">Hoo Word ká nam yana.</p>`;
                     // Create a regular expression with global and case-insensitive flags
                     const regex = new RegExp(`(${searchString})`, 'gi');
                     // Replace matches with a span wrapper
                     const highlightedContent = content.replace(regex, '<span class="highlight">$1</span>');
                     contentElement.innerHTML = highlightedContent;
                 }

                 const currentSubwordContainer = document.getElementById("subwords-container-".concat(j));



                 const currentExpandButton = document.getElementById("expand-button-".concat(j))
                 document.getElementById('expand-button-'.concat(j)).addEventListener('click', () => {
                     if (currentSubwordContainer.style.display === 'block') {
                         //commentContainer.innerHTML = "2 expand button ota eana"
                         currentSubwordContainer.style.display = 'none';
                         currentExpandButton.innerHTML = "▼"
                     } else {

                         currentSubwordContainer.style.display = 'block';
                         currentExpandButton.innerHTML = "▲"
                             //commentContainer.innerHTML = "expand button ota eana"
                     }
                 })

                 j++;
                 console.log("SUBWORD-BOX COUNTER: ", j)


             } else {
                 //Create a new div for each result
                 const resultItem = document.createElement("div");
                 resultItem.className = "result-item";
                 resultItem.id = "result-item-".concat(k);

                 console.log("RESULT ITEM DOES NOT CONTAIN SUBWORDS")
                 resultItem.innerHTML = `
                      <h3>${element.word}</h3><button class="flag-btn" onclick="flagError(this)">⚑</button>
                      <p class="definition"><i>kajiòṅ</i>: <a class="link" href="https://en.wikipedia.org/wiki/International_Phonetic_Alphabet"  target="_blank">${element.kajion}</a></p>
                      <p class="definition">${element.definition}</p>
                      <p class="definition"><i>ety.</i>: ${element.ety}</p>`
                     // Append the result to the container
                 resultsContainer.appendChild(resultItem);




                 const searchLesson = "Les."
                 const contentElement1 = document.getElementById("result-item-".concat(k));
                 const content1 = contentElement1.innerHTML;
                 // Create a regular expression with global and case-insensitive flags
                 const regex1 = new RegExp(`(${searchLesson})`, 'g');
                 // Replace matches with a span wrapper
                 const linkedContent = content1.replace(regex1, '<a class="link" href="https://michaelyorke.org/wp-content/uploads/2023/08/Ho-Grammar-by-J-Deeney.pdf"  target="_blank">$1</a>');
                 contentElement1.innerHTML = linkedContent;




                 const searchString = exactTerm;
                 const contentElement = document.getElementById("result-item-".concat(k));
                 const content = contentElement.innerHTML;

                 if (searchString.length > 2 && searchStatus === "4") {
                     //console.log("REACHED")
                     commentContainer.innerHTML = `<p class="no-results">Hoo Word ká nam eana.</p>`;
                     // Create a regular expression with global and case-insensitive flags
                     const regex = new RegExp(`(${searchString})`, 'gi');
                     // Replace matches with a span wrapper
                     const highlightedContent = content.replace(regex, '<span class="highlight">$1</span>');
                     contentElement.innerHTML = highlightedContent;
                 }
                 k++;
             }
         })


     } else if (userInput !== "") {
         commentContainer.innerHTML = `<p class="no-results">Dictionary re ká nam eana.</p>`;
     } else {
         commentContainer.innerHTML = "";
     }


 };




 /**


                        function getSatIndices(){
                            if (document.getElementById("sat-checkbox").checked===true) {
                                        .then(response => response.json())
                                        .then(satData => {
                                            console.log("Santali Dictionary Activated")
                                            
                                                        function satSearchValues(jsonArray, searchKey, searchTerm) {
                                                            const regex = new RegExp(`\\b${searchTerm}\\b`, 'i');
                                                            return jsonArray.reduce((indices, element, index) => {
                                                                if (regex.test(element[searchKey])) {
                                                                    indices.push(index); // Add the index to the result array
                                                                }
                                                                return indices;
                                                            }, []);
                                                        };


                                                const satSearchKey = "definition"; // Key to search in
                                                const satSearchTerm = exactTerm; // Term to search for
                                                satIndices = satSearchValues(satData, satSearchKey, satSearchTerm);
                                                console.log("SAT INDICES:", satIndices);
                                        }
                                    )
                                }
                        }

                console.log("SAT INDICES CARRIED FORWARD:", satIndices);
                satIndices = getIndices().then(satIndices => {
                    
                })



 */