import mongoose from "mongoose";

const contactSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true, trim: true },
    lastName: { type: String, required: true, trim: true },
    phone: {
      type: String,
      required: true,
      minlength: 10,
      maxlength: 20,
      trim: true,
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      index: true,
      required: true,
    },
  },
  { timestamps: true }
);

contactSchema.index({ owner: 1, lastName: 1, firstName: 1 });

const Contact = mongoose.model("Contact", contactSchema);
export default Contact;
