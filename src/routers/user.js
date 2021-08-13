const express = require("express");
const User = require("../models/user");
const router = new express.Router();
const auth = require("../middleware/auth");
const multer = require("multer");
const sharp = require("sharp");
const {sendWelcomeEmail,cancelREG} = require('../emails/account')
const qs = require('query-string');
const axios = require('axios');



// Create a new user account.
router.post("/users", async (req, res) => {
  const user = new User(req.body);
  try {
    await user.save();
    sendWelcomeEmail(user.email,user.name);//await can be added but it does not need to
    const token = await user.generateAuthToken();
    res.status(201).send({ user, token });
  } catch (e) {
    res.status(400).send(e);
  }
});


// login an existing user
router.post("/users/login", async (req, res) => {
  try {
    const user = await User.findByCredentials(
      req.body.email,
      req.body.password
    );
    const token = await user.generateAuthToken();
    res.send({ user, token });
  } catch (e) {
    res.status(400).send();
  }
})


// Logout the existing user and delete the token.
router.post("/users/logout", auth, async (req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter((token) => {
      return token.token !== req.token;
    });
    await req.user.save();

    res.send();
  } catch (e) {
    res.status(500).send();
  }
});


// Logout from all devices and remove all tokens.
router.post("/users/logoutAll", auth, async (req, res) => {
  try {
    req.user.tokens = [];
    await req.user.save();

    res.send();
  } catch (e) {
    res.status(500).send();
  }
});


// Facebook Authentication











// Get user's profile.
router.get("/users/me", auth, async (req, res) => {
  res.send(req.user);
  // try {
  //   const users = await User.find({});
  //   res.send(users);
  // } catch (e) {
  //   res.status(500).send();
  // }
});

// router.get("/users/:id", async (req, res) => { // WE DONT NEED IT NOW! COZ WE SHOULD NOT GET DETAILS ABPUT ANY OTHER USERS!
//   const _id = req.params.id;

//   try {
//     const user = await User.findById(_id);

//     if (!user) {
//       return res.status(404).send();
//     }

//     res.send(user);
//   } catch (e) {
//     res.status(500).send();
//   }
// });

// Update user's profile.
router.patch("/users/me", auth, async (req, res) => {
  //////
  const updates = Object.keys(req.body);
  const allowedUpdates = ["name", "email", "password", "age"];
  const isValid = updates.every((update) => allowedUpdates.includes(update));

  //ERROR HANDLING!
  if (!isValid) {
    return res.status(400).send({ error: "Invalid Updates!" });
  } /////

  try {
    //const user = await User.findByIdAndUpdate(req.params.id, req.body, {new: true,runValidators: true,});
    // const user = await User.findById(req.user.id);
    updates.forEach((update) => (req.user[update] = req.body[update]));
    await req.user.save();
    // if (!user) { they exist coz they loggin in just now
    //   return res.status(404).send();
    // }
    res.send(req.user);
  } catch (e) {
    res.status(404).send(e);
  }
});



// Delete User Profile and all oh their added tasks.
router.delete("/users/me", auth, async (req, res) => {
  const _id = req.user._id;

  try {
    // const user = await User.findByIdAndDelete(_id); no need on later

    // if (!user) {
    //   return res.status(404).send();
    // }
    await req.user.remove();
    cancelREG(req.user.email,req.user.name)// send a mail.
    res.send(req.user);
  } catch {
    res.status(500).send();
  }
});

// Config for uploading image avatar.
const upload = multer({
  limits: {
    fileSize: 1000000, // 1 mb
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(tif|tiff|bmp|jpg|jpeg|gif|png|eps)$/gm)) {
      return cb(new Error("Please upload an image file"));
    }
    cb(undefined, true);
  },
});


//Upload new avatar for the user.
router.post(
  "/users/me/avatar",
  auth,
  upload.single("avatar"),
  async (req, res) => {
    const buffer = await sharp(req.file.buffer)
      .resize({ width: 250, height: 250 })
      .png()
      .toBuffer();
    req.user.avatar = buffer;
    await req.user.save();
    res.send();
  },
  (error, req, res, next) => {
    res.status(400).send({ error: error.message });
  }
);


// Delete the avatar
router.delete("/users/me/avatar", auth, async (req, res) => {
  if (req.user.avatar === undefined) res.status(404).send("No avatar found");
  req.user.avatar = undefined;
  await req.user.save();
  res.send();
});

router.get("/users/:id/avatar", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user || !user.avatar) {
      throw new Error();
    }

    res.set("Content-Type", "image/png");
    res.send(user.avatar);
  } catch (e) {
    res.status(404).send();
  }
});

module.exports = router;
