"use client";
import scss from "./Header.module.scss";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { links } from "@/constants/links";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { FC, useEffect, useState } from "react";
import { useHeaderStore } from "@/stores/useHeaderStore";
import BurgerButton from "@/ui/BurgerButton/BurgerButton";
import MobileMenu from "./MobileMenu";
import Image from "next/image";
import axios from "axios";
interface IUser {
  email: string;
  name: string;
}
const Header: FC = () => {
  const [isModal, setIsModal] = useState<boolean>(false);
  const pathname = usePathname();
  const { data: session } = useSession();
  const router = useRouter();

  const createUser = async (data: IUser) => {
    const { email, name } = data;
    const newUser = {
      email,
      name,
    };
    try {
      const { data } = await axios.post("/api/me", newUser);
      console.log("createUser", data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (session?.user?.email && session.user.name) {
      const newUser = {
        name: session.user?.name,
        email: session.user?.email,
      };
      setTimeout(() => {
        createUser(newUser);
      }, 2000);
    }
  }, [session]);

  const { isMobile, setIsMobile, isOpen } = useHeaderStore();
  const changeIsMobile = () => {
    setIsMobile(window.innerWidth <= 700);
  };

  useEffect(() => {
    changeIsMobile();
    window.addEventListener("resize", changeIsMobile);
    return () => {
      window.removeEventListener("resize", changeIsMobile);
    };
  }, [isMobile]);

  return (
    <header className={`${scss.Header} ${isOpen ? scss.active : ""}`}>
      <div className="container">
        <div className={scss.content}>
          <div className={scss.left}>
            <div className={scss.logo}>
              <Link href="/">
                <h1>A&#xB7;STUDIO</h1>
              </Link>
            </div>
          </div>
          <div className={scss.right}>
            {!isMobile ? (
              <nav className={scss.nav}>
                <ul>
                  {links.map((link, index) => (
                    <li key={index}>
                      <Link
                        className={
                          pathname === link.href
                            ? `${scss.link} ${scss.active}`
                            : `${scss.link}`
                        }
                        href={link.href}
                      >
                        {link.name}
                      </Link>
                    </li>
                  ))}

                  {session?.user && (
                    <li>
                      <Link
                        className={
                          pathname === "/favorites"
                            ? `${scss.link} ${scss.active}`
                            : `${scss.link}`
                        }
                        href={"/favorites"}
                      >
                        Favorites
                      </Link>
                    </li>
                  )}

                  <div className={scss.auth}>
                    {!session ? (
                      <button
                        className={scss.auth_btn}
                        onClick={() => {
                          router.push("/api/auth/signin");
                        }}
                      >
                        Sign In
                      </button>
                    ) : (
                      <>
                        {session.user?.image && (
                          <Image
                            width={38}
                            height={38}
                            onClick={() => setIsModal(!isModal)}
                            style={{ borderRadius: "50%", width: "38px" }}
                            src={session?.user?.image}
                            alt="user"
                          />
                        )}
                        {isModal ? (
                          <div className={scss.sign_out}>
                            <button
                              className={scss.auth_btn}
                              onClick={() =>
                                signOut({
                                  callbackUrl: "/",
                                })
                              }
                            >
                              Sign Out
                            </button>
                          </div>
                        ) : null}
                      </>
                    )}
                  </div>
                </ul>
              </nav>
            ) : (
              <>
                <BurgerButton />
                <MobileMenu />
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
