import { router } from '../router.js';
import { GA } from '../ga.js';
import { AuthApi } from './auth.js';
export class LoggedOutApi {
    static async checkLoggedOut(response) {
        if (response.status !== 401) {
            return response;
        }
        GA.event(`logout`, `logout timed out`);
        await AuthApi.logout();
        router.navigate(`/login`);
        const messages = document.querySelector(`gwbw-messages`);
        if (messages) {
            messages.add({ message: `You have been logged out`, type: `info`, persistent: true });
        }
        throw new Error();
    }
}
