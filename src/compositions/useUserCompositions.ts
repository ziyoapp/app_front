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
  };
};

export { useUserCompositions };
