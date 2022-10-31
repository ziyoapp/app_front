import { createRouter, createWebHistory } from "@ionic/vue-router";
import { RouteRecordRaw } from "vue-router";
import { TokenService } from "@/services/token.service";

import notFoundPage from "@/views/404.vue";
import LoginPage from "@/views/LoginPage.vue";
import ForgotPage from "@/views/ForgotPage.vue";
import RegisterPage from "@/views/RegisterPage.vue";
import WelcomePage from "@/views/WelcomePage.vue";
import AuthPage from "@/views/AuthPage.vue";
import tabsPage from "@/views/TabsPage.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    redirect: "/tabs/main",
  },
  {
    path: "/tabs/",
    component: tabsPage,
    children: [
      {
        path: "",
        redirect: "/tabs/main",
      },
      {
        path: "main",
        component: () => import("@/views/index.vue"),
        name: "Main",
      },
      {
        path: "events",
        component: () => import("@/views/events/index.vue"),
        name: "Events",
      },
      {
        path: "shop",
        component: () => import("@/views/shop/index.vue"),
        name: "Shop",
      },
      {
        path: "shop/:product_id",
        component: () => import("@/views/shop/detail.vue"),
        name: "productDetail",
        props: true,
      },
      {
        path: "news",
        component: () => import("@/views/news/index.vue"),
        name: "News",
      },
      {
        path: "news-detail/:news_id",
        component: () => import("@/views/news/detail.vue"),
        name: "newsDetail",
        props: true,
      },
      {
        path: "event/:event_id",
        component: () => import("@/views/events/detail.vue"),
        name: "eventDetail",
        props: true,
      },
      {
        path: "qr-code",
        component: () => import("@/views/QrCodePage.vue"),
        name: "QrCode",
      },
      {
        path: "development",
        component: () => import("@/views/Development.vue"),
      },
      {
        path: "events-history",
        component: () => import("@/views/events/history.vue"),
      },
      {
        path: "settings",
        component: () => import("@/views/SettingsPage.vue"),
      },
      {
        path: "info",
        component: () => import("@/views/InfoPage.vue"),
      },
      {
        path: "notifications",
        component: () => import("@/views/NotificationsPage.vue"),
        name: "Notification",
      },
      {
        path: "profile",
        component: () => import("@/views/ProfilePage.vue"),
        name: "Profile",
      },
      {
        path: "questions",
        component: () => import("@/views/QuestionsPage.vue"),
        name: "Questions",
      },
      {
        path: "questions-form",
        component: () => import("@/views/QuestionFormPage.vue"),
        name: "QuestionsForm",
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
  }

  if (loggedIn && onlyWhenLoggedOut) {
    return next("/");
  }

  next();
});

export default router;
