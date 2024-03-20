const express = require('express')
const mongoose = require('mongoose')
const Article = require('./models/article')
const articleRouter = require('./routes/articles')
const methodOverride = require('method-override')
const app = express()

// mongoose.connect('mongodb://127.0.0.1:27017/blog_database')
mongoose.connect('mongodb+srv://luvmathur:1234@taskmanager.kftz7jp.mongodb.net/?retryWrites=true&w=majority')
app.set('view engine','ejs')

app.use(express.urlencoded({ extended: false}))

app.use(methodOverride('_method'))
app.get('/',async (req,res) => {
    // const articles = [{
    //     title: 'Test Article',
    //     createdAt: new Date(),
    //     description: 'Test Description' 
    // },{
    //     title: 'Test article 2',
    //     createdAt: new Date(),
    //     description: 'Test description of test article 2'
    // }]

    const articles = await Article.find().sort({
        createdAt: 'desc'
    })
    res.render('articles/index', {articles: articles})
})

app.use('/articles', articleRouter)
app.listen(5000)
