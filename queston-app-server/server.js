const express = require('express');
// const session = require('express-session');

const port = 5000;
const app = express();

const cors=require("cors");

const LIMIT = 5;

app.use(cors());

const questionList = [
    {
        expression: "2 + 2 * 4",
        options: [16, 10, 8, 12],
        answer: 10
    },
    {
        expression: "2 + 2 * 5",
        options: [16, 18, 8, 12],
        answer: 12
    },
    {
        expression: "3 + 2 * 4",
        options: [16, 10, 11, 12],
        answer: 11
    },
    {
        expression: "7 + 2 * 4",
        options: [16, 10, 15, 12],
        answer: 15
    },
    {
       expression:"3 + 5 * 9 = _",
       options:[47, 48, 72, 32],
       answer:48,
    },
    {
       expression:"6 - 5 + 9 = _",
       options:[12, 10, 34, 6],
       answer:10,
    },
    {
       expression:"25 / 5 + 7 = _",
       options:[23, 28, 12, 32],
       answer:48,
    },
    {
       expression:"4 * 6 - 9 = _",
       options:[22, 15, 1, 7],
       answer: 15,
    },
    {
       expression:"24 / 2 * 3 = _",
       options:[4, 24, 36, 48],
       answer: 36
    },
];

app.post('/login', function(req, res) {
    let response = {
        code:200,
        message:"login succeed"
    };
    res.end(JSON.stringify(response));

});

app.get('/question', function(req, res) {
    console.log(req);
     let question = questionList[Math.floor(Math.random() * questionList.length)];
     res.end(JSON.stringify(question));
});

app.listen(port);
