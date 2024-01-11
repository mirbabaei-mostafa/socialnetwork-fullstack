import userModel from "./userModel";
import dotenv from "dotenv";
import bcrypt from "bcrypt";
import mongoose, { Schema, model, connect, Types, ObjectId } from "mongoose";

dotenv.config();

const { ObjectId } = mongoose.Schema;

export interface UserSchema extends mongoose.Document {
  fname: string;
  lname: string;
  email: string;
  username: string;
  createUserName(): void;
  password: string;
  comparePassword(candidatePassword: string): Promise<boolean>;
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
    username: {
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

userSchema.index({ email: 1 });

userSchema.pre("save", async function (this: UserSchema, next) {
  const user = this;
  if (!user.isModified("password")) return next();
  try {
    const salt: string = await bcrypt.genSalt(
      parseInt(process.env.SALTLENGHT as string)
    );
    user.password = await bcrypt.hash(user.password, salt);
    await user.createUserName();
    return next();
  } catch (err: any) {
    return next(err);
  }
});

// Generate new username when the username exist in DB
userSchema.methods.createUserName = async function () {
  const user = this as UserSchema;
  let newuser: any;
  do {
    newuser = await userModel.findOne({ username: user.username });
    if (newuser) user.username += Math.floor(Math.random() * 3214).toString();
  } while (newuser);
};

// Compare a candidate password with the user's password
userSchema.methods.comparePassword = async function (
  candidatePassword: string
): Promise<boolean> {
  // So we don't have to pass this into the interface method
  const user = this as UserSchema;

  return bcrypt.compare(candidatePassword, user.password).catch((e) => false);
};

const Users = model<UserSchema>("users", userSchema);

export default Users;
