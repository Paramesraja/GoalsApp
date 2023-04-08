const fs = require('fs');
const path = require('path');

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const Goal = require('./models/goal');

const app = express();

app.use(bodyParser.json());
// Body-parser parses is an HTTP request body that usually helps when you need to know more than just the URL being hit.
// Specifically in the context of a POST, PATCH, or PUT HTTP request where the information you want is contained in the body. 

//Using body-parser allows you to access req.

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  next();
  //The next() function is a function in the Express router that, when invoked, executes the next middleware in the middleware stack. 
  //If the current middleware function does not end the request-response cycle, it must call next() to pass control to the next middleware function. 
  //Otherwise, the request will be left hanging
});

app.get('/goals', async (req, res) => {
  console.log('TRYING TO FETCH GOALS!');
  try {
    const goals = await Goal.find();
    res.status(200).json({
      goals: goals.map((goal) => ({
        id: goal.id,
        text: goal.text,
      })),
    });
    console.log('FETCHED GOALS');
  } catch (error) {
    console.error('ERROR FETCHING GOALS');
    console.error(error.message);
    res.status(500).json({ message: 'Failed to load goals.' });
  }
});

app.post('/goals', async (req, res) => {
  console.log('TRYING TO STORE GOAL');
  const goalText = req.body.text;

  if (!goalText || goalText.trim().length === 0) {
    console.log('INVALID INPUT - NO TEXT');
    return res.status(422).json({ message: 'Invalid goal text.' });
  }

  const goal = new Goal({
    text: goalText,
  });

  try {
    await goal.save();
    res
      .status(201)
      .json({ message: 'Goal saved', goal: { id: goal.id, text: goalText } });
    console.log('STORED NEW GOAL');
  } catch (error) {
    console.error('ERROR FETCHING GOALS');
    console.error(error.message);
    res.status(500).json({ message: 'Failed to save goal.' });
  }
})

app.get('/goals/:id', async(req, res) => {
  console.log('TRYING TO FETCH GOAL');
  const _id = req.params.id
  try{
      const goal = await Goal.findById(_id)
      if (!goal) {
                   return res.status(404).send()
              }
              res.status(200).json({
                goals: goals.map((goal) => ({
                  id: goal.id,
                  text: goal.text,
                }))
              })
  }catch(error){
      res.status(500).send()
  }
})     

app.delete('/goals/:id', async (req, res) => {
  console.log('TRYING TO DELETE GOAL');
  try {
    await Goal.deleteOne({ _id: req.params.id });
    res.status(200).json({ message: 'Deleted goal!' });
    console.log('DELETED GOAL');
  } catch (error) {
    console.error('ERROR FETCHING GOALS');
    console.error(error.message);
    res.status(500).json({ message: 'Failed to delete goal.' });
  }
});

mongoose.connect(
  `mongodb+srv://parames:2002@nodecluster.eya0d4w.mongodb.net/Goals?retryWrites=true&w=majority`,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (error) => {
    if (error) {
      console.error('FAILED TO CONNECT TO MONGODB');
      console.error(error);
    } else {
      console.log('CONNECTED TO MONGODB!!');
      app.listen(8000, () => {
        console.log('success')
      });
    }
  }
);
