import doctorService from '../services/doctorService';


let getTopDoctorHome = async (req, res) => {
	let limit = req.query.limit; //lay tu body
	if (!limit)
		limit = 20
	try {
		let response = await doctorService.getTopDoctorHome(+limit); //`+limit` de chuyen string thanh number
		return res.status(200).json(response);
	} catch (e) {
		console.log('error:', e);
		return res.status(200).json({
			errCode: -1,
			message: 'Error from server...'
		});
	}
}


module.exports = {
	getTopDoctorHome: getTopDoctorHome,
}