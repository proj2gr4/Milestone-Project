const router = require('express').Router();
const {Categories, Comment, Goal, Member_Goal, Step, User} = require('../../models');
const { v4: uuidv4 } = require('uuid');
const aws = require('aws-sdk');
const fs = require('fs');
require('dotenv').config();

// multer object to upload file:
const multer = require('multer');

// define destination and file name:
const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, './uploads/');
    },
    filename: function(req, file, cb){
        let fileExt = file.originalname.split('.').pop();
        file.originalname = uuidv4()+'.'+fileExt;
        cb(null, file.originalname);
    }
});
// filter jpeg/png files:
const fileFilter = (req, file, cb) =>{
    if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'image/jpg'){
        cb(null, true);
    }else{
        cb(null, false);
    }
}

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 5
    },
    fileFilter: fileFilter
});

async function signup(req, res) {
    let resultuser;
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
        //let filePath = req.file ? req.file.path : null
        const locationUrl = data.Location;
        let newUser = User.create({
            username: req.body.username,
            email: req.body.email,
            password: req.body.password,
            profile_img: locationUrl
        })
        .then(dbUserData => {
            console.log(dbUserData);
            req.session.save(() => {
             req.session.user_id = dbUserData.id;
             req.session.username = dbUserData.username;
             req.session.loggedIn = true;
        
            res.json(dbUserData);
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err)
        });
    
      }
    });
  }




// GET /api/users
router.get('/', (req, res) => {
    // Access our User model and run .findAll() method)
    User.findAll({
      attributes: { exclude: ['password'] }
    })
      .then(dbUserData => res.json(dbUserData))
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
});

//Get /api/users/id
router.get('/:id', (req, res) => {
    User.findOne({
        attributes: { exclude: ['password'] },
        where: {
            id: req.params.id
        },
        include: [
            {
                model: Goal,
                attributes: ['id', 'title', 'created_at']
            },
            {
                model: Member_Goal
            }
        ]
    }).then(dbUserData => {
        if(!dbUserData){
            res.status(404).json({ message: 'No user found'});
            return;
        }
        res.json(dbUserData);
    }).catch(err =>{
        console.log(err);
        res.status(500).json(err);
    });
})

//Post /api/users
router.post('/', upload.single('profile_img'), (req, res) => {
    signup(req, res)
});

router.post('/login', (req, res) =>{
    User.findOne({
        where:{
            username:req.body.username,
        }
    }).then(dbUserData => {
        if(!dbUserData){
            res.statusMessage = "No user with that username address!";
            res.status(400).json({message: 'No user with that username address!'});
            return;
        }
        const validPassword = dbUserData.checkPassword(req.body.password);
        if(!validPassword){
            res.status(400).json({message: 'Incorrect password'});
            return;
        }
        req.session.save(() => {
            // declare session variables
            req.session.user_id = dbUserData.id;
            req.session.username = dbUserData.username;
            req.session.loggedIn = true;
            res.json({ user: dbUserData, message: 'You are now logged in!' });
          });
    });
});

// Put /api/users/1
router.put('/:id', upload.single('profile_img'), (req, res) => {
    User.update(
        {
            username: req.body.username,
            email: req.body.email,
            password: req.body.password,
            profile_img: req.file.path
        },
        {
            
            individualHooks: true,
            where:{
                id: req.params.id
            }
        }
    ).then(dbUserData =>{
        if (!dbUserData[0]) {
            res.status(404).json({ message: 'No user found with this id' });
            return;
        }
        res.json(dbUserData);

    }).catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

// Put /api/users/edit/1: for profile update
router.put('/edit/:id', (req, res) => {

    User.update(
        {
            username: req.body.username,
            email: req.body.email
            // profile_img: req.file.path
        },
        {
            where:{
                id: req.params.id
            }
        }
    ).then(dbUserData =>{
        if (!dbUserData[0]) {
            res.status(404).json({ message: 'No user found with this id' });
            return;
        }
        res.json(dbUserData);

    }).catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

// Put /api/users/heroku/1 : api to update profile image with static files:
router.put('/heroku/:id', (req, res) => {
    User.update(
        {
            username: req.body.username,
            email: req.body.email,
            password: req.body.password,
            profile_img: req.body.profile_img,
        },
        {
            
            individualHooks: true,
            where:{
                id: req.params.id
            }
        }
    ).then(dbUserData =>{
        if (!dbUserData[0]) {
            res.status(404).json({ message: 'No user found with this id' });
            return;
        }
        res.json(dbUserData);

    }).catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

// Delete /api/users/1
router.delete('/:id', (req, res) =>{
    User.destroy({
        where:{
            id: req.params.id
        }
    }).then(dbUserData =>{
        if(!dbUserData){
            res.status(404).json({message:'No user found'});
            return;
        }
        res.json(dbUserData);
    }).catch(err =>{
        console.log(err);
        res.status(500).json(err);
    });
});

//Log out:
router.post('/logout', (req, res) => {
    if(req.session.loggedIn){
      req.session.destroy(() => {
        res.status(204).end();
      });
    } else {
      res.status(404).end();
    }
})

module.exports = router;