const { User } = require('../models');
const aws = require('aws-sdk');
const fs = require('fs');

module.exports = {
  signup(req, res) {
    aws.config.setPromisesDependency();
    aws.config.update({
      accessKeyId: process.env.ACCESSKEYID,
      secretAccessKey: process.env.SECRETACCESSKEY,
      region: process.env.REGION
    });
    const s3 = new aws.S3();
    var params = {
      ACL: 'public-read',
      Bucket: process.env.BUCKET_NAME,
      Body: fs.createReadStream(req.file.path),
      Key: `userAvatar/${req.file.originalname}`
    };
    
    s3.upload(params, (err, data) => {
      if (err) {
        console.log('Error occured while trying to upload to S3 bucket', err);
      }

      if (data) {
        fs.unlinkSync(req.file.path); // Empty temp folder
        const locationUrl = data.Location;
        let newUser = new User({ ...req.body, profile_img: locationUrl });
        newUser
          .save()
          .then(user => {
            res.json({ message: 'User created successfully', user });
          })
          .catch(err => {
            console.log('Error occured while trying to save to DB');
          });
      }
    });
  }
};