const express = require("express");
const mongoose = require("mongoose")
const morgan = require("morgan")
const Blog = require("./models/blog")

const dotenv = require("dotenv");
require('dotenv').config()

// Express App
const app = express();

// Environment Variables
const dbURI = process.env.URI;

// View Engine
app.set('view engine', 'ejs')

// MongoDB Connection
// const dbURI = "mongodb+srv://tester:test1234@nodeblog.67anc.mongodb.net/node-blog?retryWrites=true&w=majority"
mongoose.connect(dbURI)
    .then((result) => {
        console.log("Connected to DB")

        // Listen for requests only when connected to DB
        app.listen(3000)
    })
    .catch((err) => {
        console.log(err)
    })

// Middleware & static files
app.use(express.static('public'))
app.use(morgan('dev'));

// // MongoDB Route to save a blog
// app.get("/add-blog", (req, res) => {
//     // Instance of Blog
//     const blog = new Blog({
//         title: "New Blog 2",
//         snippet: "About my new blog",
//         body: "More about my new blog"
//     });

//     // Save the new instance of the Blog model
//     blog.save()
//         .then(result => {
//             res.send(result);
//         })
//         .catch(err => {
//             console.log(err)
//         });
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
    });
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
            });
        })
        .catch(err => {
            console.log(err)
        })
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