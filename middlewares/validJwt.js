const { response, request } = require("express");
const jwt = require("jsonwebtoken");
const User = require("../models/user");

//Checkeamos que haya autorización por token
const validJWT = (req = request, res = response, next) => {
  try {
    if (!req.headers.authorization) {
      return res.status(401).json({ msg: "Requiere autorización." });
    }
    return next();
  } catch (error) {
    console.error("error jwt: " + error);
  }
};

//Valida que el usuario tenga token de administrador
const isAdmin = (req = request, res = response, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const { role } = jwt.decode(token);

    if (role !== "admin") {
      return res.status(401).json({ msg: "Requiere usuario admin." });
    }
    return next();
  } catch (error) {
    console.error("error admin: " + error);
  }
};

//Checkeamos que haya autorización por token
const validToken = async (req = request, res = response, next) => {
  try {
    const { token, id } = req.body;
    if (!token) {
      return res.status(401).json({ msg: "Requiere autorización." });
    }

    const user = await User.findOne({ where: { id } });

    if (!user) {
      return res.status(401).json({ msg: "Este usuario no existe" });
    }

    return next();
  } catch (error) {
    console.error("error jwt: " + error);
    return res.status(500).json({ msg: "Error interno" });
  }
};

module.exports = { validJWT, isAdmin, validToken };
