"use client";

import { FC, useEffect, useState } from "react";
import { onAuthStateChanged, signOut, User } from "firebase/auth";

import { AccountCircle, ExitToApp, ArrowDropDown } from "@mui/icons-material";
import { Avatar, Menu, MenuItem } from "@mui/material";
import { auth } from "../lib/firebase";

export const Nav: FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
    });
    return () => unsubscribe();
  }, []);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      handleMenuClose();
    } catch (error) {
      console.error("Logout error:", error);
    }
  };
  console.log("User Photo URL:", user?.photoURL);

  return (
    <nav className="w-full flex justify-between items-center py-2 px-6 border-b border-gray-200 relative z-[9999]">
      <div className="">
        <h1 className="hidden sm:block text-2xl font-bold tracking-wide px-6 text-gray-700 dark:text-[#e2b6b6]">
          Vesperal
        </h1>
        <h1 className="block sm:hidden text-xl font-bold text-[#7a4545] dark:text-[#e2b6b6] text-center">
          V
        </h1>
      </div>

      {/* User Profile */}
      <div className="flex items-center">
        {user ? (
          <>
            <div
              className="flex items-center cursor-pointer"
              onClick={handleMenuOpen}
            >
              <Avatar
                src={user.photoURL || "/assets/default.jpg"}
                alt={user.displayName || "User"}
                className="w-8 h-8"
              >
                {!user.photoURL && <AccountCircle className="text-gray-400" />}
              </Avatar>
              <span className="ml-2 text-sm font-medium text-gray-700">
                {user.displayName || "User"}
              </span>
              <ArrowDropDown className="text-gray-500" />
            </div>

            <Menu
              anchorEl={anchorEl}
              open={open}
              onClose={handleMenuClose}
              PaperProps={{
                elevation: 0,
                sx: {
                  overflow: "visible",
                  filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.1))",
                  mt: 1.5,
                  "& .MuiAvatar-root": {
                    width: 32,
                    height: 32,
                    ml: -0.5,
                    mr: 1,
                  },
                  "&:before": {
                    content: '""',
                    display: "block",
                    position: "absolute",
                    top: 0,
                    right: 14,
                    width: 10,
                    height: 10,
                    bgcolor: "background.paper",
                    transform: "translateY(-50%) rotate(45deg)",
                    zIndex: 0,
                  },
                },
              }}
              transformOrigin={{ horizontal: "right", vertical: "top" }}
              anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
            >
              <MenuItem onClick={handleLogout}>
                <ExitToApp fontSize="small" className="mr-2 text-gray-500" />
                <span className="text-gray-700">Logout</span>
              </MenuItem>
            </Menu>
          </>
        ) : (
          <div className="text-sm text-gray-500">Not signed in</div>
        )}
      </div>
    </nav>
  );
};
