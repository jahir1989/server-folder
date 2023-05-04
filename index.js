const express = require('express')
const cors = require('cors')
const chefs = require('./data/chefs.json')
const recipes = require('./data/recipes.json')
const app = express()
app.use(cors())
require('dotenv').config()

const port = 3100

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/chefs', (req, res) => {
  res.json(chefs)
})

app.get('/chefs/:chef_id', (req, res) => {
  const {chef_id} = req.params
  const chefsResList = chefs.find(x=>x._id ===chef_id)

  if(chefsResList){
    const bio = `Lorazepam, sold under the brand name Ativan among others, is a benzodiazepine medication. It is used to treat anxiety disorders, trouble sleeping, severe agitation,`
      
    const x =  chefsResList.recipes.map(x=>{
      let newMeal = {}
      recipes.forEach(y=>{
      if(y.idMeal === x){
          const strIngredients = {};
          for (let i = 1; i <= 20; i++) {
              const ingredient = y[`strIngredient${i}`];
              const measure = y[`strMeasure${i}`];
              if (ingredient && measure) {
                  strIngredients[ingredient] = measure;
              }
          }
          // console.log(strIngredients);
           newMeal = {
              ...y,
              strIngredients: strIngredients,
          };
      } 
    })

    return newMeal
  })
    chefsResList.recipesNew = x;
    chefsResList.bio = bio;
    res.json(chefsResList);
  } else  res.send('recipe not Found')
})

app.get('/recipes', (req, res) => {
  res.json(recipes)
})


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})



