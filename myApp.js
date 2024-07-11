let mongoose = require("mongoose");
require("dotenv").config();

//conexion con confirmacion positiva solamente

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("connected..."));

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  phone: {
    type: String,
    required: false,
  },
  pets: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Pet",
    },
  ],
});

let Person = mongoose.model("Person", personSchema);

const createAndSavePerson = (done) => {
  let person = new Person({ name: "Jane Fonda", age: 84 });
  person.save((err, data) => {
    if (err) throw err; //tambien puede ser: return console.error(err)
    done(null, data);
  });
};

const createOnePerson = (personData, done) => {
  Person.create(personData, (err, data) => {
    if (err) {
      return done(err);
    }
    done(null, data);
  });
};

let arrayOfPeople = [
  { name: "Frankie", age: 74 },
  { name: "Sol", age: 76 },
  { name: "Robert", age: 78 },
];

const createManyPeople = (arrayOfPeople, done) => {
  Person.create(arrayOfPeople, (err, data) => {
    if (err) throw err;
    done(null, data);
  });
};

const findPeopleByName = (personName, done) => {
  Person.find({ name: personName }, (err, data) => {
    if (err) throw err;
    done(null, data);
  });
};

const findPersonById = (personId, done) => {
  Person.findById({ _id: personId }, (err, data) => {
    if (err) throw err;
    done(null, data);
  });
};

const findEditThenSave = (personId, done) => {
  const nameToAdd = "carlos";

  Person.findById({ _id: personId }, (err, data) => {
    if (err) throw err;
    data.name = nameToAdd;

    data.save((err, data) => {
      if (err) throw err;
      done(null, data);
    });
  });
};

const findAndUpdate = (personName, done) => {
  const ageToSet = 20;
  Person.findOneAndUpdate(
    { name: personName },
    { age: ageToSet },
    { new: true },
    (err, data) => {
      if (err) throw err;
      done(null, data);
    }
  );
};

const removeById = (personId, done) => {
  Person.findByIdAndRemove({ _id: personId }, (err, data) => {
    if (err) throw err;
    done(null, data);
  });
};

const removeManyPeople = (done) => {
  const nameToRemove = "Mary";

  Person.deleteMany({ name: nameToRemove }, (err, data) => {
    if (err) throw err;
    done(null, data);
  });
};

const queryChain = (done) => {
  const nameToSearch = "Sol";

  Person.find({ name: nameToSearch })
    .sort({ name: 1 }) //ordena por name
    .limit(2) //trae 2
    .select({ age: 0 }) //oculta age
    .exec((err, data) => {
      //esto ejecuta finalmente el query
      if (err) throw err;
      done(null, data);
    });
};

/** **Well Done !!**
/* You completed these challenges, let's go celebrate !
 */

//----- **DO NOT EDIT BELOW THIS LINE** ----------------------------------

exports.PersonModel = Person;
exports.createAndSavePerson = createAndSavePerson;
exports.createOnePerson = createOnePerson;
exports.findPeopleByName = findPeopleByName;
exports.findPersonById = findPersonById;
exports.findEditThenSave = findEditThenSave;
exports.findAndUpdate = findAndUpdate;
exports.createManyPeople = createManyPeople;
exports.removeById = removeById;
exports.removeManyPeople = removeManyPeople;
exports.queryChain = queryChain;
