const express = require("express")

const mongoose = require("mongoose")
const Blog = require("./models/blog")

const morgan = require("morgan")
const dotenv = require("dotenv")

// Express App
const app = express()

// Environment Variables
require('dotenv').config()
const dbURI = process.env.URI
const PORT = process.env.PORT || 3000;

// View Engine
app.set('view engine', 'ejs')
app.set("views", "views");

// Middleware & static files
app.use(express.static('public'))
app.use(morgan('dev'))
app.use(express.urlencoded({
    extended: true
}))

// MongoDB Connection
mongoose.connect(dbURI)
    .then(() => {
        console.log("Connected to DB")

        // Listen for requests only when connected to DB
        app.listen(PORT)
        console.log(`Listening on port ${PORT}`)
    })
    .catch((err) => {
        console.log(err)
    })

// // MongoDB Route to save a blog
// app.get("/add-blog", (req, res) => {
//     // Instance of Blog
//     const blog = new Blog({
//         title: "New Blog 2",
//         snippet: "About my new blog",
//         body: "More about my new blog"
//     })

//     // Save the new instance of the Blog model
//     blog.save()
//         .then(result => {
//             res.send(result)
//         })
//         .catch(err => {
//             console.log(err)
//         })
// })

// // MongoDB Route to Get all blogs
// app.get("/all-blogs", (req, res) => {
//     // Must run .find() on the Blog itself, not an instance of it
//     Blog.find()
//         .then(result => {
//             res.send(result)
//         })
//         .catch(err => {
//             console.log(err)
//         })
// })

// App Routes
app.get('/', (req, res) => {
    res.redirect("/blogs")
})

app.get('/about', (req, res) => {
    res.render("about", {
        title: "About"
    })
})

// Blog Routes
app.get("/blogs", (req, res) => {
    // Get all blogs from MDB, sorted by descending creation date
    Blog.find().sort({
            createdAt: -1
        })
        .then(result => {
            res.render("index", {
                title: "All Blogs",
                blogs: result
            })
        })
        .catch(err => {
            console.log(err)
        })
})

app.post('/blogs', (req, res) => {
    const blog = new Blog(req.body);

    blog.save()
        .then((result) => {
            res.redirect("/blogs");
        })
        .catch((err) => {
            console.log(err)
        })
})

app.get('/blogs/create', (req, res) => {
    res.render('create', {
        title: "Create"
    })
})

app.get("/blogs/:id", (req, res) => {
    const id = req.params.id;
    Blog.findById(id)
        .then(results => {
            res.render("details", {
                blog: results,
                title: results.title
            })
        })
        .catch(err => {
            console.log(err)
        })
})

app.delete("/blogs/:id", (req, res) => {
    const id = req.params.id;

    Blog.findByIdAndDelete(id)
        .then(() => {
            res.json({
                redirect: "/"
            })
        })
        .catch(err => console.log(err))
})

// 404 -- needs to be last
app.use((req, res) => {
    res.status(404).render("404", {
        title: "404"
    })
})