const express = require("express");
const router = express.Router();
const userService = require("./user.service");
// routes
router.post("/create", create);
router.get("/", getAll);
router.get("/current", getCurrent);
router.get("/:_id", getById);
router.put("/:_id", update);
router.delete("/:_id", _delete);
router.get("/favlist/:shoeId",getUserfavlistSongsById);
router.put("/favlist/:shoeId", updateUserfavlistSongs);
router.delete("/favlist/:shoeId", deleteUserfavlistSongs);
module.exports = router;

function create(req, res, next) {
  userService
    .create(req.body,req, res)
    .catch((err) => next(err));
}
function update(req, res, next) {
  userService
    .update(req.params._id, req.body,res)
    .catch((err) => next(err));
}

function getAll(req, res, next) {
  userService
    .getAll(res)
    .then((users) => res.json(users))
    .catch((err) => next(err));
}

function getCurrent(req, res, next) {
  userService
    .getById(req.user.sub)
    .then((user) => (user ? res.json(user) : res.sendStatus(404)))
    .catch((err) => next(err));
}

function getById(req, res, next) {
  userService
    .getById(req.params._id)
    .then((user) => (user ? res.json({
      message: "ok",
      data: user,
    }) : res.sendStatus(404).json( {
      message: "Error: User not found for the given ID!"
    })))
    .catch((err) => next(err));
}

function _delete(req, res, next) {
  userService
    .delete(req.params._id,res)
    .then(() => res.json({}))
    .catch((err) => next(err));
}

function getUserfavlistSongsById(req, res, next) {
  userService
    .getUserListIdFavShoesById(req.params.userId, res)
    .catch((err) => next(err));
}
function updateUserfavlistSongs(req, res, next) {
    userService
    .updateUserPlaylistSongs(req.params.shoeId, req.body, res)
    .catch((err) => next(err));
}
function deleteUserfavlistSongs(req, res, next) {
    userService
    .deleteUserPlaylistSongs(req.params.shoeId, req.body, res)
    .catch((err) => next(err));
}