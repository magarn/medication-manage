var express = require('express');
var router = express.Router();
const request = require('request');
//引入连接数据库模块
const conn = require('./conn')

//连接数据
conn.connect(() => {
    console.log("users表连接成功")
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

/* 登录请求 */
router.post('/login', (req, res) => {
    let { Phone, userPwd } = req.body;
    const sqlStr = `select * from users where  Phone='${Phone}' and userPwd='${userPwd}'`
    conn.query(sqlStr, (err, result) => {
        if (err) {
            console.log(err);
        }
        if (result) {
            jsonWrite(res, result);
        }
    })
});

/*微信登录请求*/
router.post('/wxlogin',(req, res) => {

    let { code, nickName, avatarUrl } = req.body

	let authUrl = 'https://api.weixin.qq.com/sns/jscode2session?'

	let appid = 'wx1754d14ab380703b'

	let secret = 'c2d89bf7bfd059ed282ccfeff80f6616'

	const Url = `${authUrl}appid=${appid}&secret=${secret}&grant_type=authorization_code&js_code=${code}`

	/*将URL进行转码*/
	const lastUrl = encodeURI(Url)
    /*请求微信第三方接口*/
	request(lastUrl, function (err, response, body) {
    const arr = JSON.parse(body);
    if (arr.openid) {
			let select_sql = "select * from wechatuser where user_id = ?"

			conn.query(select_sql, [arr.openid],function(err,result){
                if(err) {
                   console.log(err)
                }
                if (result) {
                    if (!result || result.length == 0) {
                        /*没有该账号就进行注册*/
                        let insert_sql = "insert into wechatuser (user_id,nickName,avatar,gender) value (?,?,?,0)"
                        conn.query(insert_sql, [arr.openid, nickName, avatarUrl])
                    }
                    jsonWrite(res, result);
                }
			})
		}
    })

})

/* 注册 */
router.post('/addUser', (req, res) => {
    var sql = 'insert into users(userName,userPwd,Phone) values (?,?,?)';
    var params = req.body;
    conn.query(sql, [params.userName, params.userPwd, params.Phone], function(err, result) {
        if (err) {
            console.log(err);
        }
        if (result) {
            jsonWrite(res, result);
        }
    })
});
/* 是否注册 */
router.post('/isRegister', (req, res) => {
    let { Phone } = req.body;
    var sql = `select * from users where  Phone='${Phone}'`;
    conn.query(sql, function(err, result) {
        if (err) {
            console.log(err);
        }
        if (result) {
            jsonWrite(res, result);
        }
    })
});

module.exports = router;