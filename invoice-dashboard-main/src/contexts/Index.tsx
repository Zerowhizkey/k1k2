import {
    createContext,
    useState,
    useContext,
    useEffect,
    useReducer,
    Reducer,
} from 'react';
import api from '@/api';

const InvoiceContex = createContext<InvoiceContext | null>(null);

export const InvoiceProvider = ({ children }: ProviderProps) => {
    const [loading, setLoading] = useState(true);
    const [item, dispatchItem] = useReducer<Reducer<ReducerState, Action>>(
        (state, action) => {
            const { type, data } = action;
            switch (type) {
                case 'users':
                    return { ...state, users: data };
                case 'projects':
                    return { ...state, projects: data };
                case 'tasks':
                    return { ...state, tasks: data };
                case 'timelogs':
                    return { ...state, timelogs: data };
                case 'invoices':
                    return { ...state, invoices: data };
                case 'addInvoice':
                    return { ...state, invoices: [...state.invoices, data] };
            }
        },
        {
            users: [],
            projects: [],
            tasks: [],
            timelogs: [],
            invoices: [],
        }
    );

    const initialLoad = async () => {
        setLoading(true);
        try {
            const [users, projects, tasks, timelogs, invoices] =
                await Promise.all([
                    api.users.list(),
                    api.projects.list(),
                    api.tasks.list(),
                    api.timelogs.list(),
                    api.invoices.list(),
                ]);
            dispatchItem({ type: 'users', data: users });
            dispatchItem({ type: 'projects', data: projects });
            dispatchItem({ type: 'tasks', data: tasks });
            dispatchItem({ type: 'timelogs', data: timelogs });
            dispatchItem({ type: 'invoices', data: invoices });
        } catch (error) {
            console.error(error);
        }
        setLoading(false);
    };

    const addInvoice = async (data: Invoice) => {
        await api.invoices.post(data);
        dispatchItem({ type: 'addInvoice', data });
        api.invoices.list();
    };

    const addHourly = async (id: string, data: unknown) => {
        await api.projects.patch(id, data);
        api.projects.list();
    };

    const deleteItem = async (item: keyof typeof api, id: string) => {
        const deleted = await api[item].delete(id);
        if (!deleted) return;
        initialLoad();
    };
    useEffect(() => {
        initialLoad();
    }, []);

    return (
        <InvoiceContex.Provider
            value={{
                loading,
                item,
                addInvoice,
                addHourly,
                deleteItem,
            }}
        >
            {children}
        </InvoiceContex.Provider>
    );
};

export const useInvoice = () => {
    const contextValue = useContext(InvoiceContex);
    if (!contextValue) {
        throw new Error('UseInvoice is outside InvoiceProvider');
    }
    return contextValue;
};
