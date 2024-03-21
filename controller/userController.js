import User from "../model/userModel.js";

export const create = async (req, res)=> {
    try {
        const userData = new User(req.body);
        if(!userData){
            return res.status(404).json({message: "User data not found"});
        }
        const savedData = await userData.save();
        // res.status(200).json(savedData);
        res.status(200).json({message: "User created Successfully."})
    } catch (error) {
        res.status(500).json({error: error});
    }
}

export const getAll = async (req, res) => {
    try {
        const userData = await User.find();
        if(!userData){
            return res.status(404).json({message: "User data not found"});
        }
        res.status(200).json(userData);
    } catch (error) {
        res.status(500).json({error: error});
    }
}

export const getOne = async (req, res) => {
    try {
        const id = req.params.id;
        const userExist = await User.findById(id);
        if(!userExist){
            return res.status(404).json({message: "User not found"});
        }
        res.status(200).json(userExist);
    } catch (error) {
        res.status(500).json({error: error});
    }
}

export const updateUser = async (req, res)=> {
    try {
        const id = req.params.id;
        const userExist = await User.findById(id);
        if(!userExist){
            return res.status(404).json({message: "User not exist for update"});
        }
        const updatedData = await User.findByIdAndUpdate(id, req.body, {new: true});
        res.status(200).json({message: "User updated successfully.."});
    } catch (error) {
        res.status(500).json({error: error})
    }
}

export const deleteUser = async (req, res) => {
    try {
        const id = req.params.id;
        const userExist = await User.findById(id);
        if(!userExist){
            return res.status(404).json({message: "User not exist for delete"});
        }
        await User.findByIdAndDelete(id);
        res.status(200).json({message: "User deleted Successfully"});
    } catch (error) {
        res.status(500).json({error: error})
    }
}