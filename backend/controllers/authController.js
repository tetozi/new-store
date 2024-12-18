import { promisify } from 'util';
import jwt from 'jsonwebtoken';
import { catchAsync } from '../utils/catchAsync.js';
import User from '../models/userModel.js';
import AppError from '../error/AppError.js';
import { decode } from 'punycode';


const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};


const createSendToken = (user, statusCode, res) => {
  const token = signToken(user._id)
  const cookieOptions = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
    ),
    httpOnly: true
  };
  if (process.env.NODE_ENV === 'production') cookieOptions.secure = true;

  res.cookie('jwt', token, {
    httpOnly: true,            // Prevents JavaScript access
    secure: false,             // Use `true` only in production with HTTPS
    sameSite: 'lax',           // Adjust as needed: lax/strict/none
    maxAge: 7 * 24 * 60 * 60 * 1000, // Cookie expires in 7 days
  });
  console.log('Set-Cookie Header Sent:', res.getHeaders()['set-cookie']);
  // Remove password from output
  user.password = undefined;

  res.status(statusCode).json({
    status: "Success",

    data: {
      user,
      token,
    },
  });
}


export const signUp = catchAsync(async (req, res, next) => {
  const newUser = await User.create(req.body);
  createSendToken(newUser, 201, res)

});


export const login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  // 1) Check if email and password exist
  if (!email || !password) {
    return next(new AppError("Please provide email and password!", 400));
  }
  // 2) Check if user exists && password is correct
  const user = await User.findOne({ email }).select("+password");

  //correctPassword


  if (!user || !(await user.correctPassword(password, user.password))) {
    return next(new AppError("Incorrect email or password", 401));
  }

  // 3) If everything ok, send token to client
  createSendToken(user, 200, res);
});



export const protect = catchAsync(async (req, res, next) => {
  let token
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(" ")[1]
  } else if (req.cookies.jwt) {
    token = req.cookies.jwt
  }

  if (!token) {
    return next(new AppError('You are not logged in . Please lpggin', 401))
  }
  console.log('Cookies:', req.cookies);
  console.log('JWT:', req.cookies.jwt);
  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
  console.log('Decoded token:', decoded);
  req.user = currentUser
  next()
})


export const isLoggedIn = catchAsync(async (req, res, next) => {
  // Check for jwt cookie
  if (req.cookies.jwt) {
    try {
      // Verify token
      const decoded = await promisify(jwt.verify)(
        req.cookies.jwt,
        process.env.JWT_SECRET
      );

      // Find user in database
      const currentUser = await User.findById(decoded.id);
      if (!currentUser) {
        return res.status(401).json({
          status: 'fail',
          message: 'User not found',
        });
      }

      // Attach user to request and response locals
      req.user = currentUser;
      res.locals.user = currentUser;

      // Send success response
      return res.status(200).json({
        status: 'success',
        message: 'User is logged in',
        data: {
          user: currentUser,
        },
      });
    } catch (error) {
      // Invalid token
      return res.status(401).json({
        status: 'fail',
        message: 'Invalid or expired token',
      });
    }
  }

  // No token
  return res.status(401).json({
    status: 'fail',
    message: 'Not logged in',
  });
});

export const restrictTo = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new AppError("You dont have to preform this acction ")
      )
    }
    next()
  }
}

export const forgotPassword = catchAsync(async (req, res, next) => {
  //Looking for User
  const user = await User.findOne({ email: req.body })
  if (!user) {
    return next(new AppError('You dont have registration ', 404))
  }

  const resetToken = user.resetTokenForPassword()
  await user.save({ validateBeforeSave: false })
})

export const resetPassword = (req, res, next) => { }