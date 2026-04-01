import { reactive } from 'vue';

export const store = reactive({
    username: null,
    async fetchUser() {
        try {
            const res = await fetch('/api/is-logged');
            if (res.ok) {
                const data = await res.json();
                this.username = data.username;
            } else {
                this.username = null;
            }
        } catch (e) {
            this.username = null;
        }
    }
});
