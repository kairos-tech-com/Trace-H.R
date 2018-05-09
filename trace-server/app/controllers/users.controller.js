var bcrypt = require("bcryptjs");
const Users = require("../models/users.model");
const Profile = require("../models/profile.model");
import parseErrors from "../utils/parseErrors";

// GET ALL USERS
exports.usersList = (req, res) => {
  Profile.find()
    .populate("user", ["firstName", "lastName", "email"])
    .then(usersList => {
      if (!usersList) {
        return res.json({
          errors: { global: "No profile" }
        });
      }
      res.json(usersList);
    })
    .catch(err => res.status(404).json({ errors: parseErrors(err.errors) }));
};

// GET CURRENT USER PROFILE
exports.currentUser = (req, res) => {
  Profile.findOne({ user: req.user.id })
    .populate("user", ["firstName", "lastName", "email"])
    .then(userProfile => {
      if (!userProfile) {
        return res.json({
          errors: { global: "No profile" }
        });
      }
      res.json(userProfile);
    })
    .catch(err => res.status(404).json({ errors: parseErrors(err.errors) }));
};

//Create or Edit user profile
exports.userProfile = (req, res) => {
  // Get fields
  const profileFields = {};
  profileFields.user = req.user.id;
  if (req.body.data.cellphone)
    profileFields.cellphone = req.body.data.cellphone;
  if (req.body.data.onProject)
    profileFields.onProject = req.body.data.onProject;
  if (req.body.data.endDate) profileFields.endDate = req.body.data.endDate;
  if (req.body.data.relocation)
    profileFields.relocation = req.data.body.data.relocation;

  // Skillset - Split into array
  if (typeof req.body.data.skillset !== "undefined") {
    profileFields.skillset = req.body.data.skillset.split(",");
  }

  // Address
  profileFields.address = {};
  if (req.body.data.street) profileFields.address.street = req.body.data.street;
  if (req.body.data.apartment)
    profileFields.address.apartment = req.body.data.apartment;
  if (req.body.data.city) profileFields.address.city = req.body.data.city;
  if (req.body.data.state) profileFields.address.state = req.body.data.state;
  if (req.body.data.zip) profileFields.address.zip = req.body.data.zip;

  Profile.findOne({ user: req.user.id }).then(profile => {
    if (profile) {
      // Update user profile
      Profile.findOneAndUpdate(
        { user: req.user.id },
        { $set: profileFields },
        { new: true }
      )
        .then(profile => res.json(profile))
        .catch(err =>
          res.status(404).json({ errors: parseErrors(err.errors) })
        );
    } else {
      //Create user profile
      new Profile(profileFields)
        .save()
        .then(profile => res.json(profile))
        .catch(err =>
          res.status(404).json({ errors: parseErrors(err.errors) })
        );
    }
  });
};

// Immigration Info
exports.immigrationInfo = (req, res) => {
  Profile.findOne({ user: req.user.id }).then(profile => {
    const newImmigrationInfo = {
      visaStatus: req.body.visaStatus,
      dateOfHire: req.body.dateOfHire,
      visaExp: req.body.visaExp,
      i94Exp: req.body.i94Exp,
      organizationTitle: req.body.organizationTitle,
      jobTitle: req.body.jobTitle,
      lcaSalary: req.body.lcaSalary
    };
    // Add to immigration array
    profile.experience.unshift(newImmigrationInfo);

    profile.save().then(profile => res.json(profile));
  });
};

exports.addExperience = (req, res) => {
  Profile.findOne({ user: req.user.id }).then(profile => {
    const newExp = {
      title: req.body.data.title,
      company: req.body.data.company,
      location: req.body.data.location,
      from: req.body.data.from,
      to: req.body.data.to,
      description: req.body.data.description
    };

    // Add to exp array
    profile.experience.unshift(newExp);

    profile.save().then(profile => res.json(profile));
  });
};

exports.addEducation = (req, res) => {
  Profile.findOne({ user: req.user.id }).then(profile => {
    const newEdu = {
      school: req.body.data.school,
      degree: req.body.data.degree,
      fieldOfStudy: req.body.data.fieldOfStudy,
      from: req.body.data.from,
      to: req.body.data.to
    };

    // Add to edu array
    profile.education.unshift(newEdu);

    profile.save().then(profile => res.json(profile));
  });
};
