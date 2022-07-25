//Global Variables
var questions;
var rightanswersTEMP;
var rightanswers = [];
var studentAnswers = [];
var grade;
var question = '';
var forNames= [];
for (let i = 0; i < 5; i++) { //there are 5 questions
    var arrayy = [];
    for (let j = 0; j < 4; j++) { //there are 4 choices for each of the questions
        var choice;
        switch (j) {
            case 0:
                choice = 'a';
                break;
            case 1:
                choice = 'b';
                break;
            case 2:
                choice = 'c';
                break;
            case 3:
                choice = 'd';
                break;
        }
        var aaa = 'Q'+ (i+1) + '_choice_' + choice;
        arrayy[j] = aaa;
    }
    arrayy[4] = 'Q'+ (i+1)+ '_choices';
    forNames[i] = arrayy;
}

//Functions
function loadXML(){
    var ajax = new XMLHttpRequest();
    ajax.open('GET', '/data/FinalQuiz.xml', true);

    ajax.onreadystatechange = function(){
        if(ajax.readyState == 4 && ajax.status == 200){
            var rawXMLData = ajax.responseXML;
            questions = rawXMLData.getElementsByTagName('question');
            rightanswersTEMP = rawXMLData.getElementsByTagName('rightanswers')[0].childNodes[0].nodeValue;
            generateQuestions();
        }
    }

    ajax.send();
}

function generateQuestions(){
    document.getElementById('display_grade').innerHTML = '';
    results = '<tr><th>ID Number</th><th>Name</th><th>Phone</th><th>Card Number</th></tr>'
    for (let i = 0; i < questions.length; i++) {
        var thisQuestion = questions[i];
        var thisQuestionNumber = thisQuestion.getElementsByTagName('qnumber')[0].childNodes[0].nodeValue;
        var thisQuestionTitle = thisQuestion.getElementsByTagName('qtitle')[0].childNodes[0].nodeValue;
        var thisQuestionChoiceA = thisQuestion.getElementsByTagName('a')[0].childNodes[0].nodeValue;
        var thisQuestionChoiceB = thisQuestion.getElementsByTagName('b')[0].childNodes[0].nodeValue;
        var thisQuestionChoiceC = thisQuestion.getElementsByTagName('c')[0].childNodes[0].nodeValue;
        var thisQuestionChoiceD = thisQuestion.getElementsByTagName('d')[0].childNodes[0].nodeValue;
        var correctSvgID = 'correctSVG'+i;
        var wrongSvgID = 'wrongSVG'+i;
        question += '<br>';
        question += '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--! Font Awesome Pro 6.1.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path d="M256 0C114.6 0 0 114.6 0 256s114.6 256 256 256s256-114.6 256-256S397.4 0 256 0zM256 400c-18 0-32-14-32-32s13.1-32 32-32c17.1 0 32 14 32 32S273.1 400 256 400zM325.1 258L280 286V288c0 13-11 24-24 24S232 301 232 288V272c0-8 4-16 12-21l57-34C308 213 312 206 312 198C312 186 301.1 176 289.1 176h-51.1C225.1 176 216 186 216 198c0 13-11 24-24 24s-24-11-24-24C168 159 199 128 237.1 128h51.1C329 128 360 159 360 198C360 222 347 245 325.1 258z"/></svg>';
        question += '<h1 class="overlay">Question '+ thisQuestionNumber +'<svg id="'+correctSvgID+'" class="hide" style="fill: green;" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!--! Font Awesome Pro 6.1.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path d="M438.6 105.4C451.1 117.9 451.1 138.1 438.6 150.6L182.6 406.6C170.1 419.1 149.9 419.1 137.4 406.6L9.372 278.6C-3.124 266.1-3.124 245.9 9.372 233.4C21.87 220.9 42.13 220.9 54.63 233.4L159.1 338.7L393.4 105.4C405.9 92.88 426.1 92.88 438.6 105.4H438.6z"/></svg><svg id="'+ wrongSvgID +'" class="hide1" style="fill: red;" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><!--! Font Awesome Pro 6.1.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path d="M310.6 361.4c12.5 12.5 12.5 32.75 0 45.25C304.4 412.9 296.2 416 288 416s-16.38-3.125-22.62-9.375L160 301.3L54.63 406.6C48.38 412.9 40.19 416 32 416S15.63 412.9 9.375 406.6c-12.5-12.5-12.5-32.75 0-45.25l105.4-105.4L9.375 150.6c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0L160 210.8l105.4-105.4c12.5-12.5 32.75-12.5 45.25 0s12.5 32.75 0 45.25l-105.4 105.4L310.6 361.4z"/></svg></h1>';
        question += '<p>' + thisQuestionTitle + '</p>';
        question += '<input name="'+ forNames[i][4]+'" type="radio" id="'+ forNames[i][0]+'" value="a">';
        question += '<label for="'+ forNames[i][0]+'">A) ' + thisQuestionChoiceA + '</label><br>';
        question += '<input name="'+ forNames[i][4]+'" type="radio"  id="'+ forNames[i][1]+'"  value="b">';
        question += '<label for="'+ forNames[i][1]+'">B) ' + thisQuestionChoiceB + '</label><br>';
        question += '<input name="'+ forNames[i][4]+'" type="radio" id="'+ forNames[i][2]+'"  value="c">';
        question += '<label for="'+ forNames[i][2]+'">C) ' + thisQuestionChoiceC + '</label><br>';
        question += '<input name="'+ forNames[i][4]+'" type="radio" id="'+ forNames[i][3]+'"  value="d">';
        question += '<label for="'+ forNames[i][3]+'">D) ' + thisQuestionChoiceD + '</label>';
        question += '</br>';
    }

    document.getElementById('questions').innerHTML = question;
}

