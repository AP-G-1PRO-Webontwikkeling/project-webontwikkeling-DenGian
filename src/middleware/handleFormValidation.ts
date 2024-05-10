import { Request, Response, NextFunction } from "express";
import { FormData } from "../interfaces/registerForm.interface";

const validateFormData = (req: Request, res: Response, next: NextFunction) => {
    const { email, username, password, fname, lname, phone, terms } = req.body as FormData;
    let errors = [];

    if(!(email && /\S+@\S+\.\S+/.test(email))) {
        errors.push('Invalid email format.');
    }
    if(!(username && username.trim() !== '')) {
        errors.push('Username cannot be empty.');
    }
    if(!(password && password.length >= 8)) {
        errors.push('Password must be at least 8 characters long.');
    }
    if(!(fname && fname.trim() !== '')) {
        errors.push('First name cannot be empty.');
    }
    if(!(lname && lname.trim() !== '')) {
        errors.push('Last name cannot be empty.');
    }
    if(!(phone && /^04 \d{2} \d{3} \d{3}$/.test(phone))) {
        errors.push('Phone number must be in the format 04 XX XXX XXX.');
    }
    if(terms !== 'accepted') {
        errors.push('You must accept the terms and conditions.');
    }    

    if(errors.length > 0) {
        req.session.message = { type: "error", message: errors.join("\n") };
        res.redirect("/register"); 
    } else {
        next();
    }
};

export { validateFormData };
