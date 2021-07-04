import mongoose, { Schema, Document } from "mongoose";

interface ModuleInterface {
  title: string;
  slug: string;
  createdDate: string;
  isVotingDisabled: boolean;
  questions: string[];
}

export interface ModuleDocumentInterface extends ModuleInterface, Document {
  _id: string;
}

const moduleSchemaFields: Record<keyof ModuleInterface, any> = {
  title: {
    type: String,
    required: true,
    trim: true,
    minlength: 1,
    maxlength: 64,
  },
  slug: {
    type: String,
    required: true,
    minlength: 1,
  },
  createdDate: {
    type: Date,
    default: Date.now,
  },
  isVotingDisabled: {
    type: Boolean,
    default: false,
  },
  questions: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "Question",
  },
};

const moduleSchema = new Schema(moduleSchemaFields, { versionKey: false });
const Module = mongoose.model<ModuleDocumentInterface>("Module", moduleSchema);

export default Module;
