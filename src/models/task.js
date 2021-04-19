const { ObjectID } = require("bson");
const mongoose = require("mongoose");

const taskSchema = mongoose.Schema(
  {
    description: {
      type: String,
      required: true,
      trim: true,
    },
    completed: {
      type: Boolean,
      default: false,
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

taskSchema.pre("save", async function (next) {
  next();
});
const Task = mongoose.model("Task", taskSchema);

module.exports = Task;

// const firsttask = new Task({
//     description:'Water the plants          ',
//     completed:true,
// });

// firsttask.save().then(() => {
//     console.log(firsttask);
// }).catch((error) => {
//     console.log(error);
// })
