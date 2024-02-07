const ValidateBody = (body, body_require) => {
  const keys = Object.keys(body);
  if (keys.length > body_require.length) {
    return `Tiene uno o mas campos demas, revise que la sintaxis sea correcta.`;
  }

  for (let key of body_require) {
    if (!keys.includes(key)) {
      return `El campo '${key}' es requerido.`;
    }
  }
  return;
};

module.exports = { ValidateBody };
