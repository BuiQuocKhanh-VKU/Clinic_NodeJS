import db from '../models/index';



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



module.exports = {
getTopDoctorHome: getTopDoctorHome,
};