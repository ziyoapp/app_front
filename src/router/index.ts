import { createRouter, createWebHistory } from "@ionic/vue-router";
import { RouteRecordRaw } from "vue-router";
import MainPage from "@/views/MainPage.vue";
import notFoundPage from "@/views/404.vue";
import LoginPage from "@/views/LoginPage.vue";
import ForgotPage from "@/views/ForgotPage.vue";
import RegisterPage from "@/views/RegisterPage.vue";
import WelcomePage from "@/views/WelcomePage.vue";
import AuthPage from "@/views/AuthPage.vue";
import { TokenService } from "@/services/token.service";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    component: MainPage,
    children: [
      {
        path: "tab1",
        component: () => import("@/views/Tab1Page.vue"),
      },
      {
        path: "tab2",
        component: () => import("@/views/Tab2Page.vue"),
      },
      {
        path: "tab3",
        component: () => import("@/views/Tab3Page.vue"),
      },
    ],
  },
  {
    path: "/auth",
    component: AuthPage,
    children: [
      {
        path: "",
        component: WelcomePage,
        meta: {
          public: true,
          onlyWhenLoggedOut: true,
        },
      },
      {
        path: "/login",
        component: LoginPage,
        meta: {
          public: true,
          onlyWhenLoggedOut: true,
        },
      },
      {
        path: "/forgot",
        component: ForgotPage,
        meta: {
          public: true,
          onlyWhenLoggedOut: true,
        },
      },
      {
        path: "/register",
        component: RegisterPage,
        meta: {
          public: true,
          onlyWhenLoggedOut: true,
        },
      },
    ],
  },
  {
    path: "/404",
    component: notFoundPage,
  },
  {
    path: "/:catchAll(.*)",
    redirect: "/404",
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  const isPublic = to.matched.some((record) => record.meta.public);
  const onlyWhenLoggedOut = to.matched.some(
    (record) => record.meta.onlyWhenLoggedOut
  );
  const loggedIn = !!TokenService.getToken();

  if (!isPublic && !loggedIn) {
    return next({
      path: "/auth",
      query: { redirect: to.fullPath },
    });
    console.log(11);
    console.log(TokenService.getToken());
  }

  if (loggedIn && onlyWhenLoggedOut) {
    // return next("/");
    console.log(22);
  }

  next();
});

export default router;
