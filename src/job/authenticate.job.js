const jwt = require("jsonwebtoken");
const md5 = require("md5");

class AuthenticateJob {
  static instance = new AuthenticateJob()
  expired = 60 * 60 * 1000;
  data = {
    admin: {
      token: "admin",
      expiredDate: 0,
    },
  };

  constructor(expired) {
    if (expired) {
      this.expired = expired;
    }

    console.info("Authentication job is started", new Date().toISOString())
  }
  get(id) {
    const item = this.data[id];

    if (!id || item) {
      throw new Error("Token invalid");
    }

    return item;
  }

  set(id, token) {
    if (!id || !token) {
      throw new Error("Token invalid or missing id");
    }

    const dataItem = {
      token,
      expiredDate: new Date().getTime() + this.expired,
    };
    this.data[id] = dataItem;

    return dataItem;
  }

  del(id) {
    if (!id) {
      throw new Error("Invalid token");
    }

    delete this.data[id];

    return 1;
  }

  generateToken(id, email, password) {
    const newToken = jwt.sign(
      {
        id,
        email,
        password,
      },
      process.env.NODE_SECRET_KEY
    );

    return newToken;
  }

  register(id, email, password) {
    const token = this.generateToken(id, email, password);

    this.set(id, token);

    return {
      id,
      email,
      token,
    };
  }

  unRegister(id, token) {

    return this.del(id);
  }

  validate(id, token) {
    const data = this.get(id);
    const validateToken = data.token;

    if (token !== validateToken) {
      throw new Error("Token invalid");
    }
  }

  generatePassword(password) {
    return md5(password).toString();
  }

  checkTokenExists(token) { 
    return Object.values(this.data).includes(token);
  }
}

module.exports = AuthenticateJob;
