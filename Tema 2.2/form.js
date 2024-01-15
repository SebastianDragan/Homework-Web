function validateForm() {
  const firstName = document.getElementById('firstName').value;
  const lastName = document.getElementById('lastName').value;
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  const confirmPassword = document.getElementById('confirmPassword').value;

  const errorMessages = document.getElementById('errorMessages');
  errorMessages.innerHTML = ''; // Curățăm mesajele de eroare anterioare

  // Validare prenume
  if (isEmpty(firstName)) {
    appendErrorMessage('Prenumele nu poate fi gol.');
  }

  // Validare nume
  if (isEmpty(lastName)) {
    appendErrorMessage('Numele nu poate fi gol.');
  }

  // Validare email
  if (!isValidEmail(email)) {
    appendErrorMessage('Adresa de email invalidă.');
  }

  // Validare parolă
  if (!isValidPassword(password)) {
    appendErrorMessage('Parola trebuie să conțină cel puțin 8 caractere, o literă mare, o literă mică și un număr.');
  }

  // Validare confirmare parolă
  if (password !== confirmPassword) {
    appendErrorMessage('Parola nu corespunde.');
  }

  // Verificare dacă există mesaje de eroare
  if (errorMessages.innerHTML !== '') {
    return false; // Împiedică trimiterea formularului dacă există erori
  }

  return true;
}

function isEmpty(value) {
  return value.trim() === '';
}


function isValidEmail(email) {
  // Validare simplă pentru adresa de email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function isValidPassword(password) {
  // Validare parolă: cel puțin 8 caractere, o literă mare, o literă mică și un număr
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
  return passwordRegex.test(password);
}

function appendErrorMessage(message) {
  const errorMessages = document.getElementById('errorMessages');
  const errorMessageElement = document.createElement('div');
  errorMessageElement.textContent = message;
  errorMessages.appendChild(errorMessageElement);
}
