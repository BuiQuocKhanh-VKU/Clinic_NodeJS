
import userService from "../services/userService";

let handleLogin = async (req, res) => {
    let email = req.body.email; // lay gia tri tu client gui len
    let password = req.body.password;

    if (!email || !password) {//check email co null hay 
        return res.status(500).json({
            errCode: 1, // 1 la tham so dau vao khong hop le
            message: 'Missing input parameter',
        })
    }

    let userData = await userService.handleUserLogin(email, password);
    //check email va password co ton tai trong db khong
    //so sanh email va password voi du lieu trong db
    //return thong tin nguoi dung
    // access token:JWT json web token - co che bao mat
    return res.status(200).json({
        errCode: userData.errCode, //userService tra ve errCode
        message: userData.errMessage,
        user: userData.user ? userData.user : {} //lay thong tin user
    })
}

let handleGetAllUsers = async (req, res) => {
    let id = req.query.id; //all, id

    if (!id) {
        return res.status(200).json({
            errCode: 1,
            errMessage: 'Missing required parameter',
            users: []
        });
    }

    let users = await userService.getAllUsers(id);
    return res.status(200).json({
        errCode: 0,
        errMessage: 'Ok',
        users
    });

}

let handleCreateNewUser = async (req, res) => {
    let message = await userService.createNewUser(req.body);
    return res.status(200).json(message);
}

let handleDeleteUser = async (req, res) => {
    if (req.body.id) {
        return res.status(200).json({
            errCode: 1,
            message: 'Missing required parameter',
        });
    }
    let message = await userService.deleteUser(req.body.id);
    return res.status(200).json(message);
}

let handleEditUser = async (req,res) => {
    let data = req.body;
    let message = await userService.updateUserData(data);
    return res.status(200).json(message);
}

let getAllCode = async (req, res) => { //lay tat ca code
    try {
        let data = await userService.getAllCodeService(req.query.type);
        console.log(data);
        return res.status(200).json(data);
    } catch (e) { 
        console.log('Get all code error:', e)
    return res.status(200).json({
        errCode: -1,
        errMessage: 'Error from server',
    });
    }
}

module.exports = {
    handleLogin: handleLogin,
    handleGetAllUsers: handleGetAllUsers,
    handleCreateNewUser: handleCreateNewUser,
    handleDeleteUser: handleDeleteUser,
    handleEditUser: handleEditUser,
    getAllCode: getAllCode,
}