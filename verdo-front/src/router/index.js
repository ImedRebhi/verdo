import { createRouter, createWebHistory } from "vue-router";
import Home from "../pages/Home.vue";
import Opportunities from "../pages/Opportunities.vue";
import Login from "../pages/Login.vue";
import Register from "../pages/Register.vue";
import About from "../pages/About.vue";
import OurImpact from "../pages/Impact.vue";
import HowItWorks from "../pages/HowItWorks.vue";
import GeoAIService from "../pages/GeoAIService.vue";
import AdminLayout from "../layout/AdminLayout.vue";
import AdminDashboard from "../pages/admin/Dashboard.vue";
import Unauthorized from "../pages/Unauthorized.vue";
import AuthService from "../services/AuthService";

const routes = [
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
  {
    path: "/register",
    name: "Register",
    component: Register,
  },
  // Regular routes with default layout
  {
    path: "/",
    component: () => import("../layout/DefaultLayout.vue"),
    children: [
      {
        path: "",
        name: "Home",
        component: Home,
      },
      {
        path: "about",
        name: "About",
        component: About,
      },
      {
        path: "opportunities",
        name: "Opportunities",
        component: Opportunities,
      },
      {
        path: "how-it-works",
        name: "HowItWorks",
        component: HowItWorks,
      },
      {
        path: "impact",
        name: "OurImpact",
        component: OurImpact,
      },
      {
        path: "geoai",
        name: "GeoAIService",
        component: GeoAIService,
        meta: { requiresAuth: true },
      },
      {
        path: "profile",
        name: "Profile",
        component: () => import("../pages/Profile.vue"),
        meta: { requiresAuth: true },
      },
      // Landowner specific routes
      {
        path: "/landowner",
        name: "LandownerDashboard",
        component: () => import("../pages/landowner/Dashboard.vue"),
        meta: { requiresAuth: true, requiresRole: "landowner" },
      },
      // Investor specific routes
      {
        path: "/investor",
        name: "InvestorDashboard",
        component: () => import("../pages/investor/Dashboard.vue"),
        meta: { requiresAuth: true, requiresRole: "investor" },
      },
    ],
  },

  // Admin routes with admin layout
  {
    path: "/admin",
    component: () => import("../layout/AdminLayout.vue"),
    meta: { requiresAuth: true },
    children: [
      {
        path: "",
        redirect: "/admin/dashboard",
      },
      {
        path: "dashboard",
        name: "AdminDashboard",
        component: () => import("../pages/admin/Dashboard.vue"),
      },
      {
        path: "products",
        name: "AdminProducts",
        component: () => import("../pages/admin/Products.vue"),
        meta: { requiresPermission: "manage_products" },
      },
      {
        path: "investments",
        name: "AdminInvestments",
        component: () => import("../pages/admin/Investments.vue"),
        meta: { requiresPermission: "manage_investments" },
      },
      {
        path: "users",
        name: "AdminUsers",
        component: () => import("../pages/admin/Users.vue"),
        meta: { requiresPermission: "manage_users" },
      },
    ],
  },

  // Routes without layout
  {
    path: "/unauthorized",
    name: "Unauthorized",
    component: Unauthorized,
  },
  // Add a catch-all route for /dashboard
  {
    path: "/dashboard",
    name: "Dashboard",
    component: () => import("../pages/Dashboard.vue"),
    meta: { requiresAuth: true },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  // Si la route nécessite une authentification
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (!AuthService.isLoggedIn()) {
      next("/login");
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;
