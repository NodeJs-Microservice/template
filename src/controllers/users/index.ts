import { Context } from 'koa';
import bcrypt from 'bcrypt';
import { sessions, users } from '../../models';
import { hashSha512, secureString } from '../../utils/commonFunctions';
import { signToken } from '../../utils/jwt';

const userControllerLogin = async (ctx: Context) => {
  const payload = ctx.request.body;
  const user = await users
    .findOne({
      $or: [
        {
          email: payload.user
        },
        {
          phone: payload.user
        }
      ]
    })
    .select('+password');

  if (!user) {
    ctx.throw('invalid username or password');
  }
  if (user.metadata.loginDisabled) {
    ctx.throw('user not allowed to login');
  }
  if (bcrypt.compareSync(payload.password, user.password)) {
    ctx.throw('invalid username or password');
  }

  const userAgent = ctx.header['user-agent'];
  const refreshToken = secureString(64);

  const session = await sessions.create({
    user: user._id,
    secret: hashSha512(refreshToken),
    device: userAgent
  });


  const jwtToken = signToken({
    _id: user._id.toString(),
    fullName: user.fullName,
    session: session._id.toString()
  });

  ctx.body = {
    refreshToken,
    token: jwtToken
  };
};

const userControllerUpdate = (ctx: Context) => {
  //
};

const userControllerRefreshToken = async (ctx: Context) => {
  const payload = ctx.request.body;
  const existingSession = await sessions.findOne({
    secret: hashSha512(payload.refreshToken),
    isActive: true
  });
  if (!existingSession) {
    ctx.throw('invalid session key');
  }
  const user = await users.findById(existingSession.user);
  if (!user) {
    await sessions.findByIdAndDelete(existingSession._id);
    ctx.throw('user not found');
  }
  if (user.metadata.loginDisabled) {
    await sessions.findByIdAndDelete(existingSession._id);
    ctx.throw('login disabled, please contact admin');
  }

  const jwtToken = signToken({
    _id: user._id.toString(),
    fullName: user.fullName,
    session: existingSession._id.toString()
  });

  await sessions.findByIdAndUpdate(existingSession._id, { user: existingSession.user });
  ctx.body = {
    token: jwtToken
  };
};

const userControllerLogout = async (ctx: Context) => {
  const user = ctx.state.user;
  await sessions.findByIdAndDelete(user.session);
  ctx.body = {
    success: true
  };
};

export { userControllerUpdate, userControllerLogin, userControllerLogout, userControllerRefreshToken };
