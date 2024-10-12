"use client";

import { FC } from "react";
import scss from "./MobileMenu.module.scss";
import { useHeaderStore } from "@/stores/useHeaderStore";
import { useSession, signOut } from "next-auth/react";

import { links } from "@/constants/links";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import Image from "next/image";

const MobileMenu: FC = () => {
  const { isOpen, setIsOpen } = useHeaderStore();
  const { data: session } = useSession();
  const router = useRouter();

  return (
    <div
      className={`${scss.MobileMenu} ${isOpen ? scss.active : ""}`}
      aria-hidden={!isOpen}
    >
      <div className={scss.content}>
        {session && (
          <div className={scss.auth}>
            <>
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
              {session.user?.image && (
                <Image
                  width={30}
                  height={30}
                  style={{ borderRadius: "50%", width: "30px" }}
                  src={session?.user?.image}
                  alt="user"
                />
              )}
            </>
          </div>
        )}
        <nav className={scss.nav}>
          <ul>
            <li>
              {!session && (
                <button
                  className={scss.auth_btn}
                  onClick={() => router.push("/api/auth/signin")}
                >
                  Sign In
                </button>
              )}
            </li>
            <li>
              <Link href={"/"} onClick={() => setIsOpen(false)}>
                Home
              </Link>
            </li>
            {links.map((link, index) => (
              <li key={index}>
                <Link
                  className={scss.link}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                >
                  {link.name}
                </Link>
              </li>
            ))}
            {session?.user && (
              <li>
                <Link className={scss.link} href={"/favorites"}>
                  Favorites
                </Link>
              </li>
            )}
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default MobileMenu;
