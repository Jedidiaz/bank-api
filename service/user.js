const { Router, request, response } = require("express");
const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { ValidateBody } = require("../middlewares/validateBody");
const router = Router();

const SECRET = process.env.SECRET_KEY_JWT;

//Inicio de sesión
router.post("/login", async (req = request, res = response) => {
  try {
    const { account, password } = req.body;
    if (!account || !password) {
      return res.status(400).json({ msg: "Todos los campos son requeridos" });
    }

    const user = await User.findOne({
      where: { account },
      attributes: { exclude: ["createdAt", "updatedAt"] },
    });

    if (!user) {
      return res
        .status(401)
        .json({ msg: "No se encontro el usuario registrado." });
    }

    const userJson = user.toJSON();

    if (!(await bcrypt.compare(password, userJson.password))) {
      return res.status(400).json({ msg: "Contraseña invalida" });
    }

    delete userJson.password;

    const token = jwt.sign({ id: userJson.id, role: userJson.role }, SECRET);

    return res
      .status(200)
      .json({ msg: "Login exitoso!", token, user: userJson });
  } catch (error) {
    return res.status(500).json({ msg: "Error interno" });
  }
});

//Registro
router.post("/register", async (req = request, res = response) => {
  try {
    const body_require = ValidateBody(req.body, [
      "account",
      "name",
      "password",
    ]);
    if (body_require) {
      return res.status(400).json({ msg: body_require });
    }
    const { name, account, password } = req.body;

    const user = await User.findOne({ where: { account } });

    if (user) {
      return res.status(400).json({ msg: "Esta account ya existe!" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await User.create({
      name,
      account,
      password: hashedPassword,
    });

    res.json({ msg: "Usuario registrado con exito" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Error interno" });
  }
});

module.exports = router;
