/**
 * Author: Jesper Sporron
 * Author GitHub: https://github.com/Charanor
 * Project GitHub: https://github.com/Charanor/react-native-code-snippets
 * License: Creative Commons Zero v1.0 Universal (CC0)
 * 
 * Description:
 *     This is a module that allows you to define event routers in a natural way.
 * 
 * Usage:
 *     import EventRouter from "./event-router";
 * 
 *     type State = "one" | "two";    
 * 
 *     class ClassWithEvent {
 *         private state: State = "one";
 *         private onStateChangedRouter: EventRouter<State>;
 * 
 *         public setState(state: State) {
 *             this.state = state;
 *             this.onStateChangedRouter.trigger(state);
 *         }
 * 
 *         public get onStateChanged() {
 *             return this.onStateChangedRouter.asEventFuncs();
 *         }
 *     }
 * 
 *     const instance = new ClassWithEvent();
 * 
 *     function SomeComponent() {
 *        const [state, setState] = useState<State>(undefined);
 *        useEffect(() => {
 *            const sub = instance.onStateChanged.subscribe(setState);
 *            return sub.remove;
 *        }, []);
 *  
 *        return (
 *            <View>
 *                <Text>{state ?? "No state yet..."}</Text>
 *                <TouchableOpacity onPress={() => instance.setState("two")}>
 *                    <Text>Set state</Text>
 *                </TouchableOpacity>
 *            </View>
 *        );
 *     }
 * 
 * Please keep this comment at the top of the file to show support (even though you are free to remove it) :)
 */

type EventListener<T> = (data?: T) => void;
type EventSubscription = { remove: () => void };

interface EventFuncs<T> {
    subscribe(listener: EventListener<T>): EventSubscription;
}

class EventRouter<T> implements EventFuncs<T> {
    private listeners: EventListener<T>[] = [];

    subscribe(listener: EventListener<T>) {
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

    public asEventFuncs(): EventFuncs<T> {
        return this;
    }
}

export default EventRouter;
export {
    EventListener,
    EventSubscription
};