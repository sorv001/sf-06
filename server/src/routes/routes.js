"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const data_json_1 = __importDefault(require("../../../client/data.json"));
const random = require("simple-random-number-generator");
let params = {
    min: 5,
    max: 76,
    integer: true,
};
const router = express.Router();
//Home page
router.get("/", (req, res) => {
    res.status(200).send(`welcome again buddy`);
});
//Fetching all usesrs
router.get("/users", (req, res) => {
    res.status(200).send(data_json_1.default);
});
//Fetching a particular user
router.get("/:id", (req, res) => {
    let id = req.params.id;
    if (data_json_1.default.some((data) => data.id === Number(id))) {
        res.status(200).json(data_json_1.default.filter((data) => data.id === Number(id)));
    }
    else
        res.status(404).json({ message: `No Member with Member ID ${id} Found` });
    //404 - not found
});
//Adding a member to the json
router.post("/", (req, res) => {
    const newMember = {
        id: random(params),
        firstName: req.body.firstName,
        middleName: req.body.middleName,
        lastName: req.body.lastName,
        email: req.body.email,
        phoneNumber: req.body.phoneNumber,
        role: req.body.role,
        address: req.body.address,
    };
    if (!newMember.firstName ||
        !newMember.lastName ||
        !newMember.email ||
        !newMember.phoneNumber ||
        !newMember.role ||
        !newMember.address) {
        res.status(400).json({ message: `Give Correct Input` });
    }
    else if (data_json_1.default.some((data) => newMember.phoneNumber === data.phoneNumber)) {
        res.status(400).json({ message: `User Already Exists` });
    }
    else {
        data_json_1.default.push(newMember);
        res.status(201).json({
            message: `Member Successfully Added !`,
            "New Member": newMember,
        });
    }
});
//Editing details of a particular member by id
router.put("/:id", (req, res) => {
    let id = req.params.id;
    if (data_json_1.default.some((data) => data.id === Number(id))) {
        data_json_1.default.forEach((object) => {
            if (object.id === Number(id)) {
                object.firstName = req.body.firstName
                    ? req.body.firstName
                    : object.firstName;
                object.middleName = req.body.middleName
                    ? req.body.middleName
                    : object.middleName;
                object.lastName = req.body.lastName
                    ? req.body.lastName
                    : object.lastName;
                object.email = req.body.email ? req.body.email : object.email;
                object.phoneNumber = req.body.phoneNumber
                    ? req.body.phoneNumber
                    : object.phoneNumber;
                object.role = req.body.role ? req.body.role : object.role;
                object.address = req.body.address ? req.body.address : object.address;
                res
                    .status(200)
                    .json({ message: "Updated Successfully", updatedMembers: data_json_1.default });
            }
        });
    }
    else {
        res.status(404).json({ message: `No Member with Member ID ${id} Found` });
    }
});
//Removing a member from the json data
router.delete("/:id", (req, res) => {
    let id = req.params.id;
    if (data_json_1.default.some((data) => data.id === Number(id))) {
        let index = 0;
        for (; index < data_json_1.default.length; index++) {
            if (data_json_1.default[index].id === Number(id))
                break;
        }
        data_json_1.default.splice(index, 1);
        res
            .status(200)
            .json({ message: `Deleted Member with ID: ${id}`, members: data_json_1.default });
        console.log(id);
    }
    else {
        res.status(404).json({ message: `No Member with Member ID ${id} Found` });
    }
});
module.exports = router;
