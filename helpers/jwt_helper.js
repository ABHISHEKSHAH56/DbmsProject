const JWT = require('jsonwebtoken')
const createError = require('http-errors')


module.exports = {
  signAccessToken: (userId) => {
    return new Promise((resolve, reject) => {
      const payload = {}
      const secret = process.env.ACCESS_TOKEN_SECRET
      const options = {
        expiresIn: '1h',
        issuer: 'shahbasket.com',
        audience: `${userId}`,
      }
      JWT.sign(payload, secret, options, (err, token) => {
        if (err) {
          console.log(err.message)
          reject(createError.InternalServerError("Error Occured Signing Access Token"))
          return
        }
        resolve(token)
      })
    })
  },
  verifyAccessToken: (req, res, next) => {
    if (!req.headers['authorization']) return next(createError.Unauthorized())
    const authHeader = req.headers['authorization']
    const bearerToken = authHeader.split(' ')
    const token = bearerToken[1]
    JWT.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, payload) => {
      if (err) {
        const message =
          err.name === 'JsonWebTokenError' ? 'Unauthorized' : err.message
        return next(createError.Unauthorized(message))
      }
      req.payload = payload
      console.log("fine")
      next()
    })
  },
  signRefreshToken: (userId) => {
    return new Promise((resolve, reject) => {
      const payload = {}
      const secret = process.env.REFRESH_TOKEN_SECRET
      const options = {
        expiresIn: '1y',
        issuer: 'shahbasket.com',
        audience: `${userId}`,
      }
      JWT.sign(payload, secret, options, (err, token) => {
        if (err) {
          console.log(err.message)
          // reject(err)
          reject(createError.InternalServerError("Error Occured while generating referse Token"))
        }
        resolve(token)  
      })
    })
  },
  verifyRefreshToken: (refreshToken) => {
    try {
      var payload = JWT.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);  
      return payload.aud;
    } catch (error) {
      console.log(error);
      return null;
    }
  },
  getAppCookies: (req) => {
    // We extract the raw cookies from the request headers
    const rawCookies = req.headers.cookie.split('; ');
    // rawCookies = ['myapp=secretcookie, 'analytics_cookie=beacon;']
   
    const parsedCookies = {};
    rawCookies.forEach(rawCookie=>{
    const parsedCookie = rawCookie.split('=');
    // parsedCookie = ['myapp', 'secretcookie'], ['analytics_cookie', 'beacon']
     parsedCookies[parsedCookie[0]] = parsedCookie[1];
    });
    return parsedCookies;
  },
  sendToken : (user, statusCode, res) => {
    const token = user.getJWTToken();
  
    // options for cookie
    const options = {
      expires: new Date(
        Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000
      ),
      httpOnly: true,
    };
  
    res.status(statusCode).cookie("token", token, options).json({
      success: true,
      user,
      token,
    });
  }
}
