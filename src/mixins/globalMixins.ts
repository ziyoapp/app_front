import { mapActions } from "vuex";

export default {
  methods: {
    ...mapActions("auth", ["signOut"]),
    async handleSignOut() {
      await this.signOut().then(() => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        this.$router.push("/auth/login");
      });
    },
  },
};
