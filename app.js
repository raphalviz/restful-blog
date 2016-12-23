var bodyParser = require('body-parser'),
    mongoose   = require('mongoose'),
    express    = require('express'),
    app        = express();

// App config
mongoose.connect('mongodb://localhost/restful_blog_app');
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: true}));

// Mongoose/Model Config
var blogSchema = new mongoose.Schema({
    title: String,
    image: String,
    body: String,
    created: {type: Date, default: Date.now()}
})

var Blog = mongoose.model('Blog', blogSchema);

// Blog.create({
//     title: 'Test Blog',
//     image: 'https://i.ytimg.com/vi/opKg3fyqWt4/hqdefault.jpg',
//     body: 'cute dog blog post yeeyee'
// });

// RESTful Routes

app.get('/', function(req, res) {
    res.redirect('/blogs');
});

// INDEX
app.get('/blogs', function(req, res) {
    Blog.find({}, function(err, blogs) {
        if (err) {
            console.log("Error!");
        } else {
            res.render('index', {blogs: blogs});
        }
    });
});

// NEW
app.get('/blogs/new', function(req, res) {
    res.render('new');
})

// CREATE
app.post('/blogs', function(req, res) {
    Blog.create(req.body.blog, function(err, newBlog) {
        if (err) {
            res.render("new");
        } else {
            res.redirect("/blogs");
        }
    })
});

// SHOW
app.get('/blogs/:id', function(req, res) {
    Blog.findById(req.params.id, function(err, foundBlog) {
        if (err) {
            res.redirect("/blogs");
        } else {
            res.render("show", {blog: foundBlog});
        }
    })
});

app.listen(3000, function() {
    console.log('server is running');
})