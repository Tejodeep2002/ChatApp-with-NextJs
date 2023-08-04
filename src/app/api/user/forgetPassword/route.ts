import { NextResponse, NextRequest } from "next/server";
import nodemailer from "nodemailer";
import prisma from "@/lib/prisma/prisma";
import { resetJwtToken } from "@/lib/token/token";

export const POST = async (request: NextRequest) => {
  const { email } = await request.json();

  if (!email) {
    return NextResponse.json({ error: "Please Enter field" }, { status: 400 });
  }

  if (typeof email === "string") {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      return NextResponse.json(
        { error: "Email is not registered" },
        { status: 404 }
      );
    }

    const token = await resetJwtToken(user.id);

    try {
      //Connect SMPT
      const transporter = await nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
          // TODO: replace `user` and `pass` values from <https://forwardemail.net>
          user: "tejodeepmitra@gmail.com",
          pass: "mnscfgbaxtsxcced",
        },
      });

      let info = await transporter.sendMail({
        to: email,
        subject: "Password Reset",
        text: "Your new password",
        html: `<h1>Your reset LInk</h1> <br><a href='http://localhost:3000/reset-password/${token}'><span>Reset LInk</span></a>`,
      });

      return NextResponse.json(info);
    } catch (error) {
      return NextResponse.json(error, { status: 400 });
    }
  } else {
    return NextResponse.json(
      { error: "Please give any string value" },
      { status: 400 }
    );
  }
};
