import axios from 'axios';
import { NextResponse } from 'next/server';
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

export async function POST(request: Request) {
  try {
    const body = await request.json();
    // Create our Nodemailer transport handler
    const transporter = nodemailer.createTransport(mailConfig);

    // テンプレファイルのfetch（パスはいじる必要なし）
    const template = await getPubFile('/email-templates/template.html');
    const custHtml = await getPubFile('/email-templates/customer.html');
    const adminHtml = await getPubFile('/email-templates/admin.html');
    const custTxt = await getPubFile('/email-templates/customer.txt');
    const adminTxt = await getPubFile('/email-templates/admin.txt');

    // 受信先
    const recipEmail = `${body.name} <${body.email}>`;

    // お客様宛のメール
    let sendHtml = template
      .replace('%BODY%', custHtml)
      .replace('%NAME%', body.name)
      .replace('%EMAIL%', body.email)
      .replace('%MESSAGE%', body.message);

    let sendTxt = custTxt
      .replace('%NAME%', body.name)
      .replace('%EMAIL%', body.email)
      .replace('%MESSAGE%', body.message);

    // お客様宛のメールの送信関数
    let info = await transporter.sendMail({
      from: adminEmail,
      to: recipEmail, // list of receivers
      subject: 'お問い合わせありがとうございます。', // Subject line
      text: sendTxt, // plain text body
      html: sendHtml, // html body
    });

    if (!info.messageId) {
      return NextResponse.json(
        { status: 0, message: '送信に失敗しました。' },
        { status: 500 },
      );
    }

    // 管理人宛のメール
    sendHtml = template
      .replace('%BODY%', adminHtml)
      .replace('%NAME%', body.name)
      .replace('%EMAIL%', body.email)
      .replace('%MESSAGE%', body.message);

    sendTxt = adminTxt
      .replace('%NAME%', body.name)
      .replace('%EMAIL%', body.email)
      .replace('%MESSAGE%', body.message);

    // 管理人宛のメール送信関数
    info = await transporter.sendMail({
      from: recipEmail,
      to: adminEmail, // list of receivers
      subject: body.subject
        ? body.subject
        : '【ポートフォリオサイトからのお問い合わせ】', // Subject line
      text: sendTxt, // plain text body
      html: sendHtml, // html body
    });

    if (info.messageId) {
      return NextResponse.json({ status: 1 });
    } else {
      return NextResponse.json(
        { status: 0, message: '送信に失敗しました。' },
        { status: 500 },
      );
    }
  } catch (error) {
    return NextResponse.json(
      { status: 0, message: 'エラーが発生しました。' },
      { status: 500 },
    );
  }
}
