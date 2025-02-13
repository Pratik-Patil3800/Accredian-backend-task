const express = require('express');
const { PrismaClient } = require('@prisma/client');
const nodemailer = require('nodemailer');
const cors = require('cors');
require('dotenv').config();


const prisma = new PrismaClient();
const app = express();

app.use(
  cors({
    origin: [process.env.FRONTEND_URL,], 
    credentials: true, 
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS']
}));
app.use(express.json());

const createTransporter = async () => {
  
  return nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
        user: process.env.EMAIL_FROM,
        pass: process.env.EMAIL_PASSWORD,
    },
  });
};



const validateReferralData = (req, res, next) => {
  const { referrerName, referrerMobile, referrerEmail, refereeName, refereeEmail, refereeMobile, courseId } = req.body;
  // console.log(req.body)
  const errors = [];
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!referrerName) errors.push('Referrer name is required');
  if (!referrerEmail) errors.push('Referrer email is required');
  if (!refereeName) errors.push('Referee name is required');
  if (!refereeEmail) errors.push('Referee email is required');
  if (!referrerMobile) errors.push('Referrer mobile is required');
  if (!refereeMobile) errors.push('Referee mobile is required');
  if (!courseId) errors.push('Course ID is required');
  
  if (!emailRegex.test(referrerEmail)) errors.push('Invalid referrer email format');
  if (!emailRegex.test(refereeEmail)) errors.push('Invalid referee email format');

  if (errors.length > 0) {
    console.log(errors)
    return res.status(400).json({ errors });
  }
  else{
    next();
  }

  
};


app.post('/api/referrals', validateReferralData, async (req, res) => {
  try {
    const { referrerName, referrerEmail, refereeName, refereeEmail, courseId, referrerMobile, refereeMobile } = req.body;
    // console.log(prisma)
    // console.log(req.body)
    const referral = await prisma.referral.create({
      data: {
        referrerName,
        referrerEmail,
        refereeName,
        refereeEmail,
        referrerMobile,
        refereeMobile,
        courseId,
      },
    });


    const transporter = await createTransporter();
    await transporter.sendMail({
      from: process.env.EMAIL_FROM,
      to: refereeEmail,
      subject: `${referrerName} has referred you to a course!`,
      html: `
        <h1>You've been referred to a course!</h1>
        <p>Hello ${refereeName},</p>
        <p>${referrerName} thinks you might be interested in this course.</p>
        <p>Click the link below to learn more:</p>
        <a href="${process.env.FRONTEND_URL}/courses/${courseId}">View Course</a>
      `,
    });

    res.status(201).json(referral);
  } catch (error) {
    console.error('Error creating referral:', error);
    res.status(500).json({ error: 'Failed to create referral' });
  }
});


app.get('/api/referrals', async (req, res) => {
  try {
    const referrals = await prisma.referral.findMany();
    res.json(referrals);
  } catch (error) {
    console.error('Error fetching referrals:', error);
    res.status(500).json({ error: 'Failed to fetch referrals' });
  }
});

app.get('/health',(req,res) => {
  res.json({"message" : "Ok"});
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
}); 