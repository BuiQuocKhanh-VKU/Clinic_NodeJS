import db from "../models/index";
import bcrypt from 'bcryptjs';

const salt = bcrypt.genSaltSync(10);

let hashUserPassword = (password) => {
    return new Promise(async (resolve, reject) => {
        try {
            let hashPassword = await bcrypt.hashSync(password, salt);
            resolve(hashPassword);
        } catch (e) {
            reject(e);
        }
    })
}

let handleUserLogin = (email, password) => {
    return new Promise(async (resolve, reject) => {
        try {
            let userData = {};

            let isExist = await checkUserEmail(email);
            if (isExist) {
                //user email exist
                let user = await db.User.findOne({
                    atributes: ['email', 'roleId', 'password', 'firstName', 'lastName'],
                    where: { email: email },
                    raw: true, // lay du lieu theo kieu object
                })
                if (user) { //neu user ton tai 
                    //compare password
                    let check = await bcrypt.compareSync(password, user.password); // false
                    if (check) { // dung mat khau
                        userData.errCode = 0;//tra thanh cong
                        userData.errMessage = 'Ok';
                        delete user.password;;
                        userData.user = user; //tra ve thong tin user
                    } else {
                        userData.errCode = 3;
                        userData.errMessage = 'Wrong password';
                    }
                } else {
                    userData.errCode = 2;
                    userData.errMessage = 'User not found exist';
                }
            } else {
                //return error
                userData.errCode = 1;
                userData.errMessage = 'Your email isnt exist in system. Pls check again';
            }
            resolve(userData);
        } catch (e) {
            reject(e);
        }
    })
}


let checkUserEmail = (userEmail) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: { email: userEmail },
            })
            if (user) {
                resolve(true)
            } else {
                resolve(false)
            }
        } catch (e) {
            reject(e);
        }
    })
} // check email ng dung co ton tai ko

let getAllUsers = (userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let users = '';  //user rong
            if (userId === 'ALL') { //neu userId = ALL
                users = await db.User.findAll({
                    atributes: { //chi lay nhung truong can thiet
                        exclude: ['password'] //loai bo truong password
                    },
                })
            }
            if (userId && userId !== 'ALL') { // lay 1 user
                users = await db.User.findOne({
                    where: { id: userId },
                    atributes: { //chi lay nhung truong can thiet
                        exclude: ['password'] //loai bo truong password
                    },
                })
            }
            resolve(users);

        } catch (e) {
            reject(e);
        }
    })
}

let createNewUser = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            //check mail is exist
            let check = await checkUserEmail(data.email);
            if (check === true) { //neu email da ton tai
                resolve({
                    errCode: 1,
                    errMessage: 'Your email is already in used, pls try another email'
                })
            } else {
                //hash password trc khi tao ng dung
                let hashPasswordFromBcrypt = await hashUserPassword(data.password);
                await db.User.create({
                    email: data.email,
                    password: hashPasswordFromBcrypt,
                    firstName: data.firstName,
                    lastName: data.lastName,
                    address: data.address,
                    phonenumber: data.phonenumber,
                    gender: data.gender,
                    roleId: data.roleId,
                    positionId: data.positionId,
                });
            }


            resolve({  //neu thanh cong tra ve
                errCode: 0,
                message: 'Ok'
            });

        } catch (e) {
            reject(e);
        }
    })
}

let deleteUser = (userId) => {   //tim nguoi dung trc khi xoa
    return new Promise(async (resolve, reject) => {
        let foundUser = await db.User.findOne({
            where: { id: userId }
        })
        if (!foundUser) {   //tim thay user r xoa
            resolve({
                errCode: 2,
                errMessage: 'The user isnt exist'
            })
        }

        await db.User.destroy({
            where: { id: userId }
        })
    })
}

let updateUserData = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.id) {   //truyen id truoc khi sua
                resolve({
                    errCode: 2,
                    errMessage: 'Missing required parameter'
                })
            }
            let user = await db.User.findOne({ //neu tim thay user
                where: { id: data.id },
                raw: false
            })
            if (user) {
                user.firstName = data.firstName;
                user.lastName = data.lastName;
                user.address = data.address;

                await user.save();

                resolve({
                    errCode: 0,
                    message: 'Update the user successful'
                })
            } else {
                resolve({
                    errCode: 1,
                    errMessage: 'User not found'
                })
            }

        } catch (e) {
            reject(e);
        }
    })
}

let getAllCodeService = (typeInput) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!typeInput) {
                resolve({
                    errCode: 1,
                    errMessage: 'Missing required parameter',
                })

            } else {
                let res = {};
                let allcode = await db.Allcode.findAll({
                    where: { type: typeInput }
                });
                res.errCode = 0;
                res.data = allcode;
                resolve(res);
            }

        } catch (e) {
            reject(e);
        }
    });
}

module.exports = {
    handleUserLogin: handleUserLogin,
    getAllUsers: getAllUsers,
    createNewUser: createNewUser,
    deleteUser: deleteUser,
    updateUserData: updateUserData,
    getAllCodeService: getAllCodeService,
}
