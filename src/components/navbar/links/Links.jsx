"use client";

//import { useState } from "react";
import styles from "./links.module.css";
import NavLink from "./navLink/navLink";
import { handleLogout } from "@/lib/action";

const links = [
  {
    title: "HomePage",
    path: "/homepage",
  },
  {
    title: "Blog",
    path: "/blog",
  },
  {
    title: "Contact",
    path: "/contact",
  },
];

const Links = ({ session }) => {
  return (
    <div className={styles.container}>
      <div className={styles.links}>
        {links.map((link) => (
          <NavLink item={link} key={link.title} />
        ))}
        {session?.user ? (
          <>
            <NavLink item={{ title: "My Page", path: "/mypage" }} />
            {session.user?.isAdmin && (
              <NavLink item={{ title: "Admin", path: "/admin" }} />
            )}
            <form action={handleLogout}>
              <button className={styles.logout}>Logout</button>
            </form>
          </>
        ) : (
          <NavLink item={{ title: "Login", path: "/login" }} />
        )}
      </div>
    </div>
  );
};

export default Links;
