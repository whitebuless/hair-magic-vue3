import axios from "axios";


// 使用Axios发送请求
export function sendEmail(accessToken) {
    // 定义邮件内容
    const email = {
        message: {
            subject: "验证码", // 邮件主题
            body: {
                contentType: "Text", // 正文类型
                content: "您的验证码是123456" // 正文内容
            },
            toRecipients: [
                {
                    emailAddress: {
                        address: "fan727gold@outlook.com" // 收件人邮箱地址
                    }
                }
            ]
        }
    };

    // 发送邮件的API端点
    const endpoint = "https://graph.microsoft.com/v1.0/me/sendMail";

    // 发送请求
    axios.post(endpoint, email, {
        headers: {
            "Authorization": `Bearer ${accessToken}`, // 添加访问令牌到请求头
            "Content-Type": "application/json"
        }
    })
    .then(response => {
        console.log("邮件发送成功");
    })
    .catch(error => {
        console.error("邮件发送失败:", error.message);
    });
}

// 在此处调用获取访问令牌的函数，并将令牌传递给sendEmail函数
