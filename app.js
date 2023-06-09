const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");
const mongoose = require("mongoose");
mongoose.connect(
	"mongodb+srv://respecctemp1:123@cluster0.x61dt5h.mongodb.net/blogsDB",
	{
		useNewUrlParser: true,
		useUnifiedTopology: true,
	}
);

const blogSchema = new mongoose.Schema({
	postTitle: String,
	postBody: String,
	postDate: Date,
	postAuthor: String,
});

const Blog = mongoose.model("Blog", blogSchema);
const blog = new Blog({
	postTitle: "Test",
	postBody: "Test",
	postDate: Date.now(),
	postAuthor: "respecc",
});
// blog.save();

const homeStartingContent =
	"Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";
const aboutContent =
	"Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent =
	"Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";

const app = express();

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

// var posts = [];

app.get("/", (req, res) => {
	try {
		Blog.find().then((foundItems) => {
			res.render("home", {
				homeStartingContent: homeStartingContent,
				posts: foundItems,
			});
		});
	} catch (err) {
		console.log(err, "insert error");
	}
});

app.get("/about", (req, res) => {
	res.render("about", { aboutContent: aboutContent });
});

app.get("/contact", (req, res) => {
	res.render("contact", { contactContent: contactContent });
});

app.get("/compose", (req, res) => {
	res.render("compose");
});

app.get("/posts/:id", function (req, res) {
	// console.log(req.params.postTitle);
	var id = req.params.id;
	console.log(id);
	try {
		Blog.findById(id).then((foundItems) => {
			res.render("post", {
				postTitle: foundItems.postTitle,
				postBody: foundItems.postBody,
			});
		});
	} catch (err) {
		console.log(err, "insert error");
	}
});

app.post("/compose", (req, res) => {
	var postTitle = req.body.postTitle;
	var postBody = req.body.postBody;
	const blog = new Blog({
		postTitle: postTitle,
		postBody: postBody,
	});
	blog.save();

	res.redirect("/");
});

app.listen(3000, function () {
	console.log("Server started on port 3000");
});
