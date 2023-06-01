const express = require('express');
const router = express.Router();
const personController = require('../controllers/person_controller');

// Get all persons
router.get('/', personController.getAllPersons);

// Route for searching persons by name or publicKey
router.get('/search', personController.searchPersons);

// Add a new person to the db
router.post('/add', personController.addPerson);

// Get all friends of a person by publicKey
router.get('/friends/:userId', personController.getPersonFriends);

// Get a person by publicKey
router.get('/:userId', personController.getPersonById);

// Send a friend request
router.post('/sendFriendRequest', personController.sendFriendRequest);

// Cancel a friend request
router.post('/cancelFriendRequest', personController.cancelFriendRequest);

// Accept a friend request
router.post('/acceptFriendRequest', personController.acceptFriendRequest);

// Deny a friend request
router.post('/denyFriendRequest', personController.denyFriendRequest);

// Route for fetching friend requests for a specific user
router.get('/friendRequests/:userId', personController.getFriendRequests);

// Get the count of friends for a specific user
router.get('/friendCount/:userId', personController.getFriendCount);

module.exports = router;
