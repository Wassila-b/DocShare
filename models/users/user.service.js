const db = require("_helpers/db");
const User = db.User;

var mongoose = require('mongoose');


module.exports = {
  getAll,
  getById,
  create,
  update,
  delete: _delete,
  getUserListIdFavShoesById,
  updateUserPlaylistSongs,
  deleteUserPlaylistSongs
};

async function getAll(res) {
  const user = await User.find();
  return res.status(200).json( {
    message: "ok",
    data: user,
  });
}

async function getById(id) {
  user = await User.findById(id);
  return user;
}

async function create(userParam, req, res) {
  try {
    // validate
    if (await User.findOne({ prenom: userParam.prenom })) {
      return res.status(400).json({ message: 'prenom "' + userParam.prenom + '" is already taken' });
    }

    if (await User.findOne({ nom: userParam.nom })) {
      return res.status(400).json({message : 'Nom "' + userParam.nom + '" is already taken'});
    }

    // create User
    const user = new User(userParam);
    // save user
    const user_ = await user.save();

    if (user_) {
      res.status(200).send({"message": "ok","data": user_.toJSON()});    
    }   

  } catch (error) {
      return res.status(500).json({message: error.message})
  }
}

async function update(id, userParam, res) {
    try{
        const user = await User.findById(id);
        // validate
        if (!user) return res.status(400).json({message : "User not found" });
        
        // copy userParam properties to user
        Object.assign(user, userParam);
        const user_ = await user.save();
        if (user_) {
          res.status(200).send({"message": "ok","data": user_.toJSON()});    
        }   

    }catch(error){
        res.status(500).json({message: error.message})
    }
}

async function _delete(id, res) {
    await User.findByIdAndRemove(id);
    res.status(200);
}


async function getUserListIdFavShoesById(id,res) {
  const user = await User.findById(id);
  if(!user) return res.status(404).json({message: "Error get Fav Shoes"});
  return res.status(200).json(user.listIdFavShoes);
}

async function updateUserPlaylistSongs(id, param, res) {
  const user = await User.findById(id);
  if(!user) return res.status(404).json({message: "erreur Fav Shoes list"});
  if( typeof param.shoeId === 'undefined' || param.shoeId === null || param.shoeId === "" ) return res.status(402).json({message: "Error: Champ id shoe est vide"});
  user.listIdFavShoes.push(mongoose.Types.ObjectId( param.shoeId ));
  user.save();
  return res.status(200).json({"message" : "Shoe added!"});
}

async function deleteUserPlaylistSongs(id, param, res) {
  var listIdFavShoesN = param.shoeId.map(s => s.toString());
  await User.updateOne( // select your doc in moongo
    { _id: id }, // your query, usually match by _id
    { $pullAll: { listIdFavShoes: listIdFavShoesN } }, // item(s) to match from array you want to pull/remove
    { multi: true } // set this to true if you want to remove multiple elements.
  )
  return res.status(200).json("Shoes " + listIdFavShoesN + " deleted");
}