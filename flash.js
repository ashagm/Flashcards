"use strict";
//requiring our node packages and JSON files
var fs = require("fs");
var inquirer = require("inquirer");
var question = require("./basicFlashCards.json");
var cloze = require("./clozeFlashCards.json");

var score;
var count;

var BasicCard = function (front, back){
    if(this instanceof BasicCard){
        this.front = front;
        this.back = back;
    }else{
        return new BasicCard(front, back);
    }
};

BasicCard.prototype.returnBasicCard = function(){
    console.log("Question: " + this.front + "\nAnswer: " + this.back);
};

function ClozeCard(text, cloze){
    if(this instanceof ClozeCard){
        this.fullText = text;
        this.clozeText = cloze;
        this.partialText = text.replace(cloze, "( ... )")
    } else {
        return new ClozeCard(text, cloze);
    }    
}

ClozeCard.prototype.returnClozeText = function() {
    console.log("this cloze = " + this.clozeText);
    return(this.clozeText);
}

ClozeCard.prototype.returnFullText = function() {
    console.log("this full = " + this.fullText);
    return(this.fullText);
}

ClozeCard.prototype.returnPartialText = function() {
    console.log("this partial = " + this.partialText);
    return(this.partialText);
}

function playCards(){
    score = 0;
    count = 0;
    inquirer.prompt({
        type: "list",
        name: "command",
        message: "How would you like to Play?",
        choices: [
            { name: "BasicCard" },
            { name: "ClozeCard" },
            { name: "Exit" }
        ]

    }).then(function(answers) {
        if (answers.command === "BasicCard") {
            playBasicCard();
        } else if (answers.command === "ClozeCard") {
            playClozeCard();
        }else{
            console.log("Exiting.....");
            process.exit();
        }
    });

}


var playBasicCard = function() {
    
    if (count < question.length){

        inquirer.prompt([
            {
                name: "question",
                message: question[count].question
            }
        ]).then(function(answers){
            if (answers.question === question[count].answer){
                score++;
                console.log(`-----------------------------`);
                console.log(`That's correct!`);console.log(`Current Score: ${score}`);
                console.log(`-----------------------------`);
            } else {
                console.log(`-----------------------------`);
                console.log(`That's incorrect! The correct answer is ${question[count].answer}`);console.log(`Current Score: ${score}`);
                console.log(`-----------------------------`);
            }
            count++;
            playBasicCard();
        });
    } else if (count > question.length - 1){
        console.log(`-----------------------------`);
        console.log(`All cards completed!`);
        console.log(`Your Score: ${score}`);
        console.log(`-----------------------------`);
        playCards();
    }
};

var playClozeCard = function() {
    
    if (count < cloze.length){
        
        inquirer.prompt([
            {
                name: "question",
                message: cloze[count].question
            }
        ]).then(function(answers){

            if (answers.question === cloze[count].clozeDeleted){
                score++;
                console.log(`-----------------------------`);
                console.log(`That's correct!`); console.log(`Current Score: ${score}`);
                console.log(`-----------------------------`);

            } else {
                console.log(`-----------------------------`);
                console.log(`That's incorrect! The correct answer is ${cloze[count].clozeDeleted}`);console.log(`Current Score: ${score}`);
                console.log(`-----------------------------`);
            }

            count++;
            playClozeCard();
        });

    } else if (count > cloze.length - 1){
        console.log(`-----------------------------`);
        console.log(`All cards completed!`); console.log(`Your Score: ${score}`);
        console.log(`-----------------------------`);
        playCards();
    }
};

//start game
playCards();