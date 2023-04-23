import axios from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';
import nodemailer from 'nodemailer';

// Config
const mailConfig = {
  host: 'smtp.gmail.com',
  port: 465, // or 587
  secure: true, // true for 465, false for other ports
  auth: {
    user: process.env.NEXT_PUBLIC_GMAIL_USER,
    pass: process.env.NEXT_PUBLIC_GMAIL_PASS,
  },
};

const adminEmail = '管理人 <jojojo.sub@gmail.com>';

// テンプレファイルの取得
async function getPubFile(file: string) {
  const res = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}${file}`);
  return res.data;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  sendEmails(req, res);
}

async function sendEmails(req: NextApiRequest, res: NextApiResponse) {
  // Create our Nodemailer transport handler
  const transporter = nodemailer.createTransport(mailConfig);

  // テンプレファイルのfetch（パスはいじる必要なし）
  const template = await getPubFile('/email-templates/template.html');
  const custHtml = await getPubFile('/email-templates/customer.html');
  const adminHtml = await getPubFile('/email-templates/admin.html');
  const custTxt = await getPubFile('/email-templates/customer.txt');
  const adminTxt = await getPubFile('/email-templates/admin.txt');

  // 受信先
  const recipEmail = `${req.body.name} <${req.body.email}>`;

  // お客様宛のメール
  let sendHtml = template
    .replace('%BODY%', custHtml)
    .replace('%NAME%', req.body.name)
    .replace('%EMAIL%', req.body.email)
    .replace('%MESSAGE%', req.body.message);

  let sendTxt = custTxt
    .replace('%NAME%', req.body.name)
    .replace('%EMAIL%', req.body.email)
    .replace('%MESSAGE%', req.body.message);

  // お客様宛のメールの送信関数
  let info = await transporter.sendMail({
    from: adminEmail,
    to: recipEmail, // list of receivers
    subject: 'お問い合わせありがとうございます。', // Subject line
    text: sendTxt, // plain text body
    html: sendHtml, // html body
  });

  if (!info.messageId) {
    res.status(200).json({ status: 0, message: '送信に失敗しました。' });
    return false;
  }

  // 管理人宛のメール
  sendHtml = template
    .replace('%BODY%', adminHtml)
    .replace('%NAME%', req.body.name)
    .replace('%EMAIL%', req.body.email)
    .replace('%MESSAGE%', req.body.message);

  sendTxt = adminTxt
    .replace('%NAME%', req.body.name)
    .replace('%EMAIL%', req.body.email)
    .replace('%MESSAGE%', req.body.message);

  // 管理人宛のメール送信関数
  info = await transporter.sendMail({
    from: recipEmail,
    to: adminEmail, // list of receivers
    subject: req.body.subject
      ? req.body.subject
      : '【ポートフォリオサイトからのお問い合わせ】', // Subject line
    text: sendTxt, // plain text body
    html: sendHtml, // html body
  });

  if (info.messageId) {
    res.status(200).json({ status: 1 });
  } else {
    res.status(200).json({ status: 0, message: '送信に失敗しました。' });
  }
}