function getRightAnswers(){
    rightanswers = rightanswersTEMP.split(","); 
}

function getStudentAnswers() {
    for (let i = 0; i < questions.length; i++) {
        if(!document.querySelector('input[name="Q'+ (i+1) +'_choices"]:checked')){
            alert('You havent answered question '+(i+1));
            return 'false';
        } else{
            studentAnswers[i] = document.querySelector('input[name="Q'+ (i+1) +'_choices"]:checked').value;
        }
    }
    return 'true';
}
function hideSVG(){
    for (let i = 0; i < questions.length; i++) {
            let zzz = 'correctSVG'+i;
			document.getElementById(zzz).classList.add('hide');

            let yyy = 'wrongSVG'+i;
			document.getElementById(yyy).classList.add('hide1');

    }
}
function gradeQuiz(){
    hideSVG();
    document.getElementById('display_grade').innerHTML= '';
    var continuee =  getStudentAnswers();
    if(continuee == 'true'){
    getRightAnswers();
    grade = 0;
    for (let i = 0; i < questions.length; i++) {
        const answer = studentAnswers[i];
        const ranswer = rightanswers[i];
        if (answer == ranswer) {
            grade++;
            let zzz = 'correctSVG'+i;
			document.getElementById(zzz).classList.remove('hide');
        } else{
            let yyy = 'wrongSVG'+i;
			document.getElementById(yyy).classList.remove('hide1');
        }
    }
    var backgroundColor;

    switch (grade) {
        case 0:
            backgroundColor = '#630606'; //very dark red
            break;
        case 1:
            backgroundColor = '#890F0D'; // dark red
            break;
        case 2:
            backgroundColor = '#E83A14'; // light red 
            break;
        case 3:
            backgroundColor = '#A3DA8D'; // light green 
            break;
        case 4:
            backgroundColor = '#519259'; // green
            break;      
        case 5:
            backgroundColor = '#064635'; // dark green
            break;       
        }

    var yourGrade = '<div style="background-color:'+backgroundColor+';">Your grade is ' + grade + '/' +  questions.length + '</div>';
    document.getElementById('display_grade').innerHTML = yourGrade; 
    }
}