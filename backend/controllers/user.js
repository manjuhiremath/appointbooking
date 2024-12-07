//models
const User = require('../models/user');

exports.createUser = async (req, res) => {
    try {
      const { name, phoneNo, email } = req.body;
      const user = await User.create({ name, phoneNo, email });
      res.status(201).json(user);
    //   fetchUsers();
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
}

exports.fetchUsers = async(req,res)=>{
    try{
        const users = await User.findAll();
        res.send(users);
    }catch(err){
        res.status(500).json({err: err.message});
    }
}

exports.deleteUser = async (req, res) => {
    try {
      const { id } = req.params; 
      const user = await User.findByPk(id);
      if (!user) {
        return res.status(404).json({ success: false, message: "User not found" });
      }
      await user.destroy();
      res.status(200).json({
        success: true,
        message: "User deleted successfully",
      });
    //   fetchUsers();
    } catch (err) {
      res.status(500).json({
        success: false,
        message: "Failed to delete user",
        error: err.message,
      });
    }
  };

  exports.updateUser = async (req, res) => {
    try {
      const { id } = req.params;
      const { name, phoneNo, email } = req.body;
      const user = await User.findByPk(id);
      if (!user) {
        return res.status(404).json({ success: false, message: "User not found" });
      }
      await user.update({ name, phoneNo, email });
      res.status(200).json({
        success: true,
        message: "User updated successfully",
        data: user,
      });
    //   fetchUsers();
    } catch (err) {
      res.status(500).json({
        success: false,
        message: "Failed to update user",
        error: err.message,
      });
    }
  };