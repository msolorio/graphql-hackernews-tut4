const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

function post(parent, args, context) {
  const { userId } = context;

  if (!userId) throw new Error('Not authorized');

  const newLink = context.prisma.link.create({
    data: {
      url: args.url,
      description: args.description,
      postedBy: { connect: { id: userId } }
    }
  });

  return newLink;
}


async function signup(parent, args, context) {
  // hash the incoming password
  const password = await bcrypt.hash(args.password, 10);

  // create new user passing in incoming data and hashed password
  const user = await context.prisma.user.create({ data: { ...args, password } });

  // generate a token to track user's logged in status
  // storing user's id and signing with APP_SECRET
  const token = jwt.sign({ userId: user.id }, process.env.APP_SECRET);

  return {
    token,
    user
  }
}


async function login(parent, args, context) {
  // 1. find a user by email passed in
  const user = await context.prisma.user.findUnique({ where: { email: args.email } });

  if (!user) {
    throw new Error('No user found');
  }

  // 2. Check the passeed in password against the hashed password stored in DB
  const passwordIsValid = await bcrypt.compare(args.password, user.password);

  if (!passwordIsValid) {
    throw new Error('Invalid password');
  }

  // 3. Create a JWT storing the userId and signing with the app secret
  const token = jwt.sign({ userId: user.Id }, process.env.APP_SECRET);

  return {
    token,
    user
  }
}


module.exports = {
  post,
  signup,
  login
}
