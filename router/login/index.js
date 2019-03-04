const express = require('express')
const router = express.Router();
const connection = require('../config/database.js')
const crypto = require('crypto')

router.post('/', (req, res) => {
  console.log('req.body', req.body)

  const id = req.body.userInfo.username
  const pw = req.body.userInfo.password

  connection.query(`SELECT * FROM DB_MBR WHERE LOGIN_ID = ? AND LOGIN_PW = ?`
    , [id, pw]
    , (err, rows) => {
      if(err) return res.status(401).json({err: '에러발생'})

      if(rows.length) {
        console.log(rows)

        const resData = {}
        resData.ok = true
        resData.body = rows[0]

        res.status(200)
        res.json(resData)
      } else {
        return res.status(401).json({err: '일치하는 정보가 없습니다.'})
      }
    }
  )
})

router.post('/sign', (req, res) => {
  console.log('[[[[[ SIGNIN ]]]]]]')
  console.log('req.body', req.body)

  let {userId, userEmail, userPhone, password} = req.body.form

  connection.query(`INSERT INTO DB_MBR
                        (
                            LOGIN_ID
                          , LOGIN_PW
                          , USEREMAIL
                          , USERPHONE
                        )
                        VALUES
                        (
                            ?
                          , ?
                          , ?
                          , ?
                        )`
                        , [userId, password, userEmail, userPhone], (err, rows) => {

                          console.log('==== 쿼리 날린후 ====')
                          if(err) return res.status(401).json({err: '에러발생'})
                          console.log(rows)

                          if(rows.affectedRows > 0) {

                            const resData = {}

                            resData.ok = true

                            res.status(200)
                            res.end(JSON.stringify(resData))
                          }
                        })

  //promise
  // const changePassword = () => {
  //   return new Promise((resolve, reject) => {
  //     //비밀번호 암호화를 위해 사용
  //     crypto.randomBytes(64, (err, buf) => {
  //       const salt = buf.toString('base64')
  //       console.log('salt = ', salt)
        
  //       crypto.pbkdf2(password, salt, 100000, 64, 'sha512', (err, key) => {
  //         console.log('password = ', key.toString('base64'))
  //         password = key.toString('base64')
  //         resolve(password)
  //       })
  //     })
  //   })
  // }

  // changePassword()
  //   .then(resPwd => {
  //     connection.query(`INSERT INTO DB_MBR
  //                       (
  //                           LOGIN_ID
  //                         , LOGIN_PW
  //                         , USEREMAIL
  //                         , USERPHONE
  //                       )
  //                       VALUES
  //                       (
  //                           ?
  //                         , ?
  //                         , ?
  //                         , ?
  //                       )`
  //                       , [userId, resPwd, userEmail, userPhone], (err, rows) => {

  //                         console.log('==== 쿼리 날린후 ====')
  //                         if(err) return res.status(401).json({err: '에러발생'})
  //                         console.log(rows)

  //                         if(rows.affectedRows > 0) {

  //                           const resData = {}

  //                           resData.ok = true

  //                           res.status(200)
  //                           res.end(JSON.stringify(resData))
  //                         }
  //                       })
  //                     })
})

module.exports = router