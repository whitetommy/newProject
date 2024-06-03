export const authConfig = {
  pages: {
    signIn: "/login",
  },
  session: {
    maxAge: 60 * 60,
  },
  providers: [],
  callbacks: {
    async jwt({ token, user, account }) {
      if (user) {
        token.name = user.name;
        token.id = Number(user.id);
        token.isAdmin = user.isAdmin
        token.accessToken = user.accessToken;
      }

      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.name = token.name;
        session.user.id = token.id;
        session.user.isAdmin = token.isAdmin
        session.accessToken = token.accessToken;
      }
      return session;
    },
    authorized({ auth, request }) {
      const user = auth?.user;
      const isOnAdminPanel = request.nextUrl?.pathname.startsWith("/admin");
      const isOnLoginPage = request.nextUrl?.pathname.startsWith("/login");

      if (isOnAdminPanel && !user?.isAdmin) {
        return false;
      }

      if (isOnLoginPage && user) {
        return Response.redirect(new URL("/", request.nextUrl));
      }

      return true;
    },
  },
};
