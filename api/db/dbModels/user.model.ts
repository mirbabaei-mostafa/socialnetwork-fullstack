import { NextFunction } from "express";
import bcrypt from "bcrypt";
import mongoose, { Schema, model, connect, Types, ObjectId } from "mongoose";

const { ObjectId } = mongoose.Schema;

export interface UserSchema {
  fname: string;
  lname: string;
  email: string;
  password: string;
  image: string;
  avatar: string;
  cover: string;
  gender: string;
  birth_year: number;
  birth_month: number;
  birth_day: number;
  verify: boolean;
  freinds: Types.Array<string>;
  following: Types.Array<string>;
  followers: Types.Array<string>;
  requests: Types.Array<string>;
  user_searchs: Types.Array<ObjectId>;
  saved_posts: Types.Array<SavedPosts>;
  details: Details;
  refresh_token: Types.Array<string>;
}

interface SavedPosts {
  post: Types.ObjectId;
  saved_at: Date;
}

interface Details {
  nickname: string;
  biography: string;
  hometown: string;
  current_city: string;
  work_place: string;
  high_school: string;
  college: string;
  univercity: string;
  relationship: string;
  instagrem: string;
  linkedin: string;
  youtube: string;
}

const userSchema = new Schema<UserSchema>(
  {
    fname: {
      type: String,
      required: true,
      trim: true,
      text: true,
    },
    lname: {
      type: String,
      required: true,
      trim: true,
      text: true,
    },
    email: {
      type: String,
      require: true,
      unique: true,
      trim: true,
      text: true,
    },
    password: {
      type: String,
      require: true,
      trim: true,
    },
    image: {
      type: String,
      default: "public/images/avatar-default.png",
      require: false,
    },
    avatar: {
      type: String,
      default: "public/images/avatar-default.png",
      require: false,
    },
    cover: {
      type: String,
      default: "public/images/cover-default.png",
      require: false,
    },
    gender: {
      type: String,
      enum: ["Not Known", "Male", "Female", "Indeterminate"],
      require: true,
      trim: true,
      text: true,
    },
    birth_year: {
      type: Number,
      require: true,
      trim: true,
    },
    birth_month: {
      type: Number,
      require: true,
      trim: true,
    },
    birth_day: {
      type: Number,
      require: true,
      trim: true,
    },
    verify: {
      type: Boolean,
      require: true,
      default: false,
    },
    freinds: {
      type: [String],
      default: [],
    },
    following: {
      type: [String],
      default: [],
    },
    followers: {
      type: [String],
      default: [],
    },
    requests: {
      type: [String],
      default: [],
    },
    user_searchs: [
      {
        user: {
          type: ObjectId,
          ref: "users",
        },
      },
    ],
    saved_posts: [
      {
        post: {
          type: ObjectId,
          ref: "posts",
        },
        saved_at: {
          type: Date,
          default: new Date(),
        },
      },
    ],
    details: {
      nickname: {
        type: String,
        trim: true,
        text: true,
      },
      biography: {
        type: String,
        trim: true,
        text: true,
      },
      hometown: {
        type: String,
        trim: true,
        text: true,
      },
      current_city: {
        type: String,
        trim: true,
        text: true,
      },
      work_place: {
        type: String,
        trim: true,
        text: true,
      },
      high_school: {
        type: String,
        trim: true,
        text: true,
      },
      college: {
        type: String,
        trim: true,
        text: true,
      },
      univercity: {
        type: String,
        trim: true,
        text: true,
      },
      relationship: {
        type: String,
        enum: ["Single", "In relationship", "Married", "Divorced"],
        trim: true,
        text: true,
      },
      instagrem: {
        type: String,
        trim: true,
        text: true,
      },
      linkedin: {
        type: String,
        trim: true,
        text: true,
      },
      youtube: {
        type: String,
        trim: true,
        text: true,
      },
    },
    refresh_token: [String],
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next: NextFunction) {
  // const user = this as UserSchema & { _id: Types.ObjectId };
  const user = this;
  if (user.isModified("password")) {
    try {
      const salt: string = await bcrypt.genSalt(12);
      user.password = await bcrypt.hash(user.password, salt);
    } catch (err) {}
  } else {
    next();
  }
});

const Users = model<UserSchema>("users", userSchema);

export default Users;
