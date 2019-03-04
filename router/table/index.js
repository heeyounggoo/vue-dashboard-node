const express = require('express')
const router = express.Router();
const connection = require('../config/database.js')
const multer = require('multer')
const path = require('path')
const fs = require('fs')

const upload = multer({
  storage: multer.diskStorage({ 
    destination: function (req, file, cb) { // 저장 파일경로
      cb(null, 'public/images/')
    },
    filename: function (req, file, cb) {  // 파일이름
      cb(null, new Date().valueOf() + path.extname(file.originalname))  // 날짜 원시값 + 확장자
    },
    fileFilter: function(req, file, cb) { // 파일필터
      if (file.mimetype !== 'image/png' && file.mimetype !== 'image/jpg' && file.mimetype !== 'image/jpeg') {
          req.validateErr = '"JPG, PNG 이미지만 업로드 가능합니다."'
          return cb(null, false, new Error('JPG, PNG 이미지만 업로드 가능합니다'));
          } else {
              cb(null, true)
          }
          cb(null, true);
    },
    limits: { fileSize: 5 * 1024 * 1024 }
  }),
})

router.post('/register', upload.single('image'), (req, res) => {
  console.log('[[[[[ TABLE REGISTER ]]]]]')
  // console.log('req.body.form', req.body.form)
  // console.log(req.body.form)
  // console.log('req = ', req)

  let oriImgName = req.file.originalname
  let phyImgName = req.file.filename

  if(req.file) {
    oriImgName = req.file.originalname
    phyImgName = req.file.filename
  }


  const form = JSON.parse(req.body.form)
  const {title, type, checkbox, radio, conts } = form

  connection.query(`INSERT INTO DASHBOARD
          (   TITLE
            , TYPE
            , CHECKBOX
            , RADIO
            , CONTS
            , ORI_IMG_NAME
            , PHY_IMG_NAME
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
            , ?
            , ?
            , 'admin'
            , now()
            , 'admin'
            , now()
          )`
        , [title, type, `${checkbox}`, radio, conts, oriImgName, phyImgName] 
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
  console.log('req.params = ', req.query)

  const search = req.query.search

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
                    AND TITLE LIKE '%${search}%'
                    ORDER BY TABLE_NO DESC`, (err, rows) => {
    if(err) return res.status(401).json({err:'에러발생'})

    // 주석처리 하는 이유는 검색한 조건이 데이터가 없다면 즉, length 값이 0일 땐 리스트를 보여주지 않기 위해서
    // if(rows.length) { 
      // console.log(rows)

      const resData = {}

      resData.ok = true
      resData.body = rows

      res.status(200)
      res.json(resData)
    // }
  })
})

router.get('/detail/:no', (req, res) => {
  console.log('[[[[[ TABLE DETAIL ]]]]]')
  console.log('no = ', req.params.no)

  const no = req.params.no

  connection.query(`SELECT 
                      TITLE
                    , TYPE
                    , CHECKBOX
                    , RADIO
                    , CONTS
                    , ORI_IMG_NAME
                    , PHY_IMG_NAME
                    , REGR
                    , DATE_FORMAT(REG_DT, "%Y-%m-%d %H:%i") REG_DT
                    , URDR
                    , DATE_FORMAT(UPD_DT, "%Y-%m-%d %H:%i") UPD_DT
                      FROM DASHBOARD WHERE TABLE_NO = ? AND USE_YN = 1`, [no], (err, rows) => {
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

router.post('/modify', upload.single('image'), (req, res) => {
  console.log('[[[[[ TABLE MODIFY ]]]]]')
  console.log('req.body.form = ', req.body.form)
  console.log('req.file = ', req.file)

  const form = JSON.parse(req.body.form)
  let {title, type, checkbox, radio, conts, oriImgName, phyImgName } = form
  const no = req.body.no
  const imgPath = `public/images/${phyImgName}`

  if(req.file) {
    console.log('==== is req.file =====')
    if(phyImgName) fs.unlinkSync(imgPath)
    oriImgName = req.file.originalname
    phyImgName = req.file.filename
  }

  if(!oriImgName && !req.file) {
    console.log('====== is not req.file, oriImgName =====')
    if(phyImgName) {
      fs.unlinkSync(imgPath)
      oriImgName = ''
      phyImgName = ''
    }
  }

  connection.query(`UPDATE DASHBOARD SET
            TITLE    = ?
          , TYPE     = ?
          , CHECKBOX = ?
          , RADIO    = ?
          , CONTS    = ?
          , ORI_IMG_NAME = ?
          , PHY_IMG_NAME = ?
          , URDR     = 'admin'
          , UPD_DT   = now()
          WHERE TABLE_NO = ? AND USE_YN = 1`
        , [title, type, `${checkbox}`, radio, conts, oriImgName, phyImgName, no] 
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
  const oriImgName = req.body.form.oriImgName
  const phyImgName = req.body.form.phyImgName
  const imgPath = `public/images/${phyImgName}`

  if(phyImgName) {
    fs.unlinkSync(imgPath)
  }

  connection.query(`UPDATE DASHBOARD SET 
                        USE_YN = '0' 
                      , ORI_IMG_NAME = ?
                      , PHY_IMG_NAME = ?
                      WHERE TABLE_NO = ?`
                      , [oriImgName, phyImgName, no] 
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