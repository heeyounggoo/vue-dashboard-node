const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')()
const router = require('./router')

//미들웨어 구간 무조건 실행되며 순서대로 실행되기 때문에 순서가 중요하다.
app.use(cors); //크로스도메인
app.use(express.static('public'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))
app.use(router)


app.use((req, res, next) => {
  res.status = 404
  next(Error('not found'))
})

app.use((err, req, res, next) => {
  console.log(err)
  res.status(res.statusCode || 500)
  res.json({ error: err.message || 'internal server error' })
})

// app.listen(3000, () => {
//   console.log("3000port 대기중!")
// });

let port = process.env.PORT || 3000; //*
app.listen(port, function(){
  console.log('Server On!');
});