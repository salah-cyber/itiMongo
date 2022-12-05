const mongoose = require('mongoose');
//..........................................................................................................................................................
//connect
mongoose.connect("mongodb://127.0.0.1:27017/Library", { //mongoose connect fun return promise so i take this promise return in then function
    useNewUrlParser: true,
    useUnifiedTopology: true})
    .then(() => {console.log('database connected..')}).catch((err) => {console.log(err)});
//..........................................................................................................................................................
//make schema
const bookSchema = new mongoose.Schema({
    Title: String,
    Author: String,
    Genre: String,
    Height: Number,
    Publisher: String

})
//..........................................................................................................................................................
//make model = collection
const books = mongoose.model("books", bookSchema)
//..........................................................................................................................................................
//quering documents using helper methods
books.find({Title:"God Created the Integers"}).then((data) => {console.log(data)}); // find return promise so i take promis in then method 
books.find({}).where("Title").equals("Orientalism").then((data) => {console.log(data)}); //// promise -> then 
async function getABooks(){ // async -> await 
    let result = await books.find({Title:"Age of Wrath, The"});
    console.log(result);
};getABooks() // النتايج هنا طلعت قبل اللي فوق
async function getAllBooks(){ // async -> await 
    let result = await books.find({}).limit(5).sort({"Height":1}).select({Title:1,Height:1});
    console.log(result);
};getAllBooks() 
//..........................................................................................................................................................
