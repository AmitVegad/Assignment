const User = require("../model/user");
const response = require("../helper/response");
const multer  = require('multer')

var upload = multer({dest:'uploads/'});
var storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './uploads');
     },
    filename: function (req, file, cb) {
        cb(null , file.originalname);
    }
});
exports.upload = multer({ storage: storage })
//add User
exports.addUSer = async (req, res) => {
    const { name, password, mobile_no } = req.body;
    
    try {
        if (!name || !password || !mobile_no) {
            response.validationErrorWithData(res, { message: "Please enter all fields" }, {
                name: name,
                password: password,
                mobile_no: mobile_no,
            });
        }
        //check username already exit or not
        let user = await User.findOne({ name: name });
        if (user) {
            response.ErrorResponse(res, "Username already exists");
        } else {
            const newUser = new User({
                name: name,
                password: password,
                mobile_no: mobile_no,
            });
            newUser
                .save()
                .then((user) => {
                    response.successResponseWithData(
                        res,
                        "User added successfully",
                        user
                    );
                })
                .catch((err) => console.log(err));
        }
    } catch (err) {
        response.ErrorResponse(res, err.message);
    }

};

exports.getUser = async (req, res) => {
    try {
        let user = await User.find({}).sort({ createdAt: -1 });
        if (!user) {
            response.ErrorResponse(res, "something want wrong")
        } else {
            response.successResponseWithData(res, "fetched user successfully", user);
        }
    } catch (err) {
        response.ErrorResponse(res, err.message)
    }
};

exports.deleteUser = async (req, res) => {
    const { userId } = req.params;
    try {
        let userData = await User.findByIdAndDelete(userId);
        response.successResponseWithData(res, "deleted successfully", userData);
    } catch (err) {
        response.ErrorResponse(res, err.message);
    }
};

exports.updateUser = async (req, res) => {
    const body = req.body;
    const id = body._id;
    delete body.id;
    try {
        let userData = await User.findByIdAndUpdate(id, body, { new: true });
        response.successResponseWithData(res, "updated successfully", userData);
    } catch (err) {
        response.ErrorResponse(res, err.message);
    }
};

