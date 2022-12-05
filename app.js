const mongoose = require('mongoose');
//..........................................................................................................................................................
//connect
mongoose.connect("mongodb://127.0.0.1:27017/Library", { //mongoose connect fun return promise so i take this promise return in then function
    useNewUrlParser: true,
    useUnifiedTopology: true})
    .then(() => {console.log('database connected..')}).catch((err) => {console.log(err)});
//..........................................................................................................................................................
//make schema for the document that will be stored in collection // schema built with validator
const bookSchema = new mongoose.Schema({   //types:String, Number, Date, Buffer, Biilean, Mixed, ObjectId, Array, Schema
    Title: String, //fields
    Author: {type:String,uppercase:true,trim:true},
    Genre: String,
    Height: {type:Number,required:true,min:100,max:300}, //unique:true
    Publisher: {type:String,required:true,minlength:3,maxlength:100} //match:Regular expression

})
//..........................................................................................................................................................
//make model = collection
const Book = mongoose.model("books", bookSchema)
console.log(Book,'----------*-*-*-*-*-*---*-*-*-*-*-');
//..........................................................................................................................................................
//quering documents using helper methods
Book.find({Title:"God Created the Integers"}).then((data) => {console.log(data,'------1---------')}); // find return promise so i take promis in then method 
Book.find({}).where("Title").equals("Orientalism").then((data) => {console.log(data,'-----2---------')}); //// promise -> then 
async function getABooks(){ // async -> await 
    let result = await Book.find({Title:"Age of Wrath, The"});
    console.log(result,'--------3------');
};getABooks() // النتايج هنا طلعت قبل اللي فوق
async function getAllBooks(){ // async -> await 
    let result = await Book.find({}).limit(3).sort({"Height":1}).select({Title:1,Height:1});
    console.log(result,'-------4-------');
};getAllBooks() 
//..........................................................................................................................................................
//reguar expression
async function getBooks(){ // async -> await 
let result = await Book.find({Title:/^S.*s$/}).limit(3).sort({"Height":1}).select({Title:1,Height:1});
    console.log(result,'-----5---------'); // title begin with S letter and end with s letter
};getBooks()
//..........................................................................................................................................................
//comparison Query operators
//.find({Height:{$gte:150,$lte:200}}).sort({"Height":1})
//..........................................................................................................................................................
//Logical Query Operators   
Book.find({}).or([{Publisher:"MIT Press",Genre:"data_science"}]).then((data) => {console.log(data,'----6---------')}); 
Book.find({}).and([{Publisher:"MIT Press",Genre:"data_science"}]).count().then((data) => {console.log(data,'------7-------')}); // output -> 1
//..........................................................................................................................................................
//schema رسمة او شكل افتراضي  structure of the object
//model موودل للتصميم او اسطمبة مبنية على الرسمة  interface for the object
//document instance of the model
function addNewBook (Title,Author,Genre,Height,Publisher) {
    let bk = new Book({ 
        Title:Title,
        Author:Author,
        Genre:Genre,
        Height:Height,
        Publisher:Publisher
    })                                                          // handling validation errors
    bk.save().then(()=>{console.log("saved..............8.");}).catch((err)=>{for(let e in err.errors){console.log(err.errors[e].message,'!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!');}})
};addNewBook("sasa","sasa","sasa",100,"sasa")  // error if we enter 10 insteado f 100 
//-> Path `Height` (10) is less than minimum allowed value (100). !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
//..........................................................................................................................................................
// u can make custom validation type, required, min, max
// validate:{validator:function(v){return /^[SN][AD]$.test(v)}}

// u can make custom schemaType options such as uppercase, trim
//set:(v)=>{return v*1000}
//select:false
//get:
























