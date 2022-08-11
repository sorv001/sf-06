const express = require("express");
import { Request, Response } from "express";

import data from "../../../client/data.json";

const random = require("simple-random-number-generator");
let params = {
  min: 5,
  max: 76,
  integer: true,
};

type User = {
  id: number;
  firstName: string;
  middleName: string;
  lastName: string;
  email: string;
  phoneNumber: number;
  role: string;
  address: string;
};

const router = express.Router();

//Home page
router.get("/", (req: Request, res: Response) => {
  res.status(200).send(`welcome again buddy`);
});

//Fetching all usesrs

router.get("/users", (req: Request, res: Response) => {
  res.status(200).send(data);
});

//Fetching a particular user

router.get("/:id", (req: Request, res: Response) => {
  let id = req.params.id;
  if (data.some((data) => data.id === Number(id))) {
    res.status(200).json(data.filter((data) => data.id === Number(id)));
  } else
    res.status(404).json({ message: `No Member with Member ID ${id} Found` });
  //404 - not found
});

//Adding a member to the json
router.post("/", (req: Request, res: Response) => {
  const newMember: User = {
    id: random(params),
    firstName: req.body.firstName,
    middleName: req.body.middleName,
    lastName: req.body.lastName,
    email: req.body.email,
    phoneNumber: req.body.phoneNumber,
    role: req.body.role,
    address: req.body.address,
  };
  if (
    !newMember.firstName ||
    !newMember.lastName ||
    !newMember.email ||
    !newMember.phoneNumber ||
    !newMember.role ||
    !newMember.address
  ) {
    res.status(400).json({ message: `Give Correct Input` });
  } else if (data.some((data) => newMember.phoneNumber === data.phoneNumber)) {
    res.status(400).json({ message: `User Already Exists` });
  } else {
    data.push(newMember);
    res.status(201).json({
      message: `Member Successfully Added !`,
      "New Member": newMember,
    });
  }
});

//Editing details of a particular member by id

router.put("/:id", (req: Request, res: Response) => {
  let id = req.params.id;
  if (data.some((data) => data.id === Number(id))) {
    data.forEach((object) => {
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
          .json({ message: "Updated Successfully", updatedMembers: data });
      }
    });
  } else {
    res.status(404).json({ message: `No Member with Member ID ${id} Found` });
  }
});

//Removing a member from the json data
router.delete("/:id", (req: Request, res: Response) => {
  let id = req.params.id;
  if (data.some((data) => data.id === Number(id))) {
    let index = 0;

    for (; index < data.length; index++) {
      if (data[index].id === Number(id)) break;
    }
    data.splice(index, 1);
    res
      .status(200)
      .json({ message: `Deleted Member with ID: ${id}`, members: data });
    console.log(id);
  } else {
    res.status(404).json({ message: `No Member with Member ID ${id} Found` });
  }
});

module.exports = router;
