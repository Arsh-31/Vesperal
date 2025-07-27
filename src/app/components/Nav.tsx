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

  return (
    <nav className="w-full flex justify-between items-center py-2 px-6 bg-[#272030] relative z-[9999]">
      <div>
        <h1 className="hidden sm:block text-xl font-bold tracking-wide text-[#e3ebf2]">
          Vesperal
        </h1>
        <h1 className="block sm:hidden text-xl font-bold text-[#e3ebf2] text-center">
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
                {!user.photoURL && <AccountCircle className="text-[#b28d8d]" />}
              </Avatar>
              <span className="ml-2 text-sm font-medium text-[#e3ebf2]">
                {user.displayName || "User"}
              </span>
              <ArrowDropDown className="text-[#e3ebf2]" />
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
                  bgcolor: "#fffaf9",
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
                <ExitToApp fontSize="small" className="mr-2 text-[#272030]" />
                <span className="text-[#272030] font-medium">Logout</span>
              </MenuItem>
            </Menu>
          </>
        ) : (
          <div className="text-sm text-[#e3ebf2]">Not signed in</div>
        )}
      </div>
    </nav>
  );
};
