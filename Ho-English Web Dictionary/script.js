document.addEventListener('input', () => {
    console.log("INPUT RECEIVED")
    inputField = document.getElementById('verb');
    const inputVerb = inputField.value;
    if (inputVerb !== "") {

        document.getElementById('stem').disabled = false;
        document.getElementById('aspect').disabled = false;
        document.getElementById('object').disabled = false;
        document.getElementById('mood').disabled = false;

        const verbStemSelectElement = document.getElementById("stem");
        const verbStemSelectIndex = verbStemSelectElement.selectedIndex;
        const verbStemSelectedOption = verbStemSelectElement.options[verbStemSelectIndex];
        const verbStem = verbStemSelectedOption.value;
        console.log("STEM: ", verbStem)

        const verbAspectSelectElement = document.getElementById("aspect");
        const verbAspectSelectIndex = verbAspectSelectElement.selectedIndex;
        const verbAspectSelectedOption = verbAspectSelectElement.options[verbAspectSelectIndex];
        let verbAspect = verbAspectSelectedOption.value;

        const verbTransitivitySelectElement = document.getElementById("transitivity");
        const verbTransitivitySelectIndex = verbTransitivitySelectElement.selectedIndex;
        const verbTransitivitySelectedOption = verbTransitivitySelectElement.options[verbTransitivitySelectIndex];
        const verbTransitivity = verbTransitivitySelectedOption.value;

        const verbObjectSelectElement = document.getElementById("object");
        const verbObjectSelectIndex = verbObjectSelectElement.selectedIndex;
        const verbObjectSelectedOption = verbObjectSelectElement.options[verbObjectSelectIndex];
        const verbObject = verbObjectSelectedOption.value;

        const verbMoodSelectElement = document.getElementById("mood");
        const verbMoodSelectIndex = verbMoodSelectElement.selectedIndex;
        const verbMoodSelectedOption = verbMoodSelectElement.options[verbMoodSelectIndex];
        const verbMood = verbMoodSelectedOption.value;

        const verbSubjectSelectElement = document.getElementById("subject");
        const verbSubjectSelectIndex = verbSubjectSelectElement.selectedIndex;
        const verbSubjectSelectedOption = verbSubjectSelectElement.options[verbSubjectSelectIndex];
        let verbSubject = verbSubjectSelectedOption.value;


        if(verbMood!==""){
            document.getElementById('subject').disabled = false;
        }

        if(verbAspect !== ""){
            document.getElementById('transitivity').disabled = false;

            if(verbTransitivity===""){
                document.getElementById('object').disabled = true;
                document.getElementById('mood').disabled = true;
            }

            if(verbTransitivity==="n" || verbTransitivity==="anoḱ"||verbTransitivity==="t́" ||verbTransitivity==="vat́"){
                document.getElementById('mood').disabled = false;
                if (verbMood !== ""){
                    document.getElementById('subject').disabled = false;
                    verbMoodSelectElement.options[2].disabled = true;
                    verbMoodSelectElement.options[3].disabled = true;
                }
                if (verbTransitivity==="anoḱ" || verbTransitivity==="n"){
                    document.getElementById('object').disabled = true;
                    verbMoodSelectElement.options[2].disabled = true;
                    verbMoodSelectElement.options[3].disabled = true;
                }    
            }
        }

        if(verbAspect===""){
            document.getElementById('transitivity').disabled = true;
        }

        if (verbMood === " ") { //IMPERATIVE MOOD
            imperativeDisable(verbSubjectSelectElement);
        }

        if (verbObject === "iń"||verbObject === "liṅ"||verbObject === "le"){
            if(verbMood===" "){
                imperativeDisable(verbSubjectSelectElement);
            }
            else {
                exclusiveFirst(verbSubjectSelectElement, verbMoodSelectElement);
            }
        }

        if (verbObject === "laṅ"||verbObject === "bu"){
            if(verbMood===" "){
                imperativeDisable(verbSubjectSelectElement);
            }
            else {
                inclusiveFirst(verbSubjectSelectElement, verbMoodSelectElement);
            }
        }
        
        if (verbObject === "me"||verbObject === "ben"||verbObject === "pe"){
            generalSecond(verbSubjectSelectElement, verbMoodSelectElement);
        }

        if (verbObject === "ić"||verbObject === "kin"||verbObject === "ko"){
            if(verbMood===" "){
                imperativeDisable(verbSubjectSelectElement);
            }
            else {
                generalThird(verbSubjectSelectElement, verbMoodSelectElement);
            }
        }

        if (verbStem === "oḱ" || verbStem === "enn") {

            verbAspectSelectElement.options[0].disabled = true;
            verbAspectSelectElement.options[2].disabled = true;
            verbAspectSelectElement.options[3].disabled = true;
            verbAspectSelectElement.options[4].disabled = true;
            verbAspectSelectElement.options[6].disabled = true;
            verbAspectSelectElement.options[7].disabled = true;

            if (verbAspect !== " ta") {
                document.getElementById('transitivity').disabled = true;
                document.getElementById('object').disabled = true;
            }

            if (verbAspect === "") {
                verbTransitivitySelectElement.options[2].disabled = true;
            }

            document.getElementById("notice").innerHTML = "When the verb is in the Middle or Reflexive Voice, it can be conjugated only in the non-past tense.";
        }
        conjugateVerb(inputVerb, verbStem, verbAspect, verbTransitivity, verbObject, verbMood, verbSubject);
        console.log(verbStem);
    }
})


