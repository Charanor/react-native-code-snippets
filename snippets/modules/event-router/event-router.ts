/**
 * Author: Jesper Sporron
 * Author GitHub: https://github.com/Charanor
 * Project GitHub: https://github.com/Charanor/react-native-code-snippets
 * License: Creative Commons Zero v1.0 Universal (CC0)
 * 
 * Description:
 *     This is a module that allows you to define event routers in a natural way.
 * 
 * Please keep this comment at the top of the file to show support (even though you are free to remove it) :)
 */

type EventListener<T> = (data?: T) => void;
type EventSubscription = { remove: () => void };

class EventRouter<T> {
    private listeners: EventListener<T>[] = [];

    subscribe(listener: EventListener<T>): EventSubscription {
        this.listeners.push(listener);
        return {
            remove: () => {
                const idx = this.listeners.indexOf(listener);
                this.listeners.splice(idx, 1);
            }
        };
    }

    public trigger(data?: T) {
        this.listeners.forEach(l => l(data));
    }
}

export default EventRouter;
export {
    EventListener,
    EventSubscription
};