import mongoose from "mongoose";

const docSchema = mongoose.Schema({
  _id: {
    type: String,
    required: true,
  },
  data: {
    type: Object,
    required: true,
  }
});

const document = mongoose.model('document', docSchema);
export default document;
