import dotenv from "dotenv";
import mongoose, { Schema, model, connect, Types, ObjectId } from "mongoose";

const { ObjectId } = mongoose.Schema;

export interface PostSchema extends mongoose.Document {
  user: ObjectId;
  type: string;
  text: string;
  images: string[];
  background: string;
  comments: Types.Array<Comments>;
}

interface Comments {
  commentBy: ObjectId;
  comment: string;
  image: string;
  commentDate: string;
}

const postSchema = new Schema<PostSchema>(
  {
    user: {
      type: ObjectId,
      required: true,
      ref: "users",
    },
    type: {
      type: String,
      enum: ["ProfileImage", "Cover", null],
      default: null,
    },
    text: {
      type: String,
      trim: true,
      text: true,
    },
    images: {
      type: [String],
    },
    background: {
      type: String,
    },
    comments: [
      {
        commentBy: {
          type: ObjectId,
          required: true,
          ref: "users",
        },
        comment: {
          type: String,
          required: true,
          trim: true,
          text: true,
        },
        image: {
          type: String,
          trim: true,
          text: true,
        },
        commentDate: {
          type: Date,
          default: new Date(),
        },
      },
    ],
  },
  { timestamps: true }
);

const Posts = model<PostSchema>("posts", postSchema);

export default Posts;
