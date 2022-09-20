import { useStore } from "vuex";
import { useRouter } from "vue-router";

const useUserCompositions = () => {
  const store = useStore();
  const router = useRouter();

  const logOut = () => {
    store.dispatch("auth/signOut").then(() => {
      router.push("/auth");
    });
  };

  return {
    logOut,
  };
};

export { useUserCompositions };
