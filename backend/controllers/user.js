const User = require('../models/user');

exports.createUser = async (req, res) => {
  try {
      const { name, phoneNo, email } = req.body;
      if (!name || !phoneNo || !email) {
          return res.status(400).json({ error: 'All fields are required' });
      }
      await User.create({ name, phoneNo, email });
      const users = await User.findAll();
      res.send(users);
  } catch (error) {
      res.status(500).json({ error: error.message });
  }
}


exports.fetchUsers = async (req, res) => {
    try {
        const users = await User.findAll();
        res.send(users); // Render users on the page
    } catch (err) {
        res.status(500).json({ err: err.message });
    }
}

exports.fetchOne = async(req,res)=>{
  try{
    const id = req.params.id;
    const user = await User.findByPk(id);
    res.send(user);
  }catch(err){
    console.log(err)
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
        const users = await User.findAll();
        res.send(users);
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

        const users = await User.findAll();
        res.send(users);
    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Failed to update user",
            error: err.message,
        });
    }
};
