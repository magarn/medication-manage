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

/*插入关键字*/
router.post('/add', (req, res) => {
    let { user_id,keyword } = req.body;
    var select_sql = `select * from search where user_id='${user_id}' and keyword='${keyword}'`;
    conn.query(select_sql, [user_id,keyword], (err, result) => {
        if (err) {
            throw err;
        }
        if (result) {
            if (!result || result.length == 0) {
                let insert_sql = "insert into search (id,user_id,keyword) value (null,?,?)"
                conn.query(insert_sql, [user_id,keyword], (err, result) => {
                    if (err) {
                        throw err;
                    }
                    if (result) {
                        res.json({
                            code: '200',
                            msg: '操作成功'
                        });
                    }
                })
            }
        }
    })
});

/*批量获取关键字*/
router.post('/select', (req, res) => {
    let { user_id } = req.body;
    var select_sql = `select * from search where user_id='${user_id}'`;
    conn.query(select_sql, [user_id], (err, result) => {
        if (err) {
            throw err;
        }
        if (result) {
            jsonWrite(res, result);
        }
    })
});

module.exports = router;
