const express = require("express");
const app = express();
const Student = require("./models(collection creation)/students-(collection)");
const port = process.env.PORT || 8000;
require("./database/mongoose-db-creation"); // importing 
app.use(express.json());

//--------------------------- creating a new student by using POST method --------//

// app.post("/students", (req, res) => {
//    console.log(req.body);
//     const user = new Student(req.body);
//     user.save().then(() => {
//         res.status(201).send(user)
//     })
//         .catch((e) => {
//         res.status(400).send(e)
//     })

// })

app.post("/student", (req, res) => {
  const user = new Student(req.body);  // creating a new doc named user
  console.log(req.body);

  user
    .save()  // saving the user data which then returns a promise
    .then(() => {
      res.status(201).send(user);
    })
    .catch((e) => {
      res.status(400).send(e);
    });
});

//--------------------creating new student using async await------------------------//

app.post("/students", async (req, res) => {
  try {
    const user = new Student(req.body);   // creating a new doc named user
    console.log(req.body);
    const createUser = await user.save();   // saving the user doc using the async-await and storing it in "createUser" Variable so it becomes easily accessible.
    res.status(201).send(createUser); // sending response back from server
  } catch (e) {
    res.status(400).send(e);
  }
});

// app.post("/student", async (req, res) => {
//     try {
//       const user = new Student(req.body);
//       console.log(req.body);
//       const createUser = await user.save();
//       res.status(201).send(createUser);
//     } catch (e) {
//       res.status(400).send(e);
//     }
//   });

// -----------READING THE COMPLETE DATA USING GET METHOD--------------------//

app.get("/students", async (req, res) => {
  try {
    const allStudentsData = await Student.find();
    res.send(allStudentsData);
  } catch (e) {
    res.send(allStudentsData);
  }
});

// //------- READING THE DATA OF SINGLE STUDENT USING ID--------------------//

app.get("/students/:id", async (req, res) => {
  try {
    const _id = req.params.id;
    const studentDataById = await Student.findById(_id);
    console.log(_id);
    res.status(200).send(studentDataById);
  } catch (e) {
    res.status(404).send();
  }
});

//------------READING SINGLE STUDENT DATA USING NAME-----------//

app.get("/students/name/:name", async (req, res) => {
  try {
    const name = req.params.name;
    const studentDataByName = await Student.find(name);
    console.log(name);
    res.status(200).send(studentDataByName);
  } catch (e) {
    res.status(404).send();
  }
});

//--UPDATING STUDENT DATA USING PUT/PATCH METHOD-----------//

app.patch("/students/:id", async (req, res) => {
  try {
    const _id = req.params.id;
    const studentDataById = await Student.findByIdAndUpdate(_id, req.body, {
      new: true,
    });
    console.log(_id);
    res.status(200).send(studentDataById);
  } catch (e) {
    res.status(404).send();
  }
});

//--DELETING STUDENT DATA USING DELETE METHOD-----------//

app.delete("/students/:id", async (req, res) => {
  try {
    const _id = req.params.id;
    const studentDataById = await Student.findByIdAndDelete(_id);
    console.log(_id);
    res.status(200).send(studentDataById);
  } catch (e) {
    res.status(500).send();
  }
});

app.listen(port, () => {
  console.log("req handled succesfully");
});






