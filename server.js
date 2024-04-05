const express = require('express')
const app = express()
app.use(express.json())

app.set('port', process.env.PORT || 3000)
app.locals.title = 'expressBE'
app.locals.spiders = [
    {"id": "a1", "name": "Black Widow", "location": ["North America", "South America", "Europe"]},
    {"id": "a2", "name": "Brown Recluse", "location": ["North America"]},
    {"id": "a3", "name": "Tarantula", "location": ["South America"]},
    {"id": "a4", "name": "Wolf Spider", "location": ["Europe", "Asia"]},
    {"id": "a5", "name": "Orb Weaver", "location": ["Australia", "Asia"]},
    {"id": "a6", "name": "Huntsman Spider", "location": ["Africa", "Australia"]},
    {"id": "a7", "name": "Jumping Spider", "location": ["Worldwide"]},
    {"id": "a8", "name": "Golden Silk Orb-Weaver", "location": ["North America", "Africa"]},
    {"id": "a9", "name": "Brazilian Wandering Spider", "location": ["South America", "Central America"]},
    {"id": "a10", "name": "Goliath Birdeater", "location": ["Asia", "Africa"]},
    {"id": "a11", "name": "Daddy Longlegs", "location": ["Europe", "North America"]},
    {"id": "a12", "name": "Yellow Sac Spider", "location": ["Australia", "South America"]},
    {"id": "a13", "name": "Camel Spider", "location": ["Middle East", "North Africa"]},
    {"id": "a14", "name": "Banana Spider", "location": ["Central America", "South America"]},
    {"id": "a15", "name": "Garden Spider", "location": ["North America", "Europe", "Asia"]},
    {"id": "a16", "name": "Barn Funnel Weaver", "location": ["Europe", "Asia", "Australia"]},
    {"id": "a17", "name": "Mouse Spider", "location": ["Australia"]},
    {"id": "a18", "name": "Trapdoor Spider", "location": ["Africa", "Asia", "Australia"]},
    {"id": "a19", "name": "Water Spider", "location": ["Worldwide"]},
    {"id": "a20", "name": "Crab Spider", "location": ["North America", "Europe"]},
    {"id": "a21", "name": "Redback Spider", "location": ["Australia", "Asia"]},
    {"id": "a22", "name": "Hobo Spider", "location": ["North America"]},
    {"id": "a23", "name": "Funnel-Web Spider", "location": ["Australia", "New Zealand"]},
    {"id": "a24", "name": "Six-Eyed Sand Spider", "location": ["Africa"]},
    {"id": "a25", "name": "Spiny Orb-Weaver", "location": ["North America", "Central America"]},
    {"id": "a26", "name": "Peacock Spider", "location": ["Australia"]},
    {"id": "a27", "name": "Lynx Spider", "location": ["Worldwide"]},
    {"id": "a28", "name": "Argiope Spider", "location": ["Europe", "Asia"]},
    {"id": "a29", "name": "Cellar Spider", "location": ["North America", "Europe"]},
    {"id": "a30", "name": "Saint Andrew's Cross Spider", "location": ["Australia", "Asia"]}
]

app.listen(app.get('port'), () => {
    console.log(`${app.locals.title} is running on http://localhost:${app.get('port')}.`)
});

app.get('/', (request, response) => {
    console.log((app.locals))
    response.send('🕷️');
});

app.get('/api/v1/spiders', (request, response) => {
    const spiders = app.locals.spiders

    response.json({ spiders })
})

app.post('/api/v1/spiders', (request, response) => {
    const id = `${Date.now()}`
    const { name, location } = request.body

    app.locals.spiders.push({ id, name, location })
    response.status(201).json({ id, name, location })
})

app.get('/api/v1/spiders/:id', (request, response) => {
    const { id } = request.params
    const spider = app.locals.spiders.find(spider => spider.id === id)

    spider
    ? response.status(200).json({ spider })
    : response.sendStatus(404)
})

app.put('/api/v1/spiders/:id', (request, response) => {
    const id = request.params.id
    const { name, location } = request.body
    const i = app.locals.spiders.findIndex(spider => spider.id === id)

    i !== -1 ? (
        app.locals.spiders[i] = { id, name, location},
        response.status(200).json(app.locals.spiders[i])
    ) : response.sendStatus(404)
})

app.patch('/api/v1/spiders/:id', (request, response) => {
    const id = request.params.id
    const updates = request.body
    const spider = app.locals.spiders.find(spider => spider.id === id)

    spider ? (
        Object.keys(updates).forEach(key => spider[key] = updates[key]),
        response.status(200).json(spider)
    ) : response.status(404).send('Spider not found')
})

app.delete('/api/v1/spiders/:id', (request, response) => {
    const { id } = request.params;
    const index = app.locals.spiders.findIndex(spider => spider.id === id);

    index !== -1 ? (
        app.locals.spiders.splice(index, 1),
        response.status(200).send(`Spider with id ${id} deleted`)
    ) : response.status(404).send('Spider not found')
});
