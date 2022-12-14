const User = require('../models/users');
const config = require('../config/config.json');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

module.exports.createUser = (req, res) => {
	var user = new User(
		
		req.body

	);
	const email = req.body.email;
	User.findOne({'email':email})
		.then(async (result) =>{
			if(result){
				return res.status(200).send({
					message:'email does  exist'
				})
			}
			else{
				user.save()
				.then(() => res.status(200)
					.json({
						status: true,
						message: 'user saved successfully'
					}))
				.catch(err => res.send({
					message: 'something went wrong ',
					err: err
				}));
			}
		})

	
}

module.exports.listUsers = (req, res) => {
	User.find({})
		.then(user => res.status(200)
			.json({
				status: true,
				message: (user)
			}))
		.then(err => res.send(err));
}

module.exports.getUser = (req, res) => {
	const { id } = req.params;

	// only allow admins to access other user records
   
	User.findById(id)
		.then(user => res.status(200)
			.json({
				status: true,
				message: (user)
			}))
		.then(err => res.send(err));
}

module.exports.updateUser = (req, res) => {
	User.findByIdAndUpdate(req.params.id, req.body, { new: true })
		.then(user => res.status(200)
			.json({
				status: true,
				message: (user)
			}))
		.then(err => res.send(err));
}

module.exports.deleteUser = (req, res) => {
	const { id } = req.params;
	User.findByIdAndRemove({ id })
		.then(user => res.status(200)
			.json({
				status: true,
				message: 'user fetched',
				user
			}))
		.then(err => res.send(err));
}

module.exports.login = (req, res) => {
	const email = req.body.email;
console.log('e,mm',email);
	User.findOne({ 'email': email })
		.then(async (user) => {
			console.log(user,'user')
			if (!user) {
				return res.status(200).send({
					message: 'email does not exist'
				});
			}
			else {
				const password = req.body.password;
				bcrypt.compare(password, user.password)
					.then(result => {
						if (result) {
							const token = jwt.sign({ sub: user.id, role:user.role }, config.secret,
								{
									expiresIn: 3600 // expires soon
								});
							const id = user._id;
							const role = user.role;

							return res.status(201).json({
								status: true,
								message: 'user logged in',
								token,
								id,
								role
							});
						}
						else {
							return res.status(201).json({
								status: false,
								message: 'failed to log in'
							});
						}

					})
			}
		})

}


module.exports.updatepassword = (req, res) => {
	const password = bcrypt.hashSync(req.body.password)
	console.log('paa',password);
	User.findByIdAndUpdate(req.params.id, { 'password': password })
		.then(user => res.status(200)
			.json({
				status: true,
				message:(user)
			}))
		.then(err => res.send(err));
}



module.exports.comparepassword = (req, res) => {

	User.findById(req.params.id)
	
		.then(async (user) => {
			if (user) {
				const password = req.body.password;
				bcrypt.compare(password, user.password)
					.then(result => {
						if (result) {
					
							return res.status(200).json({
								status: true,
								message: 'password exist'
							});
						}
						else {
							return res.status(201).json({
								status: false,
								message: 'password does not exist'
							});
						}

					})
				
			}
			else {
				return res.status(201).json({
					status: false,
					message: 'id does not exist'
				});
			}
		})

}

module.exports.getRole=(req, res) =>{
    User.find({ $or: [
		{'role': 'admin'}
	  ]})
      .then(approvedApps => res.json(approvedApps))
      .catch(err => res.send(err));
  }


  