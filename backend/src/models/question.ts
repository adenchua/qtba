import mongoose, { Schema, Document } from "mongoose";

interface QuestionInterface {
  title: string;
  createdDate: string;
  isStrikethrough: boolean;
  voteCount: number;
  comment: string;
}

export interface QuestionDocumentInterface extends QuestionInterface, Document {
  _id: string;
}

const questionSchemaFields: Record<keyof QuestionInterface, any> = {
  title: {
    type: String,
    required: true,
    trim: true,
    minlength: 1,
    maxlength: 64,
  },
  createdDate: {
    type: Date,
    default: Date.now,
  },
  isStrikethrough: {
    type: Boolean,
    default: false,
  },
  voteCount: {
    type: Number,
    default: 0,
  },
  comment: {
    type: String,
  },
};

const questionSchema = new Schema(questionSchemaFields, { versionKey: false });
const Question = mongoose.model<QuestionDocumentInterface>("Question", questionSchema);

export default Question;
