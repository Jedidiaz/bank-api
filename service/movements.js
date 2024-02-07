const { Router, request, response, query } = require("express");
const { ValidateBody } = require("../middlewares/validateBody");
const User = require("../models/user");
const { sequelize } = require("../db");
const Movement = require("../models/movement");
const { validToken } = require("../middlewares/validJwt");
const { Sequelize } = require("sequelize");
const router = Router();

router.get("/:id", async (req = request, res = response) => {
  try {
    const { id } = req.params;

    const user = await User.findOne({ where: { id } });

    if (!user) return res.status(404).json({ msg: "Usuario no encontrado" });

    const query = `SELECT m.id as id_transaction, m.amount as amount,
    us.name as name_user_send, us.account as account_usuario_send,
    u.name as name_user_recive, u.account as account_usuario_recive
    FROM movements as m 
    LEFT JOIN  users as u on m.id_user_recive = u.id 
    LEFT JOIN  users as us on m.id_user_send = us.id 
    WHERE u.id = :id OR us.id = :id;`;
    const user_mov = await sequelize.query(query, {
      replacements: { id: Number(id) },
      type: Sequelize.QueryTypes.SELECT,
    });

    res.json(user_mov);
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Error interno" });
  }
});

//Envio de dinero
router.post("/", [validToken], async (req = request, res = response) => {
  const transaction = await sequelize.transaction();
  try {
    //validamos si nos trae todos los atributos
    const body_require = ValidateBody(req.body, [
      "token",
      "account_recive",
      "amount",
      "id",
    ]);
    

    if (body_require) {
      return res.status(400).json({ msg: body_require });
    }

    const { account_recive, amount, id } = req.body;
    
    if (typeof amount !== "number") return res.status(400).json({msg: "El amount debe ser un numero"})
    
    const user_recive = await User.findOne({
      where: { account: account_recive },
    });

    if (!user_recive)
      return res
        .status(404)
        .json({ msg: "El usuario al que intenta enviar no existe" });

    const user_send = await User.findOne({
      where: { id },
    });

    const { money, account } = user_send.toJSON();

    if (account === account_recive)
      return res.status(400).json({ msg: "Acción erronea" });

    if (money < Number(amount))
      return res.status(404).json({ msg: "No tienes suficiente saldo" });

    await Movement.create(
      {
        id_user_send: id,
        id_user_recive: user_recive.id,
        amount,
      },
      { transaction }
    );

    user_send.money = money - amount;

    await user_send.save({ transaction });

    const money_recive = user_recive.toJSON();

    user_recive.money = money_recive.money + amount;

    await user_recive.save({ transaction });

    await transaction.commit();
    res.json({ msg: "Envio realizado", new_money: money - amount });
  } catch (error) {
    console.log(error)
    await transaction.rollback();
    res.status(500).json({ msg: "Error interno" });
  }
});

module.exports = router;
