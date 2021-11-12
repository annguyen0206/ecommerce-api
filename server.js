require('dotenv').config()

const express =require('express')
const mongoose =require('mongoose')
const cors = require('cors')
const fileUpload =require('express-fileupload')
const cookieParser =require('cookie-parser')


const app = express()
app.use(express.json())
app.use(cookieParser())
app.use(cors())
app.use(fileUpload({
    useTempFiles: true
}));

//Routers
app.use('/user',require('./routers/userRouter'))
app.use('/api',require('./routers/categoryRouter'))
app.use('/api',require('./routers/upload'))
app.use('/api',require('./routers/productRouter'))

//connect to db mongo
const URI = process.env.MONGODB_URL
mongoose.connect(URI,{
    //mongoose 6.0.6 ko hoox trojw cacs hamf duois
    // userCreateIndex: true,
    // useFindAndModify: false,
    useNewUrlParser: true,
    useUnifiedTopology: true
},err=>{
    if(err) throw err;
    console.log('Connected to MongoDB')
})

const PORT = process.env.PORT||2021

// app.get('/',(req,res)=>{
//     res.json({msg:"WELCOME"})
// })

app.listen(PORT,()=>{
    console.log('Server is running on Port',PORT)
})