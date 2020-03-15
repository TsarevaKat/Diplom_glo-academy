const chooseClub = () => {
  const clubSelect = document.querySelector('.club-select'),
    clubList = clubSelect.querySelector('ul');

  document.addEventListener('click', (e) => {
    let target = e.target;
    if (target.closest('.club-select') && !target.closest('.active-club')) {
      clubSelect.classList.add('active-club');
      clubList.style.display = 'block';
    } else {
      clubSelect.classList.remove('active-club');
      clubList.style.display = 'none';
    }
  });
};

export default chooseClub;