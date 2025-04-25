function toggleMenu() {
    const navbar = document.querySelector('.navbar');
    const hamburger = document.querySelector('header div:nth-child(2)');

    navbar.classList.toggle('active');
    hamburger.classList.toggle('active');
}