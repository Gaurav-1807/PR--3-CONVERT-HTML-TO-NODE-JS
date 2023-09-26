const express = require("express")
const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))


let initialRecipe = [
    {
        name: 'Spaghetti Carbonara',
        description: 'A classic Italian pasta dish.',
        preparationTime: '15 minutes',
        cookingTime: '15',
        imageUrl: 'https://hips.hearstapps.com/hmg-prod/images/carbonara-index-6476367f40c39.jpg?crop=0.888888888888889xw:1xh;center,top&resize=1200:*',
        country: "India",
        veg: true,
        id: 1
    }
]

app.get("/", (req, res) => {
    res.send("welcome to the recipe api.")
})
// recipe listining 
app.get("/recipe/all", (req, res) => {
    res.send(initialRecipe)
})
app.get("/index", (req, res) => {
    res.sendFile(__dirname + '/index.html')
    res.send(initialRecipe)
})


// add recipe 
app.get("/add", (req, res) => {
    res.sendFile(__dirname + '/recipe.html')
})
app.post("/recipe/add", (req, res) => {
    let newrecipe = {
        name: req.body.name,
        description: req.body.description,
        preparationTime: req.body.preparationTime,
        cookingTime: req.body.cookingTime,
        imageUrl: req.body.imageUrl,
        country: req.body.country,
        veg: req.body.veg,
        id: initialRecipe.length + 1,
    }
    if (newrecipe.name && newrecipe.description && newrecipe.preparationTime && newrecipe.cookingTime && newrecipe.imageUrl && newrecipe.country && newrecipe.veg) {
        initialRecipe.push(newrecipe)
    }
    else {
        res.send({ Error: "All fields are required" })
    }
    res.send(initialRecipe)

})

app.patch('/recipe/update/:id', (req, res) => {
    const { id } = req.params.id;
    const updatedRecipe = initialRecipe.filter(e => req.id == id);

    updatedRecipe[0].name = req.body.name
    updatedRecipe[0].description = req.body.description
    updatedRecipe[0].preparationTime = req.body.preparationTime
    updatedRecipe[0].cookingTime = req.body.cookingTime
    updatedRecipe[0].imageUrl = req.body.imageUrl
    updatedRecipe[0].country = req.body.country
    updatedRecipe[0].veg = req.body.veg

    if (updatedRecipe !== -1) {
        initialRecipe[updatedRecipe] = updatedRecipe;
        res.send(initialRecipe);
    } else {
        res.status(404).send({ message: 'Recipe not found' });
    }
});

app.delete('/recipe/delete/:id', (req, res) => {
    const { id } = req.params;
    const del = initialRecipe.findIndex(e => e.id == id);

    if (del !== -1) {
        let deletedrecipe = initialRecipe.splice(del, 1)[0]
        res.send(initialRecipe)
    } else {
        res.status(404).send("recipe id not found");
    }
});



app.listen(8090, () => {
    console.log("Run your server on Port 8090.")
})