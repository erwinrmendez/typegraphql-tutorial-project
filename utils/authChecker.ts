import { AuthChecker } from "type-graphql";
import Context from "../src/types/context";

const authChecker: AuthChecker<Context> = ({ root, args, context, info }) => {
  return !!context.user;
};

export default authChecker;
