"use strict";
//requiring our node packages and JSON files
var fs = require("fs");
var inquirer = require("inquirer");
var basicQuestions = require("./basicFlashCards.json");
var clozeQuestions = require("./clozeFlashCards.json");

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
    
    if (count < basicQuestions.length){

        inquirer.prompt([
            {
                name: "answer",
                message: basicQuestions[count].front
            }
        ]).then(function(response){

            if (response.answer === basicQuestions[count].back){
                score++;
                console.log(`-----------------------------`);
                console.log(`That's correct!`);
                console.log(`Current Score: ${score}`);
                console.log(`-----------------------------`);
            } else {
                console.log(`-----------------------------`);
                console.log(`That's incorrect! The correct answer is ${basicQuestions[count].back}`);
                console.log(`Current Score: ${score}`);
                console.log(`-----------------------------`);
            }
            count++;
            playBasicCard();
        });
    } else if (count > basicQuestions.length - 1){
        console.log(`-----------------------------`);
        console.log(`All cards completed!`);
        console.log(`Your Score: ${score}`);
        console.log(`-----------------------------`);
        playCards();
    }
};

var playClozeCard = function() {
    
    if (count < clozeQuestions.length){
        
        inquirer.prompt([
            {
                name: "answer",
                message: clozeQuestions[count].question
            }
        ]).then(function(response){

            if (response.answer === clozeQuestions[count].clozeDeleted){
                score++;
                console.log(`-----------------------------`);
                console.log(`That's correct!`); 
                console.log(`Current Score: ${score}`);
                console.log(`-----------------------------`);

            } else {
                console.log(`-----------------------------`);
                console.log(`That's incorrect! The correct answer is ${clozeQuestions[count].clozeDeleted}`);
                console.log(`Current Score: ${score}`);
                console.log(`-----------------------------`);
            }

            count++;
            playClozeCard();
        });

    } else if (count > clozeQuestions.length - 1){
        console.log(`-----------------------------`);
        console.log(`All cards completed!`); console.log(`Your Score: ${score}`);
        console.log(`-----------------------------`);
        playCards();
    }
};

//start game
playCards();