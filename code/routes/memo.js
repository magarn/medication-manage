var express = require('express');
var router = express.Router();

//引入连接数据库模块
const conn = require('./conn')

//连接数据
conn.connect(() => {
    console.log("memo表连接成功")
})
var jsonWrite = function(res, ret) {
    if (typeof ret === 'undefined') {
        res.json({
            code: '1',
            msg: '操作失败'
        });
    } else {
        res.json(
            ret
        );
    }
};

/* 新增备忘*/
router.post('/addMemo', (req, res) => {
    var sql = 'insert into memo(content,date,alarm,dose,title,userId) values (?,?,?,?,?,?)';
    var params = req.body;
    conn.query(sql, [params.content, params.date, params.alarm, params.dose, params.title, params.userId], function(err, result) {
        if (err) {
            console.log(err);
        }
        if (result) {
            jsonWrite(res, result);
        }
    })
});
/* 查询备忘列表*/
router.post('/memoList', (req, res) => {
    let { userId } = req.body;
    const sqlStr = `select * from memo where  userId='${userId}' `
    conn.query(sqlStr, function(err, result) {
        if (err) {
            console.log(err);
        }
        if (result) {
            jsonWrite(res, result);
        }
    })
});

/* 通过title查询备忘列表*/
router.post('/memoListByTitle', (req,res) => {
    let { title,userId } = req.body;
    const sqlStr = `select * from memo where title='${title}' and userId = '${userId}' `
    conn.query(sqlStr, function(err, result) {
        if (err) {
            console.log(err);
        }
        if (result) {
            jsonWrite(res, result);
        }
    })
})

/*确认用药*/
router.post('/confirm', (req,res) => {
    let { memoId } = req.body;
    const sqlStr =  `update memo set flog = 1 where memoId = '${memoId}'`
    conn.query(sqlStr, function(err, result) {
        if (err) {
            console.log(err);
        }
        if (result) {
            res.json({
                code: '200'
            });
        }
    })
})

/* 查询备忘录，通过menoId*/
router.post('/selMemoById', (req, res) => {
    let { memoId } = req.body;
    const sqlStr = `select * from memo where  memoId='${memoId}' `
    conn.query(sqlStr, function(err, result) {
        if (err) {
            console.log(err);
        }
        if (result) {
            jsonWrite(res, result);
        }
    })
});
/* 删除 */
router.post('/delMemoById', (req, res) => {
    let { memoId } = req.body;
    const sqlStr = `delete  from memo where  memoId='${memoId}' `
    conn.query(sqlStr, function(err, result) {
        if (err) {
            console.log(err);
        }
        if (result) {
            jsonWrite(res, result);
        }
    })
});
/* 通过id修改*/
router.post('/updateById', (req, res) => {
    let { memoId, content, alarm } = req.body;
    const sqlStr = `update memo set content='${content}' , alarm= '${alarm}' where  memoId='${memoId}' `
    var params = req.body;
    conn.query(sqlStr, function(err, result) {
        if (err) {
            console.log(err);
        }
        if (result) {
            jsonWrite(res, result);
        }
    })
});
module.exports = router;