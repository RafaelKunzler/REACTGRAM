const Photo = require("../models/Photo")
const User = require("../models/User")

const mongoose = require("mongoose")

// Insert a photo, with an user related to it
const insertPhoto = async(req, res) => {

    const { title } = req.body
    const image = req.file.filename

    const reqUser = req.user
    const user = await User.findById(reqUser._id)

    // Create a photo
    const newPhoto = await Photo.create({
        image,
        title,
        userId: user._id,
        userName: user.name,
    })

    // If photo was created sucessfully, return data
    if(!newPhoto){
        res.status(422).json({
            errors: ["Houve um problema, por favor tente novamente mais tarde"]
        })
        return
    }

    res.status(201).json(newPhoto)
}

// remove a photo from DB
const deletePhoto = async(req, res) => {
    const { id } = req.params

    const reqUser = req.user

    const photo = await Photo.findById(id)    

    try {        

        // check if photo exists
        if(!photo){
            res.status(404).json({errors: ["Foto não encontrada!"]})
        }

        //check if photo belongs to user
        if (!photo.userId.equals(reqUser._id)){
            return(422).json({errors: ["Ocorreu um erro, por favor tente novamente mais tarde!"]})
        }

        await Photo.findByIdAndDelete(photo._id)

        res.status(200).json({ id: photo._id, message: "Foto excluida com sucesso." })

    } catch (error) {
        res
            .status(404)
            .json({id: photo._id, message: "Foto não encontrada."})
    }
}

// get all photos
const getAllPhotos = async (req, res) => {
    const photos = await Photo.find({})
        .sort([["createdAt", -1]])
        .exec()

    return res.status(200).json(photos)
}

module.exports = {
    insertPhoto,
    deletePhoto,
    getAllPhotos,
}