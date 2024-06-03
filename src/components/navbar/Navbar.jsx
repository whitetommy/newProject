import Link from "next/link";
import Links from "./links/Links";
import styles from "./navbar.module.css";
import { auth } from "@/lib/auth";

const Navbar = async () => {
  const session = await auth();

  return (
    <div>
      <div className={styles.container}>
        <Link href="/" className={styles.logo}>
          <img
            src="https://img.icons8.com/external-anggara-blue-anggara-putra/32/external-security-security-anggara-blue-anggara-putra-3.png"
            alt="Security Icon"
            className={styles.icon}
          />
          AI_SAST
        </Link>
        <div>
          <Links session={session} />
        </div>
      </div>
      <hr width="100%" color="black"></hr>
    </div>
  );
};

export default Navbar;
