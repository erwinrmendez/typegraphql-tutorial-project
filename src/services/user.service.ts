import { ApolloError } from "apollo-server";
import bcrypt from "bcrypt";
import { signJwt } from "../../utils/jwt";
import { CreateUserInput, LoginInput, UserModel } from "../schemas/user.schema";
import Context from "../types/context";

class UserService {
  async createUser(input: CreateUserInput) {
    // call user model to create user
    return UserModel.create(input);
  }

  async login(input: LoginInput, context: Context) {
    const invalidError = "Invalid email or password";

    // get user by email
    const user = await UserModel.find().findByEmail(input.email).lean();

    if (!user) {
      throw new ApolloError(invalidError);
    }

    // validate password
    const passwordIsValid = await bcrypt.compare(input.password, user.password);
    if (!passwordIsValid) {
      throw new ApolloError(invalidError);
    }

    // sign a jwt
    const token = signJwt(user);

    // set a cookie for jwt
    context.res.cookie("accessToken", token, {
      maxAge: 3.154e10,
      httpOnly: true,
      domain: "localhost",
      path: "/",
      sameSite: "strict",
      secure: process.env.NODE_ENV === "production",
    });

    // return jwt
    return token;
  }
}

export default UserService;
