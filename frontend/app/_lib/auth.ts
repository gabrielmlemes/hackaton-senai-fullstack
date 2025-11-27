// import { AuthOptions } from "next-auth";
// import GoogleProvider from "next-auth/providers/google";

// export const authOptions: AuthOptions = {
//   providers: [
//     GoogleProvider({
//       clientId: process.env.GOOGLE_CLIENT_ID as string,
//       clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
//     }),
//   ],
//   callbacks: {
//     async session({ session, token }) {
//       // adiciona id fictício à sessão
//       session.user = {
//         ...session.user,
//         id: token.sub,
//       } as any;
//       return session;
//     },
//   },
//   secret: process.env.NEXTAUTH_SECRET,
// };
