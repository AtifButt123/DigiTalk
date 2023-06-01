const Person = require('../models/person.model');

// Get all persons
const getAllPersons = (req, res) => {
  Person.find()
    .then((persons) => res.json(persons))
    .catch((err) => res.status(400).json('Error: ' + err));
};

// Route for searching persons by name or publicKey
const searchPersons = async (req, res) => {
  const { name, publicKey } = req.query;

  try {
    let results = [];

    if (name || publicKey) {
      results = await Person.find({
        $or: [
          { name: { $regex: `^${name}`, $options: 'i' } },
          { publicKey },
        ],
      });
    } else {
      return res.status(400).json({ message: 'Invalid search parameters' });
    }

    res.json(results);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

// Add a new person to the db
const addPerson = (req, res) => {
  const { name, nickName, age, publicKey } = req.body;

  const newPerson = new Person({
    name,
    nickName,
    age: Number(age),
    publicKey,
  });

  newPerson
    .save()
    .then(() => res.json('Person added!'))
    .catch((err) => res.status(400).json('Error: ' + err));
};

// Get all friends of a person by publicKey
const getPersonFriends = async (req, res) => {
  try {
    const { userId } = req.params;
    const person = await Person.findById(userId);

    if (person) {
      const friends = person.friends;
      const friendsList = await Person.find({ _id: { $in: friends } });

      if (friendsList) {
        res.json(friendsList);
      }
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get a person by publicKey
const getPersonById = (req, res) => {
  const { userId } = req.params;

  Person.findById(userId)
    .then((person) => {
      if (person) {
        res.json(person);
      } else {
        res.status(404).json({ message: 'Person not found' });
      }
    })
    .catch((err) => res.status(400).json('Error: ' + err));
};


const sendFriendRequest = async (req, res) => {
  try {
    const { _id, personId } = req.body;

    const person = await Person.findById(personId);

    if (
      !person.friendRequests.includes(_id) &&
      !person.friends.includes(_id)
    ) {
      person.friendRequests.push(_id);
      await person.save();
      res.json(person);
    } else {
      res.status(400).json({ message: 'Friend request already sent or person is already a friend' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};


const cancelFriendRequest = async (req, res) => {
  try {
    const { _id, personId } = req.body;

    const person = await Person.findById(_id);

    if (person.friendRequests.includes(personId)) {
      person.friendRequests = person.friendRequests.filter((p) => {
        return p.toString() !== personId.toString();
      });
      await person.save();
      res.json(person);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};


// Accept a friend request from friendId to userId

const acceptFriendRequest = async (req, res) => {
  try {
    const { userId, friendId } = req.body;

    const currentPerson = await Person.findById(userId);
    const friendPerson = await Person.findById(friendId);

    if (currentPerson && friendPerson) {
      currentPerson.friendRequests = currentPerson.friendRequests.filter(
        (id) => id.toString() !== friendId.toString()
      );
      currentPerson.friends.push(friendId);
      await currentPerson.save();

      friendPerson.friendRequests = friendPerson.friendRequests.filter(
        (id) => id.toString() !== userId.toString()
      );
      friendPerson.friends.push(userId);
      await friendPerson.save();

      res.json({ status: 200 });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};


// Deny a friend request from friendId to currentPublicKey
const denyFriendRequest = async (req, res) => {
  try {
    const { userId, friendId } = req.body;

    const person = await Person.findById(userId);

    if (person.friendRequests.includes(friendId)) {
      person.friendRequests = person.friendRequests.filter((p) => {
        return p.toString() !== friendId;
      });
      await person.save();
      res.json(person);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get friend requests for a specific user
const getFriendRequests = async (req, res) => {
  try {
    const { userId } = req.params;
    const person = await Person.findById(userId);

    if (person) {
      const friendRequests = person.friendRequests;
      const friends = await Person.find({
        _id: {
          $in: friendRequests,
        },
      });
      res.json(friends);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get the count of friends for a specific user
const getFriendCount = async (req, res) => {
  try {
    const { userId } = req.params;
    const person = await Person.findById(userId);

    if (person) {
      const friendCount = person.friends.length;
      res.json({ count: friendCount });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  getAllPersons,
  searchPersons,
  addPerson,
  getPersonFriends,
  getPersonById,
  sendFriendRequest,
  cancelFriendRequest,
  acceptFriendRequest,
  denyFriendRequest,
  getFriendRequests,
  getFriendCount,
};
