/* global use, db */
// MongoDB Playground
// To disable this template go to Settings | MongoDB | Use Default Template For Playground.
// Make sure you are connected to enable completions and to be able to run a playground.
// Use Ctrl+Space inside a snippet or a string literal to trigger completions.
// The result of the last command run in a playground is shown on the results panel.
// By default the first 20 documents will be returned with a cursor.
// Use 'console.log()' to print to the debug output.
// For more documentation on playgrounds please refer to
// https://www.mongodb.com/docs/mongodb-vscode/playgrounds/

// Select the database to use.
import mongoose, { Schema } from "mongoose";
use("ResMe");
// Insert a few documents into the sales collection.
const UserSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    stripeCustomerId: {
      type: String,
    },
    stripeSubscriptionId: {
      type: String,
    },
    stripePriceId: {
      type: String,
    },
    stripeCurrentPeriodEnd: {
      type: Date,
    },
    resumeHeaderInfo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ResumeHeaderInfo",
    },
  },
  { timestamps: true }
);
const User = mongoose.models.User || mongoose.model("User", UserSchema);
const newUser = new User({
  email: "shubhpatni2002@gmail.com",
  password: "asdfasdf",
  stripeCustomerId: "asdfadsf",
  stripeSubscriptionId: "asdfasdf",
  stripePriceId: "asdfasdf",
  stripeCurrentPeriodEnd: new Date("2016-02-06T20:20:13Z"),
});

newUser.save((err, savedUser) => {
  if (err) {
    console.error("Error saving the user:", err);
  } else {
    console.log("User saved successfully:", savedUser);
  }
});

// db.getCollection("users").insertOne({
//   email: "shubhpatni2002@gmail.com",
//   password: "asdfasdf",
//   stripeCustomerId: "asdfadsf",
//   stripeSubscriptionId: "asdfasdf",
//   stripePriceId: "asdfasdf",
//   stripeCurrentPeriodEnd: new Date("2016-02-06T20:20:13Z"),
// });

// Run a find command to view items sold on April 4th, 2014.
const salesOnApril4th = db.getCollection("User").find({
  email: "shubhpatni2002@gmail.com",
});

// Print a message to the output window.
console.log(`${salesOnApril4th} sales occurred in 2014.`);

// Here we run an aggregation and open a cursor to the results.
// Use '.toArray()' to exhaust the cursor to return the whole result set.
// You can use '.hasNext()/.next()' to iterate through the cursor page by page.
