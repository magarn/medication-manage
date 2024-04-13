const request = require('request')

//引入连接数据库模块
const db = require('../conn')

//连接数据
db.connect(() => {
    console.log("微信授权登录表连接")
})
const jwt = require("jsonwebtoken");
const config = require("../../config");
const { jwtSecretKey } = require("../../config");

exports.wxuser = (req, res) => {
    let params = req.body; // 接收小程序端传过来的所有数据
    let code = params.code; //获取小程序传来的code
    let encryptedData = params.encryptedData; //获取小程序传来的encryptedData
    let iv = params.iv; //获取小程序传来的iv
    let userInfo = JSON.parse(params.userInfo); //获取个人信息
    let appid = "wx641829f63d437e0a"; //自己小程序后台管理的appid，可登录小程序后台查看
    let secret = "e94349bd3be49e61c5effddf64f2b4ea"; //小程序后台管理的secret，可登录小程序后台查看
    let grant_type = "authorization_code"; // 授权（必填）默认值

    //请求获取openid
    let url =
        "https://api.weixin.qq.com/sns/jscode2session?grant_type=" +
        grant_type +
        "&appid=" +
        appid +
        "&secret=" +
        secret +
        "&js_code=" +
        code;
    request(url, (err, response, body) => {
        if (!err && response.statusCode == 200) {
            // 服务器返回的openid、sessionKey
            let _data = JSON.parse(body);
            _data.code = code;
            _data.session_key = "";
            // 对用户信息进行加密生成字符串
            const wxToken = jwt.sign(_data, jwtSecretKey, {
                expiresIn: config.expiresIn,
            });
            // 定义sql 语句，查询当前用户是否存在（openid）
            const sql = `select * from WeChatUser where user_id = ?`;
            db.query(sql, _data.openid, (err, result) => {
                if (err) return res.cc(err); //res.cc为自定义封装，可以换成res.send
                if (result.length === 0) {
                    const sql = `insert into WeChatUser  set ?`;
                    db.query(
                        sql, {
                            user_id: _data.openid,
                            nickName: userInfo.nickName,
                            avatar: userInfo.avatarUrl,
                            gender: userInfo.gender,
                        },
                        (err, result) => {
                            if (err) return res.cc(err);
                            if (result.affectedRows !== 1) return res.cc("授权失败，请重试");
                            res.send({
                                token: "Bearer " + wxToken,
                                status: 200,
                                messages: "WX 授权成功",
                            });
                        }
                    );
                } else {
                    const sql = `update WeChatUser set ? where user_id = ?`;
                    db.query(
                        sql, [{
                                user_id: _data.openid,
                                nickName: userInfo.nickName,
                                avatar: userInfo.avatarUrl,
                                gender: userInfo.gender,
                            },
                            _data.openid,
                        ],
                        (err, result) => {
                            if (err) return res.cc(err);
                            res.send({
                                token: "Bearer " + wxToken,
                                status: 200,
                                messages: "WX1 授权成功",
                            });
                        }
                    );
                }
            });
        } else {
            res.cc("请求openid失败");
        }
    });
};