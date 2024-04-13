var express = require('express');
var router = express.Router();

//引入连接数据库模块
const conn = require('./conn')

//连接数据
conn.connect(() => {
    console.log("WeChatUser表连接成功")
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
/* 列表*/
router.post('/wxuserList', (req, res) => {
    const sqlStr = `select * from WeChatUser`
    conn.query(sqlStr, function(err, result) {
        if (err) {
            console.log(err);
        }
        if (result) {
            jsonWrite(res, result);
        }
    })
});




const wxuserHandle = require('./router_handle/wxuser')
router.post('/wxuser', wxuserHandle.wxuser)



module.exports = router;