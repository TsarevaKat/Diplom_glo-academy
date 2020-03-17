'use strict';
import '@babel/polyfill';
import 'nodelist-foreach-polyfill';
import 'remove-polyfill';
import elementClosect from 'element-closest';
elementClosect(window);
import 'formdata-polyfill';
import 'fetch-polyfill';

import chooseClub from './modules/chooseClub'; 
import popup from './modules/popup';
import sliders from './modules/sliders';
import btnUp from './modules/btnUp';
import mobileMenu from './modules/burgerMenu';
import calc from './modules/calc';
import forms from './modules/forms';

// выбор клуба
chooseClub();

// вызов popup
popup();

// слайдеры
sliders();

// кнопка наверх
btnUp();

// мобильное меню
mobileMenu();

// калькулятор
calc();

// формы 
forms();