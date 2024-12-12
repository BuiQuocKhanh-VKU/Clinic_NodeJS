import doctorService from '../services/doctorService';


let getTopDoctorHome = async (req, res) => {
	let limit = req.query.limit; //lay tu body
	if (!limit)
		limit = 20;
	try {
		let response = await doctorService.getTopDoctorHome(+limit); //`+limit` de chuyen string thanh number
		return res.status(200).json(response);
	} catch (e) {
		console.log('error:', e);
		return res.status(200).json({
			errCode: -1,
			errMessage: 'Error from server...'
		});
	}
}


let getAllDoctors = async (req, res) => { 
	try {
		let doctors = await doctorService.getAllDoctors();
		return res.status(200).json(doctors); //tra ve du lieu dang json voi status 200 la thanh cong

	} catch (e) {
		return res.status(200).json({
			errCode: -1,
			errMessage: 'Error from server...'
		});
	}
}

let postInforDoctor = async (req, res) => {
	try {
		let response = await doctorService.saveDetailInforDoctor(req.body);
		return res.status(200).json(response);
	} catch (e) {
		console.log('error:', e);
		return res.status(200).json({
			errCode: -1,
			errMessage: 'Error from server...'
		});
	}
}


module.exports = {
	getTopDoctorHome: getTopDoctorHome,
	getAllDoctors: getAllDoctors,
	postInforDoctor: postInforDoctor,
}