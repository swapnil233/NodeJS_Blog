const express = require("express");

// Express App
const app = express();

// Register view engine (ejs)
app.set('view engine', 'ejs')

// Listen for requests
app.listen(3000);

// Middleware for static files
app.use(express.static('public'))

app.get('/', (req, res) => {
    const blogs = [{
            title: "Blog 1",
            snippet: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Adipisci, iusto exercitationem eaque laudantium molestias nemo tempore qui dolore perspiciatis id."
        },
        {
            title: "Blog 2",
            snippet: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Adipisci, iusto exercitationem eaque laudantium molestias nemo tempore qui dolore perspiciatis id."
        },
        {
            title: "Blog 3",
            snippet: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Adipisci, iusto exercitationem eaque laudantium molestias nemo tempore qui dolore perspiciatis id."
        },
        {
            title: "Blog 4",
            snippet: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Adipisci, iusto exercitationem eaque laudantium molestias nemo tempore qui dolore perspiciatis id."
        },
        {
            title: "Blog 5",
            snippet: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Adipisci, iusto exercitationem eaque laudantium molestias nemo tempore qui dolore perspiciatis id."
        }
    ]

    res.render("index", {
        title: "Home",
        blogs
    });
})

app.get('/about', (req, res) => {
    res.render("about", {
        title: "About"
    });
})

app.get('/blogs/create', (req, res) => {
    res.render('create', {
        title: "Create"
    })
})

// 404 -- needs to be last
app.use((req, res) => {
    res.status(404).render("404", {
        title: "404"
    })
})