function imperativeDisable (verbSubjectSelectElement) {
    document.getElementById("imperativeM").value = "me";
    verbSubjectSelectElement.options[1].disabled = true;
    verbSubjectSelectElement.options[3].disabled = true;
    verbSubjectSelectElement.options[4].disabled = true;
    verbSubjectSelectElement.options[5].disabled = true;
    verbSubjectSelectElement.options[7].disabled = true;
    verbSubjectSelectElement.options[8].disabled = true;
    verbSubjectSelectElement.options[9].disabled = true;
    verbSubjectSelectElement.options[11].disabled = true;
}


function exclusiveFirst (verbSubjectSelectElement, verbMoodSelectElement) {
    verbMoodSelectElement.options[3].disabled = false;
    verbSubjectSelectElement.options[1].disabled = true;
    verbSubjectSelectElement.options[2].disabled = false;
    verbSubjectSelectElement.options[3].disabled = false;
    verbSubjectSelectElement.options[4].disabled = true;
    verbSubjectSelectElement.options[5].disabled = true;
    verbSubjectSelectElement.options[6].disabled = false;
    verbSubjectSelectElement.options[7].disabled = false;
    verbSubjectSelectElement.options[8].disabled = true;
    verbSubjectSelectElement.options[9].disabled = true;
    verbSubjectSelectElement.options[10].disabled = false;
    verbSubjectSelectElement.options[11].disabled = false;
}


function inclusiveFirst (verbSubjectSelectElement, verbMoodSelectElement) {
    verbMoodSelectElement.options[3].disabled = true;
    verbSubjectSelectElement.options[1].disabled = true;
    verbSubjectSelectElement.options[2].disabled = true;
    verbSubjectSelectElement.options[3].disabled = false;
    verbSubjectSelectElement.options[4].disabled = true;
    verbSubjectSelectElement.options[5].disabled = true;
    verbSubjectSelectElement.options[6].disabled = true;
    verbSubjectSelectElement.options[7].disabled = false;
    verbSubjectSelectElement.options[8].disabled = true;
    verbSubjectSelectElement.options[9].disabled = true;
    verbSubjectSelectElement.options[10].disabled = true;
    verbSubjectSelectElement.options[11].disabled = false;
}

function generalSecond (verbSubjectSelectElement, verbMoodSelectElement){
    verbMoodSelectElement.options[3].disabled = true;
    verbSubjectSelectElement.options[1].disabled = false;
    verbSubjectSelectElement.options[2].disabled = true;
    verbSubjectSelectElement.options[3].disabled = false;
    verbSubjectSelectElement.options[4].disabled = true;
    verbSubjectSelectElement.options[5].disabled = false;
    verbSubjectSelectElement.options[6].disabled = true;
    verbSubjectSelectElement.options[7].disabled = false;
    verbSubjectSelectElement.options[8].disabled = true;
    verbSubjectSelectElement.options[9].disabled = false;
    verbSubjectSelectElement.options[10].disabled = true;
    verbSubjectSelectElement.options[11].disabled = false;
}

function generalThird (verbSubjectSelectElement, verbMoodSelectElement){
    verbMoodSelectElement.options[3].disabled = false;
    verbSubjectSelectElement.options[1].disabled = false;
    verbSubjectSelectElement.options[2].disabled = false;
    verbSubjectSelectElement.options[3].disabled = false;
    verbSubjectSelectElement.options[4].disabled = false;
    verbSubjectSelectElement.options[5].disabled = false;
    verbSubjectSelectElement.options[6].disabled = false;
    verbSubjectSelectElement.options[7].disabled = false;
    verbSubjectSelectElement.options[8].disabled = false;
    verbSubjectSelectElement.options[9].disabled = false;
    verbSubjectSelectElement.options[10].disabled = false;
    verbSubjectSelectElement.options[11].disabled = false;

}


function conjugateVerb(inputVerb, verbStem, verbAspect, verbTransitivity, verbObject, verbMood, verbSubject) {
    const resultDiv = document.getElementById('result');

    const resultVerb = inputVerb.concat(verbStem).concat(verbAspect).concat(verbTransitivity).concat(verbObject).concat(verbMood).concat(verbSubject);
    resultDiv.innerText = resultVerb;
    console.log("verbConjugate() CALLED")
}