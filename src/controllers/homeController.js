import db from '../models/index.js';
import user from '../models/user.js';
import CRUDService from '../services/CRUDservice.js';


let getHomePage = async (req, res) => { 
	try {
		let data = await db.User.findAll();
		return res.render('homepage.ejs', {
			data: JSON.stringify(data)
		});
	} catch (e) {
		console.log(e);
	}
}

let getAboutPage = (req, res) => {
	return res.render('test/about.ejs');
}

let getCRUD = (req, res) => {
	return res.render('crud.ejs');
}

let postCRUD = async (req, res) => {
	let message = await CRUDService.createNewUser(req.body);
	return res.send("Post crud from controller");
}

let displayGetCRUD = async (req, res) => {
	let dataUsers = await CRUDService.getAllUser();
	return res.render('displayCRUD.ejs', {
		dataTable: dataUsers,
	})

}

let getEditCRUD = async (req, res) => {
	let userId = req.query.id;
	console.log(userId);
	if (userId) {
		let dataUsers = await CRUDService.getUserInfoById(userId);

		return res.render('editCRUD.ejs', {
			user: dataUsers,
		});
	} else {
		return res.send('hello, user not found');
	}
}

let putCRUD = async (req, res) => {
	let data = req.body;
	let allUsers = await CRUDService.updateUserData(data);
	return res.render('displayCRUD.ejs', {
		dataTable: allUsers,
	});
}

let deleteCRUD = async (req, res) => {
	let userId = req.query.id;
	if (userId) {
		let allUsers = await CRUDService.deleteUserById(userId);
		return res.render('displayCRUD.ejs', {
			dataTable: allUsers,
		});
	} else {
		return res.send('ko tim thay id');
	}

}


module.exports = {
	getHomePage: getHomePage,
	getAboutPage: getAboutPage,
	getCRUD: getCRUD,
	postCRUD: postCRUD,
	displayGetCRUD: displayGetCRUD,
	getEditCRUD: getEditCRUD,
	putCRUD: putCRUD,
	deleteCRUD: deleteCRUD,
}
