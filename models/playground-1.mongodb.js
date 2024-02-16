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
use("ResMe");

// Find users who have account but not user field
// const accounts = db.accounts.find().toArray();

// // Check each account in the users collection
// for (const account of accounts) {
//   const userId = account.userId;
//   const user = db.users.findOne({ _id: userId });

//   // If no corresponding user is found, print the account's userId
//   if (!user) {
//     console.log(
//       `Account with userId ${userId} does not have a corresponding user in the users collection`
//     );
//   }
// }

// Insert a few documents into the sales collection.

db.resumeheaderinfos.updateMany({}, { $set: { bio: "" } });
// db.userprojects.findOneAndUpdate(
//   { _id: "831cae36-8588-48b1-b7a1-3d34bfc994e9" },
//   { $set: { link: "http://resme.xyz" } }
// );
//DELETE DFAULT USER

// try {
//   const email = "shubhpatni0@gmail.com";
//   const collections = await db.listCollections().toArray();

//   // Iterate through each collection
//   for (const collection of collections) {
//     const collectionName = collection.name;

//     if (collectionName === "resumeheaderinfos") {
//       await db.collection(collectionName).deleteOne({ _id: email });
//     }

//     // if (collectionName === "accounts") {

//     //     await db.collection(collectionName).deleteOne({ _id: email });
//     // }

//     // Delete entries in the collection containing the target email
//     await db.collection(collectionName).deleteMany({ email: email });
//     console.log(
//       `Deleted entries in ${collectionName} collection containing email ${email}`
//     );
//   }
// } catch (err) {
//   console.error("Error deleting entries:", err);
//   throw new Error("Error deleting entries");
// }

//ADD HEADER INFO TO EVERY USER WHO DOES NOT HAVE IT
// const usersWithNoHeaderInfo = db.users.aggregate([
//   {
//     $lookup: {
//       from: "ResumeHeaderInfo",
//       localField: "email",
//       foreignField: "_id",
//       as: "headerInfoMatch",
//     },
//   },
//   {
//     $match: {
//       headerInfoMatch: { $eq: [] }, // Filter for users whose email does not exist in headerInfo
//     },
//   },
//   {
//     $project: {
//       _id: 0,
//       email: 1,
//       name: 1, // Assuming 'name' is the field for the user's name. Replace with actual field name.
//     },
//   },
// ]);

//console.log(usersWithNoHeaderInfo);
