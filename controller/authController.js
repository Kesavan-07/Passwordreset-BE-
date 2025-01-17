const User = require('../models/user');
const bcrypt = require('bcrypt');
const { log } = require('console');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');

const authController = { 
// sign up
    signup: async (req, res) => {
        try { 

        }
        catch (error) { 
      res.status(500).json({ message: error.message });

        }
    },
    // login
    login: async (req, res) => {
        try { 

        }
        catch (error) { 
      res.status(500).json({ message: error.message });

        }
    },
    logout: async (req, res) => {
        try { 

        }
        catch (error) { 
      res.status(500).json({ message: error.message });

        }
    },
    // resetpassword
    resetPassword: async (req, res) => {
        try { 

        }
        catch (error) { 
      res.status(500).json({ message: error.message });

        }
    },
    // resetpassword form
    resetPasswordform: async (req, res) => {
        try { 

        }
        catch (error) { 
      res.status(500).json({ message: error.message });

        }
    },
    //user profile
    myprofile: async (req, res) => { 
        try { 

        }
        catch (error) { 
      res.status(500).json({ message: error.message });

        }
    }

    
};

module.exports = authController;