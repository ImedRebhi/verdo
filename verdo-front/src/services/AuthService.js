import axios from "axios";
import { AUTH_API_URL } from "./api";

const API_URL = `${AUTH_API_URL}/`;

class AuthService {
  async login(email, password) {
    try {
      const response = await axios.post(
        API_URL + "signin",
        {
          email,
          password,
        },
        {
          withCredentials: true,
        }
      );

      if (response.data.token) {
        localStorage.setItem("user", JSON.stringify(response.data));
        sessionStorage.setItem("user", JSON.stringify(response.data));
      }

      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async register(
    firstName,
    lastName,
    email,
    phoneNumber,
    password,
    entityType
  ) {
    try {
      const response = await axios.post(
        API_URL + "signup",
        {
          firstName,
          lastName,
          email,
          phoneNumber,
          password,
          entityType,
        },
        {
          withCredentials: true,
        }
      );

      if (response.data.token) {
        localStorage.setItem("user", JSON.stringify(response.data));
        sessionStorage.setItem("user", JSON.stringify(response.data));
      }

      return response.data;
    } catch (error) {
      throw error.response ? error.response.data : { message: "Network error" };
    }
  }

  logout() {
    localStorage.removeItem("user");
    sessionStorage.removeItem("user");
  }

  getCurrentUser() {
    const sessionUser = sessionStorage.getItem("user");
    const localUser = localStorage.getItem("user");

    return sessionUser
      ? JSON.parse(sessionUser)
      : localUser
      ? JSON.parse(localUser)
      : null;
  }

  isAuthenticated() {
    return !!this.getCurrentUser();
  }

  async getUserProfile() {
    try {
      const user = this.getCurrentUser();
      if (!user || !user.token) {
        throw new Error("User not authenticated");
      }

      const response = await axios.get(API_URL + "me", {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
        withCredentials: true,
      });

      return response.data;
    } catch (error) {
      throw error.response ? error.response.data : { message: "Network error" };
    }
  }

  hasRole(role) {
    const user = this.getCurrentUser();
    if (!user || !user.user || !user.user.roles) {
      return false;
    }
    return user.user.roles.includes(role);
  }

  isAdmin() {
    const user = this.getCurrentUser();
    if (!user || !user.user || !user.user.roles) {
      return false;
    }

    // Check if 'admin' is in the roles array
    // Or check if the user has the admin role ID
    return (
      user.user.roles.includes("admin") ||
      // Add your admin role ID here if you know it
      user.user.roles.includes("67da02054530950c75f749d7")
    );
  }

  isLandowner() {
    const user = this.getCurrentUser();
    if (!user || !user.user || !user.user.roles) {
      return false;
    }
    return user.user.roles.includes("landowner");
  }

  isInvestor() {
    const user = this.getCurrentUser();
    if (!user || !user.user || !user.user.roles) {
      return false;
    }
    return user.user.roles.includes("investor");
  }

  hasPermission(permission) {
    const user = this.getCurrentUser();
    if (!user || !user.user || !user.user.permissions) {
      return false;
    }
    return user.user.permissions.includes(permission);
  }

  getUserRoles() {
    const user = this.getCurrentUser();
    if (!user || !user.user || !user.user.roles) {
      return [];
    }
    return user.user.roles;
  }

  getUserPermissions() {
    const user = this.getCurrentUser();
    if (!user || !user.user || !user.user.permissions) {
      return [];
    }
    return user.user.permissions;
  }

  isLoggedIn() {
    const user = this.getCurrentUser();
    return !!user;
  }
}

export default new AuthService();
