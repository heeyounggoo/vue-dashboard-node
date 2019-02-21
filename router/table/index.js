const express = require('express')
const router = express.Router();
const connection = require('../config/database.js')

router.post('/register', (req, res) => {
  console.log('[[[[[ TABLE REGISTER ]]]]]')
  console.log('REGISTER REQ', req.body.form)

  const form = req.body.form
  const {title, type, checkbox, radio, conts } = form

  connection.query(`INSERT INTO DASHBOARD
          (   TITLE
            , TYPE
            , CHECKBOX
            , RADIO
            , CONTS
            , REGR
            , REG_DT
            , URDR
            , UPD_DT
          )
          VALUES
          (
              ?
            , ?
            , ?
            , ?
            , ?
            , 'admin'
            , now()
            , 'admin'
            , now()
          )`
        , [title, type, `${checkbox}`, radio, conts] 
        , (err, rows) => {
          console.log('rows = ', rows);
          if (err) return res.status(401).end(JSON.stringify({err: '에러발생'}))
          
          if(rows.affectedRows > 0) {
            const resData = {}
            
            resData.insertId = rows.insertId
            resData.ok = true
            
            res.status(200)
            res.end(JSON.stringify(resData))
          }
        }
      )
})

router.get('/list', (req, res) => {
  console.log('[[[[[ TABLE LIST ]]]]]')

  connection.query(`SELECT 
                      TABLE_NO
                    , TITLE
                    , TYPE
                    , CHECKBOX
                    , RADIO
                    , CONTS
                    , DATE_FORMAT(REG_DT, "%Y-%m-%d %H:%i") REG_DT
                    FROM DASHBOARD
                    WHERE USE_YN = '1'
                    ORDER BY TABLE_NO DESC`, (err, rows) => {
    if(err) return res.status(401).json({err:'에러발생'})

    if(rows.length) {
      console.log(rows)

      const resData = {}

      resData.ok = true
      resData.body = rows

      res.status(200)
      res.json(resData)
    }
  })
})

router.get('/detail/:no', (req, res) => {
  console.log('[[[[[ TABLE DETAIL ]]]]]')
  console.log('no = ', req.params.no)

  const no = req.params.no

  connection.query(`SELECT * FROM DASHBOARD WHERE TABLE_NO = ? AND USE_YN = 1`, [no], (err, rows) => {
    if(err) return res.status(401).json({err: '에러발생'})
    console.log(rows[0])

    const resData = {}

    if(rows[0]) {
      resData.ok = true
      resData.body = rows[0]

      res.status(200)
      res.json(resData)
    } else {
      resData.ok = true
      res.status(200)
      res.json(resData)
    }
    // console.log(resData)
  })
})

router.post('/modify', (req, res) => {
  console.log('[[[[[ TABLE MODIFY ]]]]]')
  console.log('req.body', req.body)

  const form = req.body.form
  const {title, type, checkbox, radio, conts } = form
  const no = req.body.no

  connection.query(`UPDATE DASHBOARD SET
            TITLE    = ?
          , TYPE     = ?
          , CHECKBOX = ?
          , RADIO    = ?
          , CONTS    = ?
          , URDR     = 'admin'
          , UPD_DT   = now()
          WHERE TABLE_NO = ? AND USE_YN = 1`
        , [title, type, `${checkbox}`, radio, conts, no] 
        , (err, rows) => {
          console.log('rows = ', rows);
          if (err) return res.status(401).end(JSON.stringify({err: '에러발생'}))
          
          if(rows.affectedRows > 0) {
            const resData = {}
            
            resData.modifyId = no
            resData.ok = true
            
            res.status(200)
            res.end(JSON.stringify(resData))
          }
        }
      )
})

router.post('/delete', (req, res) => {
  console.log('[[[[[ TABLE dELETE ]]]]]')
  console.log('REGISTER REQ', req.body.form)

  const no = req.body.no

  connection.query(`UPDATE DASHBOARD SET USE_YN = '0' WHERE TABLE_NO = ?`
        , [no] 
        , (err, rows) => {
          console.log('rows = ', rows);
          if (err) return res.status(401).end(JSON.stringify({err: '에러발생'}))
          
          if(rows.affectedRows > 0) {
            const resData = {}
            
            resData.insertId = rows.insertId
            resData.ok = true
            
            res.status(200)
            res.end(JSON.stringify(resData))
          }
        }
      )
})
module.exports = router