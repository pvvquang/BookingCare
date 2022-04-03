import i18n from "../i18n";

const validateEmailPassword = (type, value) => {
  const objError = {
    status: false,
    message: "",
  };
  switch (type) {
    case "email":
      if (value) {
        //eslint-disable-next-line
        const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        const error = !regex.test(value);
        objError.status = error;
        objError.message = error ? i18n.t("login.invalid-email") : "";
      } else {
        objError.status = true;
        objError.message = i18n.t("login.enter-your-email");
      }
      break;
    case "password":
      if (value) {
        const error = value.length < 6 ? true : false;
        objError.status = error;
        objError.message = error ? i18n.t("login.invalid-password") : "";
      } else {
        objError.status = true;
        objError.message = i18n.t("login.enter-your-password");
      }
      break;
  }
  return objError;
};

export default { validateEmailPassword };
