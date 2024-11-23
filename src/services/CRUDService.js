
import bcrypt from 'bcryptjs';
import db from '../models/index';
import { raw } from 'body-parser';
import { up } from '../seeders/seeder-users';

let createNewUser = async (data) => {
    try {
        const salt = await bcrypt.genSalt(10);
        let hashPasswordFromBcrypt = await bcrypt.hash(data.password, salt);
        await db.User.create({
            email: data.email,
            password: hashPasswordFromBcrypt,
            firstName: data.firstName,
            lastName: data.lastName,
            address: data.address,
            gender: data.gender === '1' ? true : false,
            typeRole: data.typeRole,
            keyRole: data.keyRole,
        });
        return 'Create new user success';
    } catch (error) {
        console.error("Lỗi khi tạo người dùng:", error);
        throw error;
    }
};
  
let getAllUser = async () => {
    return new Promise( async (resolve, reject) => {
        try {
            let users = await db.User.findAll({
                raw: true,
            }
            );
            resolve(users);
        } catch (e) {
            reject(e);
        }
    })
}

let getUserInfoById = (userId) => {
    return new Promise( async (resolve, reject) => {
        try {
            let user = db.User.findOne({ 
                where: { id: userId },
                raw: true,
            })
            if (user) {
                resolve(user);
            } else {
                resolve({});
            }

        } catch (error) {
            reject (e);
        }
    });
}

let updateUserData = (data) => {
    return new Promise( async (resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: { id: data.id }
            });
            if (user) {
                user.firstName = data.firstName;
                user.lastName = data.lastName;
                user.address = data.address;

                await user.save();

                let allUsers = await db.User.findAll();
                resolve(allUsers);
            } else {
                resolve();
            }
            
        } catch (e) {
           console.log(e);
        }})
    }

let deleteUserById= async (userId) =>{
    return new Promise( async (resolve, reject) => {
    try {
        let user = await db.User.findOne({
            where: { id: userId }
        });

         if (user) {
            await user.destroy();
            let allUsers = await db.User.findAll();
            resolve(allUsers);
         } else{
            resolve('User not found');
         }
         resolve(); //return
    } catch (e) {
       console.log(e);
    }
    })
}

module.exports = {
    createNewUser: createNewUser,
    getAllUser: getAllUser,
    getUserInfoById: getUserInfoById,
    updateUserData: updateUserData,
    deleteUserById: deleteUserById,
};