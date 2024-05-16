import NextAuth   from "next-auth";
import{PrismaAdapter} from "@auth/prisma-adapter";
import authConfig from "./auth.config";
import { db } from "./lib/db";
import { getUserbyId } from "./data/user";
import { UserRole } from "@prisma/client";



export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  pages:{
    signIn:"/auth/login",
    error:"/auth/error",
  },
  /*events:{
    async linkAccount({user}){
      await db.user.update({
        where:{id: user.id},
        data:{emailVerified:new Date()}
      })
    }
  },*/
  callbacks:{
    async signIn({user,account}){
      
      if(account?.provider!=="credentials") return true;

      if (!user.id) {
        console.error("User ID is undefined.");
        return false; // or handle the error appropriately
    }
      const existingUser= await getUserbyId(user.id);

      if(!existingUser?.emailVerified) return false;

      return true;
    },  

    async session({token,session}){
      console.log({
        sessionToken: token,
    })
      if(token.sub && session.user){
        session.user.id= token.sub;
      }
      if(token.role && session.user){
        session.user.role= token.role as UserRole ;
      }
      return session;
    },
    
    async jwt({token}){
      if(!token.sub) return token;
      
       const existingUser= await getUserbyId(token.sub);

       if(!existingUser) return token;
       token.role=existingUser.role;
      return token;
    }
  },
    adapter: PrismaAdapter(db),
    session: {strategy: "jwt"},
    secret: process.env.AUTH_SECRET || "secret",
  ...authConfig,
});