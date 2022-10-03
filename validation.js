const isEmpty = (valor) => (valor === "" ? true : false);

const showError = (input, message) => {
  const formField = input.parentElement;
  formField.classList.add("error");
  const error = formField.querySelector("small");
  error.textContent = message;
};

const clearError = (input) => {
  const formField = input.parentElement;
  formField.classList.remove("error");
  const error = formField.querySelector("small");
  error.textContent = "";
};

const isNumberValid = (number, min, max) =>
  number < min || number > max ? false : true;

const checkInput = () => {
  let valid = false;

  const min = 1;
  const max = 1154;
  const numId = inputNum.value;

  if (isEmpty(numId)) {
    showError(inputNum, "Ingrese un numero");
  } else if (!isNumberValid(numId, min, max)) {
    showError(inputNum, "Ingresa un numero del 1 al 1154");
  } else {
    clearError(inputNum);
    valid = true;
  }
  return valid;
};

const isFormValid = () => {
  const isNumIdValid = checkInput();
  return isNumIdValid;
};
