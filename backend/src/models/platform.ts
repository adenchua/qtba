import mongoose, { Schema, Document } from "mongoose";

interface PlatformInterface {
  title: string;
  slug: string;
  createdDate: string;
  modules: string[];
}

interface PlatformDocumentInterface extends PlatformInterface, Document {
  _id: string;
}

const platformSchemaFields: Record<keyof PlatformInterface, any> = {
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
  modules: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "Module",
  },
};

const platformSchema = new Schema(platformSchemaFields, { versionKey: false });
const Platform = mongoose.model<PlatformDocumentInterface>("Platform", platformSchema);

export default Platform;
