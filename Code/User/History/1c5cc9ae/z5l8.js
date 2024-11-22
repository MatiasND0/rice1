const express = require('express');
const router = express.Router();

const {login, logout, register, deleteUser, getUsers} = require('../controllers/loginController');

const {inventory, addItem, removeItem} = require('../controllers/inventoryController');

const {avaliableProy, bookProy, bookedProy ,deleteBooking, withdrawals} = require('../controllers/bookingController');


//Auth

router.post('/login',login);

router.post('/logout',logout);

router.post('/register',register);

router.delete('/delete-user/:id', deleteUser);

router.post('/get-users', getUsers);



//Inventario

router.post('/inventory',inventory);

router.post('/add-item',addItem);

router.delete('/remove-item',removeItem);

//Reservas

router.post('/avaliable-proy',avaliableProy);

router.post('/book-proy',bookProy);

router.post('/booked-proy',bookedProy);

router.delete('/delete-booking/:id', deleteBooking);

router.post('/withdraws', withdrawals);

module.exports = router;