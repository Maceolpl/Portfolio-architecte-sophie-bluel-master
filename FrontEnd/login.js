const form = document.querySelector('.login-form');

form.addEventListener('submit', async (event) => {
  event.preventDefault();

  const email = document.querySelector('#email').value;
  const password = document.querySelector('#password').value;

  try {
    const response = await fetch('http://localhost:5678/api/users/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: email,
        password: password
      })
    });

    if (!response.ok) {
      if (response.status === 401) {
        throw new Error('Mot de passe incorrect');
      }
      if (response.status === 404) {
        throw new Error('Utilisateur non trouvé');
      }
      throw new Error('Erreur lors de la connexion');
    }

    const data = await response.json();

    // Stockage du token (point de vigilance)
    localStorage.setItem('token', data.token);
    localStorage.setItem('userId', data.userId);

    // Redirection vers la page d’accueil
    window.location.href = 'index.html';

  } catch (error) {
    alert(error.message);
  }
});