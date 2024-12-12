import bcrypt from 'bcryptjs';
import db from '../models/index';
import { raw } from 'body-parser';
import { up } from '../seeders/seeder-users';

let getTopDoctorHome = (limitInput) => {
	return new Promise(async (resolve, reject) => {
		try {
			let users = await db.User.findAll({
				limit: limitInput, //gioi han so luong bac si
				where: { roleId: 'R2' }, //R2 la bac si
				order: [['createdAt', 'DESC']], //sap xep theo thu tu giam dan
				attributes: {
					exclude: ['password']//loai bo password ra khoi du lieu tra ve
				},
				include: [
					{ model: db.Allcode, as: 'positionData', attributes: ['valueEn', 'valueVi'] },
					{ model: db.Allcode, as: 'genderData', attributes: ['valueEn', 'valueVi'] }
				],
				raw: true, //lay du lieu theo kieu object chua phai array
				nest: true //de lay du lieu theo kieu object
			});

			resolve({
				errCode: 0,
				data: users
			});
		} catch (e) {
			reject(e);
		}
	})
}


let getAllDoctors = () => {
	return new Promise(async (resolve, reject) => {
		try {
			let doctors = await db.User.findAll({
				where: { roleId: 'R2' },
				attributes: {
					exclude: ['password', 'image']//loai bo password ra khoi du lieu tra ve
				},
			})

			resolve({  //=return
				errCode: 0,
				data: doctors
			})
		} catch (e) {
			reject(e);
		}
	})
}


let saveDetailInforDoctor = (inputData) => {
	return new Promise(async (resolve, reject) => {
		try {
			if (!inputData.doctorId || !inputData.contentHTML || !inputData.contentMarkdown) {
				resolve({
					errCode: 1,
					errMessage: 'Missing required parametersss'
				}) 
			} else {
				await db.Markdown.create({
					contentHTML: inputData.contentHTML,
					contentMarkdown: inputData.contentMarkdown,
					description: inputData.description,
					doctorId: inputData.doctorId,
				})

				resolve({
					errCode: 0,
					errMessage: 'Save infor doctor success'
				})
			}

		} catch (e) {
			reject(e);

		}
	})
}

module.exports = {
	getTopDoctorHome: getTopDoctorHome,
	getAllDoctors: getAllDoctors,
	saveDetailInforDoctor: saveDetailInforDoctor,
};