import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { computed } from "vue";
import { USER_ROLES } from "@/shared/constants";

const useUserCompositions = () => {
  const store = useStore();
  const router = useRouter();

  const userRole = computed(() => {
    return store.getters["userModule/getUserRoleId"];
  });

  const isAdminOrModerator = computed(() => {
    return userRole.value !== USER_ROLES.USER;
  });

  const logOut = () => {
    store.dispatch("auth/signOut").then(() => {
      router.push("/auth");
    });
  };

  const formatFn = (dateString: string) => {
    const date = new Date(dateString);
    const month =
      date.getMonth() + 1 < 10
        ? `0${date.getMonth() + 1}`
        : date.getMonth() + 1;
    const day = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate();
    return `${date.getFullYear()}-${month}-${day}`;
  };

  return {
    logOut,
    formatFn,
    isAdminOrModerator,
  };
};

export { useUserCompositions };
